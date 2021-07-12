import { toast } from "react-toastify";
import { createLogic } from "redux-logic";
import { ApiHelper } from "../../Helpers/ApiHelper";
import { logger } from "../../Helpers/Logger";
import { DefaultErrorMessage } from "../../config/Error";
import {
  ScheduleActions,
  getDayScheduleSuccess,
} from "../../actions";
let toastId = null;



const getDayScheduleLogic = createLogic({
  type: ScheduleActions.GET_SCHEDULE_REQUEST,
  cancelType: ScheduleActions.GET_SCHEDULE_FAILED,
  async process({ action }, dispatch, done) {
    dispatch(getDayScheduleSuccess({ isLoading: true}));
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "",
      "/day-schedule",
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
        getDayScheduleSuccess({ isLoading: false, data: [] })
      );
      done();
      return;
    } else {
      logger(result);
      dispatch(
        getDayScheduleSuccess({
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



export const DayScheduleLogic = [
  getDayScheduleLogic,
];
