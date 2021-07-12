import { createAction } from "redux-actions";

export const CheckoutServiceAction = {
  ADD_CHECKOUTSERVICE_REQUEST: "ADD CHECKOUTSERVICE REQUESTED!",
  ADD_CHECKOUTSERVICE_SUCCESS: "ADD CHECKOUTSERVICE SUCCESS!",
  ADD_CHECKOUTSERVICE_FAILED: "ADD CHECKOUTSERVICE FAILED!",

  GET_CHECKOUTSERVICE_REQUEST: "GET CHECKOUTSERVICE REQUESTED!",
  GET_CHECKOUTSERVICE_SUCCESS: "GET CHECKOUTSERVICE SUCCESS!",
  GET_CHECKOUTSERVICE_FAILED: "GET CHECKOUTSERVICE FAILED!",

  GET_CHECKOUTSERVICE_REQUEST_BY_ID: "GET CHECKOUTSERVICE REQUESTED BY ID!",
  GET_CHECKOUTSERVICE_SUCCESS_BY_ID: "GET CHECKOUTSERVICE SUCCESS BY ID!",
  GET_CHECKOUTSERVICE_FAILED_BY_ID: "GET CHECKOUTSERVICE FAILED BY ID!",

  UPDATE_CHECKOUTSERVICE_REQUEST: "UPDATE CHECKOUTSERVICE REQUESTED!",
  UPDATE_CHECKOUTSERVICE_SUCCESS: "UPDATE CHECKOUTSERVICE SUCCESS!",
  UPDATE_CHECKOUTSERVICE_FAILED: "UPDATE CHECKOUTSERVICE FAILED!",

};

// add CheckoutServices
export const addCheckoutServiceRequest = createAction(
  CheckoutServiceAction.ADD_CHECKOUTSERVICE_REQUEST
);

export const addCheckoutServiceSuccess = createAction(
  CheckoutServiceAction.ADD_CHECKOUTSERVICE_SUCCESS
);
export const addCheckoutServiceFailed = createAction(
  CheckoutServiceAction.ADD_CHECKOUTSERVICE_FAILED
);

// GET CheckoutServices

export const getCheckoutServiceRequest = createAction(
  CheckoutServiceAction.GET_CHECKOUTSERVICE_REQUEST
);

export const getCheckoutServiceSuccess = createAction(
  CheckoutServiceAction.GET_CHECKOUTSERVICE_SUCCESS
);
export const getCheckoutServiceFailed = createAction(
  CheckoutServiceAction.GET_CHECKOUTSERVICE_FAILED
);

// GET CheckoutServices BY ID

export const getCheckoutServiceRequestById = createAction(
  CheckoutServiceAction.GET_CHECKOUTSERVICE_REQUEST_BY_ID
);

export const getCheckoutServiceSuccessById = createAction(
  CheckoutServiceAction.GET_CHECKOUTSERVICE_SUCCESS_BY_ID
);
export const getCheckoutServiceFailedById = createAction(
  CheckoutServiceAction.GET_CHECKOUTSERVICE_FAILED_BY_ID
);

// update CheckoutServices

export const updateCheckoutServiceRequest = createAction(
  CheckoutServiceAction.UPDATE_CHECKOUTSERVICE_REQUEST
);

export const updateCheckoutServiceSuccess = createAction(
  CheckoutServiceAction.UPDATE_CHECKOUTSERVICE_SUCCESS
);
export const updateCheckoutServiceFailed = createAction(
  CheckoutServiceAction.UPDATE_CHECKOUTSERVICE_FAILED
);

