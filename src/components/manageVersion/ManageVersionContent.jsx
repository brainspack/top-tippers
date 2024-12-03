import React, { useEffect, useState } from "react";
import { Box, Checkbox } from "@mui/material";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  SearchContainer,
} from "../ManageUsers/ManangeUsersStyled";
import { useDispatch, useSelector } from "react-redux";
import { versionDataSelector } from "../../slices/VersionListSlice/versionListSelector";
import { useGetVersionListApiByNameMutation } from "../../api/versionList";
import {
  getVersionDataForEdit,
  knowWhereHaveToOpenModalForVersion,
  updateUserVersionData,
  updateVersionModalVisibility,
} from "../../slices/VersionListSlice/versionListSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MUIDataTable from "mui-datatables";
import { useDeleteVersionByNameMutation } from "../../api/DeleteVersion";
import CustomModal from "../reuse/CustomModal";
import { handleNotification } from "../../slices/Snackbar";
import AddVersionModal from "./AddVersionModal";
import { useGetAddVersionApiByNameMutation } from "../../api/AddVersion";
import CustomPagination from "../reuse/CustomPagination";
import { setCurrentModule } from "../../slices/manageTeam/manageTeam";

const ManageVersionContent = () => {
  const dispatch = useDispatch();
  const { versionData } = useSelector(versionDataSelector);
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalContent] = useState("");
  const [action, setAction] = useState(() => () => {});

  const openModal = (id, type) => {
    if (type === "delete") {
      setModalContent("Do you want to delete this record?");
      setAction(() => async () => {
        try {
          const response = await versionDeleteApi({ versionId: id }).unwrap();
          if (response?.code === 200) {
            dispatch(
              handleNotification({
                state: true,
                message: response?.message,
                severity: response?.code,
              })
            );
          } else {
            dispatch(
              handleNotification({
                state: true,
                message: response?.message,
                severity: response?.code,
              })
            );
          }
        } catch (error) {
          dispatch(
            handleNotification({
              state: true,
              message: versionDeleteData?.message,
              severity: versionDeleteData?.code,
            })
          );
        }
      });
    }
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const [
    versionListApi,
    { data: versionListData, isLoading: versionListLoading },
  ] = useGetVersionListApiByNameMutation();

  const [addVersionApi, { data: addVersionData, isSuccess: VersionSuccess }] =
    useGetAddVersionApiByNameMutation();

  const [
    versionDeleteApi,
    {
      data: versionDeleteData,
      isLoading: versionDeleteLoading,
      error: versionDeleteError,
      isSuccess: versionDeleteSuccess,
    },
  ] = useDeleteVersionByNameMutation();

  useEffect(() => {
    if (versionListData?.data?.length)
      dispatch(updateUserVersionData(versionListData));
  }, [versionListData]);

  const handleEditClick = (rowData) => {
    const payload = [
      {
        title: rowData?.rowData[0],
        description: rowData?.rowData[1],
        version: rowData?.rowData[2],
        platform: rowData?.rowData[3],
        isRequired: rowData?.rowData[4],
        id: rowData?.rowData[5],
      },
    ];

    dispatch(getVersionDataForEdit(payload));
    dispatch(knowWhereHaveToOpenModalForVersion("edit"));
    dispatch(updateVersionModalVisibility(true));
  };

  // useEffect(() => {
  //   const reqParams = {
  //     page: 0,
  //     sortValue: "",
  //     sortOrder: "",
  //   };
  //   versionListApi(reqParams);
  // }, []);

  useEffect(() => {
    const reqParams = {
      page: 0,
    };
    versionListApi(reqParams);
  }, [VersionSuccess]);

  useEffect(() => {
    const reqParams = {
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    versionListApi(reqParams);
  }, [versionDeleteSuccess]);

  const columns = [
    {
      name: "title",
      label: "Title",

      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "description",
      label: "Description",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "version",
      label: "Version",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "platform",
      label: "Platform",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
      },
    },
    {
      name: "isRequired",
      label: "isRequired",
      options: {
        filter: true,
        sort: true,
        setCellHeaderProps: () => ({
          style: {
            backgroundColor: "#e5a842",
            color: "white",
            fontWeight: "600",
          },
        }),
        customBodyRender: (value) => <Checkbox checked={value} disabled />,
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
            color: "white",
            fontWeight: "600",
          },
        }),
        customBodyRender: (value, rowData) => (
          <>
            <Box display="flex" gap="10px">
              <EditIcon
                sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                onClick={() => handleEditClick(rowData)}
              ></EditIcon>
              <DeleteIcon
                sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                onClick={() => openModal(value, "delete")}
              />
            </Box>
          </>
        ),
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
            total={versionData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={versionListApi}
            userData={versionData?.data}
            isLoading={versionListLoading}
          />
        </>
      );
    },
  };

  useEffect(() => {
    dispatch(setCurrentModule("version"));
  }, []);

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>Version</ManageUsersHeading>
            <AddVersionModal
              addVersionApi={addVersionApi}
              addVersionData={addVersionData}
            />
          </Box>

          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={versionData?.data}
                columns={columns}
                options={options}
              />
            </ManageUserTableWrapper>
            <CustomModal
              modal={modal}
              closeModal={closeModal}
              content={modalTitle}
              action={action}
            />
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default ManageVersionContent;
