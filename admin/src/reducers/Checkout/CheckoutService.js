import { handleActions } from "redux-actions";
import { CheckoutServiceAction } from "../../actions";

const initialState = {
  data: [],
  BegData:[],
  TipData:[],
  updateReq:"End",
  isLoading: false,
};

export const CheckoutServiceReducer = handleActions(
  {
    [CheckoutServiceAction.GET_CHECKOUTSERVICE_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
