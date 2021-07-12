import { push } from "react-router-redux";
import { createLogic } from "redux-logic";

import { AuthLogic } from "./auth";
import { CategoriesLogic } from "./categories";
import { SubCategoriesLogic } from "./listSubCategories";
import { FoodTypesLogic } from "./FoodType";
import { FilterTypeLogic } from "./FilterType";
import { ListItemsLogic } from "./LIstItem";
import { DayDiscountLogic } from "./Discount/DayDiscount";
import { HoureDiscountLogic } from "./Discount/hourDiscount";
import { DiscountCardLogic } from "./Discount/DiscountCard";
import { OrderDiscountLogic } from "./Discount/OrderDiscount";
import {ServiceDiscountLogic} from "./Discount/ServiceDiscount";
import {DeliveryChargesLogic} from "./Discount/DeliveryCharges";
import {OptionsLogic} from "./Options";
import {OptionsAttributeLogic} from "./OptionsAttribute";
import {DiscountCategoryLogic} from "./Discount/DiscountCategory";
import {CheckoutServiceLogic} from "./Checkout/CheckoutService";
import {DayScheduleLogic} from "./Checkout/Schedule";
import {PaymentGetwayLogic} from "./payment/paymentGetway";
export const redirectToLogic = createLogic({
  type: "REDIRET_TO",
  async process({ action }, dispatch, done) {
    dispatch(push(action.payload.path));
    done();
  },
});

export default [
  ...AuthLogic,
  ...CategoriesLogic,
  ...SubCategoriesLogic,
  ...FoodTypesLogic,
  ...FilterTypeLogic,
  ...ListItemsLogic,
  ...HoureDiscountLogic,
  ...DayDiscountLogic,
  ...DiscountCardLogic,
  ...OrderDiscountLogic,
  ...ServiceDiscountLogic,
  ...DeliveryChargesLogic,
  ...OptionsLogic,
  ...OptionsAttributeLogic,
  ...DiscountCategoryLogic,
  ...CheckoutServiceLogic,
  ...DayScheduleLogic,
  ...PaymentGetwayLogic,
  redirectToLogic,
];
