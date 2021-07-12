import { handleActions } from "redux-actions";
import { hourDiscountActions } from "../../actions";

const initialState = {
  data: [],
  updateReq:"End",
  isLoading: false,
  dataById: {},
};

export const HourDiscountReducer = handleActions(
  {
    [hourDiscountActions.GET_HOUREDISCOUNT_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [hourDiscountActions.GET_HOUREDISCOUNT_SUCCESS_BY_ID]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
