import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Error";
import {
  showLoader,
  hideLoader,
  foodTypeActions,
  getFoodTypesSuccess,
} from "../../actions";
let toastId = null;

const getFoodTypesLogic = createLogic({
  type: foodTypeActions.GET_FOODTYPE_REQUEST,
  cancelType: foodTypeActions.GET_FOODTYPE_FAILED,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/food-type?is_deleted=false",
      "GET",
      true,
      undefined,
      undefined
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0] || DefaultErrorMessage);
      }
      dispatch(getFoodTypesSuccess({ isLoading: false }));
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getFoodTypesSuccess({
          data: result.data,
          isLoading: false,
        })
      );
      done();
      return;
    }
  },
});

export const FoodTypesLogic = [getFoodTypesLogic];
