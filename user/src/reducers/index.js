import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { AuthReducer } from "./auth";
import {FoodTypeReducer} from "./Menu/Foodtype";
import {FillterReducer} from "./Menu/Fillter";
import{CategorieReducer} from "./Menu/Category";
import {ItemsReducer} from "./Menu/Items";
import {ScheduleReducer} from "./Checkout/DaySchedule";
import {OptionsReducer} from "./Menu/Options";
import {CartReducer} from "./Checkout/Cart";
import { handleActions } from "redux-actions";

export const mainReducer = handleActions(
  {
    SHOW_LOADER: (state, action) => ({
      showLoader: true,
    }),
    HIDE_LOADER: (state, action) => ({
      showLoader: false,
    }),
  },
  {
    showLoader: false,
  }
);

const AppReducer = combineReducers({
  mainReducer,
  AuthReducer,
  FoodTypeReducer,
  FillterReducer,
  CategorieReducer,
  ItemsReducer,
  ScheduleReducer,
  OptionsReducer,
  CartReducer,
  routing: routerReducer,
});

export default AppReducer;
