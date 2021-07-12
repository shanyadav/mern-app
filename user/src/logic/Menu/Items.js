import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Error";
import {
  showLoader,
  hideLoader,
  ListItemsActions,
  getListItemsSuccess,
  getListItemsSuccessById,
} from "../../actions";
let toastId = null;

// getList
const getListItemsLogic = createLogic({
  type: ListItemsActions.GET_LISTITEMS_REQUEST,
  cancelType: ListItemsActions.GET_LISTITEMS_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getListItemsSuccess({ isLoading: false }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/item",
      "GET",
      true,
      action.payload,
      undefined,
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(
        getListItemsSuccess({ isLoading: false, data: [], updateReq: "End" })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getListItemsSuccess({
          data: result.data,
          isLoading: false,
        })
      );
      done();
      return;
    }
  },
});

// get data by id

const getListItemsByIdLogic = createLogic({
  type: ListItemsActions.GET_LISTITEMS_REQUEST_BY_ID,
  cancelType: ListItemsActions.GET_LISTITEMS_FAILED_BY_ID,
  async process({ action }, dispatch, done) {
    dispatch(showLoader());
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      ["/item/" + action.payload.item_id],
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
      dispatch(getListItemsSuccessById({ dataById: result.data }));
      dispatch(hideLoader());
      done();
      return;
    }
  },
});

// update

export const ListItemsLogic = [
  getListItemsLogic,
  getListItemsByIdLogic,
];
