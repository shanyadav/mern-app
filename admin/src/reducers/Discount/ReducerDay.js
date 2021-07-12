import { handleActions } from "redux-actions";
import { DayDiscountActions } from "../../actions";

const initialState = {
  data: [],
  updateReq:"End",
  isLoading: false,
  dataById: {},
};

export const DayDiscountReducer = handleActions(
  {
    [DayDiscountActions.GET_DAYDISCOUNT_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [DayDiscountActions.GET_DAYDISCOUNT_SUCCESS_BY_ID]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
