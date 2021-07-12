import { createAction } from "redux-actions";
export const ListItemsActions = {

  GET_LISTITEMS_REQUEST: "GET LISTITEMSS REQUESTED!",
  GET_LISTITEMS_SUCCESS: "GET LISTITEMS SUCCESS!",
  GET_LISTITEMS_FAILED: "GET LISTITEMS FAILED!",

  GET_LISTITEMS_REQUEST_BY_ID: "GET LISTITEMSS REQUESTED BY ID!",
  GET_LISTITEMS_SUCCESS_BY_ID: "GET LISTITEMS SUCCESS BY ID!",
  GET_LISTITEMS_FAILED_BY_ID: "GET LISTITEMS FAILED BY ID!",
};


// GET LISTITEMSs

export const getListItemsRequest = createAction(
  ListItemsActions.GET_LISTITEMS_REQUEST
);

export const getListItemsSuccess = createAction(
  ListItemsActions.GET_LISTITEMS_SUCCESS
);
export const getListItemsFailed = createAction(
  ListItemsActions.GET_LISTITEMS_FAILED
);

// GET LISTITEMSs BY ID

export const getListItemsRequestById = createAction(
  ListItemsActions.GET_LISTITEMS_REQUEST_BY_ID
);

export const getListItemsSuccessById = createAction(
  ListItemsActions.GET_LISTITEMS_SUCCESS_BY_ID
);
export const getListItemsFailedById = createAction(
  ListItemsActions.GET_LISTITEMS_FAILED_BY_ID
);
