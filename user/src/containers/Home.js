import React, { Component } from "react";
import HomeComponent from "../components/home";
import {  withRouter } from "react-router-dom";
class Home extends Component {
  render() {
    return <HomeComponent {...this.props} />;
  }
}
export default withRouter(Home);
