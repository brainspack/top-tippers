import { Box, Paper, Typography } from "@mui/material";
import adminTip from "../../images/tips_blank.png";
import {
  CustomPaper,
  CustomPaperContentBox,
  TeamsDetails,
  TeamsHeading,
  TeamsHeadingBox,
  TipDistributionContainer,
  TipDistributionContentBox,
  TipDistributionContentContainer,
  TipDistributionHeading,
  TipDistributionHeadingBox,
  TippingDetailsBox,
  UserGroupHeading,
} from "./secretCompetitionStyled";

const TipDistribution = (props) => {
  const { tipDistributionData, activeUsersData } = props;
  console.log(tipDistributionData, "tipDistributionData");

  return (
    <>
      <TipDistributionContainer>
        <TipDistributionHeadingBox>
          <TipDistributionHeading>Tip Distribution</TipDistributionHeading>
          <UserGroupHeading>User Group : Top 10</UserGroupHeading>
        </TipDistributionHeadingBox>
        <TipDistributionContentContainer>
          {tipDistributionData?.data?.gameDetailAndTipping?.map((data) => (
            <TipDistributionContentBox>
              <TeamsHeadingBox>
                <TeamsHeading>{`${data?.homeTeam?.teamname} VS ${data?.awayTeam?.teamname}`}</TeamsHeading>
              </TeamsHeadingBox>
              <CustomPaper>
                <CustomPaperContentBox>
                  <TippingDetailsBox>
                    <TeamsDetails>HOME</TeamsDetails>
                    <Box className="logoBox">
                      <img src={data?.homeTeam?.teamLogo} />
                    </Box>
                    {data?.tippingData?.some(
                      (tipping) => tipping?._id === "home"
                    ) ? (
                      data?.tippingData?.map((tipping) => {
                        const isHome = tipping?._id === "home";
                        return (
                          isHome && (
                            <TeamsDetails>
                              {tipping?.count ? tipping?.count : 0} Tips
                            </TeamsDetails>
                          )
                        );
                      })
                    ) : (
                      <TeamsDetails>0 Tips</TeamsDetails>
                    )}
                  </TippingDetailsBox>

                  <TippingDetailsBox>
                    <TeamsDetails>AWAY</TeamsDetails>
                    <Box className="logoBox">
                      <img src={data?.awayTeam?.teamLogo} />
                    </Box>
                    {data?.tippingData?.some(
                      (tipping) => tipping?._id === "away"
                    ) ? (
                      data?.tippingData?.map((tipping) => {
                        const isAway = tipping?._id === "away";
                        return (
                          isAway && (
                            <TeamsDetails>
                              {tipping?.count ? tipping?.count : 0} Tips
                            </TeamsDetails>
                          )
                        );
                      })
                    ) : (
                      <TeamsDetails>0 Tips</TeamsDetails>
                    )}
                  </TippingDetailsBox>

                  <TippingDetailsBox>
                    <TeamsDetails>NO TIP</TeamsDetails>
                    <Box className="logoBox">
                      <img src={adminTip} />
                    </Box>
                    <TeamsDetails>
                      {`${
                        activeUsersData -
                        ((data?.tippingData[0]?.count ?? 0) +
                          (data?.tippingData[1]?.count ?? 0))
                      } `}
                      Tips
                    </TeamsDetails>
                  </TippingDetailsBox>
                </CustomPaperContentBox>
              </CustomPaper>
            </TipDistributionContentBox>
          ))}
        </TipDistributionContentContainer>
      </TipDistributionContainer>
    </>
  );
};
export default TipDistribution;
