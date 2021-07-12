import { createAction } from "redux-actions";

export const ScheduleActions = {

  GET_SCHEDULE_REQUEST: "GET SCHEDULE REQUESTED!",
  GET_SCHEDULE_SUCCESS: "GET SCHEDULE SUCCESS!",
  GET_SCHEDULE_FAILED: "GET SCHEDULE FAILED!",


};


// GET DaySchedules

export const getDayScheduleRequest = createAction(
  ScheduleActions.GET_SCHEDULE_REQUEST
);

export const getDayScheduleSuccess = createAction(
  ScheduleActions.GET_SCHEDULE_SUCCESS
);
export const getDayScheduleFailed = createAction(
  ScheduleActions.GET_SCHEDULE_FAILED
);


