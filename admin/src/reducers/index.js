import { routerReducer } from "react-router-redux";
import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { ResponsiveReducer } from "./responsive";
import { AuthReducer } from "./auth";
import { CategorieReducer } from "./categories";
import { SubCategorieReducer } from "./subCategories";
import { ModalReducer } from "./modalOperations";
import { FoodTypeReducer } from "./FoodType";
import { FilterTypeReducer } from "./FilterTypeReduser";
import { ItemsReducer } from "./ItemReducer";
import { DayDiscountReducer } from "./Discount/ReducerDay";
import { HourDiscountReducer } from "./Discount/ReducerHour";
import { DiscountCardReducer } from "./Discount/DiscountCard";
import { OrderDiscountReducer } from "./Discount/OrderCard";
import {ServiceDiscountReducer} from "./Discount/ServiceCard";
import {DeliveryChargesReducer} from "./Discount/DeliveryChargesCard";
import {OptionsReducer} from "./options";
import {OptionsAttributeReducer} from "./OptionsAttribute";
import {DiscountCategoryReducer} from "./Discount/DiscountCategory";
import {CheckoutServiceReducer} from "./Checkout/CheckoutService";
import {ScheduleReducer} from "./Checkout/Schedule";
import {paymentGetwayReducer} from "./Payment/PaymentGetway";
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
  ResponsiveReducer,
  AuthReducer,
  CategorieReducer,
  SubCategorieReducer,
  ModalReducer,
  FoodTypeReducer,
  FilterTypeReducer,
  ItemsReducer,
  HourDiscountReducer,
  DayDiscountReducer,
  DiscountCardReducer,
  OrderDiscountReducer,
  ServiceDiscountReducer,
  DeliveryChargesReducer,
  DeliveryChargesReducer,
  OptionsReducer,
  OptionsAttributeReducer,
  DiscountCategoryReducer,
  CheckoutServiceReducer,
  ScheduleReducer,
  paymentGetwayReducer,
  routing: routerReducer,
});

export default AppReducer;
