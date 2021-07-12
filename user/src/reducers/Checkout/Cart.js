import { handleActions } from "redux-actions";
import { cartAction } from "../../actions";

const initialState = {
  data: [],
  isLoading: false,
};

export const CartReducer = handleActions(
  {
    [cartAction.GET_CART_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
