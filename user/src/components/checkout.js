import React, { Component } from "react";

class CheckoutComponent extends Component {
  render() {
    return (
      <>
        {/* <!-- header --> */}
        <header id="page-top" className="single-banner">
          {/* <!-- Start: Header Content --> */}
          <div className="container">
            <div className="row banner-text">
              <div className="col-sm-12">
                {/* <!-- Headline Goes Here --> */}
                <h3>Checkout</h3>
                <p>
                  <a href="index.html"> Home </a>{" "}
                  <i className="icofont-rounded-right"></i> Checkout{" "}
                </p>
              </div>
            </div>
            {/* <!-- End: .row --> */}
          </div>
          {/* <!-- End: Header Content --> */}
        </header>
        {/* <!--/. header --> */}

        {/* <!-- Start: Contact Section --> */}
        <section className="checkout-section">
          <div className="container">
            <div className="row">
              {/* <!-- Start: Col 1 - --> */}
              <div className="col-lg-4 col-sm-12">
                <div className="sign_checkout">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#customerCollapse"
                    >
                      1. Customer Information <i className="icofont-thin-down"></i>
                    </a>
                  </div>
                  <div
                    id="customerCollapse"
                    className="collapse show"
                    data-parent="#accordion"
                  >
                    <form method="post">
                      <div className="row">
                        <div className="col-sm-12">
                          <input
                            className="con-field"
                            name="uname"
                            id="uname"
                            type="text"
                            placeholder="User Name"
                          />
                        </div>
                        <div className="col-sm-12">
                          <input
                            className="con-field"
                            name="password"
                            id="cipassword"
                            type="text"
                            placeholder="Password"
                          />
                        </div>
                        <div className="col-sm-12">
                          <input type="submit" className="submit" value="Login" />
                        </div>
                        <div className="col-sm-12">
                          <a href="#" className="forget_pass">
                            {" "}
                            Forgot Password ?
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <!-- End: Sign in - --> */}

                {/* <!-- Start: Sign up - --> */}
                <div className="signup_checkout">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#signupCollapse"
                    >
                      New Customer Sign Up <i className="icofont-thin-down"></i>
                    </a>
                  </div>
                  <div
                    id="signupCollapse"
                    className="collapse show"
                    data-parent="#accordion"
                  >
                    <form method="post">
                      <div className="row">
                        <div className="col-sm-12">
                          <input
                            className="con-field"
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Name"
                          />
                        </div>
                        <div className="col-sm-12">
                          <input
                            className="con-field"
                            name="email"
                            id="email"
                            type="text"
                            placeholder="Email"
                          />
                        </div>
                        <div className="col-sm-12">
                          <input
                            className="con-field"
                            name="password"
                            id="ncpassword"
                            type="text"
                            placeholder="Password"
                          />
                        </div>
                        <div className="col-sm-12">
                          <input
                            className="con-field"
                            name="cpassword"
                            id="cpassword"
                            type="text"
                            placeholder="Confirm Password"
                          />
                        </div>
                        <div className="col-sm-12">
                          <input
                            className="con-field"
                            name="pnumber"
                            id="pnumber"
                            type="text"
                            placeholder="Mobile Number"
                          />
                        </div>
                        <div className="col-sm-12">
                          <input
                            className="con-field"
                            name="pcode"
                            id="ncpcode"
                            type="text"
                            placeholder="Post Code"
                          />
                        </div>
                        <div className="col-sm-12">
                          <input
                            className="con-field"
                            name="saddress"
                            id="saddress"
                            type="text"
                            placeholder="Street Address"
                          />
                        </div>
                        <div className="col-sm-12">
                          <div className="select-group">
                            <select name="total_review">
                              <option value="0"> Select Address </option>
                              <option value="1">1 Address</option>
                              <option value="2">2 Address</option>
                              <option value="3">3 Address</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <input
                            className="con-field"
                            name="city"
                            id="city"
                            type="text"
                            placeholder="City / Town"
                          />
                        </div>
                        <div className="col-sm-12">
                          <div className="term-and-condition">
                            <input type="checkbox" id="term" />
                            <label for="term">
                              I agree to <a href="#">term &amp; condition</a>{" "}
                              and <a href="#">privacy policy</a>
                            </label>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <input type="submit" className="submit" value="Sign Up" />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <!-- End: Sign up - --> */}
              </div>
              {/* <!-- End: Col 1   /- --> */}

              {/* <!-- Start: Col 2 - --> */}
              <div className="col-lg-4 col-sm-12">
                <div className="order_details">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#orderCollapse"
                    >
                      2. Order Details <i className="icofont-thin-down"></i>
                    </a>
                  </div>
                  <div
                    id="orderCollapse"
                    className="collapse show"
                    data-parent="#accordion"
                  >
                    <form method="post">
                      <div className="row">
                        <div className="col-sm-12">
                          <div className="select-group">
                            <select name="total_review">
                              <option value="0"> Select Order Type </option>
                              <option value="1">1 Address</option>
                              <option value="2">2 Address</option>
                              <option value="3">3 Address</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <div className="select-group">
                            <select name="total_review">
                              <option value="0"> Select Delivery Time </option>
                              <option value="1">1 Address</option>
                              <option value="2">2 Address</option>
                              <option value="3">3 Address</option>
                            </select>
                          </div>
                        </div>

                        <div className="user_deatils_wrap">
                          <a
                            className="user_deatils_btn"
                            data-toggle="collapse"
                            href="#userDetails"
                            role="button"
                            aria-expanded="false"
                            aria-controls="userDetails"
                          >
                            Details
                          </a>
                          <div className="user_deatils collapse" id="userDetails">
                            <div className="col-sm-12">
                              <input
                                className="con-field"
                                name="Name"
                                id="Name"
                                type="text"
                                placeholder="Name"
                              />
                            </div>
                            <div className="col-sm-12">
                              <input
                                className="con-field"
                                name="mobile"
                                id="mobile"
                                type="text"
                                placeholder="Mobile"
                              />
                            </div>
                            <div className="col-sm-12">
                              <input
                                className="con-field"
                                name="pcode"
                                id="pcode"
                                type="text"
                                placeholder="Post Code"
                              />
                            </div>
                            <div className="col-sm-12">
                              <input
                                className="con-field"
                                name="address"
                                id="address"
                                type="text"
                                placeholder="Address"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="order_coupon">
                          <div className="col-sm-12">
                            <div className="select-group">
                              <select name="coupon">
                                <option value="0">
                                  {" "}
                                  Select Coupon or Loyalty{" "}
                                </option>
                                <option value="1"> Coupon Code</option>
                                <option value="2"> Loyalty Card </option>
                              </select>
                            </div>
                          </div>
                          <div className="col-sm-12 coupon_field">
                            <input
                              className="con-field"
                              name="coupon"
                              id="coupon"
                              type="text"
                              placeholder="Apply Coupon"
                            />
                            <input type="submit" className="submit" value="Apply" />
                          </div>
                        </div>

                        <div className="col-sm-12 order_giftcard">
                          <input
                            className="con-field"
                            name="gift"
                            id="gift"
                            type="text"
                            placeholder="Apply Gift Card"
                          />
                          <input type="submit" className="submit" value="Apply" />
                        </div>

                        <div className="col-sm-12 order_tips">
                          <input
                            className="con-field"
                            name="tips"
                            id="tips"
                            type="text"
                            placeholder="Tips"
                          />
                          <input type="submit" className="submit" value="Send" />
                        </div>

                        <div className="col-sm-12 order_donation">
                          <input
                            className="con-field"
                            name="donation"
                            id="donation"
                            type="text"
                            placeholder="Donation"
                          />
                          <input type="submit" className="submit" value="Send" />
                        </div>
                        <div className="col-sm-12 order_notes">
                          <textarea
                            className="con-field"
                            name="notes"
                            id="notes"
                            placeholder="Notes"
                          >
                            {" "}
                          </textarea>
                        </div>

                        <div className="col-sm-12">
                          <div className="order_total">
                            <div className="price">
                              <h3> Total</h3> <span> £ 0.00 </span>
                            </div>
                            <table className="table table-bordered">
                              <tbody>
                                <tr>
                                  <th>Qty</th>
                                  <th>Description</th>
                                  <th>Price</th>
                                </tr>
                                <tr>
                                  <td>1</td>
                                  <td>222</td>
                                  <td>333</td>
                                </tr>

                                <tr>
                                  <td></td>
                                  <td>
                                    <b>Sub Total:</b>
                                  </td>
                                  <td>
                                    <b>£ 0.00</b>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                {/* <!-- End: Order Details - --> */}
              </div>
              {/* <!-- End: Col 2   /- --> */}

              {/* <!-- Start: Col 3- --> */}
              <div className="col-lg-4 col-sm-12">
                <div className="payment_info">
                  <div className="card-header">
                    <a
                      className="card-link"
                      data-toggle="collapse"
                      href="#paymentCollapse"
                    >
                      3. Payment Information <i className="icofont-thin-down"></i>
                    </a>
                  </div>
                  <div
                    id="paymentCollapse"
                    className="collapse show"
                    data-parent="#accordion"
                  >
                    <div className="payment_card">
                      <div className="payment_grid">
                        <input
                          type="radio"
                          name="payment"
                          value="1"
                          id="card-payment"
                          className="card-payment"
                        />
                        <label for="card-payment">Card</label>
                      </div>
                      <div className="payment_grid">
                        <input
                          type="radio"
                          name="payment"
                          value="2"
                          id="cash-payment"
                          className="cash-payment"
                        />
                        <label for="cash-payment">Cash</label>
                      </div>
                      <div className="payment_grid">
                        <input
                          type="radio"
                          name="payment"
                          value="3"
                          id="paypal"
                          className="paypal"
                        />
                        <label for="paypal">Paypal</label>
                      </div>
                      <div className="payment_grid">
                        <input
                          type="radio"
                          name="payment"
                          value="4"
                          id="wallet"
                          className="wallet"
                        />
                        <label for="wallet">Wallet</label>
                      </div>
                    </div>

                    <form className="payment_info_form" method="post">
                      <div className="card_number">
                        <h4>Card Number: </h4>
                        <input
                          className="con-field"
                          name="cnumber"
                          id="cnumber"
                          type="text"
                          placeholder="Card Number"
                        />
                      </div>
                      <div className="expires_end">
                        <h4> Expires End </h4>
                        <div className="expires_month">
                          <input
                            className="con-field"
                            name="emonth"
                            id="emonth"
                            type="text"
                            placeholder="MM"
                          />
                        </div>
                        <div className="expires_year">
                          <input
                            className="con-field"
                            name="eyear"
                            id="eyear"
                            type="text"
                            placeholder="YY"
                          />
                        </div>
                        <div className="expires_cvc">
                          <input
                            className="con-field"
                            name="ecvc"
                            id="ecvc"
                            type="text"
                            placeholder="CVC: 311"
                          />
                        </div>
                      </div>
                      <div className="pay_btn">
                        <input type="submit" className="submit" value="submit" />
                      </div>
                    </form>
                  </div>
                </div>
                {/* <!-- End: Sign in - --> */}
              </div>
              {/* <!-- End: Col 3 /- --> */}
            </div>
            {/* <!-- row /- --> */}
          </div>
          {/* <!-- container /- --> */}
        </section>
        {/* <!-- End : Contact Section --> */}
      </>
    );
  }
}

export default CheckoutComponent;
