import { createAction } from "redux-actions";

export * from "./User/auth";
export * from "./Menu/FoodType";
export * from "./Menu/Category";
export * from "./Menu/Fillter";
export * from "./Menu/Iteam";
export * from "./Checout/DaySchedule";
export * from "./Menu/Options";
export * from "./Checout/Cart";
export const redirectTo = createAction("REDIRET_TO");

export const showLoader = createAction("SHOW_LOADER");

export const hideLoader = createAction("HIDE_LOADER");