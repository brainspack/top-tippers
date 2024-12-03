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
import { BanterFormBox, BanterFormWrapper, FilterBtn } from "./banterStyled";
import { Controller, useForm } from "react-hook-form";
import CustomAddSportLabel from "../reuse/CustomAddSportLabel";
import { MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { manageSportDataSelector } from "../../slices/manageSport/manageSportSelector";
import React, { useEffect, useState } from "react";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import { updateSportData } from "../../slices/manageSport/manageSport";
import { banterDataSelector } from "../../slices/BanterSlice/banterSelector";
import { updateBanterCompetitionListData } from "../../slices/BanterSlice/banterSlice";
import { useUserCompetitionListBySportIdApiByNameMutation } from "../../api/getCompetitionListBySportId";
import DateRangePicker from "../master/DatePickerComponent";
import { AddSportSubmitBtn } from "../master/masterStyled";
import { useLazyGetUserGetDownloadByNameQuery } from "../../api/getDownload";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import moment from "moment";
import { CSVLink } from "react-csv";
import { LoadingButton } from "@mui/lab";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BanterContent = () => {
  const dispatch = useDispatch();
  const { sportData } = useSelector(manageSportDataSelector);
  const { banterCompetitionListData } = useSelector(banterDataSelector);
  const [competitions, setCompetitions] = useState([]);
  const [state, setState] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isCsvAvailable, setIsCsvAvailable] = useState(false);

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
      count: 1000,
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

    criteriaMode: "all",
    shouldFocusError: true,
  });

  const onSubmit = async (data) => {
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

    setState(response);

    if (!response?.message?.data || response.message.data.length === 0) {
      setSnackbarMessage("There have no any messages in this banter");
      setSnackbarOpen(true);
      setIsCsvAvailable(false);
    } else {
      setIsCsvAvailable(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const csvData =
    state?.message?.data?.map((item) => ({
      email: item?.email,
      name: item?.name,
      message: item?.message,
      media: item?.media,
      createdAt: moment(item.createdAt).format("M/D/YYYY, h:mm:ss A"),
    })) || [];

  const csvHeader = [
    { label: "Email", key: "email" },
    { label: "Name", key: "name" },
    { label: "message", key: "message" },
    { label: "media", key: "media" },
    { label: "date/time", key: "createdAt" },
  ];

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>Banter</ManageUsersHeading>
          </Box>

          <SearchContainer>
            <BanterFormWrapper>
              <BanterFormBox>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "50px",
                      display: "flex",
                      justifyContent: "space-between",
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
                            >
                              <MenuItem disabled>Select Sport</MenuItem>
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
                    <FilterBtn type="submit" disabled={getDownloadFetching}>
                      {" "}
                      {getDownloadFetching ? (
                        <LoadingButton loading />
                      ) : (
                        "Filter"
                      )}
                    </FilterBtn>
                    {isCsvAvailable && (
                      <Box>
                        <CSVLink
                          data={csvData}
                          headers={csvHeader}
                          filename="banter_data"
                        >
                          <Button variant="contained">Download CSV</Button>
                        </CSVLink>
                      </Box>
                    )}
                  </Box>
                </form>
              </BanterFormBox>
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert onClose={handleCloseSnackbar} severity="info">
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </ManageUsersContainer>
    </>
  );
};
export default BanterContent;
