import { Box, Paper, Typography } from "@mui/material";
import adminTip from "../../images/tips_blank.png";
import React from "react";

const TipDistribution = (props) => {
  const { tipDistributionData, activeUsersData } = props;

  return (
    <>
      <Box sx={{ height: "auto", width: "100%", mt: 5 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "60%",
          }}
        >
          <Typography variant="h5">Tip Distribution</Typography>
          <Typography variant="h6">User Group</Typography>
        </Box>

        {tipDistributionData?.data?.gameDetailAndTipping?.map((data) => (
          <Box
            sx={{
              height: "300px",
              width: "50%",
              margin: "20px auto",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography>{`${data?.homeTeam?.teamname} VS ${data?.awayTeam?.teamname}`}</Typography>
            </Box>

            {/*  */}
            <Paper
              sx={{
                height: "80%",
                width: "100%",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  height: "90%",
                  width: "60%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>HOME</Typography>
                  <Box
                    className="logoBox"
                    sx={{ height: "50px", width: "50px" }}
                  >
                    <img src={data?.homeTeam?.teamLogo} />
                  </Box>

                  {data?.tippingData?.map((tipping) => {
                    const id = tipping?._id === "home";
                    return (
                      <>
                        {id ? (
                          <Typography>{tipping?.count} Tips</Typography>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>AWAY</Typography>
                  <Box
                    className="logoBox"
                    sx={{ height: "50px", width: "50px" }}
                  >
                    <img src={data?.awayTeam?.teamLogo} />
                  </Box>
                  {data?.tippingData?.map((tipping) => {
                    const isAway = tipping?._id === "away";
                    const count = tipping?.count || 0;

                    return (
                      <React.Fragment key={tipping?._id}>
                        <Typography>{isAway ? count : 0} Tips</Typography>
                      </React.Fragment>
                    );
                  })}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography>NO TIP</Typography>
                  <Box
                    className="logoBox"
                    sx={{ height: "50px", width: "50px" }}
                  >
                    <img src={adminTip} />
                  </Box>
                  <Typography>
                    {`${
                      activeUsersData -
                      (data?.tippingData[0]?.count +
                        data?.tippingData[1]?.count)
                    } `}{" "}
                    Tips
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
        ))}
      </Box>
    </>
  );
};
export default TipDistribution;
