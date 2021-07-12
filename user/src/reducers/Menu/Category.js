import { handleActions } from "redux-actions";
import { categoriesActions } from "../../actions";

const initialState = {
  data: [],
  isLoading: false,
  dataById: {},
};

export const CategorieReducer = handleActions(
  {
    [categoriesActions.GET_CATEGORIE_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
