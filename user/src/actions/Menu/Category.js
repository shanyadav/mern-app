import { createAction } from "redux-actions";

export const categoriesActions = {
  GET_CATEGORIE_REQUEST: "GET CATEGORIES REQUESTED!",
  GET_CATEGORIE_SUCCESS: "GET CATEGORIE SUCCESS!",
  GET_CATEGORIE_FAILED: "GET CATEGORIE FAILED!",
};

// GET categories

export const getCategoriesRequest = createAction(
  categoriesActions.GET_CATEGORIE_REQUEST
);

export const getCategoriesSuccess = createAction(
  categoriesActions.GET_CATEGORIE_SUCCESS
);
export const getCategoriesFailed = createAction(
  categoriesActions.GET_CATEGORIE_FAILED
);
