import React, { Component } from "react";
import ReviewComponent from "../components/review";
import { withRouter } from "react-router-dom";
class Review extends Component {
  render() {
    return <ReviewComponent {...this.props} />;
  }
}

export default withRouter(Review);
