import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Constants";
import { AppRoutes } from "../../config/AppRoutes";
import {
  showLoader,
  hideLoader,
  hourDiscountActions,
  getHoureDiscountSuccess,
  getHoureDiscountSuccessById,
} from "../../actions";
let toastId = null;



const addHoureDiscountLogic = createLogic({
  type: hourDiscountActions.ADD_HOUREDISCOUNT_REQUEST,
  cancelType: hourDiscountActions.ADD_HOUREDISCOUNT_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getHoureDiscountSuccess({ updateReq: "Start" }));
    let data =
      getState().HourDiscountReducer && getState().HourDiscountReducer.data
        ? getState().HourDiscountReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/hour-discount",
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
        getHoureDiscountSuccess({
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
const getHoureDiscountLogic = createLogic({
  type: hourDiscountActions.GET_HOUREDISCOUNT_REQUEST,
  cancelType: hourDiscountActions.GET_HOUREDISCOUNT_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getHoureDiscountSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/hour-discount",
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
        getHoureDiscountSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getHoureDiscountSuccess({
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

const getHoureDiscountByIdLogic = createLogic({
  type: hourDiscountActions.GET_HOUREDISCOUNT_REQUEST_BY_ID,
  cancelType: hourDiscountActions.GET_HOUREDISCOUNT_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/hour-discount/" + action.payload.discount_id],
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
      dispatch(getHoureDiscountSuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

const updateHoureDiscountLogic = createLogic({
  type: hourDiscountActions.UPDATE_HOUREDISCOUNT_REQUEST,
  cancelType: hourDiscountActions.UPDATE_HOUREDISCOUNT_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getHoureDiscountSuccess({ updateReq: "Start" }));
    let data =
      getState().HourDiscountReducer && getState().HourDiscountReducer.data
        ? getState().HourDiscountReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/hour-discount/" + action.payload.discount_id],
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
        getHoureDiscountSuccess({ data: data, isLoading: false, updateReq: "End" })
      );
      done();
      return;
    }
  },
});


export const HoureDiscountLogic = [
  addHoureDiscountLogic,
  getHoureDiscountLogic,
  updateHoureDiscountLogic,
  getHoureDiscountByIdLogic,
];
