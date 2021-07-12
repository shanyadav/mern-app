import { handleActions } from "redux-actions";
import { ServiceDiscountActions } from "../../actions";

const initialState = {
  data: [],
  updateReq:"End",
  isLoading: false,
  dataById: {},
};

export const ServiceDiscountReducer = handleActions(
  {
    [ServiceDiscountActions.GET_SERVICEDISCOUNT_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [ServiceDiscountActions.GET_SERVICEDISCOUNT_SUCCESS_BY_ID]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
