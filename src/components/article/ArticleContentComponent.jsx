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
import { updateArticleData } from "../../slices/Article/article";
import MUIDataTable from "mui-datatables";
import CustomPagination from "../reuse/CustomPagination";
import { setCurrentModule } from "../../slices/manageTeam/manageTeam";
import { AddSportBtn } from "../master/masterStyled";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";

const ArticleContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { articleData } = useSelector(articleDataSelector);
  const [searchString, setSearchString] = useState("");

  console.log(articleData, "data");

  const [
    userListArticle,
    {
      data: listArticleData,
      isSuccess: userArticleSuccess,
      isLoading: articleDataFetching,
    },
  ] = useLazyGetArticleGetAndSearchApiByNameQuery();

  console.log(listArticleData, "skajk");

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
                // onClick={() => handleEditClick(rowData)}
              ></EditIcon>
              <DeleteIcon
                sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                // onClick={() => openModal(value, "delete")}
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
            <AddSportBtn
              disableRipple
              onClick={() => navigate("/admin/addearticle")}
            >
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
export default ArticleContent;
