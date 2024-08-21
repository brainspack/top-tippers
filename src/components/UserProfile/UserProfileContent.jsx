import { Box, CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useUserDetailsByNameMutation } from "../../api/getUserDetails";
import { useEffect } from "react";
import moment from "moment";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import AddTeamModal from "../master/AddTeamModal";

const UserProfileContent = () => {
  const [userDetails, { data, isLoading, error, isSuccess }] =
    useUserDetailsByNameMutation();
  const { userId } = useParams();
  const userDetailsData = async () => {
    const result = await userDetails({ userId: userId }).unwrap();
  };
  useEffect(() => {
    userDetailsData();
  }, [userId]);
  return (
    <>
      {data?.data ? (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={data?.data?.profilePhoto}
              alt="profile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data?.data?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {data?.data?.email}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {moment(data?.data?.joinedDate).format("LL")}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ) : (
        <Box>
          <CircularProgress />
        </Box>
      )}
    </>
  );
};
export default UserProfileContent;
