import { handleActions } from "redux-actions";
import { paymentGetwayAction } from "../../actions";

const initialState = {
    stripeData: [],
    paypalData: [],
    updateReq: "End",
    isLoading: false,
    dataById: {},
};

export const paymentGetwayReducer = handleActions(
    {
        [paymentGetwayAction.GET_PAYMENTGETWAY_SUCCESS]: (state, { payload }) => ({
            ...state,
            ...payload,
        }),

    },
    initialState
);
