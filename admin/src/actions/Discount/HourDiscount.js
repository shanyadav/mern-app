import { createAction } from "redux-actions";

export const hourDiscountActions = {
  ADD_HOUREDISCOUNT_REQUEST: "ADD HOUREDISCOUNT REQUESTED!",
  ADD_HOUREDISCOUNT_SUCCESS: "ADD HOUREDISCOUNT SUCCESS!",
  ADD_HOUREDISCOUNT_FAILED: "ADD HOUREDISCOUNT FAILED!",

  GET_HOUREDISCOUNT_REQUEST: "GET HOUREDISCOUNTS REQUESTED!",
  GET_HOUREDISCOUNT_SUCCESS: "GET HOUREDISCOUNT SUCCESS!",
  GET_HOUREDISCOUNT_FAILED: "GET HOUREDISCOUNT FAILED!",

  GET_HOUREDISCOUNT_REQUEST_BY_ID: "GET HOUREDISCOUNTS REQUESTED BY ID!",
  GET_HOUREDISCOUNT_SUCCESS_BY_ID: "GET HOUREDISCOUNT SUCCESS BY ID!",
  GET_HOUREDISCOUNT_FAILED_BY_ID: "GET HOUREDISCOUNT FAILED BY ID!",

  UPDATE_HOUREDISCOUNT_REQUEST: "UPDATE HOUREDISCOUNTS REQUESTED!",
  UPDATE_HOUREDISCOUNT_SUCCESS: "UPDATE HOUREDISCOUNT SUCCESS!",
  UPDATE_HOUREDISCOUNT_FAILED: "UPDATE HOUREDISCOUNT FAILED!",

};

// add HOUREDISCOUNTs
export const addHoureDiscountRequest = createAction(
  hourDiscountActions.ADD_HOUREDISCOUNT_REQUEST
);

export const addHoureDiscountSuccess = createAction(
  hourDiscountActions.ADD_HOUREDISCOUNT_SUCCESS
);
export const addHoureDiscountFailed = createAction(
  hourDiscountActions.ADD_HOUREDISCOUNT_FAILED
);

// GET HOUREDISCOUNTs

export const getHoureDiscountRequest = createAction(
  hourDiscountActions.GET_HOUREDISCOUNT_REQUEST
);

export const getHoureDiscountSuccess = createAction(
  hourDiscountActions.GET_HOUREDISCOUNT_SUCCESS
);
export const getHoureDiscountFailed = createAction(
  hourDiscountActions.GET_HOUREDISCOUNT_FAILED
);

// GET HOUREDISCOUNTs BY ID

export const getHoureDiscountRequestById = createAction(
  hourDiscountActions.GET_HOUREDISCOUNT_REQUEST_BY_ID
);

export const getHoureDiscountSuccessById = createAction(
  hourDiscountActions.GET_HOUREDISCOUNT_SUCCESS_BY_ID
);
export const getHoureDiscountFailedById = createAction(
  hourDiscountActions.GET_HOUREDISCOUNT_FAILED_BY_ID
);

// update HOUREDISCOUNTs

export const updateHoureDiscountRequest = createAction(
  hourDiscountActions.UPDATE_HOUREDISCOUNT_REQUEST
);

export const updateHoureDiscountSuccess = createAction(
  hourDiscountActions.UPDATE_HOUREDISCOUNT_SUCCESS
);
export const updateHoureDiscountFailed = createAction(
  hourDiscountActions.UPDATE_HOUREDISCOUNT_FAILED
);

