import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Constants";
import {
  showLoader,
  hideLoader,
  paymentGetwayAction,
  getPaymentGetwaySuccess,
  getPaymentGetwaySuccessById,
} from "../../actions";
let toastId = null;
const addPaymentGetwayLogic = createLogic({
  type: paymentGetwayAction.ADD_PAYMENTGETWAY_REQUEST,
  cancelType: paymentGetwayAction.ADD_PAYMENTGETWAY_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getPaymentGetwaySuccess({ updateReq: "Start" }));
    let data =
      getState().PaymentGetwayReducer && getState().PaymentGetwayReducer.data
        ? getState().PaymentGetwayReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/payment-gateway",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      // dispatch(hideLoader());
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getPaymentGetwaySuccess({
          data: [result.data, ...data],
          isLoading: false,
          updateReq: "End",
        })
      );
      dispatch(hideLoader());
      done();
    }
  },
});

// getList
const getPaymentGetwayLogic = createLogic({
  type: paymentGetwayAction.GET_PAYMENTGETWAY_REQUEST,
  cancelType: paymentGetwayAction.GET_PAYMENTGETWAY_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getPaymentGetwaySuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/payment-gateway",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      if (action.payload.type === "STRIPE") {
        dispatch(
          getPaymentGetwaySuccess({
            stripeData: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      } else {
        dispatch(
          getPaymentGetwaySuccess({
            paypalData: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      done();
      return;
    } else {
      logger(result);

      if (action.payload.type === "STRIPE") {
        dispatch(
          getPaymentGetwaySuccess({
            stripeData: result.data,
            isLoading: false,
            updateReq: "End",
          })
        )
      } else {
        dispatch(
          getPaymentGetwaySuccess({
            paypalData: result.data,
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      done();
      return;
    }
  },
});

// get Data by Id

const getPaymentGetwayByIdLogic = createLogic({
  type: paymentGetwayAction.GET_PAYMENTGETWAY_REQUEST_BY_ID,
  cancelType: paymentGetwayAction.GET_PAYMENTGETWAY_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/payment-gateway/" + action.payload.payment_geteway_id],
      "GET",
      true,
      undefined,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(hideLoader());
      done();
      return;
    } else {
      logger(result);
      dispatch(getPaymentGetwaySuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

const updatePaymentGetwayLogic = createLogic({
  type: paymentGetwayAction.UPDATE_PAYMENTGETWAY_REQUEST,
  cancelType: paymentGetwayAction.UPDATE_PAYMENTGETWAY_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getPaymentGetwaySuccess({ updateReq: "Start" }));
    let stripeData = [];
    let paypalData = [];
    if (action.payload.type === "STRIPE") {
      stripeData =
        getState().PaymentGetwayReducer && getState().PaymentGetwayReducer.data
          ? getState().PaymentGetwayReducer.stripeData
          : [];
    } else {
      paypalData =
        getState().PaymentGetwayReducer && getState().PaymentGetwayReducer.data
          ? getState().PaymentGetwayReducer.paypalData
          : [];
    }
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/payment-gateway/" + action.payload.payment_geteway_id],
      "PUT",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      done();
      return;
    } else {
      logger(result);
      if (action.payload.type === "STRIPE") {
   
          let index = stripeData.findIndex((item) => item._id === action.payload.payment_geteway_id);
          stripeData[index] = result.data;
        
        dispatch(
          getPaymentGetwaySuccess({ stripeData: stripeData, isLoading: false, updateReq: "End" })
        );
      } else {
     
          let index = paypalData.findIndex((item) => item._id === action.payload.payment_geteway_id);
          paypalData[index] = result.data;
        
        dispatch(
          getPaymentGetwaySuccess({ paypalData: paypalData, isLoading: false, updateReq: "End" })
        );
      }


      done();
      return;
    }
  },
});


export const PaymentGetwayLogic = [
  addPaymentGetwayLogic,
  getPaymentGetwayLogic,
  updatePaymentGetwayLogic,
  getPaymentGetwayByIdLogic,
];
