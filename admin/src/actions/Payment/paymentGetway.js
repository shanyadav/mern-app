import { createAction } from "redux-actions";

export const paymentGetwayAction = {
  ADD_PAYMENTGETWAY_REQUEST: "ADD PAYMENTGETWAY REQUESTED!",
  ADD_PAYMENTGETWAY_SUCCESS: "ADD PAYMENTGETWAY SUCCESS!",
  ADD_PAYMENTGETWAY_FAILED: "ADD PAYMENTGETWAY FAILED!",

  GET_PAYMENTGETWAY_REQUEST: "GET PAYMENTGETWAYS REQUESTED!",
  GET_PAYMENTGETWAY_SUCCESS: "GET PAYMENTGETWAY SUCCESS!",
  GET_PAYMENTGETWAY_FAILED: "GET PAYMENTGETWAY FAILED!",

  GET_PAYMENTGETWAY_REQUEST_BY_ID: "GET PAYMENTGETWAYS REQUESTED BY ID!",
  GET_PAYMENTGETWAY_SUCCESS_BY_ID: "GET PAYMENTGETWAY SUCCESS BY ID!",
  GET_PAYMENTGETWAY_FAILED_BY_ID: "GET PAYMENTGETWAY FAILED BY ID!",

  UPDATE_PAYMENTGETWAY_REQUEST: "UPDATE PAYMENTGETWAYS REQUESTED!",
  UPDATE_PAYMENTGETWAY_SUCCESS: "UPDATE PAYMENTGETWAY SUCCESS!",
  UPDATE_PAYMENTGETWAY_FAILED: "UPDATE PAYMENTGETWAY FAILED!",

};

// add PaymentGetways
export const addPaymentGetwayRequest = createAction(
  paymentGetwayAction.ADD_PAYMENTGETWAY_REQUEST
);

export const addPaymentGetwaySuccess = createAction(
  paymentGetwayAction.ADD_PAYMENTGETWAY_SUCCESS
);
export const addPaymentGetwayFailed = createAction(
  paymentGetwayAction.ADD_PAYMENTGETWAY_FAILED
);

// GET PaymentGetways

export const getPaymentGetwayRequest = createAction(
  paymentGetwayAction.GET_PAYMENTGETWAY_REQUEST
);

export const getPaymentGetwaySuccess = createAction(
  paymentGetwayAction.GET_PAYMENTGETWAY_SUCCESS
);
export const getPaymentGetwayFailed = createAction(
  paymentGetwayAction.GET_PAYMENTGETWAY_FAILED
);

// GET PaymentGetways BY ID

export const getPaymentGetwayRequestById = createAction(
  paymentGetwayAction.GET_PAYMENTGETWAY_REQUEST_BY_ID
);

export const getPaymentGetwaySuccessById = createAction(
  paymentGetwayAction.GET_PAYMENTGETWAY_SUCCESS_BY_ID
);
export const getPaymentGetwayFailedById = createAction(
  paymentGetwayAction.GET_PAYMENTGETWAY_FAILED_BY_ID
);

// update PaymentGetways

export const updatePaymentGetwayRequest = createAction(
  paymentGetwayAction.UPDATE_PAYMENTGETWAY_REQUEST
);

export const updatePaymentGetwaySuccess = createAction(
  paymentGetwayAction.UPDATE_PAYMENTGETWAY_SUCCESS
);
export const updatePAYMENTGETWAYFailed = createAction(
  paymentGetwayAction.UPDATE_PAYMENTGETWAY_FAILED
);

