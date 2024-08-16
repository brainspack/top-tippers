import { useParams } from "react-router-dom";
import { useEffect } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import { useTeamDetailsByNameMutation } from "../../api/TeamDetail";
import EditIcon from "@mui/icons-material/Edit";

const TeamProfileContent = () => {
  const [teamDetailsApi, { data, isLoading, error, isSuccess }] =
    useTeamDetailsByNameMutation();
  const { teamId } = useParams();
  const TeamDetailsData = async () => {
    const result = await teamDetailsApi({ teamId: teamId }).unwrap();
  };
  useEffect(() => {
    TeamDetailsData();
  }, [teamId]);
  return (
    <>
      {data?.data ? (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image="/static/images/cards/contemplative-reptile.jpg"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data?.data?.teamname}
              </Typography>
              <Typography variant="h5">
                {data?.data?.sport.sportname}
              </Typography>
              <Box>
                <EditIcon />
              </Box>
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
export default TeamProfileContent;
