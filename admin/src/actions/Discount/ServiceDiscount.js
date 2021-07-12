import { createAction } from "redux-actions";

export const ServiceDiscountActions = {
  ADD_SERVICEDISCOUNT_REQUEST: "ADD SERVICEDISCOUNT REQUESTED!",
  ADD_SERVICEDISCOUNT_SUCCESS: "ADD SERVICEDISCOUNT SUCCESS!",
  ADD_SERVICEDISCOUNT_FAILED: "ADD SERVICEDISCOUNT FAILED!",

  GET_SERVICEDISCOUNT_REQUEST: "GET SERVICEDISCOUNTS REQUESTED!",
  GET_SERVICEDISCOUNT_SUCCESS: "GET SERVICEDISCOUNT SUCCESS!",
  GET_SERVICEDISCOUNT_FAILED: "GET SERVICEDISCOUNT FAILED!",

  UPDATE_SERVICEDISCOUNT_REQUEST: "UPDATE SERVICEDISCOUNTS REQUESTED!",
  UPDATE_SERVICEDISCOUNT_SUCCESS: "UPDATE SERVICEDISCOUNT SUCCESS!",
  UPDATE_SERVICEDISCOUNT_FAILED: "UPDATE SERVICEDISCOUNT FAILED!",

};

// add ServiceDiscounts
export const addServiceDiscountRequest = createAction(
 ServiceDiscountActions.ADD_SERVICEDISCOUNT_REQUEST
);

export const addServiceDiscountSuccess = createAction(
 ServiceDiscountActions.ADD_SERVICEDISCOUNT_SUCCESS
);
export const addServiceDiscountFailed = createAction(
 ServiceDiscountActions.ADD_SERVICEDISCOUNT_FAILED
);

// GET ServiceDiscounts

export const getServiceDiscountRequest = createAction(
 ServiceDiscountActions.GET_SERVICEDISCOUNT_REQUEST
);

export const getServiceDiscountSuccess = createAction(
 ServiceDiscountActions.GET_SERVICEDISCOUNT_SUCCESS
);
export const getServiceDiscountFailed = createAction(
 ServiceDiscountActions.GET_SERVICEDISCOUNT_FAILED
);


// update ServiceDiscounts

export const updateServiceDiscountRequest = createAction(
 ServiceDiscountActions.UPDATE_SERVICEDISCOUNT_REQUEST
);

export const updateServiceDiscountSuccess = createAction(
 ServiceDiscountActions.UPDATE_SERVICEDISCOUNT_SUCCESS
);
export const updateServiceDiscountFailed = createAction(
 ServiceDiscountActions.UPDATE_SERVICEDISCOUNT_FAILED
);

