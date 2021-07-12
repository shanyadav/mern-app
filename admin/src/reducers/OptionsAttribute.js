import { handleActions } from "redux-actions";
import { OptionsAttributeActions } from "../actions";

const initialState = {
  data: [],
  updateReq:"End",
  isLoading: false,
  dataById: {},
};

export const OptionsAttributeReducer = handleActions(
  {
    [ OptionsAttributeActions.GET_OPTIONSATTRIBUTE_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [ OptionsAttributeActions.GET_OPTIONSATTRIBUTE_SUCCESS_BY_ID]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
