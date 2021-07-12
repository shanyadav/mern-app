import { createAction } from "redux-actions";

export const DeliveryChargesAction = {
  ADD_DELIVERYCHARGES_REQUEST: "ADD DELIVERYCHARGES REQUESTED!",
  ADD_DELIVERYCHARGES_SUCCESS: "ADD DELIVERYCHARGES SUCCESS!",
  ADD_DELIVERYCHARGES_FAILED: "ADD DELIVERYCHARGES FAILED!",

  GET_DELIVERYCHARGES_REQUEST: "GET DELIVERYCHARGES REQUESTED!",
  GET_DELIVERYCHARGES_SUCCESS: "GET DELIVERYCHARGES SUCCESS!",
  GET_DELIVERYCHARGES_FAILED: "GET DELIVERYCHARGES FAILED!",

  UPDATE_DELIVERYCHARGES_REQUEST: "UPDATE DELIVERYCHARGES REQUESTED!",
  UPDATE_DELIVERYCHARGES_SUCCESS: "UPDATE DELIVERYCHARGES SUCCESS!",
  UPDATE_DELIVERYCHARGES_FAILED: "UPDATE DELIVERYCHARGES FAILED!",

};

// add DeliveryChargess
export const addDeliveryChargesRequest = createAction(
 DeliveryChargesAction.ADD_DELIVERYCHARGES_REQUEST
);

export const addDeliveryChargesSuccess = createAction(
 DeliveryChargesAction.ADD_DELIVERYCHARGES_SUCCESS
);
export const addDeliveryChargesFailed = createAction(
 DeliveryChargesAction.ADD_DELIVERYCHARGES_FAILED
);

// GET DeliveryChargess

export const getDeliveryChargesRequest = createAction(
 DeliveryChargesAction.GET_DELIVERYCHARGES_REQUEST
);

export const getDeliveryChargesSuccess = createAction(
 DeliveryChargesAction.GET_DELIVERYCHARGES_SUCCESS
);
export const getDeliveryChargesFailed = createAction(
 DeliveryChargesAction.GET_DELIVERYCHARGES_FAILED
);


// update DeliveryChargess

export const updateDeliveryChargesRequest = createAction(
 DeliveryChargesAction.UPDATE_DELIVERYCHARGES_REQUEST
);

export const updateDeliveryChargesSuccess = createAction(
 DeliveryChargesAction.UPDATE_DELIVERYCHARGES_SUCCESS
);
export const updateDeliveryChargesFailed = createAction(
 DeliveryChargesAction.UPDATE_DELIVERYCHARGES_FAILED
);

