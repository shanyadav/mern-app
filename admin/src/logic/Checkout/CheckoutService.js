import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Constants";
import {
  showLoader,
  hideLoader,
  CheckoutServiceAction,
  getCheckoutServiceSuccess,
  getCheckoutServiceSuccessById,
} from "../../actions";
let toastId = null;



const addCheckoutServiceLogic = createLogic({
  type: CheckoutServiceAction.ADD_CHECKOUTSERVICE_REQUEST,
  cancelType: CheckoutServiceAction.ADD_CHECKOUTSERVICE_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getCheckoutServiceSuccess({ updateReq: "Start" }));
    let data =
      getState().CheckoutServiceReducer && getState().CheckoutServiceReducer.data
        ? getState().CheckoutServiceReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/checkout-service",
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
        getCheckoutServiceSuccess({
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
const getCheckoutServiceLogic = createLogic({
  type: CheckoutServiceAction.GET_CHECKOUTSERVICE_REQUEST,
  cancelType: CheckoutServiceAction.GET_CHECKOUTSERVICE_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getCheckoutServiceSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/checkout-service",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      if (action.payload.type === "BAG") {
        dispatch(
          getCheckoutServiceSuccess({
            BegData: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      } else {
        dispatch(
          getCheckoutServiceSuccess({
            TipData: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      done();
      return;
    } else {
      logger(result);

      if (action.payload.type === "BAG") {
        dispatch(
          getCheckoutServiceSuccess({
            BegData: result.data,
            isLoading: false,
            updateReq: "End",
          })
        )
      } else {
        dispatch(
          getCheckoutServiceSuccess({
            TipData: result.data,
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

const getCheckoutServiceByIdLogic = createLogic({
  type: CheckoutServiceAction.GET_CHECKOUTSERVICE_REQUEST_BY_ID,
  cancelType: CheckoutServiceAction.GET_CHECKOUTSERVICE_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/checkout-service/" + action.payload.service_id],
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
      dispatch(getCheckoutServiceSuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

const updateCheckoutServiceLogic = createLogic({
  type: CheckoutServiceAction.UPDATE_CHECKOUTSERVICE_REQUEST,
  cancelType: CheckoutServiceAction.UPDATE_CHECKOUTSERVICE_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getCheckoutServiceSuccess({ updateReq: "Start" }));
    let BegData = [];
    let TipData = [];
    if (action.payload.type === "BAG") {
      BegData =
        getState().CheckoutServiceReducer && getState().CheckoutServiceReducer.data
          ? getState().CheckoutServiceReducer.BegData
          : [];
    } else {
      TipData =
        getState().CheckoutServiceReducer && getState().CheckoutServiceReducer.data
          ? getState().CheckoutServiceReducer.TipData
          : [];
    }
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/checkout-service/" + action.payload.service_id],
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
      if (action.payload.type === "BAG") {
        if (BegData && BegData.is_removed) {
          let index = BegData.findIndex((item) => item._id === action.payload.service_id);
          BegData.splice(index, 1)
        } else {
          let index = BegData.findIndex((item) => item._id === action.payload.service_id);
          BegData[index] = result.data;
        }
        dispatch(
          getCheckoutServiceSuccess({ BegData: BegData, isLoading: false, updateReq: "End" })
        );
      } else {
        if (TipData && TipData.is_removed) {
          let index = TipData.findIndex((item) => item._id === action.payload.service_id);
          TipData.splice(index, 1)
        } else {
          let index = TipData.findIndex((item) => item._id === action.payload.service_id);
          TipData[index] = result.data;
        }
        dispatch(
          getCheckoutServiceSuccess({ TipData: TipData, isLoading: false, updateReq: "End" })
        );
      }

      // if (result.data && result.data.is_removed) {
      //   let index = data.findIndex((item) => item._id === action.payload.service_id);
      //   data.splice(index, 1)
      // } else {
      //   let index = data.findIndex((item) => item._id === action.payload.service_id);
      //   data[index] = result.data;
      // }

      done();
      return;
    }
  },
});


export const CheckoutServiceLogic = [
  addCheckoutServiceLogic,
  getCheckoutServiceLogic,
  updateCheckoutServiceLogic,
  getCheckoutServiceByIdLogic,
];
