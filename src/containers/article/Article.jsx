import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import ArticleContent from "../../components/article/ArticleContentComponent";

const ArticlePage = () => {
  return (
    <>
      <Box>
        <DashboardComponent content={<ArticleContent />} />
      </Box>
    </>
  );
};
export default ArticlePage;
