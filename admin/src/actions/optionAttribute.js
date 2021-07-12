import { createAction } from "redux-actions";

export const OptionsAttributeActions = {
    ADD_OPTIONSATTRIBUTE_REQUEST: "ADD OPTIONSATTRIBUTE REQUESTED!",
    ADD_OPTIONSATTRIBUTE_SUCCESS: "ADD OPTIONSATTRIBUTE SUCCESS!",
    ADD_OPTIONSATTRIBUTE_FAILED: "ADD OPTIONSATTRIBUTE FAILED!",

    GET_OPTIONSATTRIBUTE_REQUEST: "GET OPTIONSATTRIBUTE REQUESTED!",
    GET_OPTIONSATTRIBUTE_SUCCESS: "GET OPTIONSATTRIBUTE SUCCESS!",
    GET_OPTIONSATTRIBUTE_FAILED: "GET OPTIONSATTRIBUTE FAILED!",

    GET_OPTIONSATTRIBUTE_REQUEST_BY_ID: "GET OPTIONSATTRIBUTE REQUESTED BY ID!",
    GET_OPTIONSATTRIBUTE_SUCCESS_BY_ID: "GET OPTIONSATTRIBUTE SUCCESS BY ID!",
    GET_OPTIONSATTRIBUTE_FAILED_BY_ID: "GET OPTIONSATTRIBUTE FAILED BY ID!",

    UPDATE_OPTIONSATTRIBUTE_REQUEST: "UPDATE OPTIONSATTRIBUTE REQUESTED!",
    UPDATE_OPTIONSATTRIBUTE_SUCCESS: "UPDATE OPTIONSATTRIBUTE SUCCESS!",
    UPDATE_OPTIONSATTRIBUTE_FAILED: "UPDATE OPTIONSATTRIBUTE FAILED!",

};

// add OPTIONSs
export const addOptionsAttributeRequest = createAction(
    OptionsAttributeActions.ADD_OPTIONSATTRIBUTE_REQUEST
);

export const addOptionsAttributeSuccess = createAction(
    OptionsAttributeActions.ADD_OPTIONSATTRIBUTE_SUCCESS
);
export const addOptionsAttributeFailed = createAction(
    OptionsAttributeActions.ADD_OPTIONSATTRIBUTE_FAILED
);

// GET Optionss

export const getOptionsAttributeRequest = createAction(
    OptionsAttributeActions.GET_OPTIONSATTRIBUTE_REQUEST
);

export const getOptionsAttributeSuccess = createAction(
    OptionsAttributeActions.GET_OPTIONSATTRIBUTE_SUCCESS
);
export const getOptionsAttributeFailed = createAction(
    OptionsAttributeActions.GET_OPTIONSATTRIBUTE_FAILED
);

// GET Optionss BY ID

export const getOptionsAttributeRequestById = createAction(
    OptionsAttributeActions.GET_OPTIONSATTRIBUTE_REQUEST_BY_ID
);

export const getOptionsAttributeSuccessById = createAction(
    OptionsAttributeActions.GET_OPTIONSATTRIBUTE_SUCCESS_BY_ID
);
export const getOptionsAttributeFailedById = createAction(
    OptionsAttributeActions.GET_OPTIONSATTRIBUTE_FAILED_BY_ID
);

// update Optionss

export const updateOptionsAttributeRequest = createAction(
    OptionsAttributeActions.UPDATE_OPTIONSATTRIBUTE_REQUEST
);

export const updateOptionsAttributeSuccess = createAction(
    OptionsAttributeActions.UPDATE_OPTIONSATTRIBUTE_SUCCESS
);
export const updateOptionsAttributeFailed = createAction(
    OptionsAttributeActions.UPDATE_OPTIONSATTRIBUTE_FAILED
);

