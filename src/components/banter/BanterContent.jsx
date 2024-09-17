import {
  Typography,
  Box,
  Paper,
  FormControl,
  Select,
  FormHelperText,
  Button,
} from "@mui/material";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  SearchContainer,
} from "../ManageUsers/ManangeUsersStyled";
import { BanterFormWrapper } from "./banterStyled";
import { Controller, useForm } from "react-hook-form";
import CustomAddSportLabel from "../reuse/CustomAddSportLabel";
import { MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { manageSportDataSelector } from "../../slices/manageSport/manageSportSelector";
import { useEffect, useState } from "react";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import { updateSportData } from "../../slices/manageSport/manageSport";
import { banterDataSelector } from "../../slices/BanterSlice/banterSelector";
import { updateBanterCompetitionListData } from "../../slices/BanterSlice/banterSlice";
import { useUserCompetitionListBySportIdApiByNameMutation } from "../../api/getCompetitionListBySportId";
import DateRangePicker from "../master/DatePickerComponent";
import { AddSportSubmitBtn } from "../master/masterStyled";
import { useLazyGetUserGetDownloadByNameQuery } from "../../api/getDownload";
import moment from "moment";
import { CSVLink } from "react-csv";

const BanterContent = () => {
  const dispatch = useDispatch();
  const { sportData } = useSelector(manageSportDataSelector);
  const { banterCompetitionListData } = useSelector(banterDataSelector);
  const [competitions, setCompetitions] = useState([]);
  const [csvData, setCsvData] = useState([]);
  const [csvHeaders, setCsvHeaders] = useState([]);

  console.log(csvData, "cc");

  const [
    userListSport,
    {
      data: listSportData,
      isSuccess: userSportSuccess,
      isLoading: sportDataFetching,
    },
  ] = useGetUserListSportApiByNameMutation();

  const [
    banterCompetitionListApi,
    {
      data: banterCompetitionListBySportIdData,
      isSuccess: banterCompetitionListSuccess,
      isLoading: banterCompetitionListFetching,
    },
  ] = useUserCompetitionListBySportIdApiByNameMutation();

  const [
    getDownloadApi,
    {
      data: getDownloadData,
      isSuccess: getDownloadSuccess,
      isLoading: getDownloadFetching,
    },
  ] = useLazyGetUserGetDownloadByNameQuery();

  useEffect(() => {
    if (listSportData && listSportData?.data) {
      dispatch(updateSportData(listSportData));
    }
  }, []);

  useEffect(() => {
    if (
      banterCompetitionListBySportIdData &&
      banterCompetitionListBySportIdData?.data
    ) {
      setCompetitions(banterCompetitionListBySportIdData?.data);
      dispatch(
        updateBanterCompetitionListData(banterCompetitionListBySportIdData)
      );
    }
  }, [banterCompetitionListBySportIdData, dispatch]);

  useEffect(() => {
    const reqParams = {
      search_string: "",
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userListSport(reqParams);
  }, []);

  const handleSportChange = (event) => {
    const selectedSportId = event.target.value;

    const reqParams = {
      count: "1000",
      sportId: selectedSportId,
    };
    banterCompetitionListApi(reqParams);
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    watch,
    setValue,
    control,
    formState: { errors },

    reset,
  } = useForm({
    mode: "onChange",

    defaultValues: {
      name: "",
      type: "",
      userType: "",
      pages: "",
      sport: "",
      mediaType: "",
      redirectUrl: "",
    },
    criteriaMode: "all",
    shouldFocusError: true,
  });

  const onSubmit = async (data) => {
    console.log(data, "data");

    const { competition, startDate, endDate } = data;

    const formatStartDate = new Date(startDate);
    const formateEndDate = new Date(endDate);

    const isoStartDate = moment(formatStartDate).toISOString();
    const isoEndDate = moment(formateEndDate).toISOString();

    const payload = {
      compId: competition,
      startDate: isoStartDate,
      endDate: isoEndDate,
    };
    const response = await getDownloadApi(payload).unwrap();
    console.log(response, "sd");

    if (response && response?.message?.data) {
      console.log(response?.message?.data, "ddddd");
      // Define CSV headers
      setCsvHeaders([
        { label: "Email", key: "email" },
        { label: "Name", key: "name" },
        { label: "Message", key: "message" },
        { label: "Media", key: "media" },
        { label: "Date/Time", key: "dateTime" },
      ]);

      const dataCsv =
        response?.message?.data.map((item) => {
          console.log(item, "item");

          return {
            Email: item?.email,
            Name: item?.name,
            Message: item.message,
            Media: item?.medial,
            createdAt: moment(item.createdAt).format("M/D/YYYY, h:mm:ss A"),
          };
        }) || [];
      console.log(dataCsv, "dataCSV");
      setCsvData(dataCsv);
    }
  };

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>Banter</ManageUsersHeading>
          </Box>

          <SearchContainer>
            <BanterFormWrapper>
              <Paper sx={{ width: "70%", height: "200px", padding: "15px" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "50px",
                      border: "1px solid red",
                      display: "flex",
                      justifyContent: "space-between",
                      // alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        height: "auto",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <FormControl
                        fullWidth
                        error={!!errors.sport}
                        {...register("sport")}
                      >
                        <Controller
                          name="sport"
                          control={control}
                          rules={{ required: "Select Sport is required" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              displayEmpty
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              sx={{
                                fontSize: "14px",
                                height: "34px",
                              }}
                              onChange={(event) => {
                                field.onChange(event);
                                handleSportChange(event);
                              }}
                              // {...register("sport")}
                            >
                              {listSportData?.data?.map((sport) => (
                                <MenuItem
                                  key={sport?._id}
                                  value={sport?._id}
                                  {...register("sport")}
                                >
                                  {sport?.sportname}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                        <div className="errorMsgParent">
                          <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                            {errors.sport?.message}
                          </FormHelperText>
                        </div>
                      </FormControl>
                    </div>
                    <div
                      style={{
                        height: "auto",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}
                    >
                      <FormControl fullWidth>
                        <Controller
                          name="competition"
                          control={control}
                          rules={{ required: "Competition is required" }}
                          render={({ field }) => (
                            <Select
                              {...field}
                              displayEmpty
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              sx={{
                                fontSize: "14px",
                                height: "34px",
                              }}
                            >
                              <MenuItem disabled>Select Competition</MenuItem>
                              {competitions.map((competition) => (
                                <MenuItem
                                  key={competition?._id}
                                  value={competition?._id}
                                >
                                  {competition?.competitionname}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                        <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                          {errors.competition?.message}
                        </FormHelperText>
                      </FormControl>
                    </div>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      height: "50px",
                      border: "1px solid red",
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <DateRangePicker
                        control={control}
                        name="startDate"
                        name2="endDate"
                        errors={errors}
                        register={register}
                        watch={watch}
                        clearErrors={clearErrors}
                        setValue={setValue}
                      />
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: "10px" }}
                  >
                    <AddSportSubmitBtn type="submit">Filter</AddSportSubmitBtn>
                    {csvData && (
                      <Box>
                        <CSVLink
                          data={csvData}
                          headers={csvHeaders}
                          filename={`download-${moment().format(
                            "YYYYMMDD-HHmmss"
                          )}.csv`}
                        >
                          <Button variant="contained">Download CSV</Button>
                        </CSVLink>
                      </Box>
                    )}
                  </Box>
                </form>
              </Paper>
              {/* <MUIDataTable
                data={userListContentData?.data}
                columns={columns}
                options={options}
              /> */}
            </BanterFormWrapper>
            {/* <CustomModal
              modal={modal}
              closeModal={closeModal}
              content={modalTitle}
              action={action}
            /> */}
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default BanterContent;
