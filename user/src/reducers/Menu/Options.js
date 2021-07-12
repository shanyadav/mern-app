import { handleActions } from "redux-actions";
import { OptionAction } from "../../actions";

const initialState = {
  data: [],
  isLoading: false,
};

export const OptionsReducer = handleActions(
  {
    [OptionAction.GET_OPTION_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
