import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../Helpers/ApiHelper";
import { logger } from "../Helpers/Logger";
import { DefaultErrorMessage } from "../config/Constants";
import {
  showLoader,
  hideLoader,
  OptionsAttributeActions,
  getOptionsAttributeSuccess,
  getOptionsAttributeSuccessById,
} from "../actions";
let toastId = null;

/**
 *  CRUD Categories
 */
const addOptionsAttributeLogic = createLogic({
  type: OptionsAttributeActions.ADD_OPTIONSATTRIBUTE_REQUEST,
  cancelType: OptionsAttributeActions.ADD_OPTIONSATTRIBUTE_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getOptionsAttributeSuccess({ updateReq: "Start" }));
    let data =
      getState().OptionsAttributeReducer && getState().OptionsAttributeReducer.data
        ? getState().OptionsAttributeReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/attribute",
      "POST",
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
      dispatch(
        getOptionsAttributeSuccess({
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
const getOptionsAttributeLogic = createLogic({
  type: OptionsAttributeActions.GET_OPTIONSATTRIBUTE_REQUEST,
  cancelType: OptionsAttributeActions.GET_OPTIONSATTRIBUTE_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getOptionsAttributeSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/attribute",
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
        getOptionsAttributeSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getOptionsAttributeSuccess({
          data: result.data ? result.data : [],
          isLoading: false,
          updateReq: "End",
        })
      );
      done();
      return;
    }
  },
});

// get data by id

const getOptionsAttributeByIdLogic = createLogic({
  type: OptionsAttributeActions.GET_OPTIONSATTRIBUTE_REQUEST_BY_ID,
  cancelType: OptionsAttributeActions.GET_OPTIONSATTRIBUTE_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/attribute/" + action.payload.attribute_id],
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
      dispatch(getOptionsAttributeSuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

const updateOptionsAttributeLogic = createLogic({
  type: OptionsAttributeActions.UPDATE_OPTIONSATTRIBUTE_REQUEST,
  cancelType: OptionsAttributeActions.UPDATE_OPTIONSATTRIBUTE_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getOptionsAttributeSuccess({ updateReq: "Start" }));
    let data =
      getState().OptionsAttributeReducer && getState().OptionsAttributeReducer.data
        ? getState().OptionsAttributeReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/attribute/" + action.payload.attribute_id],
      "PUT",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(getOptionsAttributeSuccess({ updateReq: "End" }));
      done();
      return;
    } else {
      logger(result);
      if (result.data && result.data.is_removed) {
        let index = data.findIndex((item) => item._id === action.payload.attribute_id);
        data.splice(index, 1)
      } else {
        let index = data.findIndex((item) => item._id === action.payload.attribute_id);
        data[index] = result.data;
      }
      dispatch(getOptionsAttributeSuccess({ updateReq: "End", data: data }));
      done();
      return;
    }
  },
});



export const OptionsAttributeLogic = [
  addOptionsAttributeLogic,
  getOptionsAttributeLogic,
  updateOptionsAttributeLogic,
  getOptionsAttributeByIdLogic,
];
