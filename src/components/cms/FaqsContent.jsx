import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  SearchContainer,
} from "../ManageUsers/ManangeUsersStyled";
import MUIDataTable from "mui-datatables";
import { faqsDataSelector } from "../../slices/FAQsSlice/faqsSelectore";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  getFaqsDataForEdit,
  updateAddFaqsModalVisibility,
  updatefaqsData,
  updateFaqsListTopicData,
  updateModeForEdit,
} from "../../slices/FAQsSlice/faqs";
import { useGetListQuestionApiByNameMutation } from "../../api/ListQuestion";
import { useDeleteQuestionApiByNameMutation } from "../../api/DeleteQuestion";
import { handleNotification } from "../../slices/Snackbar";
import CustomModal from "../reuse/CustomModal";
import AddFaqsModal from "./AddFaqsModal";
import { useGetAddUpdateQuestionApiByNameMutation } from "../../api/AddUpdateQuestion";
import CustomPagination from "../reuse/CustomPagination";
import { setCurrentModule } from "../../slices/manageTeam/manageTeam";
import { useGetListTopicApiByNameMutation } from "../../api/listTopic";
import { AddSportBtn } from "../master/masterStyled";
import AddIcon from "@mui/icons-material/Add";
import { useForm } from "react-hook-form";

const FaqsContent = () => {
  const { reset } = useForm();
  const dispatch = useDispatch();
  const { faqsData } = useSelector(faqsDataSelector);
  const { faqsListTopicData } = useSelector(faqsDataSelector);
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalContent] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [action, setAction] = useState(() => () => {});

  console.log(faqsListTopicData, "asas");

  const openModal = (id, type) => {
    if (type === "delete") {
      setModalContent("Do you want to delete this record?");
      setAction(() => async () => {
        try {
          const response = await faqsDeleteApi({ questionId: id }).unwrap();
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
              message: faqsDeleteData?.message,
              severity: faqsDeleteData?.code,
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
    userListFaqs,
    {
      data: listFaqsData,
      isSuccess: userfaqsSuccess,
      isLoading: faqsDataFetching,
    },
  ] = useGetListQuestionApiByNameMutation();

  const [
    faqsDeleteApi,
    {
      data: faqsDeleteData,
      isLoading: faqsDeleteLoading,
      error: faqsDeleteError,
      isSuccess: faqsDeleteSuccess,
    },
  ] = useDeleteQuestionApiByNameMutation();

  const [
    faqsListTopicApi,
    {
      data: ListTopicData,
      isLoading: ListTopicLoading,
      error: ListTopicError,
      isSuccess: ListTopicSuccess,
    },
  ] = useGetListTopicApiByNameMutation();

  const [
    AddUpdateQuestionFaqs,
    { data: AddFaqsData, isSuccess: AddFaqsSuccess },
  ] = useGetAddUpdateQuestionApiByNameMutation();

  useEffect(() => {
    const reqParams = {
      search_string: "",
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userListFaqs(reqParams);
  }, []);

  useEffect(() => {
    if (listFaqsData?.data?.length) dispatch(updatefaqsData(listFaqsData));
  }, [listFaqsData]);

  useEffect(() => {
    if (ListTopicData?.data?.length)
      dispatch(updateFaqsListTopicData(ListTopicData));
  }, [ListTopicData]);

  useEffect(() => {
    if (faqsDeleteSuccess) {
      const reqParams = {
        search_string: "",
        page: 0,
        sortValue: "",
        sortOrder: "",
      };
      userListFaqs(reqParams);
    }
  }, [faqsDeleteSuccess]);

  useEffect(() => {
    if (AddFaqsSuccess) {
      const reqParams = {
        search_string: "",
        page: 0,
        sortValue: "",
        sortOrder: "",
      };
      userListFaqs(reqParams);
    }
  }, [AddFaqsSuccess]);

  useEffect(() => {
    // console.log("hsjahj");

    const reqParams = {
      search_string: "",
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    faqsListTopicApi(reqParams);
  }, []);

  const columns = [
    {
      name: "question",
      label: "FAQs",

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
      name: "answer",
      label: "Answer",
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
              <DeleteIcon
                sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                onClick={() => openModal(value, "delete")}
              />
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
            total={faqsData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={userListFaqs}
            userData={faqsData?.data}
            isLoading={faqsDataFetching}
          />
        </>
      );
    },
  };

  useEffect(() => {
    dispatch(setCurrentModule("Faqs"));
  }, []);

  /////////////////////// INNOVATION
  const { isAddFaqsModalVisible, setEditFaqsData, setModeForFaqsEdit } =
    useSelector(faqsDataSelector);

  const questionIdFaqs = faqsListTopicData?.data?.filter((e) => {
    if (e.topicname === "FAQs") {
      return e._id;
    }
  });

  const handleFaqsClose = () => {
    dispatch(getFaqsDataForEdit(""));
    dispatch(updateAddFaqsModalVisibility(false));
  };
  const onSubmit = async (data) => {
    try {
      const result = await AddUpdateQuestionFaqs({
        ...data,
        questionId: setEditFaqsData?.length ? setEditFaqsData[0]?.id : "",
        topicId: questionIdFaqs[0]._id,
      }).unwrap();
      if (result?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
        dispatch(updateModeForEdit("addFaqs"));
        reset({
          question: "",
          answer: "",
        });
        handleFaqsClose();
      } else {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
      }

      reset();
    } catch (err) {
      dispatch(
        handleNotification({
          state: true,
          message: AddFaqsData?.message,
          severity: AddFaqsData?.code,
        })
      );
    }
  };

  const handleEditClick = (rowData) => {
    const payload = [
      {
        question: rowData?.rowData[0],

        answer: rowData?.rowData[1],
        id: rowData?.rowData[2],
      },
    ];
    dispatch(getFaqsDataForEdit(payload));
    dispatch(updateModeForEdit("edit"));
    dispatch(updateAddFaqsModalVisibility(true));
  };

  const formatInput = (value) => {
    if (!value) return value;
    return value.replace(/^\s+/, "").replace(/\s+/g, " ").trim();
  };
  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>FAQs</ManageUsersHeading>
            <AddFaqsModal
              AddUpdateQuestionFaqs={AddUpdateQuestionFaqs}
              AddFaqsData={AddFaqsData}
              faqsListTopicData={faqsListTopicData}
              CustomBtnOne={"Back"}
              CustomBtnTwo={"Sumbit"}
              heading={"FAQs"}
              labelOneTitle={"FAQs:"}
              labelTwoTitle={"Answer:"}
              placeHolderOne={"FAQs"}
              placeHolderTwo={"Answer"}
              onSubmit={onSubmit}
              formatInput={formatInput}
              handleFaqsClose={handleFaqsClose}
              requiredTitleOne={"Please enter Question"}
              requiredTitleTwo={"Please enter Answer"}
              RequiredFirst={"Question"}
              RequiredSecond={"Answer"}
              registerFirst={"question"}
              registerSecond={"answer"}
              buttonTitle={"Add FAQs"}
              modeName={"addfaqs"}
            />
          </Box>

          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={faqsData?.data}
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
            {/* <AddFaqsModal
              AddUpdateQuestionFaqs={AddUpdateQuestionFaqs}
              AddFaqsData={AddFaqsData}
              faqsListTopicData={faqsListTopicData}
              CustomBtnOne={"Back"}
              CustomBtnTwo={"Sumbit"}
              heading={"FAQs"}
              labelOneTitle={"FAQs:"}
              labelTwoTitle={"Answer:"}
              placeHolderOne={"FAQs"}
              placeHolderTwo={"Answer"}
              onSubmit={onSubmit}
              formatInput={formatInput}
              handleFaqsClose={handleFaqsClose}
              requiredTitleOne={"Please enter Question"}
              requiredTitleTwo={"Please enter Answer"}
              RequiredFirst={"Question"}
              RequiredSecond={"Answer"}
              registerFirst={"question"}
              registerSecond={"answer"}
            /> */}
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default FaqsContent;
