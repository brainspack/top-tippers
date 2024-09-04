import { Typography, Box } from "@mui/material";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  SearchContainer,
} from "../ManageUsers/ManangeUsersStyled";
import { useDispatch, useSelector } from "react-redux";
import { listContentDataSelector } from "../../slices/ListContentSlice/listContentSelector";
import { useGetUserListContentApiByNameMutation } from "../../api/listContent";
import {
  getEditRulesData,
  updateEditRulesModalVisible,
  updateModeForRulesEdit,
  updateUserListContentData,
} from "../../slices/ListContentSlice/listContent";
import EditIcon from "@mui/icons-material/Edit";

import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import CustomPagination from "../reuse/CustomPagination";
import { useGetAddUpdateContentApiByNameMutation } from "../../api/addUpdateContent";
import EditRulesModal from "./EditRulesModal";
import { updateModeForEdit } from "../../slices/FAQsSlice/faqs";

const RulesContent = () => {
  const dispatch = useDispatch();
  const { userListContentData } = useSelector(listContentDataSelector);
  console.log(userListContentData?.data, "useel");

  const [
    listContentApi,
    {
      data: listContentData,
      isLoading: userListContentDataFetching,
      error: listContentError,
      isSuccess: listContentSuccess,
    },
  ] = useGetUserListContentApiByNameMutation();
  const [
    AddUpdateContentRules,
    {
      data: AddContentRulesData,
      isLoading: AddContentRulesDataFetching,
      error: AddContentRulesError,
      isSuccess: AddContentRulesSuccess,
    },
  ] = useGetAddUpdateContentApiByNameMutation();

  useEffect(() => {
    if (listContentData && listContentData?.data)
      dispatch(updateUserListContentData(listContentData));
  }, [listContentData]);

  console.log(
    AddContentRulesSuccess,
    AddContentRulesData,
    AddContentRulesError,
    "IMP"
  );
  useEffect(() => {
    console.log("assiff");

    if (AddContentRulesSuccess) {
      const reqParams = {
        search_string: "",
        page: 0,
        sortValue: "",
        sortOrder: "",
      };
      listContentApi(reqParams);
    }
  }, [AddContentRulesSuccess]);

  useEffect(() => {
    const reqParams = {
      search_string: "",
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    listContentApi(reqParams);
  }, []);

  const handleEditClick = (rowData) => {
    const payload = [
      {
        title: rowData?.rowData[0],

        content: rowData?.rowData[1],
        id: rowData?.rowData[2],
      },
    ];
    console.log(payload, "payy");

    dispatch(getEditRulesData(payload));
    dispatch(updateModeForRulesEdit("edit"));
    dispatch(updateEditRulesModalVisible(true));
  };

  const columns = [
    {
      name: "title",
      label: "Titles",

      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "content",
      label: "Rules",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
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
            color: "white",
            fontWeight: "600",
          },
        }),
        customBodyRender: (value, rowData) => (
          <>
            <Box display="flex" gap="10px">
              <EditIcon
                sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                onClick={() => handleEditClick(rowData)}
              ></EditIcon>
              {/* <DeleteIcon
                sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                onClick={() => openModal(value, "delete")}
              /> */}
            </Box>
          </>
        ),
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
    rowsPerPage: 5,
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      return (
        <>
          <CustomPagination
            total={userListContentData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={listContentApi}
            userData={userListContentData?.data}
            isLoading={userListContentDataFetching}
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
            <ManageUsersHeading>Rules</ManageUsersHeading>
            <EditRulesModal
              AddUpdateContentRules={AddUpdateContentRules}
              AddContentRulesData={AddContentRulesData}
              // faqsListTopicData={faqsListTopicData}
            />
          </Box>

          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={userListContentData?.data}
                columns={columns}
                options={options}
              />
            </ManageUserTableWrapper>
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
export default RulesContent;
