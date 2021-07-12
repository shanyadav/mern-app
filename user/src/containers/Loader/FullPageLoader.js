import React, { Component } from "react";

class FullPageLoader extends Component {
  render() {
    return (
      <>
        {/* --::::::::::::::::::::::::::: Start: Preloader section :::::::::::::::::::::::::::-- */}
        <div className="preloader">
          <div className="loader loader1"></div>
          <div className="loader loader2"></div>
          <div className="loader loader3"></div>
          <div className="loader loader4"></div>
          <div className="loader loader5"></div>
          <div className="loader loader6"></div>
          <div className="loader loader7"></div>
          <div className="loader loader8"></div>
        </div>
        {/* --::::::::::::::::::::::::::: End: Preloader section :::::::::::::::::::::::::::-- */}
      </>
    );
  }
}
export default FullPageLoader;
