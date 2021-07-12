import { createAction } from "redux-actions";

export const FilterAction = {
  GET_FILTER_REQUEST: "GET FILTERS REQUESTED!",
  GET_FILTER_SUCCESS: "GET FILTER SUCCESS!",
  GET_FILTER_FAILED: "GET FILTER FAILED!",
};

export const getFilterTypeRequest = createAction(
  FilterAction.GET_FILTER_REQUEST
);

export const getFilterTypeSuccess = createAction(
  FilterAction.GET_FILTER_SUCCESS
);
export const getFilterTypeFailed = createAction(
  FilterAction.GET_FILTER_FAILED
);
