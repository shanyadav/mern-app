import React, { Component } from "react";
import ContactComponent from "../components/contact";
import {  withRouter } from "react-router-dom";
class Contact extends Component {
  render() {
    return <ContactComponent {...this.props} />;
  }
}

export default withRouter(Contact);
