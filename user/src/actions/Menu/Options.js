import { createAction } from "redux-actions";

export const OptionAction = {
    GET_OPTION_REQUEST: "GET OPTION REQUESTED!",
    GET_OPTION_SUCCESS: "GET OPTION SUCCESS!",
    GET_OPTION_FAILED: "GET OPTION FAILED!",
};

export const getOptionRequest = createAction(
    OptionAction.GET_OPTION_REQUEST
);

export const getOptionTypeSuccess = createAction(
    OptionAction.GET_OPTION_SUCCESS
);
export const getOptionTypeFailed = createAction(
    OptionAction.GET_OPTION_FAILED
);
