import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../Helpers/ApiHelper";
import { logger } from "../Helpers/Logger";
import { DefaultErrorMessage } from "../config/constants";
import { authActions, loginSuccess, showLoader, hideLoader ,getUserSuccess} from "../actions";
let toastId = null;


/**
 *  Login
 */
const loginLogic = createLogic({
  type: authActions.LOGIN_REQUEST,
  cancelType: authActions.LOGIN_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/sign-in",
      "POST",
      false,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0]);
      }
      dispatch(hideLoader());
      done();
      return;
    } else {
      logger(result);
      localStorage.setItem("token", result.data.token);
      toast.success("Login Successfully.")
      dispatch(
        loginSuccess({ token: result.data.token, isLoginSuccess: true })
      );
      dispatch(hideLoader());
      done();
    }
  },
});

const signUpLogic = createLogic({
  type: authActions.SIGNUP_REQUEST,
  cancelType: authActions.SIGNUP_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/sign-up",
      "POST",
      false,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0]);
      }
      dispatch(hideLoader());
      done();
      return;
    } else {
      logger(result);
      dispatch(hideLoader());
      done();
    }
  },
});
const getUserLogic = createLogic({
  type: authActions.GET_USER_REQUEST,
  cancelType: authActions.GET_USER_FAILED,
  async process({ action }, dispatch, done) {
      dispatch(getUserSuccess({ isLoading: false }));
      dispatch(({ isLoginSuccess: true }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/user",
      "GET",
      true,
      undefined,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(getUserSuccess({ isLoading: false }));
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getUserSuccess({
          data: result.data,
          isLoading: false,
        })
      );
      done();
      return;
    }
  },
});


export const AuthLogic = [loginLogic,signUpLogic,getUserLogic];
