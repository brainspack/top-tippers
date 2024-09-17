import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, FormControl, MenuItem, Select } from "@mui/material";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  SearchContainer,
} from "../ManageUsers/ManangeUsersStyled";
import MUIDataTable from "mui-datatables";
import CustomPagination from "../reuse/CustomPagination";
import { setCurrentModule } from "../../slices/manageTeam/manageTeam";
import { useListAllUserApiByNameMutation } from "../../api/ListAllUser";
import {
  getFaqsDataForEdit,
  updateAddFaqsModalVisibility,
  updateModeForEdit,
} from "../../slices/FAQsSlice/faqs";
import { useSendMessageByNameMutation } from "../../api/SendMessage";
import { messagingSelector } from "../../slices/messaging/messagingSelector";
import {
  updateCurrentRowId,
  updateUserAllData,
} from "../../slices/messaging/messaging";
import { handleNotification } from "../../slices/Snackbar";
import { faqsDataSelector } from "../../slices/FAQsSlice/faqsSelectore";
import CustomAddSportLabel from "../reuse/CustomAddSportLabel";
import { Controller, useForm } from "react-hook-form";
import { updateAllTeamData } from "../../slices/manageGame/manageGame";
import { updateRoundList } from "../../slices/manageRound/manageRound";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import { useTeamListByNameMutation } from "../../api/GetTeamList";
import { useListRoundsByNameMutation } from "../../api/ListRounds";
import { manageSportDataSelector } from "../../slices/manageSport/manageSportSelector";
import { updateSportData } from "../../slices/manageSport/manageSport";
import { manageGameSelector } from "../../slices/manageGame/manageGameSelector";

const SecretCompetitionContent = () => {
  const { register, control, watch, setValue } = useForm();
  const selectedSportId = watch("sportId");
  console.log(selectedSportId, "selectedSportId");
  const dispatch = useDispatch();
  const { sportData } = useSelector(manageSportDataSelector);
  const { allTeamData } = useSelector(manageGameSelector);
  console.log(allTeamData, "allTeamData");

  const { userAllData, currentRowId, multipleRowId } =
    useSelector(messagingSelector);
  const { setModeForFaqsEdit } = useSelector(faqsDataSelector);
  const [listAllUserApi, { data, isLoading, error }] =
    useListAllUserApiByNameMutation();

  /// LIST SPORT API
  const [
    listSportApi,
    { data: listSportData, error: listSportError, success: listSportSuccess },
  ] = useGetUserListSportApiByNameMutation();

  useEffect(() => {
    const fetchSport = async () => {
      try {
        const response = await listSportApi({
          count: 1000,
          isActive: true,
        }).unwrap();
        dispatch(updateSportData(response));
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };

    fetchSport();
  }, []);

  /// TEAM LIST
  const [
    teamListApi,
    {
      data: teamListData,
      isLoading: teamDataFetching,
      isSuccess: userListSuccess,
    },
  ] = useTeamListByNameMutation();

  useEffect(() => {
    const fetchTeamList = async () => {
      try {
        const response = await teamListApi({
          count: 1000,
          // sport: "65b37051366cff4fdb795ff9",
          sport: selectedSportId,
        }).unwrap();
        dispatch(updateAllTeamData(response));
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };
    fetchTeamList();
  }, []);

  const [selectTeam, setSelectTeam] = useState([]);
  console.log(selectTeam, "selectTeam");
  useEffect(() => {
    if (selectedSportId) {
      const filteredTeams = allTeamData?.data.filter(
        (team) => team?.sport?._id === selectedSportId
      );
      setSelectTeam(filteredTeams);
    }
  }, [selectedSportId, allTeamData, setValue]);

  /// ROUND LIST

  const [
    listRoundsApi,
    {
      data: listRoundsData,
      isLoading: listRoundsLoading,
      error: listRoundsError,
      isSuccess: listRoundsSuccess,
    },
  ] = useListRoundsByNameMutation();

  useEffect(() => {
    const fetchRound = async () => {
      try {
        const response = await listRoundsApi({
          count: 50,
          sortOrder: 1,
          sortValue: "createdAt",
          // sportId: "65b37051366cff4fdb795ff9",
          sportId: selectedSportId,
        }).unwrap();
        // dispatch(updateRoundList(response));
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };

    fetchRound();
  }, []);

  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "_id",
      label: "Actions",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "black",
          },
        }),
        customBodyRender: (value, rowData) => {
          return (
            <>
              <Box display="flex" gap="10px"></Box>
            </>
          );
        },
      },
    },
  ];

  const options = {
    filter: false,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
    pagination: true,
    rowsPerPage: 10,
    selectableRows: false,
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      return (
        <>
          <CustomPagination
            total={userAllData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={listAllUserApi}
            userAllData={userAllData?.data}
            isLoading={isLoading}
          />
        </>
      );
    },
  };

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>SecretComp</ManageUsersHeading>
          </Box>

          <SearchContainer>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Box
                style={{
                  height: "auto",
                  width: "22%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <CustomAddSportLabel inputLabel="Sports" />
                <FormControl sx={{ m: 1 }} fullWidth {...register("sportId")}>
                  <Controller
                    name="sportId"
                    control={control}
                    defaultValue={sportData?.data?.[0]?._id}
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{
                          fontSize: "14px",
                          height: "40px",
                        }}
                        {...register("sportId")}
                      >
                        {sportData?.data?.map((sport) => (
                          <MenuItem
                            key={sport?._id}
                            value={sport?._id}
                            {...register("sportId")}
                          >
                            {sport?.sportname}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>
              <Box
                style={{
                  height: "auto",
                  width: "22%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <CustomAddSportLabel inputLabel="Round" />
                <FormControl sx={{ m: 1 }} fullWidth {...register("sportId")}>
                  <Controller
                    name="sportId"
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
                          height: "40px",
                        }}
                        {...register("sportId")}
                      >
                        {data?.data?.map((sport) => (
                          <MenuItem
                            key={sport?._id}
                            value={sport?._id}
                            {...register("sportId")}
                          >
                            {sport?.sportname}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>
              <Box
                style={{
                  height: "auto",
                  width: "22%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <CustomAddSportLabel inputLabel="Team" />
                <FormControl sx={{ m: 1 }} fullWidth {...register("teamId")}>
                  <Controller
                    name="teamId"
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
                          height: "40px",
                        }}
                        {...register("teamId")}
                      >
                        {selectTeam.length > 0 ? (
                          selectTeam.map((team) => (
                            <MenuItem
                              key={team?._id}
                              value={team?._id}
                              {...register("teamId")}
                            >
                              {team?.teamname}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No home team available</MenuItem>
                        )}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>
              <Box
                style={{
                  height: "auto",
                  width: "22%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <FormControl sx={{ m: 1 }} fullWidth {...register("sportId")}>
                  <Controller
                    name="sportId"
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
                          height: "40px",
                        }}
                        {...register("sportId")}
                      >
                        {data?.data?.map((sport) => (
                          <MenuItem
                            key={sport?._id}
                            value={sport?._id}
                            {...register("sportId")}
                          >
                            {sport?.sportname}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>
            </Box>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={userAllData?.data}
                columns={columns}
                options={options}
              />
            </ManageUserTableWrapper>
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default SecretCompetitionContent;
