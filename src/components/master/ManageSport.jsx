import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
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
import SendIcon from '@mui/icons-material/Send';
const ManageSport = (props) => {

  const [userListSport, { data: listSportData }] =
  useGetUserListSportApiByNameMutation();

  console.log(listSportData,"LISTSPORT");
  

  
  const TableSportData = async (data) => {

    try {
      const result = await userListSport({ body: data }).unwrap();
      console.log(result, "RESULT");
      
      
    } catch (err) {
      console.log(err, "the errr");
    }
    await listSportData;
  };
  
  console.log(listSportData,"LISTTTT");

  useEffect(() => {
    const reqParams = {
      search_string: "",
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    TableSportData(reqParams);
  }, []);

  const columns = [
    {
      name: "sportname",
      label: "Sport Name",
      
      options: {
        
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          
          style: { backgroundColor: "#e5a842", color: "black"},
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
      name: "status",
      label: "Status",
      options: {
        filter: true,
        sort: true,
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
        customBodyRender: (value, rowData) => (
          <>
            <Box display="flex" gap="10px">
              <VisibilityIcon
                // onClick={() => navigate(`/admin/userprofile/${value}`)}
              ></VisibilityIcon>
              <DeleteIcon 
              // onClick={() => openModal(value)}
               />
               <SendIcon />
            </Box>
          </>
        ),
      },
    },
    {
      name: "invite&Comp Button",
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
            <>
              {/* <ControlledSwitches
                value={value}
                rowData={rowData}
                statusChangeApi={deactivateUser}
                deactivateUserData={deactivateUserData}
                userList={userList}
              /> */}
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
          <Box>
            <ManageUsersHeading>Sport</ManageUsersHeading>
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
              {/* </SearchWrapper> */}
            </SearchContainer> 
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};

export default ManageSport;

