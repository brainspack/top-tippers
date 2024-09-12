import { Typography, Box, Button } from "@mui/material";
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
import {
  articleDataSelector,
  articleSelector,
} from "../../slices/Article/articleSelector";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetArticleGetAndSearchApiByNameQuery } from "../../api/GetAndSearchArticle";
import { useEffect, useState } from "react";
import {
  updateArticleData,
  updateFilteredArticleData,
  updateSelectedArticleType,
} from "../../slices/Article/article";
import MUIDataTable from "mui-datatables";
import CustomPagination from "../reuse/CustomPagination";
import { setCurrentModule } from "../../slices/manageTeam/manageTeam";
import { AddSportBtn } from "../master/masterStyled";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useParams } from "react-router-dom";
import ControlledSwitches from "../SwitchComponent";
import { useDeleteArticleByNameMutation } from "../../api/DeleteArticle";
import { handleNotification } from "../../slices/Snackbar";
import CustomModal from "../reuse/CustomModal";
import { useForm } from "react-hook-form";

const ArticleContent = () => {
  const { reset } = useForm();
  const { filteredArticleData, selectArticleType } =
    useSelector(articleDataSelector);
  console.log(filteredArticleData, "filteredArticleData");
  console.log(selectArticleType, "selectArticleType");
  const navigate = useNavigate();
  const { articleid } = useParams();
  const dispatch = useDispatch();
  const { articleData } = useSelector(articleDataSelector);
  console.log(articleData, "articleData");
  const [searchString, setSearchString] = useState("");

  const [modal, setModal] = useState(false);
  const [modalTitle, setModalContent] = useState("");
  const [action, setAction] = useState(() => () => {});
  const openModal = (id, type) => {
    if (type === "delete") {
      setModalContent("Do you want to delete this record?");
      setAction(() => async () => {
        try {
          const response = await articleDeleteApi({
            isDeleted: true,
            _id: id,
          }).unwrap();

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
        } catch (error) {}
      });
    }

    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const handleEditClick = (value, rowData) => {
    dispatch(updateSelectedArticleType("edit"));
    navigate(`/admin/editarticle/${value}`);
  };

  const handleAddClick = () => {
    reset({
      title: "",
      addedby: "",
      url: "",
      articleType: "",
      sportId: "",
      sportIdd: "",
      gameId: "",
      articleType: "",
      teamId: "",
      text: "",
      roundId: "",
    });
    dispatch(updateSelectedArticleType("add"));
    navigate("/admin/addearticle");
  };
  const [
    articleDeleteApi,
    {
      data: articleDeleteData,
      isLoading,
      error,
      isSuccess: articleDeleteSuccess,
    },
  ] = useDeleteArticleByNameMutation();
  const [
    userListArticle,
    {
      data: listArticleData,
      isSuccess: userArticleSuccess,
      isLoading: articleDataFetching,
    },
  ] = useLazyGetArticleGetAndSearchApiByNameQuery();

  useEffect(() => {
    if (listArticleData && listArticleData?.data)
      dispatch(updateArticleData(listArticleData));
  }, [listArticleData]);

  const onHandleSearch = (e) => {
    // const value = ;

    const reqParams = {
      search: e.target.value,
    };
    userListArticle(reqParams);
  };
  useEffect(() => {
    const reqParams = {
      // search_string: "",
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userListArticle(reqParams);
  }, [articleDeleteSuccess]);

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
          return (
            <>
              <ControlledSwitches
                value={value}
                rowData={rowData}
                statusChangeApi={articleDeleteApi}
                deactivateUserData={articleDeleteData}

                //   userList={userList}
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

  useEffect(() => {
    dispatch(setCurrentModule("Article"));
  }, []);

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
                columns={columns}
                options={options}
              />
            </ManageUserTableWrapper>
            <CustomModal
              modal={modal}
              closeModal={closeModal}
              content={modalTitle}
              action={action}
              heading={"Delete Article"}
            />
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default ArticleContent;
