import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  SearchContainer,
} from "../ManageUsers/ManangeUsersStyled";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import MUIDataTable from "mui-datatables";

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
import CustomPagination from "../reuse/CustomPagination";
import { useGetSendSportNotificaticationApiByNameMutation } from "../../api/SendSportNotificatication";
import { setCurrentModule } from "../../slices/manageTeam/manageTeam";
import moment from "moment";
import { SPORT_OPTIONS, SPORT_TABLE_COLUMNS } from "./masterTableColumns";

const ManageSport = (props) => {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [modalTitle, setModalContent] = useState("");
  const [action, setAction] = useState(() => () => {});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserName, setSelectedUserName] = useState(null);
  const { sportData } = useSelector(manageSportDataSelector);
  console.log(sportData, "dataa");

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

  const [userListSport, { data: listSportData, isLoading: sportDataFetching }] =
    useGetUserListSportApiByNameMutation();

  const [
    sendSportNotify,
    { data: sendSportData, isSuccess: sendSportSuccess },
  ] = useGetSendSportNotificaticationApiByNameMutation();

  const [
    userSetInvite,
    { data: setInviteButtonData, isSuccess: setInviteSuccess },
  ] = useGetSetInviteAndCompButtonApiByNameMutation();

  console.log(setInviteButtonData, "ASD");
  const [
    SportDeleteApi,
    { data: sportDeleteData, isSuccess: sportDeleteSuccess },
  ] = useDeleteSportByNameMutation();

  const handleEditClick = (rowData) => {
    console.log(sportData, "data");

    const stackValue = sportData?.data?.filter((e) => {
      if (e._id === rowData?.rowData[6]) {
        return e;
      }
    });
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

    console.log(payload, "payy");

    dispatch(getUserDataForEdit(payload));
    dispatch(knowWhereHaveToOpenModal("edit"));
    dispatch(updateModalVisibility(true));
  };
  const handleSendOpen = (rowData) => {
    const sendSportDataId = rowData?.rowData[6];
    const sportName = rowData?.rowData[0];
    setSelectedUserId(sendSportDataId);
    setSelectedUserName(sportName);
    dispatch(updateSendModalVisibility(true));
  };

  useEffect(() => {
    if (listSportData && listSportData?.data)
      dispatch(updateSportData(listSportData));
  }, [listSportData]);

  useEffect(() => {
    const reqParams = {
      // search_string: "",
      page: 1,
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
                columns={SPORT_TABLE_COLUMNS(
                  handleEditClick,
                  openModal,
                  handleSendOpen,
                  userSetInvite,
                  setInviteButtonData
                )}
                options={SPORT_OPTIONS(
                  sportData,
                  userListSport,
                  sportDataFetching
                )}
              />
            </ManageUserTableWrapper>
            <CustomModal
              modal={modal}
              closeModal={closeModal}
              content={modalTitle}
              action={action}
              heading={"Delete Sport"}
            />
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};

export default ManageSport;
