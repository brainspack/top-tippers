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

const ArticleContent = () => {
  const { reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { articleData } = useSelector(articleDataSelector);

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
                columns={ARTICLE_TABLE_COLUMNS(
                  handleEditClick,
                  openModal,
                  articleDeleteApi,
                  articleDeleteData
                )}
                options={ARTICLE_OPTIONS(
                  listArticleData,
                  userListArticle,
                  articleDataFetching
                )}
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
