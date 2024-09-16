import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  Search,
  SearchContainer,
  SearchIconWrapper,
  StyledInputBase,
} from "../ManageUsers/ManangeUsersStyled";
import MUIDataTable from "mui-datatables";
import { adDataSelector } from "../../slices/AdSlice/AdSelector";
import { updateAdReportData } from "../../slices/AdSlice/Ad";
import CustomPagination from "../reuse/CustomPagination";
import { setCurrentModule } from "../../slices/manageTeam/manageTeam";
import SearchIcon from "@mui/icons-material/Search";
import { AddSportBtn } from "../master/masterStyled";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useAdReportApiByNameMutation } from "../../api/AdReports";
import moment from "moment/moment";
import { CSVLink } from "react-csv";
// import { Parser } from "json2csv";

const AdsReportContent = () => {
  const dispatch = useDispatch();
  const { adReportData } = useSelector(adDataSelector);

  const [adReportsApi, { data, isLoading, isSuccess }] =
    useAdReportApiByNameMutation();

  useEffect(() => {
    const reqParams = {
      isAllData: true,
      page: 0,
      search_string: "",
      sortOrder: "",
      sortValue: "",
    };
    adReportsApi(reqParams);
  }, []);
  const onHandleSearch = (e) => {
    const reqParams = {
      isAllData: false,
      page: 0,
      search_string: e.target.value,
      sortOrder: "",
      sortValue: "",
    };
    adReportsApi(reqParams);
  };

  const csvData =
    adReportData?.data?.map((item) => ({
      adName: item.ad?.name,
      adType: item.ad?.type,
      userEmail: item.user?.email,
      createdAt: moment(item.createdAt).format("M/D/YYYY, h:mm:ss A"),
    })) || [];

  const csvHeaders = [
    { label: "addName", key: "adName" },
    { label: "addType", key: "adType" },
    { label: "userEmail", key: "userEmail" },
    { label: "clickTime", key: "createdAt" },
  ];
  useEffect(() => {
    if (data && data?.data) dispatch(updateAdReportData(data));
  }, [data]);

  const columns = [
    {
      name: "ad",
      label: "Ad Name",
      options: {
        customBodyRender: (data) => {
          return (
            <>
              <Box>{data?.name}</Box>
            </>
          );
        },
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "ad",
      label: "Ad Type",
      options: {
        customBodyRender: (data) => {
          return (
            <>
              <Box>{data?.type}</Box>
            </>
          );
        },
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "user",
      label: "User Name",
      options: {
        customBodyRender: (data) => {
          return (
            <>
              <Box>{data?.name}</Box>
            </>
          );
        },
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "user",
      label: "User Email",
      options: {
        customBodyRender: (data) => {
          return (
            <>
              <Box>{data?.email}</Box>
            </>
          );
        },
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "createdAt",
      label: "Created Date",
      options: {
        customBodyRender: (value) => {
          return moment(value).format("M/D/YYYY, h:mm:ss A");
        },
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
  ];

  const options = {
    filter: false,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
    selectableRows: false,
    pagination: true,
    rowsPerPage: 10,
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      return (
        <>
          <CustomPagination
            total={adReportData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={adReportsApi}
            userData={adReportData?.data}
            isLoading={isLoading}
          />
        </>
      );
    },
  };

  useEffect(() => {
    dispatch(setCurrentModule("adReport"));
  }, []);

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>Ad Reports</ManageUsersHeading>
            <Box sx={{ width: "45%" }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon sx={{ color: "primary.secondary" }} />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={onHandleSearch}
                />
              </Search>
            </Box>
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename="ad_reports.csv"
            >
              <AddSportBtn disableRipple>
                <ExitToAppIcon
                  sx={{ mr: 1, color: "#766868de", fontSize: "20px" }}
                />
                Export to CSV
              </AddSportBtn>
            </CSVLink>
          </Box>

          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={adReportData?.data}
                columns={columns}
                options={options}
              />
            </ManageUserTableWrapper>
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default AdsReportContent;
