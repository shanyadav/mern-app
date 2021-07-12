import { createAction } from "redux-actions";

export const DiscountCardActions = {
  ADD_DISCOUNTCARD_REQUEST: "ADD DISCOUNTCARD REQUESTED!",
  ADD_DISCOUNTCARD_SUCCESS: "ADD DISCOUNTCARD SUCCESS!",
  ADD_DISCOUNTCARD_FAILED: "ADD DISCOUNTCARD FAILED!",

  GET_DISCOUNTCARD_REQUEST: "GET DISCOUNTCARDS REQUESTED!",
  GET_DISCOUNTCARD_SUCCESS: "GET DISCOUNTCARD SUCCESS!",
  GET_DISCOUNTCARD_FAILED: "GET DISCOUNTCARD FAILED!",

  GET_DISCOUNTCARD_REQUEST_BY_ID: "GET DISCOUNTCARDS REQUESTED BY ID!",
  GET_DISCOUNTCARD_SUCCESS_BY_ID: "GET DISCOUNTCARD SUCCESS BY ID!",
  GET_DISCOUNTCARD_FAILED_BY_ID: "GET DISCOUNTCARD FAILED BY ID!",

  UPDATE_DISCOUNTCARD_REQUEST: "UPDATE DISCOUNTCARDS REQUESTED!",
  UPDATE_DISCOUNTCARD_SUCCESS: "UPDATE DISCOUNTCARD SUCCESS!",
  UPDATE_DISCOUNTCARD_FAILED: "UPDATE DISCOUNTCARD FAILED!",

};

// add DISCOUNTCARD
export const addDiscountCardRequest = createAction(
  DiscountCardActions.ADD_DISCOUNTCARD_REQUEST
);

export const addDiscountCardSuccess = createAction(
  DiscountCardActions.ADD_DISCOUNTCARD_SUCCESS
);
export const addDiscountCardFailed = createAction(
  DiscountCardActions.ADD_DISCOUNTCARD_FAILED
);

// GET DiscountCards

export const getDiscountCardRequest = createAction(
  DiscountCardActions.GET_DISCOUNTCARD_REQUEST
);

export const getDiscountCardSuccess = createAction(
  DiscountCardActions.GET_DISCOUNTCARD_SUCCESS
);
export const getDiscountCardFailed = createAction(
  DiscountCardActions.GET_DISCOUNTCARD_FAILED
);

// GET DiscountCards BY ID

export const getDiscountCardRequestById = createAction(
  DiscountCardActions.GET_DISCOUNTCARD_REQUEST_BY_ID
);

export const getDiscountCardSuccessById = createAction(
  DiscountCardActions.GET_DISCOUNTCARD_SUCCESS_BY_ID
);
export const getDiscountCardFailedById = createAction(
  DiscountCardActions.GET_DISCOUNTCARD_FAILED_BY_ID
);

// update DiscountCards

export const updateDiscountCardRequest = createAction(
  DiscountCardActions.UPDATE_DISCOUNTCARD_REQUEST
);

export const updateDiscountCardSuccess = createAction(
  DiscountCardActions.UPDATE_DISCOUNTCARD_SUCCESS
);
export const updateDiscountCardFailed = createAction(
  DiscountCardActions.UPDATE_DISCOUNTCARD_FAILED
);

