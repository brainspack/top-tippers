import EmailIcon from "@mui/icons-material/Email";
import { Box } from "@mui/material";
import CustomPagination from "../reuse/CustomPagination";
import { useDispatch } from "react-redux";
import { updateMultipleRowId } from "../../slices/messaging/messaging";

export const MESSAGE_TABLE_COLUMNS = (onHandleMessageOpen, openModal) => {
  const columns = [
    {
      name: "name",
      label: "Name",
      options: {
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        setCellHeaderProps: () => ({
          style: { backgroundColor: "#e5a842", color: "black" },
        }),
      },
    },
    {
      name: "_id",
      label: "Actions",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "black",
          },
        }),
        customBodyRender: (value, rowData) => {
          return (
            <>
              <Box display="flex" gap="10px">
                <EmailIcon
                  onClick={() => onHandleMessageOpen(value)}
                  sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                ></EmailIcon>
              </Box>
            </>
          );
        },
      },
    },
  ];
  return columns;
};

export const MESSAGE_OPTIONS = (userAllData, listAllUserApi, isLoading) => {
  const dispatch = useDispatch();
  const options = {
    filter: false,
    download: false,
    search: false,
    print: false,
    viewColumns: false,
    pagination: true,
    rowsPerPage: 10,
    onRowsSelect: (currentRowsSelected, allRowsSelected) => {
      const selectedData = allRowsSelected.map(
        (row) => userAllData?.data[row.dataIndex]
      );

      const filteredId = selectedData.map((data) => {
        console.log(data?._id, "data?._id");
        return data?._id;
      });
      dispatch(updateMultipleRowId(filteredId));
    },
    customFooter: (count, page, rowsPerPage, changeRowsPerPage, changePage) => {
      return (
        <>
          <CustomPagination
            total={userAllData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={listAllUserApi}
            userAllData={userAllData?.data}
            isLoading={isLoading}
          />
        </>
      );
    },
  };

  return options;
};
