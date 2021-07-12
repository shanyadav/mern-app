import { createAction } from "redux-actions";

export const OptionsActions = {
  ADD_OPTIONS_REQUEST: "ADD OPTIONS REQUESTED!",
  ADD_OPTIONS_SUCCESS: "ADD OPTIONS SUCCESS!",
  ADD_OPTIONS_FAILED: "ADD OPTIONS FAILED!",

  GET_OPTIONS_REQUEST: "GET OPTIONS REQUESTED!",
  GET_OPTIONS_SUCCESS: "GET OPTIONS SUCCESS!",
  GET_OPTIONS_FAILED: "GET OPTIONS FAILED!",

  GET_OPTIONS_REQUEST_BY_ID: "GET OPTIONS REQUESTED BY ID!",
  GET_OPTIONS_SUCCESS_BY_ID: "GET OPTIONS SUCCESS BY ID!",
  GET_OPTIONS_FAILED_BY_ID: "GET OPTIONS FAILED BY ID!",

  UPDATE_OPTIONS_REQUEST: "UPDATE OPTIONS REQUESTED!",
  UPDATE_OPTIONS_SUCCESS: "UPDATE OPTIONS SUCCESS!",
  UPDATE_OPTIONS_FAILED: "UPDATE OPTIONS FAILED!",

};

// add OPTIONSs
export const addOptionsRequest = createAction(
  OptionsActions.ADD_OPTIONS_REQUEST
);

export const addOptionsSuccess = createAction(
  OptionsActions.ADD_OPTIONS_SUCCESS
);
export const addOptionsFailed = createAction(
  OptionsActions.ADD_OPTIONS_FAILED
);

// GET Optionss

export const getOptionsRequest = createAction(
  OptionsActions.GET_OPTIONS_REQUEST
);

export const getOptionsSuccess = createAction(
  OptionsActions.GET_OPTIONS_SUCCESS
);
export const getOptionsFailed = createAction(
  OptionsActions.GET_OPTIONS_FAILED
);

// GET Optionss BY ID

export const getOptionsRequestById = createAction(
  OptionsActions.GET_OPTIONS_REQUEST_BY_ID
);

export const getOptionsSuccessById = createAction(
  OptionsActions.GET_OPTIONS_SUCCESS_BY_ID
);
export const getOptionsFailedById = createAction(
  OptionsActions.GET_OPTIONS_FAILED_BY_ID
);

// update Optionss

export const updateOptionsRequest = createAction(
  OptionsActions.UPDATE_OPTIONS_REQUEST
);

export const updateOptionsSuccess = createAction(
  OptionsActions.UPDATE_OPTIONS_SUCCESS
);
export const updateOptionsFailed = createAction(
  OptionsActions.UPDATE_OPTIONS_FAILED
);

