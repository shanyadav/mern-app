import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../Helpers/ApiHelper";
import { logger } from "../Helpers/Logger";
import { DefaultErrorMessage } from "../config/Constants";
import {
  showLoader,
  hideLoader,
  ListItemsActions,
  getListItemsSuccess,
  getListItemsSuccessById,
} from "../actions";
let toastId = null;

/**
 *  CRUD Categories
 */
const addListItemsLogic = createLogic({
  type: ListItemsActions.ADD_LISTITEMS_REQUEST,
  cancelType: ListItemsActions.ADD_LISTITEMS_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getListItemsSuccess({ updateReq: "Start" }));
    let data =
      getState().ItemsReducer && getState().ItemsReducer.data
        ? getState().ItemsReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/item",
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
        getListItemsSuccess({
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
const getListItemsLogic = createLogic({
  type: ListItemsActions.GET_LISTITEMS_REQUEST,
  cancelType: ListItemsActions.GET_LISTITEMS_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getListItemsSuccess({ isLoading: false, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/item",
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
        getListItemsSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getListItemsSuccess({
          data: result.data?result.data:[],
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

const getListItemsByIdLogic = createLogic({
  type: ListItemsActions.GET_LISTITEMS_REQUEST_BY_ID,
  cancelType: ListItemsActions.GET_LISTITEMS_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/item/" + action.payload.item_id],
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
      dispatch(getListItemsSuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

const updateListItemsLogic = createLogic({
  type: ListItemsActions.UPDATE_LISTITEMS_REQUEST,
  cancelType: ListItemsActions.UPDATE_LISTITEMS_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getListItemsSuccess({ updateReq: "Start" }));
    let data =
      getState().ItemsReducer && getState().ItemsReducer.data
        ? getState().ItemsReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/item/" + action.payload.item_id],
      "PUT",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(getListItemsSuccess({ updateReq: "End" }));
      done();
      return;
    } else {
      logger(result);
      let index = data.findIndex((item) => item._id === action.payload.item_id);
      data[index] = result.data;
      dispatch(getListItemsSuccess({ updateReq: "End", data: data }));
      done();
      return;
    }
  },
});

// update order

const updateListItemsOrderLogic = createLogic({
  type: ListItemsActions.UPDATE_LISTITEMS_ORDER_REQQUEST,
  cancelType: ListItemsActions.UPDATE_LISTITEMS_ORDER_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getListItemsSuccess({ updateReq: "Start" }));
    let data =
      getState().ItemsReducer && getState().ItemsReducer.data
        ? getState().ItemsReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "/move",
      "/item",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(getListItemsSuccess({ updateReq: "End" }));
      done();
      return;
    } else {
      logger(result);
      if (action.payload.start_index > action.payload.end_index) {
        for (
          let i = action.payload.end_index - 1;
          i < action.payload.start_index;
          i++
        ) {
          if (data[i]._id !== action.payload.start_index_id)
            data[i] = { ...data[i], order: data[i].order + 1 };
          else data[i] = { ...data[i], order: action.payload.end_index };
        }
      } else {
        for (
          let i = action.payload.start_index - 1;
          i < action.payload.end_index;
          i++
        ) {
          if (data[i]._id !== action.payload.start_index_id)
            data[i] = { ...data[i], order: data[i].order - 1 };
          else data[i] = { ...data[i], order: action.payload.end_index };
        }
      }
      data.sort(function (a, b) {
        return a.order - b.order;
      });
      dispatch(getListItemsSuccess({ updateReq: "End", data: data }));
      done();
      return;
    }
  },
});

export const ListItemsLogic = [
  addListItemsLogic,
  getListItemsLogic,
  updateListItemsLogic,
  getListItemsByIdLogic,
  updateListItemsOrderLogic
];
