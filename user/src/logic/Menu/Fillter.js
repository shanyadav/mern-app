import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Error";
import {
  FilterAction,
  getFilterTypeSuccess,
} from "../../actions";
let toastId = null;

const getFilterTypeLogic = createLogic({
  type: FilterAction.GET_FILTER_REQUEST,
  cancelType: FilterAction.GET_FILTER_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getFilterTypeSuccess({ updateReq: "Start" }));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/filter-type/list?is_deleted=false",
      "GET",
      true,
      undefined,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(getFilterTypeSuccess({ isLoading: false }));
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getFilterTypeSuccess({
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
export const FilterTypeLogic = [getFilterTypeLogic];
