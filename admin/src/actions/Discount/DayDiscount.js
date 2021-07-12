import { createAction } from "redux-actions";

export const DayDiscountActions = {
  ADD_DAYDISCOUNT_REQUEST: "ADD DAYDISCOUNT REQUESTED!",
  ADD_DAYDISCOUNT_SUCCESS: "ADD DAYDISCOUNT SUCCESS!",
  ADD_DAYDISCOUNT_FAILED: "ADD DAYDISCOUNT FAILED!",

  GET_DAYDISCOUNT_REQUEST: "GET DAYDISCOUNTS REQUESTED!",
  GET_DAYDISCOUNT_SUCCESS: "GET DAYDISCOUNT SUCCESS!",
  GET_DAYDISCOUNT_FAILED: "GET DAYDISCOUNT FAILED!",

  GET_DAYDISCOUNT_REQUEST_BY_ID: "GET DAYDISCOUNTS REQUESTED BY ID!",
  GET_DAYDISCOUNT_SUCCESS_BY_ID: "GET DAYDISCOUNT SUCCESS BY ID!",
  GET_DAYDISCOUNT_FAILED_BY_ID: "GET DAYDISCOUNT FAILED BY ID!",

  UPDATE_DAYDISCOUNT_REQUEST: "UPDATE DAYDISCOUNTS REQUESTED!",
  UPDATE_DAYDISCOUNT_SUCCESS: "UPDATE DAYDISCOUNT SUCCESS!",
  UPDATE_DAYDISCOUNT_FAILED: "UPDATE DAYDISCOUNT FAILED!",

};

// add DAYDISCOUNTs
export const addDayDiscountRequest = createAction(
  DayDiscountActions.ADD_DAYDISCOUNT_REQUEST
);

export const addDayDiscountSuccess = createAction(
  DayDiscountActions.ADD_DAYDISCOUNT_SUCCESS
);
export const addDayDiscountFailed = createAction(
  DayDiscountActions.ADD_DAYDISCOUNT_FAILED
);

// GET DayDiscounts

export const getDayDiscountRequest = createAction(
  DayDiscountActions.GET_DAYDISCOUNT_REQUEST
);

export const getDayDiscountSuccess = createAction(
  DayDiscountActions.GET_DAYDISCOUNT_SUCCESS
);
export const getDayDiscountFailed = createAction(
  DayDiscountActions.GET_DAYDISCOUNT_FAILED
);

// GET DAYDISCOUNTs BY ID

export const getDayDiscountRequestById = createAction(
  DayDiscountActions.GET_DAYDISCOUNT_REQUEST_BY_ID
);

export const getDayDiscountSuccessById = createAction(
  DayDiscountActions.GET_DAYDISCOUNT_SUCCESS_BY_ID
);
export const getDayDiscountFailedById = createAction(
  DayDiscountActions.GET_DAYDISCOUNT_FAILED_BY_ID
);

// update DayDiscounts

export const updateDayDiscountRequest = createAction(
  DayDiscountActions.UPDATE_DAYDISCOUNT_REQUEST
);

export const updateDayDiscountSuccess = createAction(
  DayDiscountActions.UPDATE_DAYDISCOUNT_SUCCESS
);
export const updateDayDiscountFailed = createAction(
  DayDiscountActions.UPDATE_DAYDISCOUNT_FAILED
);

