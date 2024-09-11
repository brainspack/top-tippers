import { Typography, Box } from "@mui/material";
import {
  ManageUsersContainer,
  ManageUsersHeading,
  ManageUsersWrapper,
  ManageUserTableWrapper,
  SearchContainer,
} from "../ManageUsers/ManangeUsersStyled";
import { useDispatch, useSelector } from "react-redux";
import { adDataSelector } from "../../slices/AdSlice/AdSelector";
import { useGetUserListAdApiApiByNameMutation } from "../../api/listAd";
import { useEffect, useState } from "react";
import { updateAdData } from "../../slices/AdSlice/Ad";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MUIDataTable from "mui-datatables";
import CustomPagination from "../reuse/CustomPagination";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import { updateSportData } from "../../slices/manageSport/manageSport";
import { manageSportDataSelector } from "../../slices/manageSport/manageSportSelector";
import AddAdModal from "./AddAdModal";

const AdsContent = () => {
  const dispatch = useDispatch();
  const { adData } = useSelector(adDataSelector);
  const { sportData } = useSelector(manageSportDataSelector);
  console.log(adData, "sjka");
  const [transformedAdData, setTransformedAdData] = useState([]);

  const [
    userAdApi,
    {
      data: userAdData,
      isLoading: userAdLoading,
      error: userAdError,
      isSuccess: userAdSuccess,
    },
  ] = useGetUserListAdApiApiByNameMutation();

  const [
    userListSport,
    {
      data: listSportData,
      isSuccess: listSportSuccess,
      isLoading: sportDataFetching,
    },
  ] = useGetUserListSportApiByNameMutation();

  useEffect(() => {
    const reqParams = {
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userAdApi(reqParams);
  }, []);

  useEffect(() => {
    const reqParams = {
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userListSport(reqParams);
  }, []);

  useEffect(() => {
    if (listSportData && listSportData.data && listSportSuccess) {
      dispatch(updateSportData(listSportData));

      const sportIdMap = listSportData.data.reduce((acc, sport) => {
        acc[sport._id] = sport.sportname;
        return acc;
      }, {});

      console.log(sportIdMap, "sportIdMap");

      const transformedData = userAdData?.data?.map((ad) => {
        console.log(ad, "ad");

        return {
          ...ad,
          sport: sportIdMap[ad.sport],
        };
      });

      console.log(transformedData, "transformedData");

      dispatch(updateAdData(transformedData));
    }
  }, [listSportData, userAdData, listSportSuccess, userAdSuccess]);

  const columns = [
    {
      name: "name",
      label: "Name",

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
      name: "type",
      label: "Type",
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
      name: "mediaType",
      label: "Media Type",
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
      name: "userType",
      label: "User Type",
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
      name: "sport",
      label: "Sports",
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
      name: "pages",
      label: "Pages",
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
                // onClick={() => handleEditClick(rowData)}
              ></EditIcon>
              <DeleteIcon
                sx={{ cursor: "pointer", color: "#9f8e8ede" }}
                // onClick={() => openModal(value, "delete")}
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
            total={adData?.totalCount}
            page={page}
            rowsPerPage={rowsPerPage}
            changeRowsPerPage={changeRowsPerPage}
            changePage={changePage}
            userList={userAdApi}
            userData={adData?.data}
            isLoading={userAdLoading}
          />
        </>
      );
    },
  };

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>AD</ManageUsersHeading>
            <AddAdModal
            // AddUpdateQuestionFaqs={AddUpdateQuestionFaqs}
            // AddFaqsData={AddFaqsData}
            // faqsListTopicData={faqsListTopicData}
            />
          </Box>

          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable data={adData} columns={columns} options={options} />
            </ManageUserTableWrapper>
            {/* <CustomModal
              modal={modal}
              closeModal={closeModal}
              content={modalTitle}
              action={action}
            /> */}
          </SearchContainer>
        </ManageUsersWrapper>
      </ManageUsersContainer>
    </>
  );
};
export default AdsContent;
