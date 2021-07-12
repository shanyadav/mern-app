import React, { Component, Suspense } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import FullPageLoader from "../Loader/FullPageLoader";
import Home from "../Home";
import Order from "../Order";
import Menu from "../Menu";
import EventCatering from "../EventCatering";
import Merchandise from "../Merchandise";
import OurBranches from "../OurBranches";
import SingleEvent from "../SingleEvent";
import Offer from "../Offer";
import FAQ from "../FAQ";
import Event from "../Event";
import About from "../About";
import Review from "../Review";
import Contact from "../Contact";
import Login from "../Login";
import Checkout from "../Checkout";
import Profile from "../Profile";
class DefaultLayout extends Component {
  render() {
    return (
      <>
        <Header {...this.props} />
        <Suspense fallback={<FullPageLoader />}>
          <Switch>
            <Route
              exact
              path="/home"
              render={(props) => <Home {...props} {...this.props} />}
            />
            <Route
              exact
              path="/order"
              render={(props) => <Order {...props} {...this.props} />}
            />
            <Route
              exact
              path="/menu"
              render={(props) => <Menu {...props} {...this.props} />}
            />
            <Route
              exact
              path="/pages/event-catering"
              render={(props) => <EventCatering {...props} {...this.props} />}
            />
            <Route
              exact
              path="/pages/Merchandise"
              render={(props) => <Merchandise {...props} {...this.props} />}
            />
            <Route
              exact
              path="/pages/our-branches"
              render={(props) => <OurBranches {...props} {...this.props} />}
            />
            <Route
              exact
              path="/pages/single-event"
              render={(props) => <SingleEvent {...props} {...this.props} />}
            />
            <Route
              exact
              path="/pages/event"
              render={(props) => <Event {...props} {...this.props} />}
            />
            <Route
              exact
              path="/pages/offer"
              render={(props) => <Offer {...props} {...this.props} />}
            />
            <Route
              exact
              path="/pages/faq"
              render={(props) => <FAQ {...props} {...this.props} />}
            />
            <Route
              exact
              path="/login"
              render={(props) => <Login {...props} {...this.props} />}
            />
            <Route
              exact
              path="/checkout"
              render={(props) => <Checkout {...props} {...this.props} />}
            />
            <Route
              exact
              path="/contact"
              render={(props) => <Contact {...props} {...this.props} />}
            />
            <Route
              exact
              path="/review"
              render={(props) => <Review {...props} {...this.props} />}
            />
            <Route
              exact
              path="/about"
              render={(props) => <About {...props} {...this.props} />}
            />
            <Route
              exact
              path="/profile"
              render={(props) => <Profile {...props} {...this.props} />}
            />
            <Redirect from="/" to="/home" />
          </Switch>
        </Suspense>
        <Footer {...this.props} />
      </>
    );
  }
}

export default withRouter(DefaultLayout);
