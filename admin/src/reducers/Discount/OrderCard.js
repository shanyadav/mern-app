import { handleActions } from "redux-actions";
import { OrderDiscountActions } from "../../actions";

const initialState = {
  PickUpCarddata:[],
  DeliveryCardData:[],
  updateReq:"End",
  isLoading: false,
  dataById: {},
};

export const OrderDiscountReducer = handleActions(
  {
    [OrderDiscountActions.GET_ORDERDISCOUNT_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [OrderDiscountActions.GET_ORDERDISCOUNT_SUCCESS_BY_ID]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
