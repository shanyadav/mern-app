import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Constants";
import {
  showLoader,
  hideLoader,
  DiscountCardActions,
  getDiscountCardSuccess,
  getDiscountCardSuccessById,
} from "../../actions";
let toastId = null;



const addDiscountCardLogic = createLogic({
  type: DiscountCardActions.ADD_DISCOUNTCARD_REQUEST,
  cancelType: DiscountCardActions.ADD_DISCOUNTCARD_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getDiscountCardSuccess({ updateReq: "Start" }));
    let VoucherData = [];
    let GiftData = [];
    let CouponData = [];
    let cardType = action.payload.card_type;
    if (cardType === "GIFT_CARD") {
      GiftData =
        getState().DiscountCardReducer && getState().DiscountCardReducer.giftCarddata
          ? getState().DiscountCardReducer.giftCarddata
          : [];
    } else if (cardType === "COUPON") {
      CouponData =
        getState().DiscountCardReducer && getState().DiscountCardReducer.copanData
          ? getState().DiscountCardReducer.copanData
          : [];
    } else {
      VoucherData =
        getState().DiscountCardReducer && getState().DiscountCardReducer.voucherData
          ? getState().DiscountCardReducer.voucherData
          : [];
    }
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/discount-card",
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
      if (cardType === "GIFT_CARD") {

        dispatch(
          getDiscountCardSuccess({ giftCarddata: [result.data, ...GiftData], isLoading: false, updateReq: "End" })
        );

      } else if (cardType === "COUPON") {
        dispatch(
          getDiscountCardSuccess({ copanData: [result.data, ...CouponData], isLoading: false, updateReq: "End" })
        );
      } else {

        dispatch(
          getDiscountCardSuccess({ voucherData: [result.data, ...VoucherData], isLoading: false, updateReq: "End" })
        );
      }

      dispatch(hideLoader());
      done();
    }
  },
});

// getList
const getDiscountCardLogic = createLogic({
  type: DiscountCardActions.GET_DISCOUNTCARD_REQUEST,
  cancelType: DiscountCardActions.GET_DISCOUNTCARD_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getDiscountCardSuccess({ isLoading: true, updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/discount-card",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      if (action.payload.card_type === "GIFT_CARD") {
        dispatch(
          getDiscountCardSuccess({
            giftCarddata: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      } else if (action.payload.card_type === "VOUCHER") {
        dispatch(
          getDiscountCardSuccess({
            voucherData: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      else {
        dispatch(
          getDiscountCardSuccess({
            copanData: [],
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      done();
      return;
    } else {
      logger(result);
      if (action.payload.card_type === "GIFT_CARD") {
        dispatch(
          getDiscountCardSuccess({
            giftCarddata: result.data,
            isLoading: false,
            updateReq: "End",
          })
        )
      } else if (action.payload.card_type === "VOUCHER") {
        dispatch(
          getDiscountCardSuccess({
            voucherData: result.data,
            isLoading: false,
            updateReq: "End",
          })
        )
      }
      else {
        dispatch(
          getDiscountCardSuccess({
            copanData: result.data,
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

const getDiscountCardByIdLogic = createLogic({
  type: DiscountCardActions.GET_DISCOUNTCARD_REQUEST_BY_ID,
  cancelType: DiscountCardActions.GET_DISCOUNTCARD_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/discount-card/" + action.payload.discount_id],
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
      dispatch(getDiscountCardSuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

const updateDiscountCardLogic = createLogic({
  type: DiscountCardActions.UPDATE_DISCOUNTCARD_REQUEST,
  cancelType: DiscountCardActions.UPDATE_DISCOUNTCARD_FAILED,
  async process({ action, getState }, dispatch, done) {
    dispatch(getDiscountCardSuccess({ updateReq: "Start" }));
    let VoucherData = [];
    let GiftData = [];
    let CouponData = [];
    let cardType = action.payload.card_type;
    if (cardType === "GIFT_CARD") {
      GiftData =
        getState().DiscountCardReducer && getState().DiscountCardReducer.giftCarddata
          ? getState().DiscountCardReducer.giftCarddata
          : [];
    } else if (cardType === "COUPON") {
      CouponData =
        getState().DiscountCardReducer && getState().DiscountCardReducer.copanData
          ? getState().DiscountCardReducer.copanData
          : [];
    } else {
      VoucherData =
        getState().DiscountCardReducer && getState().DiscountCardReducer.voucherData
          ? getState().DiscountCardReducer.voucherData
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
      ["/discount-card/" + dId],
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
      if (cardType === "GIFT_CARD") {
        if (GiftData && GiftData.is_removed) {
          let index = GiftData.findIndex((item) => item._id === dId);
          GiftData.splice(index, 1)
        } else {
          let index = GiftData.findIndex((item) => item._id === dId);
          GiftData[index] = result.data;
        }
        dispatch(
          getDiscountCardSuccess({ giftCarddata: GiftData, isLoading: false, updateReq: "End" })
        );

      } else if (cardType === "COUPON") {
        if (CouponData && CouponData.is_removed) {
          let index = CouponData.findIndex((item) => item._id === dId);
          CouponData.splice(index, 1)
        } else {
          let index = CouponData.findIndex((item) => item._id === dId);
          CouponData[index] = result.data;
        }
        dispatch(
          getDiscountCardSuccess({ copanData: CouponData, isLoading: false, updateReq: "End" })
        );
      } else {
        if (VoucherData && VoucherData.is_removed) {
          let index = VoucherData.findIndex((item) => item._id === dId);
          VoucherData.splice(index, 1)
        } else {
          let index = VoucherData.findIndex((item) => item._id === dId);
          VoucherData[index] = result.data;
        }
        dispatch(
          getDiscountCardSuccess({ voucherData: VoucherData, isLoading: false, updateReq: "End" })
        );
      }
      done();
      return;
    }
  },
});


export const DiscountCardLogic = [
  addDiscountCardLogic,
  getDiscountCardLogic,
  updateDiscountCardLogic,
  getDiscountCardByIdLogic,
];
