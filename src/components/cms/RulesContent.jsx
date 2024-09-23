import { Box } from "@mui/material";
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

import { useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { useGetAddUpdateContentApiByNameMutation } from "../../api/addUpdateContent";
import EditRulesModal from "./EditRulesModal";
import { RULES_OPTIONS, RULES_TABLE_COLUMNS } from "./tableColumns";

const RulesContent = () => {
  const dispatch = useDispatch();
  const { userListContentData } = useSelector(listContentDataSelector);
  console.log(userListContentData?.data, "useel");

  const [
    listContentApi,
    { data: listContentData, isLoading: userListContentDataFetching },
  ] = useGetUserListContentApiByNameMutation();
  const [
    AddUpdateContentRules,
    {
      data: AddContentRulesData,
      error: AddContentRulesError,
      isSuccess: AddContentRulesSuccess,
    },
  ] = useGetAddUpdateContentApiByNameMutation();

  useEffect(() => {
    if (listContentData && listContentData?.data)
      dispatch(updateUserListContentData(listContentData));
  }, [listContentData]);

  useEffect(() => {
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

    dispatch(getEditRulesData(payload));
    dispatch(updateModeForRulesEdit("edit"));
    dispatch(updateEditRulesModalVisible(true));
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
            />
          </Box>

          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={userListContentData?.data}
                columns={RULES_TABLE_COLUMNS(handleEditClick)}
                options={RULES_OPTIONS(
                  userListContentData,
                  listContentApi,
                  userListContentDataFetching
                )}
              />
            </ManageUserTableWrapper>
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default RulesContent;
