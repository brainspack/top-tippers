import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  Search,
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
} from "../ManageUsers/ManangeUsersStyled";
import MUIDataTable from "mui-datatables";
import { adDataSelector } from "../../slices/AdSlice/AdSelector";
import { updateAdReportData } from "../../slices/AdSlice/Ad";
import CustomPagination from "../reuse/CustomPagination";
import { setCurrentModule } from "../../slices/manageTeam/manageTeam";
import SearchIcon from "@mui/icons-material/Search";
import { AddSportBtn } from "../master/masterStyled";
import SendIcon from "@mui/icons-material/Send";
import moment from "moment/moment";
import { userDataSelector } from "../../slices/userSlice/userSelector";
import { useGetUserListByNameMutation } from "../../api/UserList";
import {
  updateModalVisibility,
  updateUserData,
} from "../../slices/userSlice/user";
import { useListAllUserApiByNameMutation } from "../../api/ListAllUser";

import AddFaqsModal from "../cms/AddFaqsModal";
import {
  getFaqsDataForEdit,
  updateAddFaqsModalVisibility,
  updateModeForEdit,
} from "../../slices/FAQsSlice/faqs";
import { useSendMessageByNameMutation } from "../../api/SendMessage";
import { messagingSelector } from "../../slices/messaging/messagingSelector";
import {
  updateCurrentRowId,
  updateMultipleRowId,
  updateUserAllData,
} from "../../slices/messaging/messaging";
import { handleNotification } from "../../slices/Snackbar";
import { useForm } from "react-hook-form";
import { faqsDataSelector } from "../../slices/FAQsSlice/faqsSelectore";
import { MESSAGE_OPTIONS, MESSAGE_TABLE_COLUMNS } from "./messageTableColumns";

const MessagingContent = () => {
  const dispatch = useDispatch();
  const { reset } = useForm();

  const { userAllData, currentRowId, multipleRowId } =
    useSelector(messagingSelector);
  const { setModeForFaqsEdit } = useSelector(faqsDataSelector);
  const [
    listAllUserApi,
    { data, isLoading, error, isSuccess: userListSuccess },
  ] = useListAllUserApiByNameMutation();
  const [
    sendMessageApi,
    { data: sendMessageData, isSuccess: sendMessageSuccess },
  ] = useSendMessageByNameMutation();

  useEffect(() => {
    const reqParams = {
      page: 0,
      search_string: "",
      sortOrder: "",
      sortValue: "",
    };
    listAllUserApi(reqParams);
  }, [sendMessageSuccess]);
  const onHandleSearch = (e) => {
    const reqParams = {
      page: 0,
      search_string: e.target.value,
      sortOrder: "",
      sortValue: "",
    };
    listAllUserApi(reqParams);
  };

  useEffect(() => {
    if (data && data?.data) {
      dispatch(updateUserAllData(data));
    }
  }, [data]);

  useEffect(() => {
    dispatch(setCurrentModule("messaging"));
  }, []);

  /////////////////////innovation
  const onHandleMessageOpen = (value) => {
    dispatch(updateModeForEdit("messagingOpen"));
    dispatch(updateCurrentRowId(value));
    dispatch(updateAddFaqsModalVisibility(true));
  };
  const handleOpen = () => {
    // reset({
    //   question: "",
    //   answer: "",
    // });
    dispatch(updateModeForEdit("addFaqs"));

    dispatch(updateAddFaqsModalVisibility(true));
  };
  const formatInput = (value) => {
    if (!value) return value;
    return value.replace(/^\s+/, "").replace(/\s+/g, " ").trim();
  };
  const handleFaqsClose = () => {
    dispatch(getFaqsDataForEdit(""));
    dispatch(updateAddFaqsModalVisibility(false));
  };
  const onSubmit = async (data) => {
    console.log(data, "INSIDE MESSAGING DATA");
    try {
      const response = await sendMessageApi({
        messageDescription: data?.messageDescription,
        messageTitle: data?.messageTitle,
        users:
          setModeForFaqsEdit === "messagingOpen"
            ? [currentRowId]
            : multipleRowId,
      }).unwrap();
      if (response?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: response?.message,
            severity: response?.code,
          })
        );
        dispatch(updateAddFaqsModalVisibility(false));
        reset();
      }
    } catch (error) {}
  };
  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>Messaging</ManageUsersHeading>
            <Box sx={{ width: "45%" }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "primary.secondary" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={onHandleSearch}
                />
              </Search>
            </Box>

            <AddFaqsModal
              CustomBtnOne={"Cancel"}
              CustomBtnTwo={"Send Message"}
              heading={"Send Message"}
              labelOneTitle={"Message Title:"}
              labelTwoTitle={"Message Description:"}
              placeHolderOne={"Title"}
              placeHolderTwo={"Description"}
              formatInput={formatInput}
              handleFaqsClose={handleFaqsClose}
              RequiredFirst={"Title"}
              RequiredSecond={"Description"}
              registerFirst={"messageDescription"}
              registerSecond={"messageTitle"}
              buttonTitle={"Send Message"}
              onSubmit={onSubmit}
              modeName={"multipleIdAdd"}
              mode={"messaging"}
            />
          </Box>

          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={userAllData?.data}
                columns={MESSAGE_TABLE_COLUMNS(onHandleMessageOpen)}
                options={MESSAGE_OPTIONS(
                  userAllData,
                  listAllUserApi,
                  isLoading
                )}
              />
            </ManageUserTableWrapper>
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default MessagingContent;
