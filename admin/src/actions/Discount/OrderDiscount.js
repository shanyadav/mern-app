import { createAction } from "redux-actions";

export const OrderDiscountActions = {
  ADD_ORDERDISCOUNT_REQUEST: "ADD ORDERDISCOUNT REQUESTED!",
  ADD_ORDERDISCOUNT_SUCCESS: "ADD ORDERDISCOUNT SUCCESS!",
  ADD_ORDERDISCOUNT_FAILED: "ADD ORDERDISCOUNT FAILED!",

  GET_ORDERDISCOUNT_REQUEST: "GET ORDERDISCOUNTS REQUESTED!",
  GET_ORDERDISCOUNT_SUCCESS: "GET ORDERDISCOUNT SUCCESS!",
  GET_ORDERDISCOUNT_FAILED: "GET ORDERDISCOUNT FAILED!",

  GET_ORDERDISCOUNT_REQUEST_BY_ID: "GET ORDERDISCOUNTS REQUESTED BY ID!",
  GET_ORDERDISCOUNT_SUCCESS_BY_ID: "GET ORDERDISCOUNT SUCCESS BY ID!",
  GET_ORDERDISCOUNT_FAILED_BY_ID: "GET ORDERDISCOUNT FAILED BY ID!",

  UPDATE_ORDERDISCOUNT_REQUEST: "UPDATE ORDERDISCOUNTS REQUESTED!",
  UPDATE_ORDERDISCOUNT_SUCCESS: "UPDATE ORDERDISCOUNT SUCCESS!",
  UPDATE_ORDERDISCOUNT_FAILED: "UPDATE ORDERDISCOUNT FAILED!",

};

// add ORDERDISCOUNTs
export const addOrderDiscountRequest = createAction(
 OrderDiscountActions.ADD_ORDERDISCOUNT_REQUEST
);

export const addOrderDiscountSuccess = createAction(
 OrderDiscountActions.ADD_ORDERDISCOUNT_SUCCESS
);
export const addOrderDiscountFailed = createAction(
 OrderDiscountActions.ADD_ORDERDISCOUNT_FAILED
);

// GET OrderDiscounts

export const getOrderDiscountRequest = createAction(
 OrderDiscountActions.GET_ORDERDISCOUNT_REQUEST
);

export const getOrderDiscountSuccess = createAction(
 OrderDiscountActions.GET_ORDERDISCOUNT_SUCCESS
);
export const getOrderDiscountFailed = createAction(
 OrderDiscountActions.GET_ORDERDISCOUNT_FAILED
);

// GET OrderDiscounts BY ID

export const getOrderDiscountRequestById = createAction(
 OrderDiscountActions.GET_ORDERDISCOUNT_REQUEST_BY_ID
);

export const getOrderDiscountSuccessById = createAction(
 OrderDiscountActions.GET_ORDERDISCOUNT_SUCCESS_BY_ID
);
export const getOrderDiscountFailedById = createAction(
 OrderDiscountActions.GET_ORDERDISCOUNT_FAILED_BY_ID
);

// update OrderDiscounts

export const updateOrderDiscountRequest = createAction(
 OrderDiscountActions.UPDATE_ORDERDISCOUNT_REQUEST
);

export const updateOrderDiscountSuccess = createAction(
 OrderDiscountActions.UPDATE_ORDERDISCOUNT_SUCCESS
);
export const updateOrderDiscountFailed = createAction(
 OrderDiscountActions.UPDATE_ORDERDISCOUNT_FAILED
);

