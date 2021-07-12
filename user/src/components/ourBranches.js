import React, { Component } from "react";

class OureBranchesComponent extends Component {
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
                <h3>Our Branches</h3>
                <p>
                  <a href="index.html"> Home </a>{" "}
                  <i className="icofont-rounded-right"></i> Our Branches
                </p>
              </div>
            </div>
            {/* <!-- End: .row --> */}
          </div>
          {/* <!-- End: Header Content --> */}
        </header>
        {/* <!--/. header --> */}

        {/* <!-- Start: About Us Section --> */}
        <section className="branche-section">
          <div className="container">
            <div className="base-header">
              <small>Our Branches </small>
              <h2>Visit Our Branches </h2>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="branche-wrap">
                  <img src="../images/map-icon.png" alt="" />
                  <h4> USA Branche </h4>
                  <p>
                    {" "}
                    85 Bay Meadows Drive Woodstock, GA 30188, United States{" "}
                  </p>
                  <a href="#" className="more-link ">
                    {" "}
                    View On Map{" "}
                  </a>
                </div>
                {/* <!-- /.branche-wrap --> */}
              </div>
              {/* <!-- /.col-md-4 .col-sm-12 --> */}

              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="branche-wrap">
                  <img src="../images/map-icon.png" alt="" />
                  <h4> UK Branche </h4>
                  <p>1 Macquarie St, Sydney, NSW, 2000, United States </p>
                  <a href="#" className="more-link ">
                    {" "}
                    View On Map{" "}
                  </a>
                </div>
                {/* <!-- /.branche-wrap --> */}
              </div>
              {/* <!-- /.col-md-4 .col-sm-12 --> */}

              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="branche-wrap">
                  <img src="../images/map-icon.png" alt="" />
                  <h4> Canada Branche</h4>
                  <p> 11 Hickson Road Walsh Bay Sydney NSW 2000</p>
                  <a href="#" className="more-link ">
                    {" "}
                    View On Map{" "}
                  </a>
                </div>
                {/* <!-- /.branche-wrap --> */}
              </div>
              {/* <!-- /.col-md-4 .col-sm-12 --> */}

              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="branche-wrap">
                  <img src="../images/map-icon.png" alt="" />
                  <h4> France Branche </h4>
                  <p> 27 O’Connell Street, Sydney NSW 2000, United States </p>
                  <a href="#" className="more-link ">
                    {" "}
                    View On Map{" "}
                  </a>
                </div>
                {/* <!-- /.branche-wrap --> */}
              </div>
              {/* <!-- /.col-md-4 .col-sm-12 --> */}

              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="branche-wrap">
                  <img src="../images/map-icon.png" alt="" />
                  <h4> Australia Branche </h4>
                  <p>
                    {" "}
                    85 Bay Meadows Drive Woodstock, GA 30188, United States{" "}
                  </p>
                  <a href="#" className="more-link ">
                    {" "}
                    View On Map{" "}
                  </a>
                </div>
                {/* <!-- /.branche-wrap --> */}
              </div>
              {/* <!-- /.col-md-4 .col-sm-12 --> */}

              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="branche-wrap">
                  <img src="../images/map-icon.png" alt="" />
                  <h4> France Branche </h4>
                  <p> 27 O’Connell Street, Sydney NSW 2000, United States </p>
                  <a href="#" className="more-link ">
                    {" "}
                    View On Map{" "}
                  </a>
                </div>
                {/* <!-- /.branche-wrap --> */}
              </div>
              {/* <!-- /.col-md-4 .col-sm-12 --> */}
            </div>
            {/* <!-- /. row --> */}
          </div>
          {/* <!-- /. container --> */}
        </section>
        {/* <!-- End: About Us Section --> */}
      </>
    );
  }
}
export default OureBranchesComponent;
