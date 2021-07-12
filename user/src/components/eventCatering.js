import React, { Component } from "react";
import { Link } from 'react-router-dom';
class EventCateringComponent extends Component {

  render() {
    const { ItemsData } = this.props;
    return (
      <>
        {/* <!-- header --> */}
        <header id="page-top" className="single-banner">
          <div className="container">
            <div className="row banner-text">
              <div className="col-sm-12">
                {/* <!-- Headline Goes Here --> */}
                <h3>Catering</h3>
                <p>
                  <Link to="/home"> Home </Link>{" "}
                  <i className="icofont-rounded-right"></i> Catering{" "}
                </p>
              </div>
            </div>
          </div>
        </header>
        {/* <!--/. header --> */}

        {/* <!-- Start: Contact Section --> */}
        <section className="catering-section">
          <div className="container">
            {/* <!-- Start: Heading --> */}
            <div className="base-header">
              <small>Event By Tastery </small>
              <h2>Cart Items</h2>
            </div>
            {/* <!-- End: Heading --> */}
            <div className="row">
              {/* <!-- Start: catering Col /- --> */}                              {ItemsData &&
                ItemsData.data &&
                ItemsData.data.length
                ? ItemsData.data.map((item1, indx1) => {
                  return (
                    <div className="col-md-4 col-sm-12">
                      <div className="catering-wrap">
                        <div className="catering-img">
                          <img src="../images/product_1.jpg" alt="" />
                          <span> $ {item1.online_price ? item1.online_price : 0}</span>
                        </div>
                        <div className="catering-text">
                          <h4>{item1.name && item1.name} </h4>
                          <ul>
                            <li> Lorem ipsum dolor sit amet. </li>
                            <li> Lorem ipsum dolor sit amet. </li>
                            <li> Lorem ipsum dolor sit amet. </li>
                            <li> Lorem ipsum dolor sit amet. </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                  );
                })
                : null}

              {/* <!-- End: catering Col /- --> */}

              {/* <!-- Start: catering Col /- --> */}
              {/* <div className="col-md-4 col-sm-12">
                <div className="catering-wrap">
                  <div className="catering-img">
                    <img src="../images/product_2.jpg" alt="" />
                    <span> $59</span>
                  </div>
                  <div className="catering-text">
                    <h4> Spicy papadom </h4>
                    <ul>
                      <li> Lorem ipsum dolor sit amet. </li>
                      <li> Lorem ipsum dolor sit amet. </li>
                      <li> Lorem ipsum dolor sit amet. </li>
                      <li> Lorem ipsum dolor sit amet. </li>
                    </ul>
                  </div>
                </div>
              </div> */}
              {/* <!-- End: catering Col /- --> */}

              {/* <!-- Start: catering Col /- --> */}
              {/* <div className="col-md-4 col-sm-12">
                <div className="catering-wrap">
                  <div className="catering-img">
                    <img src="../images/product_3.jpg" alt="" />
                    <span> $29</span>
                  </div>
                  <div className="catering-text">
                    <h4> Mango Chutney </h4>
                    <ul>
                      <li> Lorem ipsum dolor sit amet. </li>
                      <li> Lorem ipsum dolor sit amet. </li>
                      <li> Lorem ipsum dolor sit amet. </li>
                      <li> Lorem ipsum dolor sit amet. </li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
            {/* <!-- row /- --> */}
          </div>
          {/* <!-- container /- --> */}
        </section>
        {/* <!-- End : Contact Section --> */}

        {/* <!-- Start: Contact Section --> */}
        <section className="catering-form-section">
          <div className="container">
            {/* <!-- Start: Heading --> */}
            <div className="base-header">
              <small>Event Catering Form </small>
              <h2>Fill Out Our Form </h2>
            </div>
            {/* <!-- End: Heading --> */}
            <div className="row">
              {/* <!-- Start:  Contact Form  --> */}
              <div className="col-md-10 offset-md-1 col-sm-12">
                <div className="contact-form catering-form">
                  <form method="post" action="mailer.php" id="contact-form">
                    <div className="row">
                      <div className="col-lg-6 col-sm-12">
                        <input
                          className="con-field"
                          name="fname"
                          id="fname"
                          type="text"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <input
                          className="con-field"
                          name="mobile"
                          id="mobile"
                          type="text"
                          placeholder="Mobile"
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <input
                          className="con-field"
                          name="address"
                          id="address"
                          type="text"
                          placeholder="Address"
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <input
                          className="con-field"
                          name="email"
                          id="email"
                          type="text"
                          placeholder="Email"
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <input
                          className="con-field"
                          name="pcode"
                          id="pcode"
                          type="text"
                          placeholder="Post Code*"
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <div className="select-group">
                          <select name="total_review">
                            <option value="0"> Select Review Points </option>
                            <option value="1">1 Star</option>
                            <option value="2">2 Star</option>
                            <option value="3">3 Star</option>
                            <option value="4">4 Star</option>
                            <option value="5">5 Star</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-12 col-sm-12">
                        <textarea
                          className="con-field"
                          name="message"
                          id="message"
                          rows="6"
                          placeholder="Your Message"
                        ></textarea>
                        <div className="submit-area">
                          <input
                            type="submit"
                            className="submit-contact"
                            value="Book Now"
                          />
                          <div id="msg" className="message"></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/* <!-- End:Contact Form  --> */}
              </div>
              {/* <!-- .col-md-6 .col-sm-12 /- --> */}
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

export default EventCateringComponent;
