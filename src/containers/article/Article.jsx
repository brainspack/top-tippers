import { Box } from "@mui/material";
import DashboardComponent from "../../components/Dashboard/Dashboard";
import DashboardContent from "../../components/DashboardContent/DashboardContent";
import ArticleContent from "../../components/article/ArticleContent";

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
