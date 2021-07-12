import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Constants";
import {
  showLoader,
  hideLoader,
  DiscountCategoryActions,
  getDiscountCategorySuccess,
  getDiscountCategorySuccessById,
} from "../../actions";
let toastId = null;



const addDiscountCategoryLogic = createLogic({
  type: DiscountCategoryActions.ADD_DISCOUNTCATRGORY_REQUEST,
  cancelType: DiscountCategoryActions.ADD_DISCOUNTCATRGORY_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getDiscountCategorySuccess({ updateReq: "Start" }));
    let redundantData = [];
    let subscriberData = [];
    let paymentData = [];
    let discount_type = action.payload.discount_type;
    if (discount_type === "ONE_TIME_SUBSCRIBER") {
      subscriberData =
        getState().DiscountCategoryReducer && getState().DiscountCategoryReducer.subscriber
          ? getState().DiscountCategoryReducer.subscriber
          : [];
    } else if (discount_type === "PAYMENT_TYPE") {
      paymentData =
        getState().DiscountCategoryReducer && getState().DiscountCategoryReducer.payment
          ? getState().DiscountCategoryReducer.payment
          : [];
    } else {
      redundantData =
        getState().DiscountCategoryReducer && getState().DiscountCategoryReducer.redundant
          ? getState().DiscountCategoryReducer.redundant
          : [];
    }
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/discount-category",
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
      if (discount_type === "ONE_TIME_SUBSCRIBER") {

        dispatch(
          getDiscountCategorySuccess({ subscriber: [result.data, ...subscriberData], isLoading: false, updateReq: "End" })
        );

      } else if (discount_type === "PAYMENT_TYPE") {
        dispatch(
          getDiscountCategorySuccess({ payment: [result.data, ...paymentData], isLoading: false, updateReq: "End" })
        );
      } else {

        dispatch(
          getDiscountCategorySuccess({ redundant: [result.data, ...redundantData], isLoading: false, updateReq: "End" })
        );
      }

      dispatch(hideLoader());
      done();
    }
  },
});

// getList
const getDiscountCategoryLogic = createLogic({
  type: DiscountCategoryActions.GET_DISCOUNTCATRGORY_REQUEST,
  cancelType: DiscountCategoryActions.GET_DISCOUNTCATRGORY_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getDiscountCategorySuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/discount-category",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      if (action.payload.discount_type === "ONE_TIME_SUBSCRIBER") {
        dispatch(
          getDiscountCategorySuccess({
            subscriber: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      } else if (action.payload.discount_type === "PAYMENT_TYPE") {
        dispatch(
          getDiscountCategorySuccess({
            redundant: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      else {
        dispatch(
          getDiscountCategorySuccess({
            payment: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      done();
      return;
    } else {
      logger(result);
      if (action.payload.discount_type === "ONE_TIME_SUBSCRIBER") {
        dispatch(
          getDiscountCategorySuccess({
            subscriber: result.data,
            isLoading: false,
            updateReq: "End",
          })
        )
      } else if (action.payload.discount_type === "PAYMENT_TYPE") {
        dispatch(
          getDiscountCategorySuccess({
            payment: result.data,
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      else {
        dispatch(
          getDiscountCategorySuccess({
            redundant: result.data,
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

const getDiscountCategoryByIdLogic = createLogic({
  type: DiscountCategoryActions.GET_DISCOUNTCATRGORY_REQUEST_BY_ID,
  cancelType: DiscountCategoryActions.GET_DISCOUNTCATRGORY_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/discount-category/" + action.payload.discount_id],
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
      dispatch(getDiscountCategorySuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

const updateDiscountCategoryLogic = createLogic({
  type: DiscountCategoryActions.UPDATE_DISCOUNTCATRGORY_REQUEST,
  cancelType: DiscountCategoryActions.UPDATE_DISCOUNTCATRGORY_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getDiscountCategorySuccess({ updateReq: "Start" }));
    let redundantData = [];
    let subscriberData = [];
    let paymentData = [];
    let discount_type = action.payload.discount_type;
    if (discount_type === "ONE_TIME_SUBSCRIBER") {
      subscriberData =
        getState().DiscountCategoryReducer && getState().DiscountCategoryReducer.subscriber
          ? getState().DiscountCategoryReducer.subscriber
          : [];
    } else if (discount_type === "PAYMENT_TYPE") {
      paymentData =
        getState().DiscountCategoryReducer && getState().DiscountCategoryReducer.payment
          ? getState().DiscountCategoryReducer.payment
          : [];
    } else {
      redundantData =
        getState().DiscountCategoryReducer && getState().DiscountCategoryReducer.redundant
          ? getState().DiscountCategoryReducer.redundant
          : [];
    }
    let dId = action.payload.discount_id ? action.payload.discount_id : action.payload.get("discount_id");
    if (action.payload.discount_id)
      delete action.payload.discount_id;
    else
      action.payload.delete("discount_id")
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/discount-category/" + dId],
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
      if (discount_type === "ONE_TIME_SUBSCRIBER") {
        if (subscriberData && subscriberData.is_removed) {
          let index = subscriberData.findIndex((item) => item._id === dId);
          subscriberData.splice(index, 1)
        } else {
          let index = subscriberData.findIndex((item) => item._id === dId);
          subscriberData[index] = result.data;
        }
        dispatch(
          getDiscountCategorySuccess({ subscriber: subscriberData, isLoading: false, updateReq: "End" })
        );

      } else if (discount_type === "PAYMENT_TYPE") {
        if (paymentData && paymentData.is_removed) {
          let index = paymentData.findIndex((item) => item._id === dId);
          paymentData.splice(index, 1)
        } else {
          let index = paymentData.findIndex((item) => item._id === dId);
          paymentData[index] = result.data;
        }
        dispatch(
          getDiscountCategorySuccess({ payment: paymentData, isLoading: false, updateReq: "End" })
        );
      } else {
        if (redundantData && redundantData.is_removed) {
          let index = redundantData.findIndex((item) => item._id === dId);
          redundantData.splice(index, 1)
        } else {
          let index = redundantData.findIndex((item) => item._id === dId);
          redundantData[index] = result.data;
        }
        dispatch(
          getDiscountCategorySuccess({ redundant: redundantData, isLoading: false, updateReq: "End" })
        );
      }
      done();
      return;
    }
  },
});


export const DiscountCategoryLogic = [
  addDiscountCategoryLogic,
  getDiscountCategoryLogic,
  updateDiscountCategoryLogic,
  getDiscountCategoryByIdLogic,
];
