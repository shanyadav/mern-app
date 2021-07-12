import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../Helpers/ApiHelper";
import { logger } from "../Helpers/Logger";
import { DefaultErrorMessage } from "../config/Constants";
import {
  showLoader,
  hideLoader,
  categoriesActions,
  getCategoriesSuccess,
  getCategoriesRequest,
  modalCloseRequest,
} from "../actions";
let toastId = null;

/**
 *  CRUD Categories
 */

const addCategoriesLogic = createLogic({
  type: categoriesActions.ADD_CATEGORIE_REQUEST,
  cancelType: categoriesActions.ADD_CATEGORIE_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getCategoriesSuccess({ updateReq: "Start" }));
    let data =
      getState().CategorieReducer && getState().CategorieReducer.data
        ? getState().CategorieReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/category",
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
        getCategoriesSuccess({
          data: [...data, result.data],
          updateReq: "End",
        })
      );
      done();
    }
  },
});

// GetList
const getCategoriesLogic = createLogic({
  type: categoriesActions.GET_CATEGORIE_REQUEST,
  cancelType: categoriesActions.GET_CATEGORIE_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getCategoriesSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/category",
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
        getCategoriesSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getCategoriesSuccess({
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

// Update

const updateCategoriesLogic = createLogic({
  type: categoriesActions.UPDATE_CATEGORIE_REQUEST,
  cancelType: categoriesActions.UPDATE_CATEGORIE_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getCategoriesSuccess({ updateReq: "Start" }));
    let data =
      getState().CategorieReducer && getState().CategorieReducer.data
        ? getState().CategorieReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/category/" + action.payload.cId],
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
      let index = data.findIndex((item) => item._id === action.payload.cId);
      data[index] = result.data;
      dispatch(getCategoriesSuccess({ data: data, updateReq: "End" }));
      done();
      return;
    }
  },
});

// Update order

const updateCategoryOrderLogic = createLogic({
  type: categoriesActions.UPDATE_CATEGORY_ORDER_REQQUEST,
  cancelType: categoriesActions.UPDATE_CATEGORY_ORDER_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getCategoriesSuccess({ updateReq: "Start" }));
    let data =
      getState().CategorieReducer && getState().CategorieReducer.data
        ? getState().CategorieReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "/move",
      "/category",
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
      dispatch(getCategoriesSuccess({ data: data, updateReq: "End" }));
      done();
      return;
    }
  },
});

// ADD Bulk DATA

const addBulkCategoriesLogic = createLogic({
  type: categoriesActions.ADD_BULKCATEGORIE_REQUEST,
  cancelType: categoriesActions.ADD_BULKCATEGORIE_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/category-bulk-create",
      "POST",
      true,
      undefined,
      action.payload
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
      toastId = toast.success("Add Successfully!");
      dispatch(modalCloseRequest({ bulkCategoryModalOpen: false }));
      dispatch(getCategoriesRequest());
      dispatch(hideLoader());
      done();
    }
  },
});

export const CategoriesLogic = [
  addCategoriesLogic,
  getCategoriesLogic,
  updateCategoriesLogic,
  updateCategoryOrderLogic,
  addBulkCategoriesLogic,
];
