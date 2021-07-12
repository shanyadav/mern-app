import React, { Component } from "react";
import FAQComponent from "../components/faq";
import { withRouter } from "react-router-dom";

class FAQ extends Component {
  render() {
    return (
      <>
        <FAQComponent {...this.props} />
      </>
    );
  }
}

export default withRouter(FAQ);
