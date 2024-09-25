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
import {
  getUserAdDataForEdit,
  knowWhereHaveToOpenModalForAd,
  updateAdData,
  updateAdModalVisibility,
} from "../../slices/AdSlice/Ad";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MUIDataTable from "mui-datatables";
import CustomPagination from "../reuse/CustomPagination";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import { updateSportData } from "../../slices/manageSport/manageSport";
import { manageSportDataSelector } from "../../slices/manageSport/manageSportSelector";
import AddAdModal from "./AddAdModal";
import { handleNotification } from "../../slices/Snackbar";
import CustomModal from "../reuse/CustomModal";
import { useDeleteAdByNameMutation } from "../../api/DeleteAd";
import { useGetAddUpdateAdApiByNameMutation } from "../../api/AddUpdateAd";
import { setCurrentModule } from "../../slices/manageTeam/manageTeam";
import { AD_OPTIONS, AD_TABLE_COLUMNS } from "./adTableColumns";
import { SELECT_PAGE_TYPE } from "../../utils/constant";

const AdsContent = () => {
  const dispatch = useDispatch();
  const { adData } = useSelector(adDataSelector);
  const { sportData } = useSelector(manageSportDataSelector);
  const [modal, setModal] = useState(false);
  const [modalTitle, setModalContent] = useState("");
  const [action, setAction] = useState(() => () => {});
  console.log(adData, "sjka");

  const openModal = (id, type) => {
    if (type === "delete") {
      setModalContent("Do you want to delete this record?");
      setAction(() => async () => {
        try {
          const response = await AdDeleteApi({ adId: id }).unwrap();
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
        } catch (error) {}
      });
    }
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

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

  const [addUpdateAd, { data: addUpdateAdData, isSuccess: updataAdSuccess }] =
    useGetAddUpdateAdApiByNameMutation();

  const [
    AdDeleteApi,
    {
      data: adDeleteData,
      isLoading: adDeleteLoading,
      error: adDeleteError,
      isSuccess: adDeleteSuccess,
    },
  ] = useDeleteAdByNameMutation();

  const handleEditClick = (rowData) => {
    const sportValue = userAdData?.data?.filter((e) => {
      if (e._id === rowData?.rowData[6]) {
        return e;
      }
    });

    const v = SELECT_PAGE_TYPE.value === "Tip";

    const pagesValue =
      rowData?.rowData[5] === "Tip" ? "TIPPING PAGE" : rowData?.rowData[5];
    console.log(pagesValue, "bb");

    const payload = [
      {
        name: rowData?.rowData[0],
        type: rowData?.rowData[1],
        mediaType: rowData?.rowData[2],
        userType: rowData?.rowData[3],
        sport: sportValue?.length ? sportValue[0]?.sport : "",
        pages: pagesValue,
        redirectUrl: sportValue?.length ? sportValue[0]?.redirectUrl : "",

        id: rowData?.rowData[6],
      },
    ];
    console.log(payload, "payy");

    dispatch(getUserAdDataForEdit(payload));
    dispatch(knowWhereHaveToOpenModalForAd("edit"));
    dispatch(updateAdModalVisibility(true));
  };

  useEffect(() => {
    const reqParams = {
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userAdApi(reqParams);
  }, [updataAdSuccess]);

  useEffect(() => {
    const reqParams = {
      page: 0,
      sortValue: "",
      sortOrder: "",
    };
    userAdApi(reqParams);
  }, [adDeleteSuccess]);

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

      const transformedData = userAdData?.data?.map((ad) => {
        return {
          ...ad,
          sport: sportIdMap[ad.sport],
        };
      });

      dispatch(updateAdData(transformedData));
    }
  }, [listSportData, userAdData, listSportSuccess, userAdSuccess]);

  useEffect(() => {
    dispatch(setCurrentModule("Ad"));
  }, []);

  return (
    <>
      <ManageUsersContainer>
        <ManageUsersWrapper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <ManageUsersHeading>AD</ManageUsersHeading>
            <AddAdModal
              addUpdateAd={addUpdateAd}
              addUpdateAdData={addUpdateAdData}
              listSportData={listSportData}
            />
          </Box>

          <SearchContainer>
            <ManageUserTableWrapper>
              <MUIDataTable
                data={adData}
                columns={AD_TABLE_COLUMNS(handleEditClick, openModal)}
                options={AD_OPTIONS(userAdData, userAdApi, userAdLoading)}
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
export default AdsContent;
