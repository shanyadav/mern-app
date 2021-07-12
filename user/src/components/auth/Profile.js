import React, { Component } from "react";

import { FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name:"",
      errors: {},
      contact_number:"",
      address_details:"",
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
      this.props.login(json);

    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { email, password, errors, name ,contact_number} = this.state;
    return (
      <>

        <section className="review-form-section">
          <div className="container">
            <div class="row g-0">
              <div class="col-3 col-md-2  bg-white">
                <div
                  className="nav nav-pills d-flex flex-column card-tab"
                  role="tablist"
                >
                  <a className="nav-link rounded-pill" id="v-pills-one-tab" data-toggle="pill" href="#v-pills-one" role="tab" aria-controls="v-pills-one" aria-selected="true"
                  >
                    Profile Setting
                  </a>
                  <a className="nav-link rounded-pill" id="v-pills-one-tab" data-toggle="pill" href="#v-pills-one" role="tab" aria-controls="v-pills-one" aria-selected="true"
                  >
                    Wallet
                  </a>     <a className="nav-link rounded-pill" id="v-pills-one-tab" data-toggle="pill" href="#v-pills-one" role="tab" aria-controls="v-pills-one" aria-selected="true"
                  >
                    Reedeem Code
                  </a>
                </div>
              </div>

              <div className="col-sm-8 col-md-8 px-5">
                <div className="tab-content">

                  <div
                    className="tab-pane fade show active"
                    id="v-pills-one"
                    role="tabpanel"
                    aria-labelledby="v-pills-one-tab"
                  >

                    <div className="card-header bg1 text-white">
                      <a
                        className="card-link text-white w-100 d-flex flex-row justify-content-between"
                        data-toggle="collapse"
                        href="#customerCollapse"
                      >
                        <span> Update Information</span> <i className="icofont-thin-down text-white text-right" />
                      </a>
                    </div>
                    <div
                      id="customerCollapse"
                      className="collapse show"
                      data-parent="#accordion"
                    >
                      <div class="card">

                        <div class="card-body">
                          <FormGroup>
                            <FormLabel>
                              <i className="fas fa-envelope mr-2" />
                              name
                            </FormLabel>
                            <FormControl
                              type="name"
                              name="name"
                              value={name}
                              onChange={(e) => this.handleChange(e)}

                            />

                          </FormGroup>
                          <FormGroup>
                            <FormLabel>
                              <i className="fas fa-envelope mr-2" />
                              Email
                            </FormLabel>
                            <FormControl
                              type="email"
                              name="email"
                              value={email}
                              onChange={(e) => this.handleChange(e)}

                            />

                          </FormGroup>
                          
                          <FormGroup>
                            <FormLabel>
                              <i className="fas fa-phone mr-2" />
                              Contact Number
                            </FormLabel>
                            <FormControl
                              type="text"
                              name="contact_number"
                              value={contact_number}
                              onChange={(e) => this.handleChange(e)}

                            />

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
                            />

                          </FormGroup>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div></div></section>
      </>
    );
  }
}

export default Profile;
