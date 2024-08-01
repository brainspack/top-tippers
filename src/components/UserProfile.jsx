import { Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useUserDetailsByNameMutation } from "../api/getUserDetails";
import { useEffect } from "react";
import moment from "moment";

const UserProfile = () => {
  const [userDetails, { data, isLoading, error, isSuccess }] =
    useUserDetailsByNameMutation();
  const { userId } = useParams();
  const userDetailsData = async () => {
    const result = await userDetails({ userId: userId });
  };
  useEffect(() => {
    userDetailsData();
  }, [userId]);
  return (
    <>
      {data?.data ? (
        <Box>
          <Typography variant="h3">{data?.data?.name}</Typography>
          <Typography variant="h5">{data?.data?.email}</Typography>
          <Typography variant="h6">
            {moment(data?.data?.joinedDate).format("LL")}
          </Typography>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};
export default UserProfile;
