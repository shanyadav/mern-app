import { createAction } from "redux-actions";

export const cartAction = {
  ADD_CART_REQUEST: "ADD CART REQUESTED!",
  ADD_CART_SUCCESS: "ADD CART SUCCESS!",
  ADD_CART_FAILED: "ADD CART FAILED!",

  GET_CART_REQUEST: "GET CARTS REQUESTED!",
  GET_CART_SUCCESS: "GET CART SUCCESS!",
  GET_CART_FAILED: "GET CART FAILED!",

  GET_CART_REQUEST_BY_ID: "GET CARTS REQUESTED BY ID!",
  GET_CART_SUCCESS_BY_ID: "GET CART SUCCESS BY ID!",
  GET_CART_FAILED_BY_ID: "GET CART FAILED BY ID!",

  UPDATE_CART_REQUEST: "UPDATE CARTS REQUESTED!",
  UPDATE_CART_SUCCESS: "UPDATE CART SUCCESS!",
  UPDATE_CART_FAILED: "UPDATE CART FAILED!",

};

// add Carts
export const addCartRequest = createAction(
  cartAction .ADD_CART_REQUEST
);

export const addCartSuccess = createAction(
  cartAction .ADD_CART_SUCCESS
);
export const addCartFailed = createAction(
  cartAction .ADD_CART_FAILED
);

// GET Carts

export const getCartRequest = createAction(
  cartAction .GET_CART_REQUEST
);

export const getCartSuccess = createAction(
  cartAction .GET_CART_SUCCESS
);
export const getCartFailed = createAction(
  cartAction .GET_CART_FAILED
);

// GET Carts BY ID

export const getCartRequestById = createAction(
  cartAction .GET_CART_REQUEST_BY_ID
);

export const getCartSuccessById = createAction(
  cartAction .GET_CART_SUCCESS_BY_ID
);
export const getCartFailedById = createAction(
  cartAction .GET_CART_FAILED_BY_ID
);

// update Carts

export const updateCartRequest = createAction(
  cartAction .UPDATE_CART_REQUEST
);

export const updateCartSuccess = createAction(
  cartAction .UPDATE_CART_SUCCESS
);
export const updateCartFailed = createAction(
  cartAction .UPDATE_CART_FAILED
);

