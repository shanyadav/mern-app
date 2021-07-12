import { createAction } from "redux-actions";

export const ScheduleActions = {
  ADD_SCHEDULE_REQUEST: "ADD SCHEDULE REQUESTED!",
  ADD_SCHEDULE_SUCCESS: "ADD SCHEDULE SUCCESS!",
  ADD_SCHEDULE_FAILED: "ADD SCHEDULE FAILED!",

  GET_SCHEDULE_REQUEST: "GET SCHEDULE REQUESTED!",
  GET_SCHEDULE_SUCCESS: "GET SCHEDULE SUCCESS!",
  GET_SCHEDULE_FAILED: "GET SCHEDULE FAILED!",

  GET_SCHEDULE_REQUEST_BY_ID: "GET SCHEDULE REQUESTED BY ID!",
  GET_SCHEDULE_SUCCESS_BY_ID: "GET SCHEDULE SUCCESS BY ID!",
  GET_SCHEDULE_FAILED_BY_ID: "GET SCHEDULE FAILED BY ID!",

  UPDATE_SCHEDULE_REQUEST: "UPDATE SCHEDULE REQUESTED!",
  UPDATE_SCHEDULE_SUCCESS: "UPDATE SCHEDULE SUCCESS!",
  UPDATE_SCHEDULE_FAILED: "UPDATE SCHEDULE FAILED!",

};

// add DaySchedules
export const addDayScheduleRequest = createAction(
  ScheduleActions.ADD_SCHEDULE_REQUEST
);

export const addDayScheduleSuccess = createAction(
  ScheduleActions.ADD_SCHEDULE_SUCCESS
);
export const addDayScheduleFailed = createAction(
  ScheduleActions.ADD_SCHEDULE_FAILED
);

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

// GET DaySchedules BY ID

export const getDayScheduleRequestById = createAction(
  ScheduleActions.GET_SCHEDULE_REQUEST_BY_ID
);

export const getDayScheduleSuccessById = createAction(
  ScheduleActions.GET_SCHEDULE_SUCCESS_BY_ID
);
export const getDayScheduleFailedById = createAction(
  ScheduleActions.GET_SCHEDULE_FAILED_BY_ID
);

// update DaySchedules

export const updateDayScheduleRequest = createAction(
  ScheduleActions.UPDATE_SCHEDULE_REQUEST
);

export const updateDayScheduleSuccess = createAction(
  ScheduleActions.UPDATE_SCHEDULE_SUCCESS
);
export const updateDayScheduleFailed = createAction(
  ScheduleActions.UPDATE_SCHEDULE_FAILED
);

