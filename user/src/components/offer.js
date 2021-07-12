import React, { Component } from "react";

class OfferComponent extends Component {
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
                <h3>Our Offer</h3>
                <p>
                  <a href="index.html"> Home </a>{" "}
                  <i className="icofont-rounded-right"></i> Offer{" "}
                </p>
              </div>
            </div>
            {/* <!-- End: .row --> */}
          </div>
          {/* <!-- End: Header Content --> */}
        </header>
        {/* <!--/. header --> */}

        {/* <!-- Start: Loyalty Card Section --> */}
        <section className="loyalty-signup">
          <div className="container">
            <div className="row">
              {/* <!-- Start:  Signup Form  --> */}
              <div className="col-lg-6 col-sm-12">
                <div className="contact-form">
                  {/* <!-- Start: Heading --> */}
                  <div className="base-header">
                    <h2> Loyalty Card Signup </h2>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                  {/* <!-- End: Heading --> */}
                  <form method="post" id="contact-form">
                    <div className="row">
                      <div className="col-md-6 col-sm-12">
                        <input
                          className="con-field"
                          name="fname"
                          id="fname"
                          type="text"
                          placeholder="Full Name"
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <input
                          className="con-field"
                          name="mobile"
                          id="lname"
                          type="text"
                          placeholder="Mobile"
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <input
                          className="con-field"
                          name="email"
                          id="lemail"
                          type="text"
                          placeholder="Email"
                        />
                      </div>
                      <div className="col-md-6 col-sm-12">
                        <input
                          className="con-field"
                          name="address"
                          id="subject"
                          type="text"
                          placeholder="Address"
                        />
                      </div>
                      <div className="col-md-12 col-sm-12">
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
                  {/* <!-- end: form --> */}
                </div>
                {/* <!-- End:Signup Form  --> */}
              </div>
              {/* <!-- .col-md-6 .col-sm-12 /- --> */}
              {/* <!-- Start: loyalty card image- --> */}
              <div className="col-lg-6 col-sm-12">
                <div className="loyalty-card">
                  <img
                    src="../images/loyalty-card.svg"
                    alt=""
                    className="bounce_animate"
                  />
                  <h4> Shop more, spend less with the loyalty card</h4>
                </div>
              </div>
              {/* <!-- Emd: loyalty card image - --> */}
            </div>
            {/* <!-- row /- --> */}
          </div>
          {/* <!-- container /- --> */}
        </section>
        {/* <!-- End : Loyalty Card Section --> */}

        {/* <!-- Start: Promotion of Product --> */}
        <section className="promo-product-area">
          <div className="container">
            {/* <!-- Start: Heading --> */}
            <div className="base-header">
              <small>Our Product </small>
              <h2>Product Promotion</h2>
            </div>
            {/* <!-- End: Heading --> */}
            <div className="row">
              <div className="col-sm-12" id="product_pro">
                {/* <!-- Start: Product 1 --> */}
                <div className="product-list">
                  <div className="product-img">
                    <img src="../images/product_1.jpg" alt="" />
                    <div className="pro_back">
                      <p>
                        Lorem ipsum dolor sit amet cons ectetur adipisicing
                        elit. Veniam const equatur us saepe eligendi, rerum mole
                        stiae conse quuntur vel nisi cumque vitae quisquam.
                      </p>
                      <a href="menu.html" className="more-link ">
                        Order Now
                      </a>
                    </div>
                  </div>
                  <div className="product-title">
                    <h4> Chicken Tikka </h4>
                    <p className="price-product mb-0">
                      <span className="price">$12.00</span>
                    </p>
                    <span className="badge-starrating">
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </span>
                  </div>
                </div>
                {/* <!-- End: Product 1 --> */}
                {/* <!-- Start: Product 2 --> */}
                <div className="product-list">
                  <div className="product-img">
                    <img src="../images/product_2.jpg" alt="" />
                    <div className="pro_back">
                      <p>
                        Lorem ipsum dolor sit amet cons ectetur adipisicing
                        elit. Veniam const equatur us saepe eligendi, rerum mole
                        stiae conse quuntur vel nisi cumque vitae quisquam.
                      </p>
                      <a href="menu.html" className="more-link ">
                        Order Now
                      </a>
                    </div>
                  </div>
                  <div className="product-title">
                    <h4> Shahi Samosa </h4>
                    <p className="price-product mb-0">
                      <span className="price">$14.00</span>
                    </p>
                    <span className="badge-starrating">
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </span>
                  </div>
                </div>
                {/* <!--  ENd: Product 2 --> */}
                {/* <!-- Start: Product 3 --> */}
                <div className="product-list">
                  <div className="product-img">
                    <img src="../images/product_3.jpg" alt="" />
                    <div className="pro_back">
                      <p>
                        Lorem ipsum dolor sit amet cons ectetur adipisicing
                        elit. Veniam const equatur us saepe eligendi, rerum mole
                        stiae conse quuntur vel nisi cumque vitae quisquam.
                      </p>
                      <a href="menu.html" className="more-link ">
                        Order Now
                      </a>
                    </div>
                  </div>
                  <div className="product-title">
                    <h4> Shahi Samosa</h4>
                    <p className="price-product mb-0">
                      <span className="price">$18.00</span>
                    </p>
                    <span className="badge-starrating">
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </span>
                  </div>
                </div>
                {/* <!--  ENd: Product 3 --> */}
                {/* <!-- Start: Product 4 --> */}
                <div className="product-list">
                  <div className="product-img">
                    <img src="../images/product_2.jpg" alt="" />
                    <div className="pro_back">
                      <p>
                        Lorem ipsum dolor sit amet cons ectetur adipisicing
                        elit. Veniam const equatur us saepe eligendi, rerum mole
                        stiae conse quuntur vel nisi cumque vitae quisquam.
                      </p>
                      <a href="menu.html" className="more-link ">
                        Order Now
                      </a>
                    </div>
                  </div>
                  <div className="product-title">
                    <h4> Shahi Samosa </h4>
                    <p className="price-product mb-0">
                      <span className="price">$14.00</span>
                    </p>
                    <span className="badge-starrating">
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                      <i className="far fa-star"></i>
                    </span>
                  </div>
                </div>
                {/* <!--  ENd: Product 4 --> */}
              </div>
            </div>
          </div>
        </section>
        {/* <!-- End:Promo Section --> */}

        {/* <!-- Start: Subscribe Section --> */}
        <section className="subscribe-section">
          <div className="container">
            <div className="row">
              {/* <!-- Start:  Subscribe Form  --> */}
              <div className="col-md-12 col-sm-12">
                <div className="subscribe-wrap">
                  {/* <!-- Start: Text --> */}
                  <div className="subscribe-text">
                    <h2> Subscribe to Our Offer! </h2>
                    <p>
                      A new subscription scheme will help you save more money.
                    </p>
                  </div>
                  {/* <!-- End: Text --> */}

                  <div className="subscribe-form">
                    <form method="post">
                      <input
                        name="email"
                        id="email"
                        type="text"
                        placeholder="Email Address"
                      />
                      <input type="submit" className="submit" value="Submit" />
                    </form>
                  </div>
                </div>
                {/* <!-- End:Contact Form  --> */}
              </div>
              {/* <!-- .col-md-12 .col-sm-12 /- --> */}
            </div>
            {/* <!-- row /- --> */}
          </div>
          {/* <!-- container /- --> */}
        </section>
        {/* <!-- End : Subscribe Section --> */}

        {/* <!-- Start: Gift Card Section --> */}
        <section className="gift-card-section">
          <div className="container">
            <div className="row">
              {/* <!-- Start: Col One - --> */}
              <div className="col-md-4 col-sm-12">
                <div className="git-card-wrap">
                  <div className="git-card-img">
                    <img src="../images/gift-card.jpg" alt="" />
                  </div>
                  <div className="git-card-info">
                    <h4> Spice Hut Gift Card </h4>
                    <p> £ 10.00</p>
                    <a href="#" className="more-link">
                      {" "}
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- Col One /- --> */}
              {/* <!-- Start: Col Two - --> */}
              <div className="col-md-4 col-sm-12">
                <div className="git-card-wrap">
                  <div className="git-card-img">
                    <img src="../images/gift-card.jpg" alt="" />
                  </div>
                  <div className="git-card-info">
                    <h4> Spice Hut Gift Card </h4>
                    <p> £ 15.00</p>
                    <a href="#" className="more-link">
                      {" "}
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- Col Two /- --> */}
              {/* <!-- Start: Col Three - --> */}
              <div className="col-md-4 col-sm-12">
                <div className="git-card-wrap">
                  <div className="git-card-img">
                    <img src="../images/gift-card.jpg" alt="" />
                  </div>
                  <div className="git-card-info">
                    <h4> Spice Hut Gift Card </h4>
                    <p> £ 20.00</p>
                    <a href="#" className="more-link">
                      {" "}
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
              {/* <!-- Col Three /- --> */}
            </div>
            {/* <!-- row /- --> */}
          </div>
          {/* <!-- container /- --> */}
        </section>
        {/* <!-- End : Gift Card Section --> */}
      </>
    );
  }
}

export default OfferComponent;
