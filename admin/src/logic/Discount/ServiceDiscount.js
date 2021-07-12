import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Constants";
import {
  hideLoader,
  ServiceDiscountActions,
  getServiceDiscountSuccess,
} from "../../actions";
let toastId = null;



const addServiceDiscountLogic = createLogic({
  type: ServiceDiscountActions.ADD_SERVICEDISCOUNT_REQUEST,
  cancelType: ServiceDiscountActions.ADD_SERVICEDISCOUNT_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getServiceDiscountSuccess({ updateReq: "Start" }));
    let data =
      getState().ServiceDiscountReducer && getState().ServiceDiscountReducer.data
        ? getState().ServiceDiscountReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/service-charge",
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
        getServiceDiscountSuccess({
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
const getServiceDiscountLogic = createLogic({
  type: ServiceDiscountActions.GET_SERVICEDISCOUNT_REQUEST,
  cancelType: ServiceDiscountActions.GET_SERVICEDISCOUNT_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getServiceDiscountSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/service-charge",
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
        getServiceDiscountSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getServiceDiscountSuccess({
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

// const getServiceDiscountByIdLogic = createLogic({
//   type: ServiceDiscountActions.GET_SERVICEDISCOUNT_REQUEST_BY_ID,
//   cancelType: ServiceDiscountActions.GET_SERVICEDISCOUNT_FAILED_BY_ID,
//   async process({ action }, dispatch, done) {
//     dispatch(showLoader());
//     let api = new ApiHelper();
//     let result = await api.FetchFromServer(
//       "",
//       ["/service-charge/" + action.payload.condition_id],
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
//       dispatch(getServiceDiscountSuccessById({ dataById: result.data }));
//       dispatch(hideLoader());
//       done();
//       return;
//     }
//   },
// });

// update

const updateServiceDiscountLogic = createLogic({
  type: ServiceDiscountActions.UPDATE_SERVICEDISCOUNT_REQUEST,
  cancelType: ServiceDiscountActions.UPDATE_SERVICEDISCOUNT_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getServiceDiscountSuccess({ updateReq: "Start" }));
    let data =
      getState().ServiceDiscountReducer && getState().ServiceDiscountReducer.data
        ? getState().ServiceDiscountReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/service-charge/" + action.payload.condition_id],
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
        getServiceDiscountSuccess({ data: data, isLoading: false, updateReq: "End" })
      );
      done();
      return;
    }
  },
});


export const ServiceDiscountLogic = [
  addServiceDiscountLogic,
  getServiceDiscountLogic,
  updateServiceDiscountLogic,
];
