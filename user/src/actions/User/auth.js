import { createAction } from "redux-actions";

export const authActions = {
  LOGIN_REQUEST: "Login Requested!",
  LOGIN_FAILED: "Login Failed!",
  LOGIN_SUCCESS: "Login Success!",
  
  LOGOUT_REQUEST: "Logout Requested!",
  LOGOUT_FAILED: "Logout Failed!",
  LOGOUT_SUCCESS: "Logout Success!",

  SIGNUP_REQUEST: "Signup Requested!",
  SIGNUP_FAILED: "Signup Failed!",
  SIGNUP_SUCCESS: "Signup Success!",
  
  GET_USER_REQUEST: "GET USER REQUESTED!",
  GET_USER_SUCCESS: "GET USER SUCCESS!",
  GET_USER_FAILED: "GET USER FAILED!",
};

export const loginRequest = createAction(authActions.LOGIN_REQUEST);
export const loginFailed = createAction(authActions.LOGIN_FAILED);
export const loginSuccess = createAction(authActions.LOGIN_SUCCESS);

export const logOutRequest = createAction(authActions.LOGOUT_REQUEST);
export const logOutFailed = createAction(authActions.LOGOUT_FAILED);
export const logOutSuccess = createAction(authActions.LOGOUT_SUCCESS);


export const signupRequest = createAction(authActions.SIGNUP_REQUEST);
export const signupFailed = createAction(authActions.SIGNUP_FAILED);
export const signupSuccess = createAction(authActions.SIGNUP_SUCCESS);

export const getUserRequest = createAction(
  authActions.GET_USER_REQUEST
);

export const getUserSuccess = createAction(
  authActions.GET_USER_SUCCESS
);
export const getUserFailed = createAction(
  authActions.GET_USER_FAILED
);