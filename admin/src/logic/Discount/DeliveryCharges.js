import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Constants";
import {
  hideLoader,
  DeliveryChargesAction,
  getDeliveryChargesSuccess,
} from "../../actions";
let toastId = null;



const addDeliveryChargesLogic = createLogic({
  type: DeliveryChargesAction.ADD_DELIVERYCHARGES_REQUEST,
  cancelType: DeliveryChargesAction.ADD_DELIVERYCHARGES_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getDeliveryChargesSuccess({ updateReq: "Start" }));
    let data =
      getState().DeliveryChargesReducer && getState().DeliveryChargesReducer.data
        ? getState().DeliveryChargesReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/delivery-charge",
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
        getDeliveryChargesSuccess({
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
const getDeliveryChargesLogic = createLogic({
  type: DeliveryChargesAction.GET_DELIVERYCHARGES_REQUEST,
  cancelType: DeliveryChargesAction.GET_DELIVERYCHARGES_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getDeliveryChargesSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/delivery-charge",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(
        getDeliveryChargesSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getDeliveryChargesSuccess({
          data: result.data,
          isLoading: false,
          updateReq: "End",
        })
      );
      done();
      return;
    }
  },
});

// get Data by Id

// const getDeliveryChargesByIdLogic = createLogic({
//   type: DeliveryChargesAction.GET_DELIVERYCHARGES_REQUEST_BY_ID,
//   cancelType: DeliveryChargesAction.GET_DELIVERYCHARGES_FAILED_BY_ID,
//   async process({ action }, dispatch, done) {
//     dispatch(showLoader());
//     let api = new ApiHelper();
//     let result = await api.FetchFromServer(
//       "",
//       ["/delivery-charge/" + action.payload.condition_id],
//       "GET",
//       true,
//       undefined,
//       undefined
//     );
//     if (result.isError) {
//       if (!toast.isActive(toastId)) {
//         toastId = toast.error(result.messages[0] || DefaultErrorMessage);
//       }
//       dispatch(hideLoader());
//       done();
//       return;
//     } else {
//       logger(result);
//       dispatch(getDeliveryChargesSuccessById({ dataById: result.data }));
//       dispatch(hideLoader());
//       done();
//       return;
//     }
//   },
// });

// update

const updateDeliveryChargesLogic = createLogic({
  type: DeliveryChargesAction.UPDATE_DELIVERYCHARGES_REQUEST,
  cancelType: DeliveryChargesAction.UPDATE_DELIVERYCHARGES_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getDeliveryChargesSuccess({ updateReq: "Start" }));
    let data =
      getState().DeliveryChargesReducer && getState().DeliveryChargesReducer.data
        ? getState().DeliveryChargesReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/delivery-charge/" + action.payload.condition_id],
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

      if (result.data && result.data.is_removed) {
        let index = data.findIndex((item) => item._id === action.payload.condition_id);
        data.splice(index, 1)
      } else {
        let index = data.findIndex((item) => item._id === action.payload.condition_id);
        data[index] = result.data;
      }
      dispatch(
        getDeliveryChargesSuccess({ data: data, isLoading: false, updateReq: "End" })
      );
      done();
      return;
    }
  },
});


export const DeliveryChargesLogic = [
  addDeliveryChargesLogic,
  getDeliveryChargesLogic,
  updateDeliveryChargesLogic,
];
