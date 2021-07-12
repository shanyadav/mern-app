import React , {Component} from  "react"
import SingleEventComponent from "../components/singleEvent";
import {withRouter} from "react-router-dom";

class SingleEvent extends Component{
  render(){
    return(
      <>
      <SingleEventComponent {...this.props} />
      </>
    )
  }
}

export default withRouter(SingleEvent);