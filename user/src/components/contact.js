import React, { Component } from "react";

class ContactComponent extends Component {
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
                <h3>Contact Us</h3>
                <p>
                  <a href="index.html"> Home </a>{" "}
                  <i className="icofont-rounded-right"></i> Contact{" "}
                </p>
              </div>
            </div>
            {/* <!-- End: .row --> */}
          </div>
          {/* <!-- End: Header Content --> */}
        </header>
        {/* <!--/. header --> */}

        {/* <!-- Start: Contact Section --> */}
        <section className="contact-section">
          <div className="container">
            <div className="row">
              {/* <!-- Start: Contact Info /- --> */}
              <div className="col-md-4 col-sm-12">
                <div className="single_address">
                  <i className="fas fa-map-marked-alt"></i>
                  <p>Company Address </p>
                  <span>3567 New Alaska, us</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="single_address">
                  <i className="fas fa-envelope-open-text"></i>
                  <p>Email Address </p>
                  <span>example@email .com</span>
                </div>
              </div>
              <div className="col-md-4 col-sm-12">
                <div className="single_address">
                  <i className="fas fa-mobile-alt"></i>
                  <p>Phone Number </p>
                  <span>+77-00-222-1111</span>
                </div>
              </div>
              {/* <!-- Contact Info /- --> */}

              {/* <!-- Start: Map- --> */}
              <div className="col-lg-6 col-sm-12 map-container">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.023938894304!2d-81.38341548467582!3d19.324767486945657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f2587a9a0b98737%3A0x38fe616bb6df631f!2s638+W+Bay+Rd%2C+Cayman+Islands!5e0!3m2!1sen!2sus!4v1549260798680"></iframe>
              </div>
              {/* <!-- Emd: Map- --> */}

              {/* <!-- Start:  Contact Form  --> */}
              <div className="col-lg-6 col-sm-12">
                <div className="contact-form">
                  {/* <!-- Start: Heading --> */}
                  <div className="base-header">
                    <h2> Send Us Message </h2>
                  </div>
                  {/* <!-- End: Heading --> */}
                  <form method="post" action="mailer.php" id="contact-form">
                    <div className="row">
                      <div className="col-lg-6 col-sm-12">
                        <input
                          className="con-field"
                          name="fname"
                          id="fname"
                          type="text"
                          placeholder="Fast Name"
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <input
                          className="con-field"
                          name="lname"
                          id="lname"
                          type="text"
                          placeholder="Last Name"
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
                          name="subject"
                          id="subject"
                          type="text"
                          placeholder="Subject"
                        />
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
                            value="Send Message"
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

export default ContactComponent;
