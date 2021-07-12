import { handleActions } from "redux-actions";
import { authActions } from "../actions";

const initialState = {
  token: null,
  isLoginSuccess:false,
  data:[]
};

export const AuthReducer = handleActions(
  {
    [authActions.GET_USER_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
    [authActions.LOGIN_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
    }),
  },
  initialState
);