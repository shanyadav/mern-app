import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../Helpers/ApiHelper";
import { logger } from "../Helpers/Logger";
import { DefaultErrorMessage } from "../config/Constants";
import {
  subCategoriesActions,
  getSubCategoriesSuccess,
} from "../actions";
let toastId = null;

/**
 *  CRUD Categories
 */
const addSubCategoriesLogic = createLogic({
  type: subCategoriesActions.ADD_SUBCATEGORIE_REQUEST,
  cancelType: subCategoriesActions.ADD_SUBCATEGORIE_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getSubCategoriesSuccess({ updateReq: "Start" }));
    let data =
      getState().SubCategorieReducer && getState().SubCategorieReducer.data
        ? getState().SubCategorieReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/sub-category",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(getSubCategoriesSuccess({ updateReq: "End" }));
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getSubCategoriesSuccess({
          updateReq: "End",
          data: [...data, result.data],
        })
      );
      done();
    }
  },
});

// getList
const getSubCategoriesLogic = createLogic({
  type: subCategoriesActions.GET_SUBCATEGORIE_REQUEST,
  cancelType: subCategoriesActions.GET_SUBCATEGORIE_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getSubCategoriesSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/sub-category",
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
        getSubCategoriesSuccess({
          isLoading: false,
          updateReq: "End",
          data: [],
        })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getSubCategoriesSuccess({
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

// update

const updateSubCategoriesLogic = createLogic({
  type: subCategoriesActions.UPDATE_SUBCATEGORIE_REQUEST,
  cancelType: subCategoriesActions.UPDATE_SUBCATEGORIE_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getSubCategoriesSuccess({ updateReq: "Start" }));
    let data =
      getState().SubCategorieReducer && getState().SubCategorieReducer.data
        ? getState().SubCategorieReducer.data
        : [];
    let sub_category_id = action.payload.sub_category_id;
    delete action.payload.sub_category_id;
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/sub-category/" + sub_category_id],
      "PUT",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      //dispatch(getSubCategoriesSuccess({ updateReq: "End" }));
      done();
      return;
    } else {
      logger(result);
      let index = data.findIndex((item) => item._id === sub_category_id);
      data[index] = result.data;
      dispatch(getSubCategoriesSuccess({ updateReq: "End", data: data }));
      done();
      return;
    }
  },
});

// update order

const updateSubCategoryOrderLogic = createLogic({
  type: subCategoriesActions.UPDATE_SUBCATEGORY_ORDER_REQQUEST,
  cancelType: subCategoriesActions.UPDATE_SUBCATEGORY_ORDER_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getSubCategoriesSuccess({ updateReq: "Start" }));
    let data =
      getState().SubCategorieReducer && getState().SubCategorieReducer.data
        ? getState().SubCategorieReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "/move",
      "/sub-category",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      //dispatch(getSubCategoriesSuccess({ updateReq: "End" }));
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
      dispatch(getSubCategoriesSuccess({ updateReq: "End", data: data }));
      done();
      return;
    }
  },
});

export const SubCategoriesLogic = [
  addSubCategoriesLogic,
  getSubCategoriesLogic,
  updateSubCategoriesLogic,
  updateSubCategoryOrderLogic,
];
