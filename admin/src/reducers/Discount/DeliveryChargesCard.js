import { handleActions } from "redux-actions";
import { DeliveryChargesAction } from "../../actions";

const initialState = {
  data: [],
  updateReq:"End",
  isLoading: false,
  dataById: {},
};

export const DeliveryChargesReducer = handleActions(
  {
    [DeliveryChargesAction.GET_DELIVERYCHARGES_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [DeliveryChargesAction.GET_DELIVERYCHARGES_SUCCESS_BY_ID]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
