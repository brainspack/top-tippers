import { Box } from "@mui/material";
import moment from "moment";
import CustomPagination from "../reuse/CustomPagination";

export const REPORT_TABLE_COLUMNS = (handleEditClick, openModal) => {
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
  return columns;
};

export const REPORT_OPTIONS = (adReportData, adReportsApi, isLoading) => {
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

  return options;
};
