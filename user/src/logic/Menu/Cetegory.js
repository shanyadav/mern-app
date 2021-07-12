import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Error";
import {
  showLoader,
  hideLoader,
  categoriesActions,
  getCategoriesSuccess,
} from "../../actions";
let toastId = null;


// getList
const getCategoriesLogic = createLogic({
  type: categoriesActions.GET_CATEGORIE_REQUEST,
  cancelType: categoriesActions.GET_CATEGORIE_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getCategoriesSuccess({ isLoading: true}));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/category",
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
        getCategoriesSuccess({ isLoading: false, data: []})
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getCategoriesSuccess({
          data: result.data,
          isLoading: false,
        })
      );
      done();
      return;
    }
  },
});



export const CategoriesLogic = [
  getCategoriesLogic,
];
