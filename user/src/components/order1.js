import React, { Component } from "react";
import { Multiselect } from 'multiselect-react-dropdown';

class OrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      CollapseName: "All",
      options: [],
      showCart: false,

    };

  }
  componentDidUpdate = ({ FillterTypeData, OptionData }) => {
    let filterType = [];
    if (
      FillterTypeData &&
      FillterTypeData.data &&
      FillterTypeData.data !== this.props.FillterTypeData.data
    ) {
      const { FillterTypeData } = this.props;
      if (FillterTypeData && FillterTypeData.data && FillterTypeData.data.length) {
        for (let i = 0; i < FillterTypeData.data.length; i++) {
          let id = FillterTypeData.data[i]._id;
          let fiterTypeName = FillterTypeData.data[i].name;
          let options = [];
          if (
            FillterTypeData.data[i] &&
            FillterTypeData.data[i].filter_data &&
            FillterTypeData.data[i].filter_data.length
          ) {
            for (
              let j = 0;
              j < FillterTypeData.data[i].filter_data.length;
              j++
            ) {
              options.push({
                name: FillterTypeData.data[i].filter_data[j].name,
                id: FillterTypeData.data[i].filter_data[j]._id,
              });
            }
          }
          filterType.push({ id, fiterTypeName, options });
        }
      }
      this.setState({ filters: filterType });
    }
    if (OptionData && OptionData.data && OptionData.data !== this.props.OptionData.data) {
      let options = [];
      if (this.props.OptionData.data.length) {
        this.props.OptionData.data.map((itm) => {
          options.push({
            name: itm.name ? itm.name : "",
            id: itm._id ? itm._id : "",
          })
          return true
        })
      }
      this.setState({ options })
    }

  }

  getItems = (Id, name) => {
    this.props.getItem({ [name]: Id });

  }
  onSelect = (selectedList, selectedItem) => {
    this.setState({ CollapseName: "" });
    this.props.getItem({ item_type: selectedItem.id });
    this.setState({ CollapseName: selectedItem.name })
  }

  addItems = (Items) => {


  }

  render() {
    const { FoodTypeData, FillterTypeData, CategorieReducerData, ItemsData } = this.props;
    const { filters, CollapseName, options } = this.state;
    return (
      <>
        <div className="menu-select-section">
          <div className="container">
            <div className="row menu-select-wrap">


              <div className="col-md-4 col-sm-12 mt-3">
                <div className="select-group allergie_select">
                  <Multiselect
                    options={options}
                    onSelect={(selectedList, selectedItem) =>
                      this.onSelect(
                        selectedList, selectedItem
                      )
                    }
                    placeholder={"Select an options"}
                    displayValue="name"
                    showCheckbox={false}
                    id="css_custom"
                    style={{
                      // chips: {
                      //   display: "none",
                      // },
                      searchBox: {
                        border:
                          "1px dashed #fff",
                        "border-radius": "50px",
                      },
                    }}
                  />
                </div></div>
              {filters &&
                filters.length
                ? filters.map((item, index) => {
                  return (
                    <div className="col-md-4 col-sm-12  mt-3">
                      <div className="select-group allergie_select">
                        <Multiselect
                          options={item.options}
                          // onSelect={(selectedList) =>
                          // //   this.onSelect(
                          // //     selectedList,
                          // //     filter.fiterTypeName
                          // //   )
                          // // }
                          placeholder={"Select " + item.fiterTypeName}
                          displayValue="name"
                          showCheckbox={true}
                          id="css_custom"
                          style={{
                            // chips: {
                            //   display: "none",
                            // },
                            inputField: {
                              border: "none"
                            },
                            searchBox: {
                              border:
                                "1px dashed #fff",
                              "border-radius": "50px",
                              innerWidth: "100%"
                            },
                          }}
                        />
                      </div>
                    </div>
                  );
                })
                : null}

            </div>
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
                            id="filters"
                            className="menu-filter vegetarian"
                            onClick={(e) => {
                              this.getItems(item._id, "food_type_ids");
                              this.setState({ CollapseName: item.name })
                            }}
                          >
                            <a href="#" >
                              {item.avatar_url ? (
                                <img src={item.avatar_url} />
                              ) : null}

                              <p id="veg-element">
                                {item.name}
                                <i className="icofont-search-1"></i>
                              </p>
                            </a>
                          </div>
                        );
                      })
                      : null}
                  </>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-sm-12">
                <div className="full-menu-search">
                  <input
                    type="text"
                    className="form-control"
                    id="searchBar"
                    placeholder="Search Item"
                  />
                  <button type="button" className="full-menu-btn">
                    Full Menu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="menu-section">
          <div className="container">
            <div className="menu-list-wrap">
              <div className="row">
                <div className="col-sm-12">
                  <div className="menu-list-col">
                    <div
                      className="nav nav-pills menu-list-nav menu-list-nav-sm"
                      role="tablist"
                    >
                      {CategorieReducerData &&
                        CategorieReducerData.data &&
                        CategorieReducerData.data.length
                        ? CategorieReducerData.data.map((itm, indx) => {
                          return (
                            <a
                              className="nav-link rounded-pill"
                              id="v-pills-one-tab"
                              data-toggle="pill"
                              href="#v-pills-one"
                              role="tab"
                              aria-controls="v-pills-one"
                              aria-selected="true"

                              onClick={(e) => {
                                this.getItems(itm._id, "category_id");
                                this.setState({ CollapseName: itm.name })
                              }}
                            >
                              {itm.name && itm.name}
                            </a>
                          );
                        })
                        : null}

                    </div>
                    <div className="menu-arrow-sm">
                      <div className="left">
                        <button type="button" id="arrow_left">
                          <i className="fa fa-chevron-left"></i>
                        </button>
                      </div>
                      <div className="right">
                        <button type="button" id="arrow_right">
                          <i className="fa fa-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-sm-12">
                  <div className="row">
                    <div className="col-md-8 col-sm-12">
                      <div className="tab-content">
                        {/* {CategorieReducerData &&
                          CategorieReducerData.data &&
                          CategorieReducerData.data.length
                          ? CategorieReducerData.data.map((itm, indx) => {
                            return ( */}
                        <div
                          className="tab-pane fade show active"
                          id="v-pills-one"
                          role="tabpanel"
                          aria-labelledby="v-pills-one-tab"
                        >
                          <div
                            className="menu-accordion"
                            id="accordion1"
                          >
                            {/* <!-- Start: faq 1 --> */}
                            <div className="menu-accro-card">
                              <div
                                className="menu-accro-header"
                                id="headingOne"
                              >
                                <h5 className="mb-0">
                                  <button
                                    className="btn menu-item-link"
                                    data-toggle="collapse"
                                    data-target="#collapseOne"
                                    aria-expanded="true"
                                    aria-controls="collapseOne"
                                  >
                                    {
                                      CollapseName && CollapseName
                                    }
                                  </button>
                                </h5>
                              </div>
                              <div
                                id="collapseOne"
                                className="collapse show"
                                aria-labelledby="headingOne"
                                data-parent="#accordion1"
                              >
                                <div className="menu-accro-body">
                                  <div className="card-columns">
                                    {/* <!--  Start: Menu Card 1 --> */}
                                    {/* {
                                            ItemsData
                                          } */}
                                    {ItemsData &&
                                      ItemsData.data &&
                                      ItemsData.data.length
                                      ? ItemsData.data.map((item1, indx1) => {
                                        return (
                                          <div className="card" key={indx1}>
                                            <div className="menu-card">
                                              <div className="menu-card-img">
                                                <img
                                                  src="../images/pro1.jpg"
                                                  alt=""
                                                />
                                              </div>
                                              <div className="menu-card-body">
                                                <h4 className="menu-card-title">
                                                  {item1.name}
                                                </h4>
                                                <span className="menu-card-price">
                                                  {" "}
                                                  £ {item1.online_price ? item1.online_price : 0}
                                                </span>
                                                <a

                                                  className="menu-card-btn"
                                                  data-toggle="modal" data-target="#table"
                                                >
                                                  {" "}
                                                  Add{" "}
                                                  <i className="icofont-cart-alt" data-toggle="modal" data-target="#table"></i>{" "}
                                                </a>
                                              </div>
                                              <div className="menu-card-des">
                                                <p className="card-text">
                                                  {/* {item1.description?item1.description:""} */}
                                                  Chicken pieces marinated
                                                  over night in light spices
                                                  and then barbequed in a clay
                                                  oven (comes with salad)
                                                </p>
                                              </div>

                                              <div>
                                                {
                                                  item1.options && item1.options.length ? item1.options.map((itm, indd) => {
                                                    return (
                                                      <span>
                                                        {itm.name}
                                                        <div>
                                                          {
                                                            itm.attributes && itm.attributes.length ? itm.attributes.map((i => {
                                                              return (

                                                                <span>{i.name}</span>

                                                              )
                                                            }))
                                                              : null}
                                                        </div>
                                                      </span>


                                                    )
                                                  })
                                                    : null}
                                              </div>
                                            </div>
                                          </div>

                                        );
                                      })
                                      : null}


                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* );
                          })
                          : null} */}

                      </div></div>
                    <div className="col-md-4 col-sm-12">
                      <div className="menu-item-cart">
                        <div className="menu-cart-head">
                          <span>View Cart : 2 Items</span>
                          <span> £ 3.2 </span>
                        </div>
                        <table className="menu-cart-body">
                          <tbody>
                            <tr>
                              <td className="item-name"> Spicy papadom </td>
                              <td className="item-qty">
                                <div className="menu-cart-qty">
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
                              <td className="item-price text-right">£ 0.70</td>
                              <td className="text-center">
                                <a className="cart-remove">
                                  <i className="icofont-ui-delete"></i>
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td className="item-name"> Onion Salad </td>
                              <td className="item-qty">
                                <div className="menu-cart-qty">
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
                              <td className="item-price text-right">£ 0.70</td>
                              <td className="text-center">
                                <a className="cart-remove">
                                  <i className="icofont-ui-delete"></i>
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td className="item-name"> Mango Chutney </td>
                              <td className="item-qty">
                                <div className="menu-cart-qty">
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
                              <td className="item-price text-right">£ 0.70</td>
                              <td className="text-center">
                                <a className="cart-remove">
                                  <i className="icofont-ui-delete"></i>
                                </a>
                              </td>
                            </tr>
                            <tr>
                              <td className="item-name">
                                {" "}
                                Chicken Tikka as Main{" "}
                              </td>
                              <td className="item-qty">
                                <div className="menu-cart-qty">
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
                              <td className="item-price text-right">£ 0.70</td>
                              <td className="text-center">
                                <a className="cart-remove">
                                  <i className="icofont-ui-delete"></i>
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="menu-cart-footer">
                          <a href="checkout.html"> Proceed To Checkout </a>
                        </div>
                      </div>
                      {/* <!-- End: cart col --> */}
                    </div>
                  </div>
                  {/* <!-- End: Tab content --> */}
                </div>

              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default OrderComponent;
