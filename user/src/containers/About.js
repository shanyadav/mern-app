import React , {Component} from "react";
import AboutComponent from "../components/about";
import {  withRouter } from "react-router-dom";
class About extends Component {
  render(){
    return (
      <AboutComponent {...this.props} />
    )
  }
}

export default withRouter(About);