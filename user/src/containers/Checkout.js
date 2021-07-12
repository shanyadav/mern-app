import React, {Component} from "react";
import CheckoutComponent from "../components/checkout";
import {withRouter} from  "react-router-dom"

class Checkout extends Component{
  render(){
    return(
      <>
      <CheckoutComponent {...this.props} />
      </>
    )
  }
}

export default withRouter(Checkout);