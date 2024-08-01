import React, { useEffect, useState } from "react";
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
import { useGetUserListByNameMutation } from "../../api/UserList";
import { useGetUserListCompetitionApiByNameMutation } from "../../api/listCompetition";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";


function DashboardContent(props) {
  const [dataCount, setDataCount] = useState(DASHBOARD_CARD_DATA);
  const [
    userList,
    { data: responseData, isLoading, error, isSuccess: userListSuccess },
  ] = useGetUserListByNameMutation();
  const [userListCompetition, { data: listCompetitionData }] =
    useGetUserListCompetitionApiByNameMutation();
  const [userListSport, { data: listSportData }] =
  useGetUserListSportApiByNameMutation();

//   total user

  const TotalUserCount = async (data) => {
    try {
      const result = await userList({ body: data }).unwrap();
      console.log(result, "RESULT");
      // console.log(responseData,"jdkjkj");
      let temData=[...dataCount]
      if (result) {
        const tempData = [...DASHBOARD_CARD_DATA]
        temData[0].countNumber=result.totalCount;
        setDataCount([...temData]);
      }
      console.log(userList(), "log");
    } catch (err) {
      console.log(err, "the err");
    }
    await responseData;
  };
  console.log(dataCount, "jsakjk");



//   sport

  const TotalUserSport = async (data) => {
    try {
      const result = await userListSport({ body: data }).unwrap();
      console.log(result, "RESULT");
      // console.log(responseData,"jdkjkj");
      let temData=[...dataCount]

      if (result) {
        const tempData = [...DASHBOARD_CARD_DATA]
        temData[1].countNumber=result.totalCount;
        setDataCount([...temData]);
      }
      console.log(userListSport(), "log");
    } catch (err) {
      console.log(err, "the err");
    }
    await listSportData;
  };
  console.log(dataCount, "sports");

  //   competition 

  const TotalUserCompetition = async (data) => {
    try {
      const result = await userListCompetition({ body: data }).unwrap();
      console.log(result, "RESULT");
      // console.log(responseData,"jdkjkj");
      let temData=[...dataCount]

      if (result) {
        const tempData = [...DASHBOARD_CARD_DATA]
        temData[2].countNumber=result.totalCount;
        setDataCount([...temData]);
      }
      console.log(userListCompetition(), "log");
    } catch (err) {
      console.log(err, "the err");
    }
    await listCompetitionData;
  };
  console.log(dataCount, "compp");

  useEffect(() => {
    const reqParams = {
      search_string: "",
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    //   userList();
    TotalUserCount(reqParams);
    TotalUserSport(reqParams);
    TotalUserCompetition(reqParams);
  }, []);

  return (
    <>
      <DashboardMainContainer>
        <DashboardCardWrapper>
          <DashboardHeading>Dashboard</DashboardHeading>
          <DashboardCardBox>
            <DashboardCardInnerBox>
              {dataCount.length>0 && dataCount?.map((ele) =>  (
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
