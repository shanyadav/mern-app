import { handleActions } from "redux-actions";
import { OptionsActions } from "../actions";

const initialState = {
  data: [],
  updateReq:"End",
  isLoading: false,
  dataById: {},
};

export const OptionsReducer = handleActions(
  {
    [OptionsActions.GET_OPTIONS_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [OptionsActions.GET_OPTIONS_SUCCESS_BY_ID]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
