import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  SearchContainer,
} from "../ManageUsers/ManangeUsersStyled";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import MUIDataTable from "mui-datatables";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import AddSportModal from "./AddSportModal";
import { useDispatch, useSelector } from "react-redux";
import CustomModal from "../reuse/CustomModal";
import { handleNotification } from "../../slices/Snackbar";
import { useDeleteSportByNameMutation } from "../../api/DeleteSport";
import {
  updateModalVisibility,
  getUserDataForEdit,
  knowWhereHaveToOpenModal,
  updateSendModalVisibility,
} from "../../slices/userSlice/user";
import { useGetSetInviteAndCompButtonApiByNameMutation } from "../../api/setInviteAndCompButton";
import { updateSportData } from "../../slices/manageSport/manageSport";
import { manageSportDataSelector } from "../../slices/manageSport/manageSportSelector";
import { useGetAddUpdateSportApiByNameMutation } from "../../api/AddUpdateSport";
import SendSportModal from "./SendSportModal";
import SportControlledSwitches from "./SportSwitchComponent";
import CustomPagination from "../reuse/CustomPagination";
import { useGetSendSportNotificaticationApiByNameMutation } from "../../api/SendSportNotificatication";
import { setCurrentModule } from "../../slices/manageTeam/manageTeam";
import moment from "moment";
const ManageSport = (props) => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [modalTitle, setModalContent] = useState("");
  const [action, setAction] = useState(() => () => {});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const { sportData } = useSelector(manageSportDataSelector);

  const openModal = (id, type) => {
    if (type === "delete") {
      setModalContent("Do you want to delete this record?");
      setAction(() => async () => {
        try {
          const response = await SportDeleteApi({ sportId: id }).unwrap();
          if (response?.code === 200) {
            dispatch(
              handleNotification({
                state: true,
                message: response?.message,
                severity: response?.code,
              })
            );
          } else {
            dispatch(
              handleNotification({
                state: true,
                message: response?.message,
                severity: response?.code,
              })
            );
          }
        } catch (error) {
          dispatch(
            handleNotification({
              state: true,
              message: sportDeleteData?.message,
              severity: sportDeleteData?.code,
            })
          );
        }
      });
    }

    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const [
    addUpdateSport,
    { data: addUpdateSportData, isSuccess: updataSportSuccess },
  ] = useGetAddUpdateSportApiByNameMutation();

  const [
    userListSport,
    {
      data: listSportData,
      isSuccess: userSportSuccess,
      isLoading: sportDataFetching,
    },
  ] = useGetUserListSportApiByNameMutation();

  const [
    sendSportNotify,
    { data: sendSportData, isSuccess: sendSportSuccess },
  ] = useGetSendSportNotificaticationApiByNameMutation();

  const [
    userSetInvite,
    { data: setInviteButtonData, isSuccess: setInviteSuccess },
  ] = useGetSetInviteAndCompButtonApiByNameMutation();

  const [
    SportDeleteApi,
    {
      data: sportDeleteData,
      isLoading: sportDeleteLoading,
      error: sportDeleteError,
      isSuccess: sportDeleteSuccess,
    },
  ] = useDeleteSportByNameMutation();

  const handleEditClick = (rowData) => {
    const stackValue = sportData?.data?.filter((e) => {
      if (e._id === rowData?.rowData[6]) {
        return e;
      }
    });
    console.log(stackValue[0]?.stack, "thisIsStack");
    const formattedStartDate = moment(rowData?.rowData[1]).format("L");

    const formattedEndDate = moment(rowData?.rowData[2]).format("L");
    const payload = [
      {
        sportname: rowData?.rowData[0],
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        type: rowData?.rowData[3],
        description: rowData?.rowData[4],
        bonus: rowData?.rowData[5],
        id: rowData?.rowData[6],
        stack: stackValue?.length ? stackValue[0].stack : "",
      },
    ];
    console.log(payload, "payyload");

    dispatch(getUserDataForEdit(payload));
    dispatch(knowWhereHaveToOpenModal("edit"));
    dispatch(updateModalVisibility(true));
  };
  const handleSendOpen = (rowData) => {
    const sendSportDataId = rowData?.rowData[6];
    const sportName = rowData?.rowData[0];
    console.log(sportName, "jskajks");
    setSelectedUserId(sendSportDataId);
    setSelectedUserName(sportName);
    dispatch(updateSendModalVisibility(true));
  };

  useEffect(() => {
    if (listSportData && listSportData?.data)
      dispatch(updateSportData(listSportData));
  }, [listSportData, userSportSuccess]);

  useEffect(() => {
    const reqParams = {
      search_string: "",
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userListSport(reqParams);
  }, [
    sportDeleteSuccess,
    updataSportSuccess,
    setInviteSuccess,
    sendSportSuccess,
  ]);

  const columns = [
    {
      name: "sportname",
      label: "Sport Name",

      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "startDate",
      label: "Start Date",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "endDate",
      label: "End Date",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "bonus",
      label: "Status",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
        customBodyRender: (value) => (
          <Typography>{value ? "Open" : "Close"}</Typography>
        ),
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
        customBodyRender: (value, rowData) => (
          <>
            <Box display="flex" gap="10px">
              <EditIcon
                sx={{ cursor: "pointer", color: "#000000de" }}
                onClick={() => handleEditClick(rowData)}
              ></EditIcon>
              <DeleteIcon
                sx={{ cursor: "pointer", color: "#000000de" }}
                onClick={() => openModal(value, "delete")}
              />
              <SendIcon
                sx={{ cursor: "pointer", color: "#000000de" }}
                onClick={() => handleSendOpen(rowData)}
              />
            </Box>
          </>
        ),
      },
    },

    {
      name: "isInviteCompButton",
      label: "Invite&Comp Button",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "black",
            display: "flex",
            justifyContent: "center",
          },
        }),
        customBodyRender: (value, rowData) => {
          return (
            <SportControlledSwitches
              value={value}
              rowData={rowData}
              statusChangeApi={userSetInvite}
              deactivateUserData={setInviteButtonData}
            />
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
    selectableRows: false,
    pagination: true,
    rowsPerPage: 10,
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      return (
        <>
          <CustomPagination
            total={sportData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={userListSport}
            userData={sportData?.data}
            isLoading={sportDataFetching}
          />
        </>
      );
    },
  };

  useEffect(() => {
    dispatch(setCurrentModule("sport"));
  }, []);

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>Sport</ManageUsersHeading>
            <AddSportModal
              // sportData={selectedSport}
              apiFunction={addUpdateSport}
              dataSupport={addUpdateSportData}
              success={updataSportSuccess}
            />
          </Box>
          <SendSportModal
            sportDataName={selectedUserName}
            sportDataId={selectedUserId}
            sendSportNotify={sendSportNotify}
          />
          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={sportData?.data}
                columns={columns}
                options={options}
              />
            </ManageUserTableWrapper>
            <CustomModal
              modal={modal}
              closeModal={closeModal}
              content={modalTitle}
              action={action}
            />
            {/* </SearchWrapper> */}
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};

export default ManageSport;
