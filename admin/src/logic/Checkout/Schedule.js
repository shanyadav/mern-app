import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Constants";
import {
  showLoader,
  hideLoader,
  ScheduleActions,
  getDayScheduleSuccess,
  getDayScheduleSuccessById,
} from "../../actions";
let toastId = null;



const addDayScheduleLogic = createLogic({
  type: ScheduleActions.ADD_SCHEDULE_REQUEST,
  cancelType: ScheduleActions.ADD_SCHEDULE_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getDayScheduleSuccess({ updateReq: "Start" }));
    let data =
      getState().ScheduleReducer && getState().ScheduleReducer.data
        ? getState().ScheduleReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/day-schedule",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      // dispatch(hideLoader());
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getDayScheduleSuccess({
          data: [result.data, ...data],
          isLoading: false,
          updateReq: "End",
        })
      );
      dispatch(hideLoader());
      done();
    }
  },
});

// getList
const getDayScheduleLogic = createLogic({
  type: ScheduleActions.GET_SCHEDULE_REQUEST,
  cancelType: ScheduleActions.GET_SCHEDULE_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getDayScheduleSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/day-schedule",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(
        getDayScheduleSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getDayScheduleSuccess({
          data: result.data,
          isLoading: false,
          updateReq: "End",
        })
      );
      done();
      return;
    }
  },
});

// get Data by Id

const getDayScheduleByIdLogic = createLogic({
  type: ScheduleActions.GET_SCHEDULE_REQUEST_BY_ID,
  cancelType: ScheduleActions.GET_SCHEDULE_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/day-schedule/" + action.payload.schedule_id],
      "GET",
      true,
      undefined,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(hideLoader());
      done();
      return;
    } else {
      logger(result);
      dispatch(getDayScheduleSuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

const updateDayScheduleLogic = createLogic({
  type: ScheduleActions.UPDATE_SCHEDULE_REQUEST,
  cancelType: ScheduleActions.UPDATE_SCHEDULE_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getDayScheduleSuccess({ updateReq: "Start" }));
    let data =
      getState().ScheduleReducer && getState().ScheduleReducer.data
        ? getState().ScheduleReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/day-schedule/" + action.payload.schedule_id],
      "PUT",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      done();
      return;
    } else {
      logger(result);
      if (result.data && result.data.is_removed) {
        let index = data.findIndex((item) => item._id === action.payload.schedule_id);
        data.splice(index, 1)
      } else {
        let index = data.findIndex((item) => item._id === action.payload.schedule_id);
        data[index] = result.data;
      }
      dispatch(
        getDayScheduleSuccess({ data: data, isLoading: false, updateReq: "End" })
      );
      done();
      return;
    }
  },
});


export const DayScheduleLogic = [
  addDayScheduleLogic,
  getDayScheduleLogic,
  updateDayScheduleLogic,
  getDayScheduleByIdLogic,
];
