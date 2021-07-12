import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
class MenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category_id: "",
      CollapseName: "All",
      filter_type_id: "",
    };
  }

  handleChange = (e) => {
    const { target } = e;
    const { value, name } = target;
    this.props.getItem({ [name]: value });
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: false,
      },
    });
  };

  getItems = (Id, name) => {
    this.props.getItem({ [name]: Id });
  }
  render() {
    const { FoodTypeData, FillterTypeData, CategorieReducerData, ItemsData ,OptionData} = this.props;
    const { category_id, CollapseName, filter_type_id } = this.state;
    return (
      <>

        <header id="page-top" className="single-banner">

          <div className="container">
            <div className="row banner-text">
              <div className="col-sm-12">
                <h3>Our Shop</h3>
                <p>
                  <Link to="/home"> Home </Link>
                  <i className="icofont-rounded-right"></i> Our Menus{" "}
                </p>
              </div>
            </div>
          </div>
        </header>
        <section className="findshop-section">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-sm-12">
                <div className="findshop-wrap">
                  <div className="row menu-select-wrap">
                    {FillterTypeData &&
                      FillterTypeData.data &&
                      FillterTypeData.data.length
                      ? FillterTypeData.data.map((item, index) => {
                        return (
                          <div className="menu-select-col">
                            <div className="select-group allergie_select">
                              <select name="total_review"
                                onChange={(e) => {
                                  this.handleChange(e);
                                  this.setState({ CollapseName: item.name })
                                }}
                                name="filter_type_id"
                                value={filter_type_id}>
                                <option value="0"> Select {item.name}</option>
                                {item.filter_data && item.filter_data.length
                                  ? item.filter_data.map((itm, ind) => {
                                    return (
                                      <option value={itm._id}>
                                        {" "}
                                        Select {itm.name}
                                      </option>
                                    );
                                  })
                                  : null}
                              </select>
                            </div>
                          </div>
                        );
                      })
                      : null}
                  </div>
                  {/* <!-- /. row --> */}

                  <div className="row">
                    <div className="col-sm-12">
                      <div className="menu-category">
                        <>
                          {FoodTypeData &&
                            FoodTypeData.data &&
                            FoodTypeData.data.length
                            ? FoodTypeData.data.map((item, index) => {
                              return (
                                <div
                                  id="filters4"
                                  className="menu-filter vegetarian"
                                  style={{ cursor: "pointer" }}
                                  onClick={(e) => {
                                    this.getItems(item._id, "food_type_ids");
                                    this.setState({ CollapseName: item.name })
                                  }}
                                >
                                  {item.avatar_url ? (
                                    <img src={item.avatar_url} className="img2" />
                                  ) : null}
                                  <span className="text-white">
                                    {item.name && item.name}
                                    <i className="icofont-search-1 ml-2"></i>{" "}
                                  </span>
                                </div>
                              );
                            })
                            : null}
                        </>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-sm-12">
                      <div className="full-menu-search">
                        <input
                          type="text"
                          className="search-bar"
                          id="searchBar"
                          placeholder="Search Item"
                        />

                        <button type="button" className="reset-menu-btn">
                          Reset Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-12">
                <div className="fshop-contact">
                  <div className="fmenu-contact-col">
                    <div className="fmenu-icon">
                      <i className="fa fa-phone"></i>
                    </div>
                    <div className="fmenu-contact-text">
                      <h4>Phone</h4>
                      <p>01268 785 444</p>
                    </div>
                  </div>
                  {/* <!-- end: Phone --> */}

                  <div className="fmenu-contact-col">
                    <div className="fmenu-icon">
                      <i className="fa fa-envelope"></i>
                    </div>
                    <div className="fmenu-contact-text">
                      <h4>Email</h4>
                      <p>info@spihline.co.uk</p>
                    </div>
                  </div>
                  {/* <!-- end: email --> */}

                  <div className="fmenu-contact-col">
                    <div className="fmenu-icon">
                      <a href="#">
                        <i className="fa fa-heart"></i>
                      </a>
                    </div>
                    <div className="fmenu-contact-text">
                      <h4 id="heart-count">Loved</h4>
                      <p>88</p>
                    </div>
                  </div>

                  <div className="fmenu-contact-col">
                    <div className="fmenu-icon">
                      <a
                        href="#"
                        data-toggle="modal"
                        data-target="#openingHrsModal"
                      >
                        <i className="fa fa-info"></i>
                      </a>
                    </div>

                    <div className="fmenu-contact-text">
                      <h4>
                        Opening
                        <br />
                        Hours
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className="modal fade openinghrs-modal"
          id="openingHrsModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="openingHrsModal"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Opening Hours </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="table-responsive">
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>Day Time</td>
                        <td>Close</td>
                      </tr>
                      <tr>
                        <td>Evening Time</td>
                        <td>4pm-9pm</td>
                      </tr>
                      <tr>
                        <td>Collection Time</td>
                        <td>30</td>
                      </tr>
                      <tr>
                        <td>Pickup Discount</td>
                        <td>10</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade cart-modal"
          id="cartTableModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="cartTableModal"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <i className="icofont-close-line"></i>
              </button>
              <div className="modal-body">
                <div className="table-responsive shop-cart-modal">
                  <table className="table">
                    <thead>
                      <tr className="shop_cart_tr">
                        <th className="text-center">Product</th>
                        <th>&nbsp;</th>
                        <th>&nbsp;</th>

                        <th className="text-left">Qty</th>
                        <th className="text-left">Price</th>
                        <th className="text-left">total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="cart-prod" colspan="3">
                          <a href="#" className="cart-trash">
                            {" "}
                            <i className="icofont-close-line"></i>{" "}
                          </a>
                          <a href="#">
                            <img src="../images/product_1.jpg" alt="" />
                            <h4> Spicy Papadom </h4>
                          </a>
                        </td>
                        <td className="cart-qty">
                          <div className="shop-cart-qty">
                            <input
                              type="number"
                              className="input-qty"
                              step="1"
                              min="1"
                              max="100"
                              name="quantity"
                              value="1"
                              title="Qty"
                              placeholder=""
                            />
                            <span className="q_inc"> </span>
                            <span className="q_dec"> </span>
                          </div>
                        </td>
                        <td className="cart-pri">
                          <span> £ 47.75 </span>{" "}
                        </td>
                        <td className="cart-tot">
                          <span>£ 50.00</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="cart-prod" colspan="3">
                          <a href="#" className="cart-trash">
                            {" "}
                            <i className="icofont-close-line"></i>{" "}
                          </a>
                          <a href="#">
                            <img src="../images/product_2.jpg" alt="" />
                            <h4> Mango Chutney </h4>
                          </a>
                        </td>
                        <td className="cart-qty">
                          <div className="shop-cart-qty">
                            <input
                              type="number"
                              className="input-qty"
                              step="1"
                              min="1"
                              max="100"
                              name="quantity"
                              value="1"
                              title="Qty"
                              placeholder=""
                            />
                            <span className="q_inc"> </span>
                            <span className="q_dec"> </span>
                          </div>
                        </td>
                        <td className="cart-pri">
                          <span> £ 30.75 </span>{" "}
                        </td>
                        <td className="cart-tot">
                          <span>£ 70.00</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="checkout-btn">
                    <a
                      href="https://spiceoflifeinverurie.com/checkout"
                      className="more-link"
                    >
                      Proceed To Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="shop-section">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12">
                <div className="shop-cart-wrap">
                  <div className="select-group shop-sel-cat">
                    <select onChange={(e) => {
                      this.handleChange(e);
                    }}
                      name="category_id"
                      value={category_id}
                    >
                      <option value={null} className="bg1">
                        Select Category
                      </option>
                      {CategorieReducerData &&
                        CategorieReducerData.data &&
                        CategorieReducerData.data.length
                        ? CategorieReducerData.data.map((itm, indx) => {
                          return (
                            <option value={itm._id} className="bg1">
                              {itm.name && itm.name}
                            </option>
                          );
                        })
                        : null}
                    </select>
                  </div>
                  <div className="shop-view-cart">
                    <button
                      className="shop-cart-btn"
                      data-toggle="modal"
                      data-target="#cartTableModal"
                    >
                      <i className="icofont-cart-alt"></i> View Cart
                      <span className="shop-cart-item"> 0 Items </span>
                      <span className="shop-cart-total"> Total £ 0.00 </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-sm-12">
                <div className="menu-accordion" id="accordion">

                  {/* {CategorieReducerData &&
                    CategorieReducerData.data &&
                    CategorieReducerData.data.length
                    ? CategorieReducerData.data.map((itm, indx) => {
                      return ( */}
                  <div className="menu-accro-card mt-3">
                    <div className="menu-accro-header">
                      <h5 className="mb-0">
                        <button
                          className="btn menu-item-link"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="true"
                          aria-controls="collapseOne"
                        >
                          {/* {itm.name && itm.name} */}
                          {CollapseName && CollapseName}
                        </button>
                      </h5>
                    </div>

                    <div
                      id="collapseOne"
                      className="collapse show"
                      aria-labelledby="headingOne"
                      data-parent="#accordion"
                    >
                      <Row>
                        {ItemsData &&
                          ItemsData.data &&
                          ItemsData.data.length
                          ? ItemsData.data.map((item1, indx1) => {
                            return (

                              <Col lg={4} className="mt-3">
                                <div className="card">
                                  <div className="menu-card">
                                    <div className="menu-card-img">
                                      <img src="../images/pro1.jpg" alt="" />
                                    </div>
                                    <div className="menu-card-body">
                                      <h4 className="menu-card-title">
                                        {item1.name && item1.name}
                                      </h4>
                                      <span className="menu-card-price">
                                        £ {item1.online_price ? item1.online_price : 0}</span>
                                      <span className="menu-card-btn">
                                        {" "}
                                        Add <i className="icofont-cart-alt"></i>{" "}
                                      </span>
                                    </div>
                                    <div className="menu-card-des">
                                      <p className="card-text">
                                        Chicken pieces marinated over night in light
                                        spices and then barbequed in a clay oven
                                        (comes with salad)
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Col>
                            );
                          })
                          : null}
                      </Row>
                    </div>
                  </div>
                  {/* );
                    })
                    : null} */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}
export default MenuComponent;
