import React, { useEffect, useState } from "react";
import {
  AnalysisCard,
  AnalysisCardAndChartWrapper,
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
  DateSelectWrapper,
} from "./dashboardContentStyled";
import { ANALYSIS_CARD_DATA, DASHBOARD_CARD_DATA } from "../../utils/constant";
import {
  Box,
  Fab,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useGetUserListByNameMutation } from "../../api/UserList";
import { useGetUserListCompetitionApiByNameMutation } from "../../api/listCompetition";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

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

  // state of selectors

  const [Date, setDate] = React.useState("");

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  //   total user

  const TotalUserCount = async (data) => {
    try {
      const result = await userList({ body: data }).unwrap();
      let tempData = [...dataCount];
      if (result) {
        tempData[0].countNumber = result.totalCount;
        setDataCount([...tempData]);
      }
    } catch (err) {}
    await responseData;
  };

  //   sport

  const TotalUserSport = async (data) => {
    try {
      const result = await userListSport({ body: data }).unwrap();
      let tempData = [...dataCount];

      if (result) {
        tempData[1].countNumber = result.totalCount;
        setDataCount([...tempData]);
      }
    } catch (err) {
      console.log(err, "the err");
    }
    await listSportData;
  };

  //   competition

  const TotalUserCompetition = async (data) => {
    try {
      const result = await userListCompetition({ body: data }).unwrap();
      let tempData = [...dataCount];

      if (result) {
        tempData[2].countNumber = result.totalCount;
        setDataCount([...tempData]);
      }
    } catch (err) {
      console.log(err, "the err");
    }
    await listCompetitionData;
  };

  useEffect(() => {
    const reqParams = {
      search_string: "",
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
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
              {dataCount.length > 0 &&
                dataCount?.map((ele) => (
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
          <AnalysisCardAndChartWrapper>
            <AnalysisTeamCardWrapper>
              <DateSelectWrapper>
                <CalendarTodayIcon sx={{ fontSize: "16px" }} />

                <FormControl sx={{ m: 1, minWidth: 130 }}>
                  <Select
                    value={Date}
                    className="calender-border"
                    onChange={handleChange}
                    displayEmpty
                    sx={{ fontSize: "14px" }}
                  >
                    <MenuItem value="">
                      <Typography
                        sx={{
                          color: "grey !important",
                          fontSize: "14px !important",
                        }}
                      >
                        This week
                      </Typography>
                    </MenuItem>
                    <MenuItem className="calender" value={10}>
                      This Day
                    </MenuItem>
                    <MenuItem className="calender" value={20}>
                      This Month
                    </MenuItem>
                    <MenuItem className="calender" value={30}>
                      This Year
                    </MenuItem>
                  </Select>
                </FormControl>
              </DateSelectWrapper>
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
          </AnalysisCardAndChartWrapper>
        </AnalysisTeamWrapper>
      </DashboardMainContainer>
    </>
  );
}

export default DashboardContent;
