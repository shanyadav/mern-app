import { handleActions } from "redux-actions";
import { DiscountCategoryActions } from "../../actions";

const initialState = {
  redundant: [],
  subscriber:[],
  payment:[],
  updateReq:"End",
  isLoading: false,
  dataById: {},
};

export const DiscountCategoryReducer = handleActions(
  {
    [DiscountCategoryActions.GET_DISCOUNTCATRGORY_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [DiscountCategoryActions.GET_DISCOUNTCATRGORY_SUCCESS_BY_ID]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
