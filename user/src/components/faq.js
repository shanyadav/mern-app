import React, { Component } from "react";

class FAQComponent extends Component {
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
                <h3>FAQ's </h3>
                <p>
                  <a href="index.html"> Home </a>{" "}
                  <i className="icofont-rounded-right"></i> FAQ's{" "}
                </p>
              </div>
            </div>
            {/* <!-- End: .row --> */}
          </div>
          {/* <!-- End: Header Content --> */}
        </header>
        {/* <!--/. header --> */}

        {/* <!-- Start: FAQ Section --> */}
        <section className="faq-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-sm-12">
                <div className="faq-search-wrap">
                  <h2>Get Your Answer Here </h2>

                  <p>
                    {" "}
                    Below you’ll find answers to some of the most frequently
                    asked questions. We are constantly adding most frequently
                    asked question to this page.
                  </p>
                  <div className="faq-search">
                    <input id="faq_ser" type="text" placeholder="Search" />
                    <button type="submit" className="faq-btn">
                      <i className="icofont-search"></i>
                    </button>
                  </div>
                  <div className="faq-qes">
                    {" "}
                    If you have any other questions{" "}
                    <a href="mailto:email@example.com.com">
                      email@example.com
                    </a>{" "}
                  </div>
                </div>
              </div>
              {/* <!-- End: faq-search-wrap  --> */}

              {/* <!--  Start: col-sm-12 --> */}
              <div className="col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-sm-12">
                    <div className="faq-accordion" id="accordion">
                      {/* <!-- Start: faq 1 --> */}
                      <div className="faq-accro-card">
                        <div className="faq-accro-header" id="headingOne">
                          <h5 className="mb-0">
                            <button
                              className="faq-link"
                              data-toggle="collapse"
                              data-target="#collapseOne"
                              aria-expanded="true"
                              aria-controls="collapseOne"
                            >
                              Which are your specialities?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="collapseOne"
                          className="collapse show"
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          <div className="faq-accro-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et.
                          </div>
                        </div>
                      </div>
                      {/* <!-- End: faq 3 --> */}

                      {/* <!-- Start: faq 2 --> */}
                      <div className="faq-accro-card">
                        <div className="faq-accro-header" id="headingTwo">
                          <h5 className="mb-0">
                            <button
                              className="faq-link collapsed"
                              data-toggle="collapse"
                              data-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              How do I cancel a booking?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="collapseTwo"
                          className="collapse"
                          aria-labelledby="headingTwo"
                          data-parent="#accordion"
                        >
                          <div className="faq-accro-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et.
                          </div>
                        </div>
                      </div>
                      {/* <!-- end: faq 2 --> */}

                      {/* <!-- Start: faq 3 --> */}
                      <div className="faq-accro-card">
                        <div className="faq-accro-header" id="headingThree">
                          <h5 className="mb-0">
                            <button
                              className="faq-link collapsed"
                              data-toggle="collapse"
                              data-target="#collapseThree"
                              aria-expanded="false"
                              aria-controls="collapseThree"
                            >
                              Which are your specialities?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="collapseThree"
                          className="collapse"
                          aria-labelledby="headingThree"
                          data-parent="#accordion"
                        >
                          <div className="faq-accro-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et.
                          </div>
                        </div>
                      </div>
                      {/* <!-- end: faq 3 --> */}

                      {/* <!-- Start: faq 4 --> */}
                      <div className="faq-accro-card">
                        <div className="faq-accro-header" id="headingFour">
                          <h5 className="mb-0">
                            <button
                              className="faq-link collapsed"
                              data-toggle="collapse"
                              data-target="#collapseFour"
                              aria-expanded="false"
                              aria-controls="collapseFour"
                            >
                              How can I purchase a Deal?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="collapseFour"
                          className="collapse "
                          aria-labelledby="headingFour"
                          data-parent="#accordion"
                        >
                          <div className="faq-accro-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et.
                          </div>
                        </div>
                      </div>
                      {/* <!-- end: faq 4 --> */}
                    </div>
                    {/* <!-- / faq-accordion --> */}
                  </div>
                  {/* <!-- End: col-md-6 col-sm-12 --> */}

                  {/* <!--  Start: col-md-6  --> */}
                  <div className="col-lg-6 col-sm-12">
                    <div className="faq-accordion" id="accordion2">
                      {/* <!-- Start: faq 5 --> */}
                      <div className="faq-accro-card">
                        <div className="faq-accro-header" id="headingFive">
                          <h5 className="mb-0">
                            <button
                              className="faq-link"
                              data-toggle="collapse"
                              data-target="#collapseFive"
                              aria-expanded="false"
                              aria-controls="collapseFive"
                            >
                              How do I make a booking?
                            </button>
                          </h5>
                        </div>

                        <div
                          id="collapseFive"
                          className="collapse show"
                          aria-labelledby="headingFive"
                          data-parent="#accordion2"
                        >
                          <div className="faq-accro-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et.
                          </div>
                        </div>
                      </div>
                      {/* <!-- End: faq 5 --> */}

                      {/* <!-- Start: faq 6 --> */}
                      <div className="faq-accro-card">
                        <div className="faq-accro-header" id="headingSix">
                          <h5 className="mb-0">
                            <button
                              className="faq-link collapsed"
                              data-toggle="collapse"
                              data-target="#collapseSix"
                              aria-expanded="false"
                              aria-controls="collapseSix"
                            >
                              Which are your specialities?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="collapseSix"
                          className="collapse"
                          aria-labelledby="headingSix"
                          data-parent="#accordion2"
                        >
                          <div className="faq-accro-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et.
                          </div>
                        </div>
                      </div>
                      {/* <!-- end: faq 6 --> */}

                      {/* <!-- Start: faq 7 --> */}
                      <div className="faq-accro-card">
                        <div className="faq-accro-header" id="headingSeven">
                          <h5 className="mb-0">
                            <button
                              className="faq-link collapsed"
                              data-toggle="collapse"
                              data-target="#collapseSeven"
                              aria-expanded="false"
                              aria-controls="collapseSeven"
                            >
                              How do I choose a restaurant name?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="collapseSeven"
                          className="collapse"
                          aria-labelledby="headingSeven"
                          data-parent="#accordion2"
                        >
                          <div className="faq-accro-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et.
                          </div>
                        </div>
                      </div>
                      {/* <!-- end: faq 7 --> */}

                      {/* <!-- Start: faq 8 --> */}
                      <div className="faq-accro-card">
                        <div className="faq-accro-header" id="headingEight">
                          <h5 className="mb-0">
                            <button
                              className="faq-link collapsed"
                              data-toggle="collapse"
                              data-target="#collapseEight"
                              aria-expanded="false"
                              aria-controls="collapseEight"
                            >
                              Which are your specialities?
                            </button>
                          </h5>
                        </div>
                        <div
                          id="collapseEight"
                          className="collapse"
                          aria-labelledby="headingEight"
                          data-parent="#accordion2"
                        >
                          <div className="faq-accro-body">
                            Anim pariatur cliche reprehenderit, enim eiusmod
                            high life accusamus terry richardson ad squid. 3
                            wolf moon officia aute, non cupidatat skateboard
                            dolor brunch. Food truck quinoa nesciunt laborum
                            eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put
                            a bird on it squid single-origin coffee nulla
                            assumenda shoreditch et.
                          </div>
                        </div>
                      </div>
                      {/* <!-- end: faq 8 --> */}
                    </div>
                    {/* <!-- / faq-accordion --> */}
                  </div>
                  {/* <!-- End: col-md-6 col-sm-12 --> */}
                </div>
                {/* <!-- / .row --> */}
              </div>
              {/* <!-- / .col-sm-12 --> */}
            </div>
            {/* <!-- /. row --> */}
          </div>
          {/* <!-- /. container --> */}
        </section>
        {/* <!-- End: FAQ Section --> */}
      </>
    );
  }
}

export default FAQComponent;
