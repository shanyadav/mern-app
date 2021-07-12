import { handleActions } from "redux-actions";
import {subCategoriesActions } from "../actions";

const initialState = {
  data:[],
  updateReq:"End",
  isLoading:false,
};

export const SubCategorieReducer = handleActions(
  {
    [subCategoriesActions.GET_SUBCATEGORIE_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);