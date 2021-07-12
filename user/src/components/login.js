import React, { Component } from "react";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      errors: {},
    };
  }
  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({
      [name]: value,
      errors: { ...this.state.errors, [name]: null },
    });
  };
  onLogin = () => {
    return true;
  };
  render() {
    const { login, password } = this.state;
    return (
      <>
        {/* <!-- header --> */}
        <header id="page-top" className="single-banner">
          {/* <!-- Start: Header Content --> */}
          <div className="container">
            <div className="row banner-text">
              <div className="col-sm-12">
                {/* <!-- Headline Goes Here --> */}
                <h3> My Account</h3>
                <p>
                  <a href="index.html"> Home </a>{" "}
                  <i className="icofont-rounded-right"></i> My Account{" "}
                </p>
              </div>
            </div>
            {/* <!-- End: .row --> */}
          </div>
          {/* <!-- End: Header Content --> */}
        </header>
        {/* <!-- header --> */}

        {/* <!-- Start: Account Section --> */}
        <section className="account-section">
          <div className="container">
            <div className="row">
              {/* <!-- Start:  Login Form  --> */}
              <div className="col-md-5 col-sm-12">
                <div className="login-form">
                  <h2> Login to Your Account </h2>
                  <form method="post" onSubmit={() => this.onLogin}>
                    <input
                      className="login-field"
                      name="email"
                      id="lemail"
                      type="text"
                      value={login}
                      placeholder="Enter Your Email"
                      onChange={(e) => this.handleChange(e)}
                    />
                    <input
                      className="login-field"
                      name="password"
                      id="lpassword"
                      type="text"
                      value={password}
                      placeholder="Enter Your Password"
                      onChange={(e) => this.handleChange(e)}
                    />
                    <div className="lost_pass">
                      <a href="" className="forget">
                        Lost your password?
                      </a>
                    </div>
                    <div className="submit-area">
                      <input type="submit" className="submit" value="Login" />
                      <div id="lmsg" className="message"></div>
                    </div>
                  </form>
                </div>
                {/* <!-- End:Login Form  --> */}
              </div>
              {/* <!-- .col-md-6 .col-sm-12 /- --> */}

              {/* <!-- Start:  Signup  Form  --> */}
              <div className="col-md-7 col-sm-12">
                <div className="registration-form">
                  <h2> New User Signup! </h2>
                  <form method="post">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <input
                          className="signup-field"
                          name="fname"
                          id="fname"
                          type="text"
                          placeholder="First Name"
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <input
                          className="signup-field"
                          name="lname"
                          id="lname"
                          type="text"
                          placeholder="Last Name"
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <input
                          className="signup-field"
                          name="email"
                          id="email"
                          type="text"
                          placeholder="Email address"
                        />
                      </div>

                      <div className="col-md-6 col-sm-12">
                        <input
                          className="signup-field"
                          name="phone"
                          id="phone"
                          type="text"
                          placeholder="Phone Number"
                        />
                      </div>

                      <div className="col-md-6 col-sm-12">
                        <input
                          className="signup-field"
                          name="password"
                          id="password"
                          type="text"
                          placeholder="Password"
                        />
                      </div>

                      <div className="col-md-6 col-sm-12">
                        <input
                          className="signup-field"
                          name="cpassword"
                          id="cpassword"
                          type="text"
                          placeholder="Confirm Password"
                        />
                      </div>

                      <div className="col-lg-12 col-sm-12">
                        <input
                          className="signup-field"
                          name="adddress"
                          id="address"
                          type="text"
                          placeholder="Address"
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <input
                          className="signup-field"
                          name="city"
                          id="city"
                          type="text"
                          placeholder="Town/City"
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <input
                          className="signup-field"
                          name="zip"
                          id="zip"
                          type="text"
                          placeholder="Postcode/Zip"
                        />
                      </div>

                      <div className="col-sm-12 submit-area">
                        <input
                          type="submit"
                          className="submit"
                          value="Sign Up"
                        />
                        <div id="msg" className="message"></div>
                      </div>
                      <div className="col-sm-12">
                        <div className="term-and-condition">
                          <input type="checkbox" id="term" />
                          <label for="term">
                            I agree to <a href="#">term &amp; condition</a> and{" "}
                            <a href="#">privacy policy</a>
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/* <!-- End:Signup Form  --> */}
              </div>
              {/* <!-- .col-md-6 .col-sm-12 /- --> */}
            </div>
            {/* <!-- row /- --> */}
          </div>
          {/* <!-- container /- --> */}
        </section>
        {/* <!-- End : Account Section --> */}
      </>
    );
  }
}

export default LoginComponent;
