import React, { Component } from "react";
import EventComponent from "../components/event";
import { withRouter } from "react-router-dom";

class Event extends Component {
  render() {
    return (
      <>
        <EventComponent {...this.props} />
      </>
    );
  }
}

export default withRouter(Event);
