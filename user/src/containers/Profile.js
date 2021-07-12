import React , {Component} from "react";
import OureBranchesComponent from "../components/ourBranches";
import {withRouter}from "react-router-dom";
import ProfilePage from "../components/auth/Profile";

class Profile extends Component {
  render(){
    return(
      <>
      <ProfilePage {...this.props} />
      </>
    )
  }
}
export default withRouter(Profile);