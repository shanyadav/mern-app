import React, { Component } from "react";
import AuthComponent from "../components/auth";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { loginRequest, signupRequest } from "../actions";
class Login extends Component {
  render() {
    return <AuthComponent {...this.props} login={this.props.loginRequest} signUp={this.props.signupRequest}/>;
  }
}
const mapStateToProps = (state) => ({
  AuthReducer: state.AuthReducer,
});
const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (data) => {
      dispatch(loginRequest(data));
    },
    signUpRequest: (data) => {
      dispatch(signupRequest(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
