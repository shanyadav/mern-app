import React, { Component } from "react";

class ReviewComponent extends Component {
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
                <h3>Our Reviews </h3>
                <p>
                  <a href="index.html"> Home </a>{" "}
                  <i className="icofont-rounded-right"></i> Reviews{" "}
                </p>
              </div>
            </div>
            {/* <!-- End: .row --> */}
          </div>
          {/* <!-- End: Header Content --> */}
        </header>
        {/* <!--/. header --> */}

        {/* <!-- Start: Review Section --> */}
        <section className="review-form-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                {/* <!--  Contact Form  --> */}
                <div className="contact-form">
                  {/* <!-- Start: Heading --> */}
                  <div className="base-header">
                    <h2> GIve us feedback </h2>
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
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <input
                          className="con-field"
                          name="dsignation"
                          id="dsignation"
                          type="text"
                          placeholder="Designation"
                        />
                      </div>
                      <div className="col-lg-6 col-sm-12">
                        <input type="file" name="image" id="image" />
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
                            value="Submit Now"
                          />
                          <div id="msg" className="message"></div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/* <!-- End:Contact Form  --> */}
              </div>
            </div>
            {/* <!-- row /- --> */}
          </div>
          {/* <!-- container /- --> */}
        </section>
        {/* <!-- End : Review Section --> */}

        {/* <!-- Start: Testimonial Section --> */}
        <section className="testimonials-section review-pg-testi">
          <div className="container">
            {/* <!-- Start: Heading --> */}
            <div className="base-header">
              <small>Our Testimonial </small>
              <h2>Customers Reviews </h2>
            </div>
            {/* <!-- End: Heading --> */}
            <div className="row">
              {/* <!-- Testimonials--> */}
              <div className="col-sm-12" id="testimonial">
                {/* <!-- Start: Testimonial 1 --> */}
                <div className="testimonial-item">
                  <div className="testimonial-box">
                    <div className="testimonial_content">
                      <p>
                        {" "}
                        <i className="fas fa-quote-left"></i> Lorem ipsum dolor
                        sit ametet infor verear in infor noluisse eumdiam congue
                        refor midan was at atomorum his id, pri tae expetenda.
                        Ests as mundi.
                      </p>
                      <div className="testi_star">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                    </div>
                    <div className="testi_images">
                      <a href="#" className="testi_social">
                        <i className="fab fa-instagram"></i>
                      </a>
                      <img alt="testimonial" src="../images/testimonial1.jpg" />
                    </div>
                    <div className="cus-title">
                      <h4 className="tes-nam">John Watson</h4>
                      <span className="tes-degree">CEO At Google</span>
                    </div>
                  </div>
                  {/* <!--End: Testimonial 1 --> */}
                </div>
                {/* <!-- Start: Testimonial 2 --> */}
                <div className="testimonial-item">
                  <div className="testimonial-box">
                    <div className="testimonial_content">
                      <p>
                        {" "}
                        <i className="fas fa-quote-left"></i> Lorem ipsum dolor
                        sit ametet infor verear in infor noluisse eumdiam congue
                        refor midan was at atomorum his id, pri tae expetenda.
                        Ests as mundi.
                      </p>
                      <div className="testi_star">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                    </div>
                    <div className="testi_images">
                      <a href="#" className="testi_social">
                        <i className="fab fa-pinterest"></i>
                      </a>
                      <img alt="testimonial" src="../images/testimonial2.jpg" />
                    </div>
                    <div className="cus-title">
                      <h4 className="tes-nam">John Watson</h4>
                      <span className="tes-degree">CEO At Facebook</span>
                    </div>
                  </div>
                  {/* <!--End: Testimonial 2 --> */}
                </div>
                {/* <!-- Start: Testimonial 3 --> */}
                <div className="testimonial-item">
                  <div className="testimonial-box">
                    <div className="testimonial_content">
                      <p>
                        {" "}
                        <i className="fas fa-quote-left"></i> Lorem ipsum dolor
                        sit ametet infor verear in infor noluisse eumdiam congue
                        refor midan was at atomorum his id, pri tae expetenda.
                        Ests as mundi.
                      </p>
                      <div className="testi_star">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                    </div>
                    <div className="testi_images">
                      <a href="#" className="testi_social">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <img alt="testimonial" src="../images/testimonial3.jpg" />
                    </div>
                    <div className="cus-title">
                      <h4 className="tes-nam">John Watson</h4>
                      <span className="tes-degree">CEO At Facebook</span>
                    </div>
                  </div>
                  {/* <!--End: Testimonial 3 --> */}
                </div>
                {/* <!-- Start: Testimonial 3 --> */}
                <div className="testimonial-item">
                  <div className="testimonial-box">
                    <div className="testimonial_content">
                      <p>
                        {" "}
                        <i className="fas fa-quote-left"></i> Lorem ipsum dolor
                        sit ametet infor verear in infor noluisse eumdiam congue
                        refor midan was at atomorum his id, pri tae expetenda.
                        Ests as mundi.
                      </p>
                      <div className="testi_star">
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                      </div>
                    </div>
                    <div className="testi_images">
                      <a href="#" className="testi_social">
                        <i className="fab fa-twitter"></i>
                      </a>
                      <img alt="testimonial" src="../images/testimonial4.jpg" />
                    </div>
                    <div className="cus-title">
                      <h4 className="tes-nam">John Watson</h4>
                      <span className="tes-degree">CEO At Facebook</span>
                    </div>
                  </div>
                  {/* <!--End: Testimonial 3 --> */}
                </div>
              </div>
            </div>
            {/* <!--/.row--> */}
          </div>
          {/* <!--/.container--> */}
        </section>
        {/* <!-- End: Testimonial Section --> */}

      </>
    );
  }
}

export default ReviewComponent;
