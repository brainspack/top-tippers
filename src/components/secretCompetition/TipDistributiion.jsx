import { Box, Paper, Typography } from "@mui/material";
import adminTip from "../../images/tips_blank.png";
import React from "react";
import {
  TeamsDetails,
  TeamsHeading,
  TipDistributionHeading,
  UserGroupHeading,
} from "./secretCompetitionStyled";

const TipDistribution = (props) => {
  const { tipDistributionData, activeUsersData } = props;
  console.log(tipDistributionData, "tipDistributionData");

  return (
    <>
      {tipDistributionData?.data?.gameDetailAndTipping.length > 0 ? (
        <Box sx={{ height: "auto", width: "100%", mt: 5 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "55%",
            }}
          >
            <TipDistributionHeading>Tip Distribution</TipDistributionHeading>
            <UserGroupHeading>User Group</UserGroupHeading>
          </Box>
          <Box
            sx={{
              height: "auto",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {tipDistributionData?.data?.gameDetailAndTipping?.map((data) => (
              <Box
                sx={{
                  height: "300px",
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    height: "10%",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TeamsHeading>{`${data?.homeTeam?.teamname} VS ${data?.awayTeam?.teamname}`}</TeamsHeading>
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
                      <TeamsDetails>HOME</TeamsDetails>
                      <Box
                        className="logoBox"
                        sx={{ height: "50px", width: "50px" }}
                      >
                        <img src={data?.homeTeam?.teamLogo} />
                      </Box>

                      {data?.tippingData?.map((tipping) => {
                        const homeCheck = tipping?._id === "home";
                        return (
                          <>
                            {homeCheck ? (
                              <>
                                {tipping?.count ? (
                                  <TeamsDetails>
                                    {tipping?.count} Tips
                                  </TeamsDetails>
                                ) : (
                                  0
                                )}
                              </>
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
                      <TeamsDetails>AWAY</TeamsDetails>
                      <Box
                        className="logoBox"
                        sx={{ height: "50px", width: "50px" }}
                      >
                        <img src={data?.awayTeam?.teamLogo} />
                      </Box>
                      {data?.tippingData?.map((tipping) => {
                        const isAway = tipping?._id === "away";
                        console.log(tipping, "tipping");

                        return (
                          <>
                            {isAway ? (
                              <>
                                <TeamsDetails>
                                  {tipping?.count || 0} Tips
                                </TeamsDetails>
                              </>
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
                      <TeamsDetails>NO TIP</TeamsDetails>
                      <Box
                        className="logoBox"
                        sx={{ height: "50px", width: "50px" }}
                      >
                        <img src={adminTip} />
                      </Box>
                      <TeamsDetails>
                        {`${
                          activeUsersData -
                          (data?.tippingData[0]?.count +
                            data?.tippingData[1]?.count)
                        } `}
                        Tips
                      </TeamsDetails>
                    </Box>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};
export default TipDistribution;
