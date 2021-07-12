import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../Helpers/ApiHelper";
import { logger } from "../Helpers/Logger";
import { DefaultErrorMessage } from "../config/Constants";
import {
  showLoader,
  hideLoader,
  OptionsActions,
  getOptionsSuccess,
  getOptionsSuccessById,
} from "../actions";
let toastId = null;
const addOptionsLogic = createLogic({
  type: OptionsActions.ADD_OPTIONS_REQUEST,
  cancelType: OptionsActions.ADD_OPTIONS_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getOptionsSuccess({ updateReq: "Start" }));
    let data =
      getState().OptionsReducer && getState().OptionsReducer.data
        ? getState().OptionsReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/option",
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
        getOptionsSuccess({
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
const getOptionsLogic = createLogic({
  type: OptionsActions.GET_OPTIONS_REQUEST,
  cancelType: OptionsActions.GET_OPTIONS_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getOptionsSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/option",
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
        getOptionsSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getOptionsSuccess({
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

const getOptionsByIdLogic = createLogic({
  type: OptionsActions.GET_OPTIONS_REQUEST_BY_ID,
  cancelType: OptionsActions.GET_OPTIONS_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/option/" + action.payload.option_id],
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
      dispatch(getOptionsSuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

const updateOptionsLogic = createLogic({
  type: OptionsActions.UPDATE_OPTIONS_REQUEST,
  cancelType: OptionsActions.UPDATE_OPTIONS_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getOptionsSuccess({ updateReq: "Start" }));
    let data =
      getState().OptionsReducer && getState().OptionsReducer.data
        ? getState().OptionsReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/option/" + action.payload.option_id],
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
        let index = data.findIndex((item) => item._id === action.payload.option_id);
        data.splice(index, 1)
      } else {
        let index = data.findIndex((item) => item._id === action.payload.option_id);
        data[index] = result.data;
      }
      dispatch(
        getOptionsSuccess({ data: data, isLoading: false, updateReq: "End" })
      );
      done();
      return;
    }
  },
});


export const OptionsLogic = [
  addOptionsLogic,
  getOptionsLogic,
  updateOptionsLogic,
  getOptionsByIdLogic,
];
