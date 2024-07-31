import React, { useEffect } from "react";
import {
  AnalysisCard,
  AnalysisCardWrapper,
  AnalysisHeading,
  AnalysisHeadingWrapper,
  AnalysisTeamCardWrapper,
  AnalysisTeamImage,
  AnalysisTeamImageWrapper,
  AnalysisTeamWrapper,
  DashboardCard,
  DashboardCardBox,
  DashboardCardContentBox,
  DashboardCardContentCount,
  DashboardCardContentHeading,
  DashboardCardContentWrapper,
  DashboardCardCountentSubHeading,
  DashboardCardCountNumber,
  DashboardCardiconWrapper,
  DashboardCardInnerBox,
  DashboardCardWrapper,
  DashboardHeading,
  DashboardMainContainer,
} from "./dashboardContentStyled";
import { ANALYSIS_CARD_DATA, DASHBOARD_CARD_DATA } from "../../utils/constant";
import { Box, Fab } from "@mui/material";
// import { useGetlistUserApiByNameMutation } from "../../api/listUser";

function DashboardContent(props) {
    // const [listUser, { data: responseData, isLoading, error, isSuccess }] = useGetlistUserApiByNameMutation();

    // useEffect((data)=>{
    //     if(isLoading) return
    //     const result = listUser({ body: data }).unwrap();
    //   console.log(result, "RESULT");
    //   if(result){
    //     if(result?.data){
    //         let token = result.data?.token;
    //         localStorage.setItem("token", token);


    //     }
    //   }
    //   }, [responseData, isLoading])
  return (
    <>
      <DashboardMainContainer>
        <DashboardCardWrapper>
          <DashboardHeading>Dashboard</DashboardHeading>
          <DashboardCardBox>
            <DashboardCardInnerBox>
              {DASHBOARD_CARD_DATA.map((ele) => (
                <DashboardCard className="dashboard-card">
                  <DashboardCardContentWrapper>
                    <DashboardCardiconWrapper>
                      <Box
                        sx={{
                          width: "65px",
                          height: "65px",
                          borderRadius: "50%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        className="favIcon"
                      >
                        {ele.icons}
                      </Box>
                    </DashboardCardiconWrapper>
                    <DashboardCardContentBox>
                      <DashboardCardContentCount>
                        <DashboardCardContentHeading>
                          {ele.heading}
                        </DashboardCardContentHeading>
                        <DashboardCardCountNumber>
                          {ele.countNumber}
                        </DashboardCardCountNumber>
                      </DashboardCardContentCount>
                      <DashboardCardCountentSubHeading>
                        {ele.subHeading}
                      </DashboardCardCountentSubHeading>
                    </DashboardCardContentBox>
                  </DashboardCardContentWrapper>
                </DashboardCard>
              ))}
            </DashboardCardInnerBox>
          </DashboardCardBox>
        </DashboardCardWrapper>
        <AnalysisTeamWrapper>
          <AnalysisHeadingWrapper>
            <AnalysisHeading>Analysis Chart</AnalysisHeading>
          </AnalysisHeadingWrapper>
          <Box sx={{ display: "flex" }}>
            <AnalysisTeamCardWrapper>
              <AnalysisCardWrapper>
                {ANALYSIS_CARD_DATA.map((ele) => (
                  <AnalysisCard className="dashboard-card">
                    <DashboardCardContentWrapper>
                      <DashboardCardiconWrapper>
                        <Box
                          sx={{
                            width: "65px",
                            height: "65px",
                            borderRadius: "50%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          className="favIcon"
                        >
                          {ele.icons}
                        </Box>
                      </DashboardCardiconWrapper>
                      <DashboardCardContentBox>
                        <DashboardCardContentCount>
                          <DashboardCardContentHeading>
                            {ele.heading}
                          </DashboardCardContentHeading>
                          <DashboardCardCountNumber>
                            {ele.countNumber}
                          </DashboardCardCountNumber>
                        </DashboardCardContentCount>
                        <DashboardCardCountentSubHeading>
                          {ele.subHeading}
                        </DashboardCardCountentSubHeading>
                      </DashboardCardContentBox>
                    </DashboardCardContentWrapper>
                  </AnalysisCard>
                ))}
              </AnalysisCardWrapper>
            </AnalysisTeamCardWrapper>
            <AnalysisTeamImageWrapper>
              <AnalysisTeamImage></AnalysisTeamImage>
            </AnalysisTeamImageWrapper>
          </Box>
        </AnalysisTeamWrapper>
      </DashboardMainContainer>
    </>
  );
}

export default DashboardContent;
