import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  CircularProgress,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {
  setModalSportName,
  updateModalVisibility,
} from "../../slices/userSlice/user";
import { useTeamDetailsByNameMutation } from "../../api/TeamDetail";
import { userDataSelector } from "../../slices/userSlice/userSelector";
import AddTeamModal from "../master/AddTeamModal";
import { useUpdateTeamByNameMutation } from "../../api/UpdateTeam";
import { handleNotification } from "../../slices/Snackbar";

const TeamProfileContent = () => {
  const { teamId } = useParams();
  const dispatch = useDispatch();
  const { isModalVisible, modalSportName } = useSelector(userDataSelector);
  const [teamDetailsApi, { data, isLoading, error, isSuccess }] =
    useTeamDetailsByNameMutation();
  const [
    updateTeamApi,
    { data: updateTeamData, isSuccess: updateTeamSuccess },
  ] = useUpdateTeamByNameMutation();

  const handleOpen = () => {
    if (data?.data?.sport?.sportname) {
      dispatch(setModalSportName(data.data?.teamname));
    }
    dispatch(updateModalVisibility(true));
  };
  useEffect(() => {
    teamDetailsApi({ teamId });
  }, [teamId, updateTeamSuccess]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h6" color="error">
          Failed to load team details
        </Typography>
      </Box>
    );
  }
  const onHandleUpdate = async () => {
    const result = await updateTeamApi({
      teamname: modalSportName,
      teamId: data?.data?._id,
    }).unwrap();
    try {
      if (result?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
        dispatch(updateModalVisibility(false));
      } else {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
      }
    } catch (error) {}
  };

  return (
    <>
      {data?.data ? (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={data?.data?.teamLogo}
              objectFit={"contain"}
              alt={data?.data?.teamname || "Team Image"}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.data.teamname}
              </Typography>
              <Typography variant="h5">
                {data?.data?.sport?.sportname}
              </Typography>
              <Box>
                <EditIcon onClick={handleOpen} style={{ cursor: "pointer" }} />
              </Box>
            </CardContent>
          </CardActionArea>
          <AddTeamModal
            open={isModalVisible}
            onClose={() => dispatch(updateModalVisibility(false))}
            initialSportName={modalSportName}
            mode={"edit"}
            onHandleUpdate={onHandleUpdate}
          />
        </Card>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Typography variant="h6">No team data available</Typography>
        </Box>
      )}
    </>
  );
};

export default TeamProfileContent;
