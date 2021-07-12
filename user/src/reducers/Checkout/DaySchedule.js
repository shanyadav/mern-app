import { handleActions } from "redux-actions";
import { ScheduleActions } from "../../actions";

const initialState = {
  data: [],
  isLoading: false,
};

export const ScheduleReducer = handleActions(
  {
    [ScheduleActions.GET_SCHEDULE_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);
