import React from "react";
import { AppRoutes } from "./config";

const Dashboard = React.lazy(() => import("./containers/dashboard/Dashboard"));
const TableBookingList = React.lazy(() =>
  import("./components/TableBooking/TableBookingList")
);
const OfferPopup = React.lazy(() =>
  import("./components/HomePageEntry/OfferPopup")
);
const ListOfSliders = React.lazy(() =>
  import("./components/HomePageEntry/ListOfSliders")
);
const AboutUs = React.lazy(() => import("./components/HomePageEntry/AboutUs"));
const FoodGallery = React.lazy(() =>
  import("./components/HomePageEntry/FoodGallery")
);
const ReviewList = React.lazy(() =>
  import("./components/HomePageEntry/Review")
);
const OrderList = React.lazy(() =>
  import("./components/SalesReport/OrderList")
);

const ListItems = React.lazy(() => import("./components/MenuEntry/Index"));

const ReportList = React.lazy(() =>
  import("./components/SalesReport/ReportList")
);
const WalletRecord = React.lazy(() =>
  import("./components/SalesReport/WalletRecord")
);
const SummaryReport = React.lazy(() =>
  import("./components/SalesReport/SummaryReport")
);
const ContactList = React.lazy(() =>
  import("./components/Contact/ContactList")
);

const Discount = React.lazy(() => import("./components/discount/index"));

const Checkout = React.lazy(() => import("./components/Checkout/index"));
const routes = [
  {
    path: AppRoutes.HOME.url,
    exact: AppRoutes.HOME.exact,
    name: AppRoutes.HOME.name,
  },
  {
    path: AppRoutes.DASHBOARD.url,
    name: AppRoutes.DASHBOARD.name,
    exact: AppRoutes.DASHBOARD.exact,
    component: Dashboard,
  },
  {
    path: AppRoutes.TablesBooking.url,
    exact: AppRoutes.TablesBooking.exact,
    name: AppRoutes.TablesBooking.name,
  },
  {
    path: AppRoutes.TableBookingList.url,
    name: AppRoutes.TableBookingList.name,
    exact: AppRoutes.TableBookingList.exact,
    component: TableBookingList,
  },
  {
    path: AppRoutes.HomePageEntry.url,
    exact: AppRoutes.HomePageEntry.exact,
    name: AppRoutes.HomePageEntry.name,
  },
  {
    path: AppRoutes.OfferPopup.url,
    name: AppRoutes.OfferPopup.name,
    exact: AppRoutes.OfferPopup.exact,
    component: OfferPopup,
  },
  {
    path: AppRoutes.ListOfSliders.url,
    name: AppRoutes.ListOfSliders.name,
    exact: AppRoutes.ListOfSliders.exact,
    component: ListOfSliders,
  },
  {
    path: AppRoutes.AboutUs.url,
    name: AppRoutes.AboutUs.name,
    exact: AppRoutes.AboutUs.exact,
    component: AboutUs,
  },
  {
    path: AppRoutes.FoodGallery.url,
    name: AppRoutes.FoodGallery.name,
    exact: AppRoutes.FoodGallery.exact,
    component: FoodGallery,
  },
  {
    path: AppRoutes.ReviewList.url,
    name: AppRoutes.ReviewList.name,
    exact: AppRoutes.ReviewList.exact,
    component: ReviewList,
  },
  {
    path: AppRoutes.MenuEntry.url,
    exact: AppRoutes.MenuEntry.exact,
    name: AppRoutes.MenuEntry.name,
  },

  {
    path: AppRoutes.Menu.url,
    name: AppRoutes.Menu.name,
    exact: AppRoutes.Menu.exact,
    component: ListItems,
  },
  {
    path: AppRoutes.DiscountEntry.url,
    exact: AppRoutes.DiscountEntry.exact,
    name: AppRoutes.DiscountEntry.name,
  },

  {
    path: AppRoutes.Discount.url,
    name: AppRoutes.Discount.name,
    exact: AppRoutes.Discount.exact,
    component: Discount,
  },

  {
    path: AppRoutes.SalesReport.url,
    exact: AppRoutes.SalesReport.exact,
    name: AppRoutes.SalesReport.name,
  },
  {
    path: AppRoutes.OrderList.url,
    name: AppRoutes.OrderList.name,
    exact: AppRoutes.OrderList.exact,
    component: OrderList,
  },
  {
    path: AppRoutes.ReportList.url,
    name: AppRoutes.ReportList.name,
    exact: AppRoutes.ReportList.exact,
    component: ReportList,
  },
  {
    path: AppRoutes.WalletRecord.url,
    name: AppRoutes.WalletRecord.name,
    exact: AppRoutes.WalletRecord.exact,
    component: WalletRecord,
  },
  {
    path: AppRoutes.SummaryReport.url,
    name: AppRoutes.SummaryReport.name,
    exact: AppRoutes.SummaryReport.exact,
    component: SummaryReport,
  },
  {
    path: AppRoutes.ContactList.url,
    name: AppRoutes.ContactList.name,
    exact: AppRoutes.ContactList.exact,
    component: ContactList,
  },
  {
    path: "/checkout",
    name: "Checkout",
    exact: true,
    component: Checkout,
  },
];

export default routes;
