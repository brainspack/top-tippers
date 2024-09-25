import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArticleFormContainer,
  ArticleFormWrapper,
  CustomBtn,
  FormInner,
} from "./ArticleFormStyle";
import { Controller, useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import CustomAddSportLabel from "../reuse/CustomAddSportLabel";
import DateRangePicker from "../../components/master/DatePickerComponent";
import { useTeamListByNameMutation } from "../../api/GetTeamList";
import { useListGamesByNameMutation } from "../../api/ListGames";
import { useListRoundsByNameMutation } from "../../api/ListRounds";
import { useGetUserListSportApiByNameMutation } from "../../api/listSport";
import {
  updateAllTeamData,
  updateGameList,
} from "../../slices/manageGame/manageGame";
import { updateRoundList } from "../../slices/manageRound/manageRound";
import {
  updateSportList,
  updateTeamList,
} from "../../slices/manageTeam/manageTeam";
import { manageRoundSelector } from "../../slices/manageRound/manageRoundSelector";
import { manageGameSelector } from "../../slices/manageGame/manageGameSelector";
import UploadIcon from "@mui/icons-material/Upload";
import CustomTimePicker from "../reuse/CustomTimePicker";
import TextEditor from "./TextEditor";
import { useAddArticleByNameMutation } from "../../api/AddArticle";
import { handleNotification } from "../../slices/Snackbar";
import { useNavigate, useParams } from "react-router-dom";
import { articleDataSelector } from "../../slices/Article/articleSelector";
import moment from "moment";
import { useLazyGetArticleDetailsApiByNameQuery } from "../../api/getArticleDetails";
import { updateFilteredArticleData } from "../../slices/Article/article";
import { useEditArticleByNameMutation } from "../../api/EditArticle";

function AddArticleForm() {
  const dispatch = useDispatch();
  const { articleid } = useParams();
  const { roundData } = useSelector(manageRoundSelector);
  const { allTeamData, gameData } = useSelector(manageGameSelector);
  const { filteredArticleData, selectArticleType } =
    useSelector(articleDataSelector);
  console.log(filteredArticleData, "filteredArticleData");

  // ROUND API
  const [
    listRoundsApi,
    {
      data: listRoundsData,
      isLoading: listRoundsLoading,
      error: listRoundsError,
      isSuccess: listRoundsSuccess,
    },
  ] = useListRoundsByNameMutation();

  // LIST SPORT API
  const [
    listSportApi,
    {
      data: listSportData,
      isLoading,
      error: listSportError,
      success: listSportSuccess,
    },
  ] = useGetUserListSportApiByNameMutation();
  useEffect(() => {
    listSportApi({ count: 1000, isActive: true });
  }, []);

  // TEAM LIST API
  const [
    teamListApi,
    { data, isLoading: teamDataFetching, isSuccess: userListSuccess },
  ] = useTeamListByNameMutation();

  // GAME LIST API
  const [
    listGameApi,
    {
      data: listGamesData,
      isLoading: teamGameFetching,
      error,
      isSuccess: listGameSuccess,
    },
  ] = useListGamesByNameMutation();

  //  // ADD ARTICLE API
  const [
    addArticleApi,
    { data: addArticleData, isSuccess: addArticleSuccess },
  ] = useAddArticleByNameMutation();

  // TEAM LIST
  useEffect(() => {
    const fetchTeamList = async () => {
      try {
        const response = await teamListApi({
          count: 1000,
        }).unwrap();
        dispatch(updateAllTeamData(response));
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };

    fetchTeamList();
  }, []);

  // ROUND API
  useEffect(() => {
    const fetchRound = async () => {
      try {
        const response = await listRoundsApi({
          count: 1000,
          season: "current",
        }).unwrap();
        dispatch(updateRoundList(response));
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };

    fetchRound();
  }, []);

 

  // LIST GAME API
  useEffect(() => {
    const fetchGameList = async () => {
      try {
        const response = await listGameApi({
          count: 1000,
          season: "current",
        }).unwrap();
        dispatch(updateGameList(response));
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };

    fetchGameList();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    reset,
    clearErrors,
    watch,
  } = useForm({
    mode: "onChange",

    defaultValues: {
      title: "",
      addedby: "",
      url: "",
      articleType: "",
      sportId: "",
      sportIdd: "",
      gameId: "",
      articleType: "",
      teamId: "",
      text: "",
      roundId: "",
    },
    criteriaMode: "all",
    shouldFocusError: true,
  });

  const [filteredRounds, setFilteredRounds] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [selectTeam, setSelectTeam] = useState([]);

  const selectedSportId = watch("sportId");
  const selectedSportIdd = watch("sportIdd");
  const selectedRoundId = watch("roundId");

  useEffect(() => {
    if (selectedSportId) {
      const filtered = roundData?.data?.filter(
        (round) => round?.sport?._id === selectedSportId
      );
      setFilteredRounds(filtered);
    } else {
      setFilteredRounds([]);
    }
  }, [selectedSportId, roundData, setValue]);

  useEffect(() => {
    if (selectedSportIdd) {
      const filteredTeams = allTeamData?.data.filter(
        (team) => team?.sport?._id === selectedSportIdd
      );
      setSelectTeam(filteredTeams || []);
    }
  }, [selectedSportIdd, allTeamData, setValue]);

  // Filter games based on selected round
  useEffect(() => {
    if (selectedRoundId) {
      const games = gameData?.data.filter(
        (game) => game?.round?._id === selectedRoundId
      );
      setFilteredGames(games || []);
    } else {
      setFilteredGames([]);
    }
  }, [selectedRoundId, gameData]);

  ///// Image Uploader
  const [teamDetails, setTeamDetails] = useState({
    file: null,
    htmlFile: null,
  });

  const [image, setImage] = useState(null);
  const [htmlFileName, setHtmlFileName] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      setTeamDetails((prevDetails) => ({
        ...prevDetails,
        file: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const onHandleHtmlImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file.");
        return;
      }
      setTeamDetails((prevDetails) => ({
        ...prevDetails,
        htmlFile: file,
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        setHtmlFileName(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const navigate = useNavigate();
  const onhandleSubmit = async (data) => {

    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("content", data?.text);
    formData.append("addedby", data?.addedby);
    formData.append("files", teamDetails?.file);
    formData.append("htmlFiles", teamDetails?.htmlFile);
    formData.append("game", data?.gameId);
    formData.append("url", data?.url);
    formData.append("isActive", true);
    formData.append("publishDateTime", data?.publishDateTime);
    formData.append("teamId", data?.teamId);
    formData.append("articleType", data?.articleType);

    try {
      const result = await addArticleApi(formData).unwrap();
      if (result?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
        navigate("/admin/ladder");
      } else {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
      }
    } catch (error) {
      console.error("Failed to add Article:", error);
    }
  };

  const [
    editArticleApi,
    { data: editArticleData, isSuccess: editArticleSuccess },
  ] = useEditArticleByNameMutation();

  const onhandleUpdate = async (data) => {
    const formattedDate = moment(data?.publishDateTime).format(
      "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ [(India Standard Time)]"
    );
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("content", data?.text);
    formData.append("addedby", data?.addedby);
    formData.append("files", teamDetails?.file);
    formData.append("htmlFiles", teamDetails?.htmlFile);
    formData.append("game", data?.gameId);
    formData.append("url", data?.url);
    formData.append("_id", filteredArticleData?.data?._id);
    formData.append("publishDateTime", formattedDate);
    formData.append("teamId", data?.teamId);
    formData.append("articleType", data?.articleType);

    try {
      const result = await editArticleApi(formData).unwrap();
      if (result?.code === 200) {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
        navigate("/admin/ladder");
      } else {
        dispatch(
          handleNotification({
            state: true,
            message: result?.message,
            severity: result?.code,
          })
        );
      }
    } catch (error) {
      console.error("Failed to add Article:", error);
    }
  };
  //// ArticleDetails

  const [articleDetailsApi, { data: articleDetailsData }] =
    useLazyGetArticleDetailsApiByNameQuery();
  useEffect(() => {
    const fetchRound = async () => {
      try {
        if (selectArticleType === "edit") {
          const response = await articleDetailsApi({
            _id: articleid,
          }).unwrap();
          dispatch(updateFilteredArticleData(response));
        }
      } catch (err) {
        console.error("Error fetching sports data:", err);
      }
    };

    fetchRound();
  }, []);

  const formattedDate = moment(filteredArticleData?.data?.createdAt).format(
    "L"
  );

  useEffect(() => {
    if (selectArticleType === "edit") {
      setValue("title", filteredArticleData?.data?.title);
      setValue("addedby", filteredArticleData?.data?.addedby);
      setValue("url", filteredArticleData?.data?.redirectUrl);
      setValue("articleType", filteredArticleData?.data?.articleType);
      setValue("publishDateTime", formattedDate);
      setValue("sportIdd", filteredArticleData?.data?.gameId?.sport);
      setValue("sportId", filteredArticleData?.data?.gameId?.sport);
      setValue("teamId", filteredArticleData?.data?.teamId);
      setValue("time", filteredArticleData?.data?.publishDateTime);
      setValue("text", filteredArticleData?.data?.content);
      setValue("roundId", filteredArticleData?.data?.gameId?.round);
      setValue("gameId", filteredArticleData?.data?.gameId?._id);
    } else {
      reset();
    }
  }, [filteredArticleData, setValue, reset]);

  return (
    <ArticleFormContainer>
      <form
        onSubmit={handleSubmit(
          selectArticleType === "edit" ? onhandleUpdate : onhandleSubmit
        )}
      >
        <ArticleFormWrapper>
          <Box
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <FormInner>
              <div
                style={{
                  height: "auto",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <CustomAddSportLabel requiredInput="*" inputLabel="Title:" />
                <OutlinedInput
                  id="outlined-adornment-weight"
                  sx={{
                    width: "100%",
                    height: "34px",
                  }}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {errors.title?.message}
                  </FormHelperText>
                </div>
              </div>

              <div
                style={{
                  height: "auto",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <CustomAddSportLabel requiredInput="*" inputLabel="Writter:" />
                <OutlinedInput
                  id="outlined-adornment-weight"
                  sx={{
                    width: "100%",
                    height: "34px",
                  }}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  {...register("addedby", {
                    required: "Writter Name is required",
                  })}
                />
                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {errors.addedby?.message}
                  </FormHelperText>
                </div>
              </div>

              <div
                style={{
                  height: "auto",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Redairect url:"
                />
                <OutlinedInput
                  id="outlined-adornment-weight"
                  sx={{
                    width: "100%",
                    height: "34px",
                  }}
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  {...register("url", {
                    required: "Url is required",
                  })}
                />
                <div className="errorMsgParent">
                  <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                    {errors.url?.message}
                  </FormHelperText>
                </div>
              </div>

              <div
                style={{
                  height: "auto",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Select Article Type:"
                />

                <FormControl fullWidth {...register("articleType")}>
                  <Controller
                    name="articleType"
                    control={control}
                    rules={{ required: "Article Type is required" }}
                    render={({ field }) => (
                      <Select
                        displayEmpty
                        sx={{
                          fontSize: "14px",
                          height: "34px",
                        }}
                        {...field}
                        {...register("articleType")}
                      >
                        <MenuItem disabled>Article Type</MenuItem>
                        <MenuItem value="NRL" {...register("articleType")}>
                          NRL
                        </MenuItem>
                        <MenuItem value="ALF" {...register("articleType")}>
                          ALF
                        </MenuItem>
                        <MenuItem value="Cricket" {...register("articleType")}>
                          Cricket
                        </MenuItem>
                        <MenuItem value="other" {...register("articleType")}>
                          other
                        </MenuItem>
                      </Select>
                    )}
                  />
                  <div className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors.articleType?.message}
                    </FormHelperText>
                  </div>
                </FormControl>
              </div>
            </FormInner>
            <FormInner>
              <div
                style={{
                  height: "auto",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel requiredInput="*" inputLabel="Date:" />
                <Box sx={{ display: "flex" }}>
                  <DateRangePicker
                    control={control}
                    name="publishDateTime"
                    errors={errors}
                    register={register}
                    watch={watch}
                    clearErrors={clearErrors}
                    mode={"game"}
                    setValue={setValue}
                  />
                </Box>
              </div>
              <div
                style={{
                  height: "auto",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel requiredInput="*" inputLabel="Time:" />
                <Box
                  className="articleTimePicker"
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <CustomTimePicker
                    control={control}
                    setValue={setValue}
                    errors={errors}
                    name={"time"}
                  />
                </Box>
              </div>

              <div
                style={{
                  height: "auto",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Article Image/Video:"
                />
               
                <>
                  <input
                    accept="image/*"
                    id="upload-image"
                    type="file"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <label
                    htmlFor="upload-image"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      height: "34px",
                      cursor: "pointer",
                      background: "white",
                      borderRadius: "4px",
                      textAlign: "center",
                      border: "1px black !important",
                    }}
                  >
                    <IconButton component="span">
                      <UploadIcon />
                    </IconButton>
                    <span style={{ marginLeft: "8px" }}>Click to upload</span>
                  </label>
                </>
                {/* )} */}
                {/* /> */}
                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {errors.file?.message}
                  </FormHelperText>
                </div>
              </div>

              <div
                style={{
                  height: "auto",
                  width: "24%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="TopSport HTML Banner:"
                />

                {/* <Controller
                  name="htmlFiles"
                  control={control}
                  rules={{ required: "File is required" }}
                  render={({ field }) => ( */}
                <>
                  <input
                    type="file"
                    id="file-upload"
                    onChange={onHandleHtmlImageChange}
                    style={{ display: "none" }}
                    // {...field}
                  />
                  <label
                    htmlFor="file-upload"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      height: "34px",
                      cursor: "pointer",
                      background: "white",
                      borderRadius: "4px",
                      textAlign: "center",
                      border: "1px black !important",
                    }}
                  >
                    <IconButton component="span">
                      <UploadIcon />
                    </IconButton>
                    <span style={{ marginLeft: "8px" }}>Click to upload</span>
                  </label>
                </>
                {/* )}
                /> */}
                <div className="errorMsgParent">
                  <FormHelperText sx={{ color: "#d32f2f" }}>
                    {errors.htmlFiles?.message}
                  </FormHelperText>
                </div>
              </div>
            </FormInner>
            <FormInner>
              <Box
                style={{
                  height: "auto",
                  width: "19%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Select Sports for team :"
                />
                <FormControl
                  fullWidth
                  {...register("sportIdd")}
                >
                  <Controller
                    name="sportIdd"
                    control={control}
                    rules={{ required: "Select Sport is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{
                          fontSize: "14px",
                          height: "34px",
                        }}
                        {...register("sportIdd")}
                      >
                        <MenuItem sx={{ color: "grey !important" }} disabled>
                          Select a sport
                        </MenuItem>
                        {listSportData?.data?.map((sport) => (
                          <MenuItem
                            key={sport?._id}
                            value={sport?._id}
                            {...register("sportIdd")}
                          >
                            {sport?.sportname}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <Box className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors?.sportIdd?.message}
                    </FormHelperText>
                  </Box>
                </FormControl>
              </Box>

              <Box
                style={{
                  height: "auto",
                  width: "19%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Select Team :"
                />

                <FormControl fullWidth {...register("teamId")}>
                  <Controller
                    name="teamId"
                    control={control}
                    rules={{ required: "Select team is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{
                          fontSize: "14px",
                          height: "34px",
                        }}
                        {...register("teamId")}
                      >
                        {selectTeam.length > 0 ? (
                          selectTeam.map((team) => (
                            <MenuItem
                              key={team?._id}
                              value={team?._id}
                              {...register("teamId")}
                            >
                              {team?.teamname}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No team available</MenuItem>
                        )}
                      </Select>
                    )}
                  />

                  <Box className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors.teamId?.message}
                    </FormHelperText>
                  </Box>
                </FormControl>
              </Box>
              <Box
                style={{
                  height: "auto",
                  width: "19%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Select Sports:"
                />
                <FormControl fullWidth {...register("sportId")}>
                  <Controller
                    name="sportId"
                    control={control}
                    rules={{ required: "Select Sport is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{
                          fontSize: "14px",
                          height: "34px",
                        }}
                        {...register("sportId")}
                      >
                        {listSportData?.data?.map((sport) => (
                          <MenuItem
                            key={sport?._id}
                            value={sport?._id}
                            {...register("sportId")}
                          >
                            {sport?.sportname}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                  <Box className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors?.sportId?.message}
                    </FormHelperText>
                  </Box>
                </FormControl>
              </Box>
              <Box
                style={{
                  height: "auto",
                  width: "19%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Select Round :"
                />

                <FormControl fullWidth {...register("roundId")}>
                  <Controller
                    name="roundId"
                    control={control}
                    rules={{ required: "Select Round is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{
                          fontSize: "14px",
                          height: "34px",
                        }}
                        {...register("roundId")}
                      >
                        {filteredRounds.length > 0 ? (
                          filteredRounds.map((rounds) => (
                            <MenuItem
                              key={rounds._id}
                              value={rounds._id}
                              {...register("roundId")}
                            >
                              {rounds?.roundname}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No rounds available</MenuItem>
                        )}
                      </Select>
                    )}
                  />

                  <Box className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors?.roundId?.message}
                    </FormHelperText>
                  </Box>
                </FormControl>
              </Box>
              <Box
                style={{
                  height: "auto",
                  width: "19%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "13px",
                }}
              >
                <CustomAddSportLabel
                  requiredInput="*"
                  inputLabel="Select Game :"
                />

                <FormControl fullWidth {...register("gameId")}>
                  <Controller
                    name="gameId"
                    control={control}
                    rules={{ required: "Select game is required" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        displayEmpty
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        sx={{
                          fontSize: "14px",
                          height: "34px",
                        }}
                        {...register("gameId")}
                      >
                        {filteredGames.length > 0 ? (
                          filteredGames.map((game) => {
                            return (
                              <MenuItem
                                key={game?._id}
                                value={game?._id}
                                {...register("gameId")}
                              >
                                {`${game?.homeTeam?.teamname} vs ${game?.awayTeam?.teamname}`}
                              </MenuItem>
                            );
                          })
                        ) : (
                          <MenuItem disabled>No game available</MenuItem>
                        )}
                      </Select>
                    )}
                  />

                  <Box className="errorMsgParent">
                    <FormHelperText sx={{ ml: 0, color: "#d32f2f" }}>
                      {errors?.gameId?.message}
                    </FormHelperText>
                  </Box>
                </FormControl>
              </Box>
            </FormInner>
          </Box>
          <Box sx={{ height: "auto" }}>
            <TextEditor
              control={control}
              name={"text"}
              selectArticleType={selectArticleType}
            />
          </Box>

          <Box sx={{ display: "flex", gap: "20px" }}>
            {selectArticleType === "edit" ? (
              <CustomBtn type="submit">Save Edit</CustomBtn>
            ) : (
              <>
                <CustomBtn>Draft</CustomBtn>
                <CustomBtn type="submit">Save</CustomBtn>
              </>
            )}
          </Box>
        </ArticleFormWrapper>
      </form>
    </ArticleFormContainer>
  );
}

export default AddArticleForm;
