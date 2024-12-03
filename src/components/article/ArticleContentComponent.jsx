import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
  Search,
} from "../ManageUsers/ManangeUsersStyled";
import { articleDataSelector } from "../../slices/Article/articleSelector";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetArticleGetAndSearchApiByNameQuery } from "../../api/GetAndSearchArticle";
import {
  updateArticleData,
  updateSelectedArticleType,
} from "../../slices/Article/article";
import MUIDataTable from "mui-datatables";
import { setCurrentModule } from "../../slices/manageTeam/manageTeam";
import { AddSportBtn } from "../master/masterStyled";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteArticleByNameMutation } from "../../api/DeleteArticle";
import { handleNotification } from "../../slices/Snackbar";
import CustomModal from "../reuse/CustomModal";
import { useForm } from "react-hook-form";
import { ARTICLE_OPTIONS, ARTICLE_TABLE_COLUMNS } from "./articleTableColumns";
import { RESET_ARTICLE_VALUE } from "../../utils/constant";
import CustomPagination from "../reuse/CustomPagination";
import ControlledSwitches from "../SwitchComponent";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ArticleContent = () => {
  const { reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { articleData } = useSelector(articleDataSelector);

  const [modalState, setModalState] = useState({
    isOpen: false,
    content: "",
    action: null,
  });
  console.log(modalState, "modalState");
  const openModal = (id, type) => {
    console.log(id, "HELLO");
    if (type === "delete") {
      setModalState({
        isOpen: true,
        content: "Do you want to delete this record?",
        action: async () => {
          try {
            const response = await articleDeleteApi({
              isDeleted: true,
              _id: id,
            }).unwrap();
            if (response?.code === 200) {
              dispatch(
                handleNotification({
                  state: true,
                  message: response.message,
                  severity: response.code,
                })
              );
              closeModal();
            }
          } catch (error) {}
        },
      });
    }
  };

  const closeModal = () =>
    setModalState((prev) => ({ ...prev, isOpen: false }));

  ////////

  const handleEditClick = (value, rowData) => {
    dispatch(updateSelectedArticleType("edit"));
    navigate(`/admin/editarticle/${value}`);
  };

  const handleAddClick = () => {
    reset(RESET_ARTICLE_VALUE);
    dispatch(updateSelectedArticleType("add"));
    navigate("/admin/addearticle");
  };
  const [
    articleDeleteApi,
    { data: articleDeleteData, isSuccess: articleDeleteSuccess },
  ] = useDeleteArticleByNameMutation();
  const [
    userListArticle,
    { data: listArticleData, isLoading: articleDataFetching },
  ] = useLazyGetArticleGetAndSearchApiByNameQuery();

  useEffect(() => {
    if (listArticleData && listArticleData?.data)
      dispatch(updateArticleData(listArticleData));
  }, [listArticleData]);

  const onHandleSearch = (e) => {
    const reqParams = {
      search: e.target.value,
    };
    userListArticle(reqParams);
  };
  useEffect(() => {
    const reqParams = {
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userListArticle(reqParams);
  }, [articleDeleteSuccess]);

  useEffect(() => {
    dispatch(setCurrentModule("Article"));
  }, []);

  const columns = [
    {
      name: "title",
      label: "Title",

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
      name: "isActive",
      label: "Status",
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
        customBodyRender: (value, rowData) => {
          console.log(rowData, "INSIDE VALUE");
          return (
            <>
              <ControlledSwitches
                value={value}
                rowData={rowData}
                statusChangeApi={articleDeleteApi}
                deactivateUserData={articleDeleteData}
              />
            </>
          );
        },
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
                onClick={() => handleEditClick(value, rowData)}
              ></EditIcon>
              <DeleteIcon
                sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                onClick={() => {
                  console.log("Opening modal for delete");
                  openModal(value, "delete");
                }}
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
            total={listArticleData?.data?.totalDocs}
            mode="articlePage"
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={userListArticle}
            // userData={articleData?.data?.docs}
            isLoading={articleDataFetching}
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
            <ManageUsersHeading>Article</ManageUsersHeading>
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
            <AddSportBtn disableRipple onClick={handleAddClick}>
              <AddIcon sx={{ mr: 1 }} />
              Add Article
            </AddSportBtn>
          </Box>

          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={articleData?.data?.docs}
                // columns={ARTICLE_TABLE_COLUMNS(
                //   handleEditClick,
                //   openModal,
                //   articleDeleteApi,
                //   articleDeleteData
                // )}
                // options={ARTICLE_OPTIONS(
                //   listArticleData,
                //   userListArticle,
                //   articleDataFetching
                // )}
                columns={columns}
                options={options}
              />
            </ManageUserTableWrapper>
            <CustomModal
              modal={modalState.isOpen}
              closeModal={closeModal}
              content={modalState.content}
              action={modalState.action}
              heading="Delete Article"
            />
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default ArticleContent;
