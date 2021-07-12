import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Constants";
import {
  hideLoader,
  cartAction,
  getCartSuccess,
} from "../../actions";
let toastId = null;



const addCartLogic = createLogic({
  type: cartAction.ADD_CART_REQUEST,
  cancelType: cartAction.ADD_CART_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getCartSuccess({ updateReq: "Start" }));
    let data =
      getState().CartReducer && getState().CartReducer.data
        ? getState().CartReducer.data
        : [];
    // dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/cart",
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
        getCartSuccess({
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
const getCartLogic = createLogic({
  type: cartAction.GET_CART_REQUEST,
  cancelType: cartAction.GET_CART_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getCartSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/cart",
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
        getCartSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getCartSuccess({
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

// const getCartByIdLogic = createLogic({
//   type: cartAction.GET_CART_REQUEST_BY_ID,
//   cancelType: cartAction.GET_CART_FAILED_BY_ID,
//   async process({ action }, dispatch, done) {
//     dispatch(showLoader());
//     let api = new ApiHelper();
//     let result = await api.FetchFromServer(
//       "",
//       ["/cart/" + action.payload.condition_id],
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
//       dispatch(getCartSuccessById({ dataById: result.data }));
//       dispatch(hideLoader());
//       done();
//       return;
//     }
//   },
// });

// update

const updateCartLogic = createLogic({
  type: cartAction.UPDATE_CART_REQUEST,
  cancelType: cartAction.UPDATE_CART_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getCartSuccess({ updateReq: "Start" }));
    let data =
      getState().CartReducer && getState().CartReducer.data
        ? getState().CartReducer.data
        : [];
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/cart/" + action.payload.condition_id],
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
        getCartSuccess({ data: data, isLoading: false, updateReq: "End" })
      );
      done();
      return;
    }
  },
});


export const CartLogic = [
  addCartLogic,
  getCartLogic,
  updateCartLogic,
];
