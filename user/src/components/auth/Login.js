import React, { Component } from "react";
import Validator from "js-object-validation";
import FullPageLoader from "../../containers/Loader/FullPageLoader";
import { FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }
  handleChange = (e) => {
    const { target } = e;
    const { value, name } = target;
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: false,
      },
    });
  };
  onLogin = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    try {
      const json = {
        email: email,
        password: password,
      };
      const validations = {
        email: {
          required: true,
          email: true,
          maxlength: 100,
        },
        password: {
          required: true,
          minlength: 6,
          maxlength: 10,
        },
      };
      const messages = {
        email: {
          required: "Please enter email",
          email: "Email should be valid email",
          maxlength: "Email should be at last 100 character long",
        },

        password: {
          required: "Please enter password",
          minlength: "Password should be at least 6 character long",
          maxlength: "Password should be at last 10 character long",
        },
      };

      const { isValid, errors } = Validator(json, validations, messages);
      if (!isValid) {
        this.setState({ errors });
      } else {
        this.props.login(json);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <>
        <div className="login-form">
          <h2> Login to Your Account </h2>
          <form>
            <FormGroup className="mt-5">
              <FormLabel>
                <i className="fas fa-envelope mr-2" />
                Email
              </FormLabel>
              <FormControl
                type="email"
                name="email"
                value={email}
                placeholder="Enter Your Email"
                onChange={(e) => this.handleChange(e)}
                isInvalid={errors.email}
              />

              <Form.Control.Feedback type="invalid">
                {errors.email ? errors.email : null}
              </Form.Control.Feedback>
            </FormGroup>
            <FormGroup>
              <FormLabel>
                <i className="fas fa-unlock mr-2" />
                Password
              </FormLabel>
              <FormControl
                value={password}
                name="password"
                onChange={(e) => this.handleChange(e)}
                type="password"
                isInvalid={errors.password}
                placeholder="Enter Your Password"
              />

              <Form.Control.Feedback type="invalid">
                {errors.password ? errors.password : null}
              </Form.Control.Feedback>
            </FormGroup>

            <div className="lost_pass">
              <a href="" className="forget">
                Lost your password?
              </a>
            </div>
            <button
              className="submit rounded-pill"
              onClick={(e) => this.onLogin(e)}
            >
              Login
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Login;