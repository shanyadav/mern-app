import React, { Component } from "react";
import OfferComponent from "../components/offer";
import { withRouter } from "react-router-dom";

class Offer extends Component {
  render() {
    return (
      <>
        <OfferComponent {...this.props} />
      </>
    );
  }
}

export default withRouter(Offer);
