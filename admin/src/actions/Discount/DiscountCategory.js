import { createAction } from "redux-actions";

export const DiscountCategoryActions = {
    ADD_DISCOUNTCATRGORY_REQUEST: "ADD DISCOUNTCATRGORY REQUESTED!",
    ADD_DISCOUNTCATRGORY_SUCCESS: "ADD DISCOUNTCATRGORY SUCCESS!",
    ADD_DISCOUNTCATRGORY_FAILED: "ADD DISCOUNTCATRGORY FAILED!",

    GET_DISCOUNTCATRGORY_REQUEST: "GET DISCOUNTCATRGORY REQUESTED!",
    GET_DISCOUNTCATRGORY_SUCCESS: "GET DISCOUNTCATRGORY SUCCESS!",
    GET_DISCOUNTCATRGORY_FAILED: "GET DISCOUNTCATRGORY FAILED!",

    GET_DISCOUNTCATRGORY_REQUEST_BY_ID: "GET DISCOUNTCATRGORY REQUESTED BY ID!",
    GET_DISCOUNTCATRGORY_SUCCESS_BY_ID: "GET DISCOUNTCATRGORY SUCCESS BY ID!",
    GET_DISCOUNTCATRGORY_FAILED_BY_ID: "GET DISCOUNTCATRGORY FAILED BY ID!",

    UPDATE_DISCOUNTCATRGORY_REQUEST: "UPDATE DISCOUNTCATRGORY REQUESTED!",
    UPDATE_DISCOUNTCATRGORY_SUCCESS: "UPDATE DISCOUNTCATRGORY SUCCESS!",
    UPDATE_DISCOUNTCATRGORY_FAILED: "UPDATE DISCOUNTCATRGORY FAILED!",

};

// add DiscountCategory
export const addDiscountCategoryRequest = createAction(
    DiscountCategoryActions.ADD_DISCOUNTCATRGORY_REQUEST
);

export const addDiscountCategorySuccess = createAction(
    DiscountCategoryActions.ADD_DISCOUNTCATRGORY_SUCCESS
);
export const addDiscountCategoryFailed = createAction(
    DiscountCategoryActions.ADD_DISCOUNTCATRGORY_FAILED
);

// GET DiscountCategorys

export const getDiscountCategoryRequest = createAction(
    DiscountCategoryActions.GET_DISCOUNTCATRGORY_REQUEST
);

export const getDiscountCategorySuccess = createAction(
    DiscountCategoryActions.GET_DISCOUNTCATRGORY_SUCCESS
);
export const getDiscountCategoryFailed = createAction(
    DiscountCategoryActions.GET_DISCOUNTCATRGORY_FAILED
);

// GET DiscountCategorys BY ID

export const getDiscountCategoryRequestById = createAction(
    DiscountCategoryActions.GET_DISCOUNTCATRGORY_REQUEST_BY_ID
);

export const getDiscountCategorySuccessById = createAction(
    DiscountCategoryActions.GET_DISCOUNTCATRGORY_SUCCESS_BY_ID
);
export const getDiscountCategoryFailedById = createAction(
    DiscountCategoryActions.GET_DISCOUNTCATRGORY_FAILED_BY_ID
);

// update DiscountCategorys

export const updateDiscountCategoryRequest = createAction(
    DiscountCategoryActions.UPDATE_DISCOUNTCATRGORY_REQUEST
);

export const updateDiscountCategorySuccess = createAction(
    DiscountCategoryActions.UPDATE_DISCOUNTCATRGORY_SUCCESS
);
export const updateDiscountCategoryFailed = createAction(
    DiscountCategoryActions.UPDATE_DISCOUNTCATRGORY_FAILED
);

