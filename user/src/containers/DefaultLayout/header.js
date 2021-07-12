import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { getDayScheduleRequest, ListItemsActions, getUserRequest } from "../../actions";
import { connect } from "react-redux";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: localStorage.getItem("token"),
    };
  }

  componentDidMount() {
    this.props.getCardDiscountData({ discount_type: "ONE_TIME_SUBSCRIBER" });
    this.props.getUserData();
  }
  render() {
    const { DayScheduleReducerData, UserDetail } = this.props;
    return (

      <>
        {/* <!--::::::::::::::::::::::::::: Start: Preloader section :::::::::::::::::::::::::::--> */}
        {/* <div className="preloader">
          <div className="loader loader1"></div>
          <div className="loader loader2"></div>
          <div className="loader loader3"></div>
          <div className="loader loader4"></div>
          <div className="loader loader5"></div>
          <div className="loader loader6"></div>
          <div className="loader loader7"></div>
          <div className="loader loader8"></div>
        </div> */}
        {/* <!-- ::::::::::::::::::::::::::: End: Preloader section :::::::::::::::::::::::::::--> */}

        {/* <!-- Start: Header Section --> */}
        <div className="header_topbar" id="top">
          {/* <!-- Logo --> */}
          <div className="container">
            <div className="row">
              <div className="header_top_right list-unstyled">
                {/* <!-- Header Contact  --> */}
                <ul className="header_contact">
                  <li>
                    <i className="fas fa-envelope"></i>
                    <a href="mailto:info@tastery.co.uk" className="text-white">
                      info@tastery.co.uk
                    </a>
                  </li>
                  <li>
                    <i className="fas fa-phone"></i>+234 567 234 875
                  </li>
                </ul>
                {/* <!-- End: Header Contact --> */}
              </div>
              <div className="header_top_left">
                <div className="opening-hrs">
                  <p>
                    <i className="fas fa-business-time" data-toggle="modal" data-target="#opening-hrs"></i> Hours : 9am-5pm &
                    9am-11pm
                  </p>

                  <div
                    className="modal fade cart-modal"
                    id="opening-hrs"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="cartTableModal"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div>

                        <span className="close d-flex justify-content-end fas"
                          data-dismiss="modal"
                          aria-label="Close">
                          <i class="fas fa-times text-success mr-3"></i>
                        </span>
                        <div className="modal-body">
                          <div className="table-responsive">
                            <table className="table table-sm table-bordered table-light table-dark">

                              <thead>
                                <tr>
                                  <th>Days	</th>
                                  <th>Day Opening Time	</th>
                                  <th>Evening Opening Time</th>
                                </tr>
                              </thead>
                              <tbody>
                                {DayScheduleReducerData &&
                                  DayScheduleReducerData.data &&
                                  DayScheduleReducerData.data.length ? (
                                  DayScheduleReducerData.data.map((itm, ind) => {
                                    return (
                                      <tr
                                        key={ind}
                                      >
                                        <td>{itm.day && itm.day}</td>
                                        <td>{itm.morning_time && itm.morning_time}</td>
                                        <td>{itm.evening_time && itm.evening_time}</td>
                                      </tr>
                                    );
                                  })
                                ) : (
                                  <tr>
                                    <td colspan="4">
                                      <h6>
                                        {" "}
                                        <i class="fas fa-exclamation-triangle text-danger mr-2" />
                                        Not Found
                                      </h6>
                                    </td>
                                  </tr>
                                )}


                              </tbody>
                            </table>

                          </div>
                        </div>
                      </div>
                    </div></div>
                </div>
                {/* <!--  Endd: opening-hrs --> */}

                <ul className="header_cart">
                  <li>
                    {
                      UserDetail && UserDetail.data && UserDetail.data.name ?
                        (
                          <Link to="/profile" ><span className="firstLetter">  {UserDetail && UserDetail.data && UserDetail.data.name}</span></Link>)
                        : (<Link to="/login"> Login </Link>
                        )
                    }
                  </li>

                  {/* comment murtaza <li>
                    <Link
                      to="/checkout"
                      className="icofont-cart-alt cart"
                    ></Link>
                  </li> */}
                </ul>
                {/* <!--  Endd: Header  Login & Cart --> */}
              </div>
              {/* <!-- End: header_top_left --> */}
            </div>
            {/* <!-- End: row  --> */}
          </div>
          {/* <!-- End: Container  --> */}
        </div>
        {/* <!-- End: Header Info --> */}

        {/* <!-- Start: header navigation --> */}
        <div className="navigation">
          <div className="container">
            <div className="row custom-header">
              <div className="logo">
                <Link to="/home">
                  <img
                    className="img-responsive"
                    src="../images/logo.png"
                    alt="tastery"
                  />
                </Link>
              </div>
              {/* <!-- end: logo --> */}

              <div className="nav-outer">
                <div id="navigation">
                  <ul>
                    <li>
                      <NavLink exact to="/home" activeClassName="active">Home</NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/order" activeClassName="active">Orderr</NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/menu" activeClassName="active">Menus</NavLink>
                    </li>
                    <li className="has-sub">
                      <NavLink to="/pages" activeClassName="active">Pages</NavLink>
                      <ul>
                        <li>
                          <NavLink exact to="/pages/Merchandise" activeClassName="active">Merchandise</NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/pages/event-catering" activeClassName="active">Event Categing</NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/pages/our-branches" activeClassName="active">Our Branches</NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/pages/single-event" activeClassName="active">Single Event</NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/pages/event" activeClassName="active">Event</NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/pages/offer" activeClassName="active">Offer</NavLink>
                        </li>
                        <li>
                          <NavLink exact to="/pages/faq" activeClassName="active">Faq</NavLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <NavLink exact to="/about" activeClassName="active">About</NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/review" activeClassName="active">Review</NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/contact" activeClassName="active">Contact</NavLink>
                    </li>
                  </ul>
                </div>
                {/* <!-- End: navigation  --> */}
              </div>
              {/* <!--/ col-md-9 col-sm-12 --> */}
            </div>
            {/* <!--/ row --> */}
          </div>
          {/* <!--/ container --> */}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  DayScheduleReducerData: state.ScheduleReducer,
  UserDetail: state.AuthReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {

    getCardDiscountData: (data) => {
      dispatch(getDayScheduleRequest(data));
    },

    getUserData: (data) => {
      dispatch(getUserRequest(data));
    },

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);