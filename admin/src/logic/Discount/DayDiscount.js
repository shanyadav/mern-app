import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Constants";
import {
  showLoader,
  hideLoader,
  DayDiscountActions,
  getDayDiscountSuccess,
  getDayDiscountSuccessById,
} from "../../actions";
let toastId = null;



const addDayDiscountLogic = createLogic({
  type: DayDiscountActions.ADD_DAYDISCOUNT_REQUEST,
  cancelType: DayDiscountActions.ADD_DAYDISCOUNT_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getDayDiscountSuccess({ updateReq: "Start" }));
    let data =
      getState().DayDiscountReducer && getState().DayDiscountReducer.data
        ? getState().DayDiscountReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/day-discount",
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
        getDayDiscountSuccess({
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
const getDayDiscountLogic = createLogic({
  type: DayDiscountActions.GET_DAYDISCOUNT_REQUEST,
  cancelType: DayDiscountActions.GET_DAYDISCOUNT_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getDayDiscountSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/day-discount",
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
        getDayDiscountSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getDayDiscountSuccess({
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

const getDayDiscountByIdLogic = createLogic({
  type: DayDiscountActions.GET_DAYDISCOUNT_REQUEST_BY_ID,
  cancelType: DayDiscountActions.GET_DAYDISCOUNT_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/day-discount/" + action.payload.discount_id],
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
      dispatch(getDayDiscountSuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

const updateDayDiscountLogic = createLogic({
  type: DayDiscountActions.UPDATE_DAYDISCOUNT_REQUEST,
  cancelType: DayDiscountActions.UPDATE_DAYDISCOUNT_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getDayDiscountSuccess({ updateReq: "Start" }));
    let data =
      getState().DayDiscountReducer && getState().DayDiscountReducer.data
        ? getState().DayDiscountReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/day-discount/" + action.payload.discount_id],
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
        let index = data.findIndex((item) => item._id === action.payload.discount_id);
        data.splice(index, 1)
      } else {
        let index = data.findIndex((item) => item._id === action.payload.discount_id);
        data[index] = result.data;
      }
      dispatch(
        getDayDiscountSuccess({ data: data, isLoading: false, updateReq: "End" })
      );
      done();
      return;
    }
  },
});


export const DayDiscountLogic = [
  addDayDiscountLogic,
  getDayDiscountLogic,
  updateDayDiscountLogic,
  getDayDiscountByIdLogic,
];
