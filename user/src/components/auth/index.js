import React, { Component } from "react";
import Login from "./Login";
import { withRouter } from "react-router-dom";
import SignUp from "./SignUp";

class AuthComponents extends Component {

  render() {
    
    return (
      <>
        <header id="page-top" className="single-banner">
          <div className="container">
            <div className="row banner-text">
              <div className="col-sm-12">
                <h3> My Account</h3>
                <p>
                  <a href="index.html"> Home </a>{" "}
                  <i className="icofont-rounded-right"></i> My Account{" "}
                </p>
              </div>
            </div>
          </div>
        </header>
        <section className="account-section">
          <div className="container">
            <div className="row">
              <div className="col-md-5 col-sm-12">
                <Login login={this.props.login} />
              </div>
              <div className="col-md-7 col-sm-12">
                <SignUp onSignUp={this.props.signUp} />
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}


export default withRouter(AuthComponents);
