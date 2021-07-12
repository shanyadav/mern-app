import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Error";
import {
    OptionAction,
    getOptionRequest,
    getOptionTypeSuccess
} from "../../actions";
let toastId = null;

const getOptionsTypeLogic = createLogic({
    type: OptionAction.GET_OPTION_REQUEST,
    cancelType: OptionAction.GET_OPTION_FAILED,
    async process({ action }, dispatch, done) {
        dispatch(getOptionTypeSuccess({ isLoading: false }));
        let api = new ApiHelper();
        let result = await api.FetchFromServer(
            "",
            "/option",
            "GET",
            true,
            action.payload,
            undefined
        );
        if (result.isError) {
            if (!toast.isActive(toastId)) {
                toastId = toast.error(result.messages[0] || DefaultErrorMessage);
            }
            dispatch(getOptionTypeSuccess({ isLoading: false }));
            done();
            return;
        } else {
            logger(result);
            dispatch(
                getOptionTypeSuccess({
                    data: result.data,
                    isLoading: false,

                })
            );
            done();
            return;
        }
    },
});
export const OptionsLogic = [getOptionsTypeLogic];
