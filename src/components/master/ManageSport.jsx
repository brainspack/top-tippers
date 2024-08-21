import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  DropDownBox,
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  SearchContainer,
  SearchWrapper,
  // ManageUserTableWrapper,
  // Search,
  // SearchContainer,
  // SearchIconWrapper,
  // SearchWrapper,
  // StyledInputBase,
} from "../ManageUsers/ManangeUsersStyled";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import MUIDataTable from "mui-datatables";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import Switch from "@mui/material/Switch";
import { AddSportBtn } from "./masterStyled";
import AddIcon from "@mui/icons-material/Add";
import AddSportModal from "./AddSportModal";
import { useDispatch } from "react-redux";
import CustomModal from "../reuse/CustomModal";
import { handleNotification } from "../../slices/Snackbar";
import { useDeleteSportByNameMutation } from "../../api/DeleteSport";
import { updateModalVisibility } from "../../slices/userSlice/user";
import { useGetSetInviteAndCompButtonApiByNameMutation } from "../../api/setInviteAndCompButton";
const ManageSport = (props) => {
  const dispatch = useDispatch();
  const [listSport, setListSportData] = useState([]);
  const [checked, setChecked] = useState(false);

  const [modal, setModal] = useState(false);
  const [modalTitle, setModalContent] = useState("");
  const [action, setAction] = useState(() => () => {});

  // const handleChange = (event) => {
  //   const setInvite = tableMeta.rowData[6];
  //   setInviteAndComp({setInvite :})
  // };

  const openModal = (id, type) => {
    if (type === "delete") {
      setModalContent("Do you want to delete this record?");
      setAction(() => async () => {
        try {
          await SportDeleteApi({ sportId: id }).unwrap();
          dispatch(
            handleNotification({
              state: true,
              message: sportDeleteData?.message,
              severity: sportDeleteData?.code,
            })
          );
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

  const handleOpen = () => {
    console.log("sjfbsjdsjdbfdf");
    dispatch(updateModalVisibility(true));
  };
  const handleEditClick = (rowData) => {
    dispatch(updateModalVisibility(true));
  };

  const [userListSport, { data: listSportData }] =
    useGetUserListSportApiByNameMutation();

  const [userSetInvite, { data: setInviteButton }] =
    useGetSetInviteAndCompButtonApiByNameMutation();

  console.log(listSportData, "LISTSPORT");

  const [
    SportDeleteApi,
    {
      data: sportDeleteData,
      isLoading: sportDeleteLoading,
      error: sportDeleteError,
      isSuccess: sportDeleteSuccess,
    },
  ] = useDeleteSportByNameMutation();

  const TableSportData = async (data) => {
    try {
      const result = await userListSport({ body: data }).unwrap();
      console.log(result, "RESULT");

      setListSportData(result.data);
    } catch (err) {
      console.log(err, "the errr");
    }
    await listSportData;
  };
  const setInviteAndComp = async (id) => {
    try {
      await userSetInvite({ sportId: id }).unwrap();
      dispatch(
        handleNotification({
          state: true,
          message: userSetInvite?.message,
          severity: userSetInvite?.code,
        })
      );
      // const reqParams = {
      //   search_string: "",
      //   page: 0,
      //   sortValue: "",
      //   sortOrder: "",
      // };
      // TableSportData(reqParams);
    } catch (error) {
      dispatch(
        handleNotification({
          state: true,
          message: userSetInvite?.message,
          severity: userSetInvite?.code,
        })
      );
    }
  };

  console.log(setInviteButton, "LISTTTT");

  useEffect(() => {
    const reqParams = {
      search_string: "",
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    TableSportData(reqParams);
    // setInviteAndComp();
  }, [sportDeleteSuccess]);

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
                sx={{ cursor: "pointer" }}
                onClick={() => handleEditClick(rowData)}
              ></EditIcon>
              <DeleteIcon
                sx={{ cursor: "pointer" }}
                onClick={() => openModal(value, "delete")}
              />
              <SendIcon sx={{ cursor: "pointer" }} />
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
        customBodyRender: (value, tableMeta) => {
          const id = tableMeta.rowData[6];
          return (
            <Switch
              checked={value}
              // onChange={() => handleChange(tableMeta.rowData)}
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
    // customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
    //   return (
    //     <>
    //       <CustomPagination
    //         total={data?.totalCount}
    //         page={page}
    //         rowsPerPage={rowsPerPage}
    //         changeRowsPerPage={changeRowsPerPage}
    //         changePage={changePage}
    //         userList={userList}
    //         userData={userData}
    //         isLoading={isLoading}
    //       />
    //     </>
    //   );
    // },
  };

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>Sport</ManageUsersHeading>
            <AddSportModal />
          </Box>
          <SearchContainer>
            {/* <SearchWrapper> */}
            {/*
              <Box sx={{ width: "45%" }}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon sx={{ color: "primary.secondary" }} />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    color="rgb(13, 25, 51)"
                    onChange={onHandleSearch}
                  />
                </Search>
              </Box>
              <DropDownBox>
                <UserMenu />
              </DropDownBox>
              <CustomModal
              modal={modal}
              closeModal={closeModal}
              userid={view}
              userDeleteApi={userDeleteApi}
              userDeleteData={userDeleteData}
              userDeleteLoading={userDeleteLoading}
              permanentDelete={permanentDelete}
              />
              */}
            <ManageUserTableWrapper>
              <MUIDataTable
                data={listSportData?.data}
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
