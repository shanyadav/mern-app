import React , {Component} from "react";
import OureBranchesComponent from "../components/ourBranches";
import {withRouter}from "react-router-dom";

class OurBranches extends Component {
  render(){
    return(
      <>
      <OureBranchesComponent {...this.props} />
      </>
    )
  }
}
export default withRouter(OurBranches);