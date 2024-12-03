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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reqParams = {
          search_string: "",
          page: 0,
          sortValue: "",
          sortOrder: "",
        };
        const [usersResponse, competitionsResponse, sportsResponse] =
          await Promise.all([
            userList(reqParams).unwrap(),
            userListCompetition(reqParams).unwrap(),
            userListSport(reqParams).unwrap(),
          ]);
        const totalUsers = usersResponse?.totalCount || 0;
        const totalSports = sportsResponse?.totalCount || 0;
        const totalCompetitions = competitionsResponse?.totalCount || 0;
        setDataCount((prevData) =>
          prevData.map((card) => {
            if (card.heading === "Total Users") {
              return { ...card, countNumber: totalUsers };
            } else if (card.heading === "Total Sports") {
              return { ...card, countNumber: totalSports };
            } else if (card.heading === "Total Competitions") {
              return { ...card, countNumber: totalCompetitions };
            }
            return card;
          })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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
