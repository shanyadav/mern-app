import React, { Component } from "react";

class SingleEventComponent extends Component {
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
                <h3>Single Event</h3>
                <p>
                  <a href="index.html"> Home </a>{" "}
                  <i className="icofont-rounded-right"></i> Single Event{" "}
                </p>
              </div>
            </div>
            {/* <!-- End: .row --> */}
          </div>
          {/* <!-- End: Header Content --> */}
        </header>
        {/* <!--/. header --> */}

        {/* <!-- Start : Blog Page Content --> */}
        <div className="single_blog">
          <div className="container">
            <div className="row">
              {/* <!-- Blog Area --> */}
              <div className="col-lg-9 col-sm-12">
                <div className="blog-post-list">
                  <div className="blog_wrp">
                    <a className="blog_img" href="blog.html">
                      <img
                        className="img-responsive"
                        src="../images/event-single.jpg"
                        alt=""
                      />
                    </a>
                    <div className="blog_info">
                      <div className="blog_date">
                        <span>
                          <i className="fas fa-comment"></i> 0 comments
                        </span>
                        <span>
                          {" "}
                          <i className="fa fa-calendar"></i>6 Nov 2019
                        </span>
                      </div>
                      <a href="blog.html">
                        <h4>
                          Organic food contributes to better health through
                          reduced .
                        </h4>
                      </a>
                      <p>
                        Conventional farming methods expose produce to chemicals
                        in the form of pesticides, fertilisers, and preser
                        vatives. While these greatly improve productivity, they
                        can be very harmful to human beings, and in large amou
                        nts even cause irreversible damage. Organic food on the
                        other hand, is produced through traditional farming
                        methods, without the use of any artificial compounds or
                        preservatives, making it far safer for human consump
                        tion human beings, and in large amou nts even cause
                        irreversible.
                      </p>

                      <div className="blog_quote">
                        <p>
                          Lorem ipsum dolor sit amet, in urna molestie
                          tristique. Cong erment sed at facilisis lacinia aliqu
                          after fusce wisi porta ligula nibh vel congue diam.
                          Sed ligula erat molestie cras morbi in facilisis
                          euelito an rem ipsum psum dolor sit amet molestie cras
                          morbi in facilisis eu elit Lorem ipsum psum dolor sit
                          amet, in urna molestie tristique
                        </p>
                        <p>
                          in urna molestie tristique. Cong erment sed at
                          facilisi lacinia aliqua fusce wisi porta ligula nibh
                          vel congue diam. Sed ligula erat molestie cras morbi
                          in facilisis eu elit Lorem ipsum si porta ligula nibh
                          vel congue cras morbi in facilisis eu
                        </p>
                        <h3>
                          Benefits of summer cleaning tips how to clean office
                        </h3>
                        <p>
                          Lorem ipsum dolor sit amet, in urna molestie
                          tristique. Cong erment sed at facilisis lacinia aliqu
                          after fusce wisi porta ligula nibh vel congue diam.
                          Sed ligula erat molestie cras morbi in facilisis
                          euelito an rem ipsum psum dolor sit amet molestie cras
                          morbi in facilisis eu elit Lorem ipsum psum dolor sit
                          amet, in urna molestie tristique
                        </p>
                        <h6 className="marked">
                          “How to clean office cleaning company offers a full
                          range of daily services facilisis euelito an rem ipsum
                          psum dolor sit molestie cras morbi in ”
                          <span className="name">Adam Josef </span>
                        </h6>
                        <p>
                          Lorem ipsum dolor sit amet, in urna molestie
                          tristique. Cong erment sed at facilisis lacinia aliqu
                          after fusce wisi porta ligula nibh vel congue diam.
                          Sed ligula erat molestie cras morbi in facilisis
                          euelito an rem ipsum psum dolor sit amet molestie cras
                          morbi in facilisis eu elit Lorem ipsum psum dolor sit
                          amet, in urna molestie tristique
                        </p>
                        <p>
                          in urna molestie tristique. Cong erment sed at
                          facilisi lacinia aliqua fusce wisi porta ligula nibh
                          vel congue diam. Sed ligula erat molestie cras morbi
                          in facilisis eu elit Lorem ipsum si porta ligula nibh
                          vel congue cras morbi in facilisis eu
                        </p>
                      </div>
                      <div className="post_tag_grid">
                        <div className="post_tags">
                          <h5> Tags:</h5>
                          <a href="#">Food</a>
                          <a href="#">Red</a>
                          <a href="#">Fresh</a>
                        </div>
                        <div className="post_share footer_socil">
                          <h5>Share On:</h5>
                          <ul className="list-icons link-list footer_soc">
                            <li>
                              <a href="#">
                                <i className="fab fa-facebook"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fab fa-twitter"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fab fa-behance"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fab fa-instagram"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fab fa-pinterest"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!--/ article --> */}

                {/* <!-- Start:  Post Navigation --> */}
                <div className="post-option">
                  <div className="pull-left">
                    <a href="#" className="prev-post">
                      <span className="arrow-icon icofont-long-arrow-left"></span>
                      &nbsp;
                    </a>
                  </div>
                  <span className="middle-icon">
                    {" "}
                    <a href="blog.html" className="fas fa-th"></a>{" "}
                  </span>
                  <div className="pull-right">
                    <a href="#" className="next-post">
                      {" "}
                      &nbsp;
                      <span className="arrow-icon icofont-long-arrow-right"></span>
                    </a>
                  </div>
                </div>
                {/* <!--/ End:  Post Navigation --> */}

                {/* <!--comments list --> */}
                <div className="list-comments">
                  <div className="comments-section-title">
                    <h4>7 Comments</h4>
                  </div>
                  {/* <!-- .section-title --> */}
                  <ul className="comments">
                    <li>
                      <div className="comment">
                        <div className="comment_imgg">
                          <img
                            src="../images/testimonial1.jpg"
                            alt=""
                            className="comment-avatar"
                          />
                        </div>
                        <div className="comment_cont_wrp">
                          <strong className="commenter-title">
                            <a href="#">John Doe</a>
                          </strong>
                          <span className="comment-date">27 Jan 2019</span>
                          <span className="comment-reply">
                            <a href="#">Reply</a>
                          </span>
                          <p>
                            Lorem ipsum dolor sit amet, in urna molestie
                            tristique. A fermentum sed at faci lisis lacin ia
                            aliquam fusce wisi porta ligula nibh vel congue
                            diam. Sed ligula erat molestie cras
                          </p>
                        </div>
                      </div>
                      {/* <!-- .comment --> */}
                      <ul>
                        <li>
                          <div className="comment">
                            <div className="comment_imgg">
                              <img
                                src="../images/testimonial2.jpg"
                                alt=""
                                className="comment-avatar"
                              />
                            </div>
                            <div className="comment_cont_wrp">
                              <strong className="commenter-title">
                                <a href="#">Adam Doe</a>{" "}
                                <span className="comment-reply">
                                  <a href="#">Reply</a>
                                </span>
                              </strong>
                              <span className="comment-date">29 Jan 2019</span>
                              <p>
                                Lorem ipsum dolor sit amet, in urna molestie
                                tristique. A fermentum sed at faci lisis lacin
                                ia aliquam fusce wisi porta ligula nibh vel
                                congue diam. Sed ligula erat{" "}
                              </p>
                            </div>
                          </div>
                          {/* <!-- .comment --> */}
                        </li>
                      </ul>
                    </li>
                  </ul>
                  {/* <!--/ .comments --> */}
                </div>
                {/* <!--/comments list --> */}

                {/* <!-- comment-form-warper   --> */}
                <div className="comment-form-warper">
                  <div className="comments-title">
                    <h4>Leave a Comment</h4>
                  </div>
                  {/* <!-- .section-title --> */}
                  {/* <!--  Contact Form  --> */}
                  <div className="comment-form">
                    <form method="post">
                      <div className="row">
                        <div className="col-lg-6 col-sm-12">
                          <input
                            className="con-field"
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Name"
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
                      </div>
                      <div className="row">
                        <div className="col-sm-12">
                          <textarea
                            className="con-field"
                            name="message"
                            id="message"
                            rows="6"
                            placeholder="Your Message"
                          ></textarea>
                        </div>
                        <div className="col-sm-12 submit-area">
                          <input
                            type="submit"
                            id="submit"
                            className="submit"
                            value="Post Comment"
                          />
                          <div id="msg" className="message"></div>
                        </div>
                      </div>
                    </form>
                  </div>
                  {/* <!-- End:comment Form  --> */}
                </div>
                {/* <!--/.comment-form-warper--> */}
              </div>
              {/* <!--/ Blog Area --> */}

              {/* <!-- Widget Area --> */}
              <div className="col-lg-3 col-sm-12 widget-area">
                {/* <!-- Widget Search --> */}
                <aside className="widget widget-search">
                  {/* <!-- input-group --> */}
                  <div className="input-group">
                    <input
                      className="form-control"
                      placeholder="Search"
                      type="text"
                    />
                    <span className="input-group-btn">
                      <button type="button">
                        <i className="fa fa-search"></i>
                      </button>
                    </span>
                  </div>
                  {/* <!-- /input-group --> */}
                </aside>
                {/* <!-- Widget Search /- --> */}
                {/* <!-- Recent Post --> */}
                <aside className="widget wiget-recent-post">
                  <h3 className="widget-title">Recent Post</h3>
                  <div className="recent-post-box">
                    <div className="recnt_pst_imge">
                      <img src="../images/event_1.jpg" alt="" />
                    </div>
                    <div className="recent-title">
                      <span>
                        <i className="fa fa-calendar"></i> 1st Dec 2019
                      </span>
                      <a href="single-blog.html">How to Eat Foods </a>
                    </div>
                  </div>
                  <div className="recent-post-box">
                    <div className="recnt_pst_imge">
                      <img src="../images/event_2.jpg" alt="" />
                    </div>
                    <div className="recent-title">
                      <span>
                        <i className="fa fa-calendar"></i> 1st Dec 2018
                      </span>
                      <a href="single-blog.html">How to Eat Foods </a>
                    </div>
                  </div>
                  <div className="recent-post-box">
                    <div className="recnt_pst_imge">
                      <img src="../images/event_3.jpg" alt="" />
                    </div>
                    <div className="recent-title">
                      <span>
                        <i className="fa fa-calendar"></i> 1st Dec 2015
                      </span>
                      <a href="single-blog.html">How to Eat Foods</a>
                    </div>
                  </div>
                </aside>
                {/* <!-- Recent Post /- --> */}
                {/* <!-- Post Categories --> */}
                <aside className="widget widget-post-categories">
                  <h3 className="widget-title">Post Categories</h3>
                  <ul className="categories-type">
                    <li>
                      <a href="#" title="Business">
                        Juicy Grapes
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Wordpress">
                        Red Watermelon
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Desktop">
                        Native Orange
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Web Developement">
                        Juicy Grapes
                      </a>
                    </li>
                    <li>
                      <a href="#" title="Statistics">
                        Fresh Banana
                      </a>
                    </li>
                  </ul>
                </aside>
                {/* <!-- Post Categories /- --> */}

                {/* <!-- Widget Tags --> */}
                <aside className="widget widget-tags">
                  <h3 className="widget-title">Top Tags</h3>
                  <a href="#" title="Install">
                    Food
                  </a>{" "}
                  <a href="#" title="Design">
                    Red
                  </a>{" "}
                  <a href="#" title="Video">
                    Grapes
                  </a>{" "}
                  <a href="#" title="Branding">
                    Fresh
                  </a>{" "}
                  <a href="#" title="Pakaging">
                    Banana
                  </a>
                </aside>
                {/* <!-- Widget Tags /- --> */}
              </div>
              {/* <!-- Widget Area /- --> */}
            </div>
          </div>
          {/* <!-- Container /- --> */}
        </div>
        {/* <!-- End : Blog Page Content --> */}
      </>
    );
  }
}

export default SingleEventComponent;
