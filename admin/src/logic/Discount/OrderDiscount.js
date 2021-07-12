import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Constants";
import {
  showLoader,
  hideLoader,
  OrderDiscountActions,
  getOrderDiscountSuccess,
  getOrderDiscountSuccessById,
} from "../../actions";
let toastId = null;



const addOrderDiscountLogic = createLogic({
  type: OrderDiscountActions.ADD_ORDERDISCOUNT_REQUEST,
  cancelType: OrderDiscountActions.ADD_ORDERDISCOUNT_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getOrderDiscountSuccess({ updateReq: "Start" }));
    let DeliveryData = [];
    let PickUpdata = [];
    let orderType = action.payload.order_type;

    if (orderType === "PICK_UP") {
      PickUpdata =
        getState().OrderDiscountReducer && getState().OrderDiscountReducer.PickUpCarddata
          ? getState().OrderDiscountReducer.PickUpCarddata
          : [];
    } else {
      DeliveryData =
        getState().OrderDiscountReducer && getState().OrderDiscountReducer.DeliveryCardData
          ? getState().OrderDiscountReducer.DeliveryCardData
          : [];
    }
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/minimum-order-value",
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
      if (orderType === "PICK_UP") {
        dispatch(
          getOrderDiscountSuccess({ PickUpCarddata: [result.data, ...PickUpdata], isLoading: false, updateReq: "End" })
        );

      } else {
        dispatch(
          getOrderDiscountSuccess({ DeliveryCardData: [result.data, ...DeliveryData], isLoading: false, updateReq: "End" })
        );
      }

      dispatch(hideLoader());
      done();
    }
  },
});

// getList
const getOrderDiscountLogic = createLogic({
  type: OrderDiscountActions.GET_ORDERDISCOUNT_REQUEST,
  cancelType: OrderDiscountActions.GET_ORDERDISCOUNT_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getOrderDiscountSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/minimum-order-value",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      if (action.payload.order_type === "PICK_UP") {
        dispatch(
          getOrderDiscountSuccess({
            PickUpCarddata: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      else {
        dispatch(
          getOrderDiscountSuccess({
            DeliveryCardData: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      done();
      return;
    } else {
      logger(result);
      if (action.payload.order_type === "PICK_UP") {
        dispatch(
          getOrderDiscountSuccess({
            PickUpCarddata: result.data,
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      else {
        dispatch(
          getOrderDiscountSuccess({
            DeliveryCardData: result.data,
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

const getOrderDiscountByIdLogic = createLogic({
  type: OrderDiscountActions.GET_ORDERDISCOUNT_REQUEST_BY_ID,
  cancelType: OrderDiscountActions.GET_ORDERDISCOUNT_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/minimum-order-value/" + action.payload.condition_id],
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
      dispatch(getOrderDiscountSuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

const updateOrderDiscountLogic = createLogic({
  type: OrderDiscountActions.UPDATE_ORDERDISCOUNT_REQUEST,
  cancelType: OrderDiscountActions.UPDATE_ORDERDISCOUNT_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getOrderDiscountSuccess({ updateReq: "Start" }));
    let PickUpdata = [];
    let DeliveryData = [];
    let orderType = action.payload.order_type;
    if (orderType === "PICK_UP") {
      PickUpdata =
        getState().OrderDiscountReducer && getState().OrderDiscountReducer.PickUpCarddata
          ? getState().OrderDiscountReducer.PickUpCarddata
          : [];
    } else {
      DeliveryData =
        getState().OrderDiscountReducer && getState().OrderDiscountReducer.DeliveryCardData
          ? getState().OrderDiscountReducer.DeliveryCardData
          : [];
    }
    let dId = action.payload.condition_id;
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/minimum-order-value/" + dId],
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
      if (orderType === "PICK_UP") {
        if (result.data && result.data.is_removed) {
          let index = PickUpdata.findIndex((item) => item._id === dId);
          PickUpdata.splice(index, 1)
        }
        else {
          let index = PickUpdata.findIndex((item) => item._id === dId);
          PickUpdata[index] = result.data;
        }
        dispatch(
          getOrderDiscountSuccess({ PickUpCarddata: PickUpdata, isLoading: false, updateReq: "End" })
        );

      } else {
        if (result.data && result.data.is_removed) {
          let index = DeliveryData.findIndex((item) => item._id === dId);
          DeliveryData.splice(index, 1)
        }
        else {
          let index = DeliveryData.findIndex((item) => item._id === dId);
          DeliveryData[index] = result.data;
        }
        dispatch(
          getOrderDiscountSuccess({ DeliveryCardData: DeliveryData, isLoading: false, updateReq: "End" })
        );
      }
      done();
      return;
    }
  },
});


export const OrderDiscountLogic = [
  addOrderDiscountLogic,
  getOrderDiscountLogic,
  updateOrderDiscountLogic,
  getOrderDiscountByIdLogic,
];
