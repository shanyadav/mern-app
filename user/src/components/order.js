import React, { Component } from "react";
import { Multiselect } from 'multiselect-react-dropdown';

class OrderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: [],
      CollapseName: "All",
      options: [],
      ItemsMargeData: [],
      showCart: false,
    };

  }
  componentDidUpdate = ({ FillterTypeData, OptionData, ItemsData }) => {
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

    if (ItemsData && ItemsData.data && ItemsData.data !== this.props.ItemsData.data) {
      const result = this.props.ItemsData.data.reduce((acc, d) => {
        const found = acc.findIndex(a => a.category_id === d.category_id);
        if (found < 0) {
          acc.push({ category_id: d.category_id, ItemData: [{ ...d }] })
        }
        else {
          // acc.push({...acc[found],ItemData:[...acc[found].ItemData,d]})
          acc[found] = { ...acc[found], ItemData: [...acc[found].ItemData, d] }
        }
        return acc;
      }, []);

      this.setState({ ItemsMargeData: result })

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
  getName = (categoryID) => {
    const { CategorieReducerData } = this.props;
    let categoryName = "";
    if (CategorieReducerData && CategorieReducerData.data && CategorieReducerData.data.length) {
      let data = "";
      data = CategorieReducerData.data.filter((i) => i._id === categoryID)[0];
      categoryName = data.name ? data.name : "";

    };
    return categoryName;
  };

  saveItems = (data) => {
    const { _id, name, price } = data;
    this.setState({ ID: _id, name: name, price: price })
  }

  render() {
    const { FoodTypeData, FillterTypeData, CategorieReducerData, ItemsData } = this.props;
    const { filters, CollapseName, options, ItemsMargeData, showCart } = this.state;
 

    return (
      <>
        <div className="inner-topbanner">
          <h3>We Are Here To Provide<br></br>
            The Best Services</h3>
        </div>
        <div className="food-categoriesouter">
          <div className="container">
            <ul className="food-categorie">
              <>
                {FoodTypeData &&
                  FoodTypeData.data &&
                  FoodTypeData.data.length
                  ? FoodTypeData.data.map((item, index) => {
                    return (
                      <li className="categorie-li active d-flex flex-column"
                        onClick={(e) => {
                          this.getItems(item._id, "food_type_ids");
                          this.setState({ CollapseName: item.name })
                        }}>
                        {/* <img src="../images/icon/food-icon-1.png"></img> */}
                        <span>   {item.avatar_url ? (
                          <img src={item.avatar_url} height="40px" width="40px" />
                        ) : null}</span>
                        <span>{item.name}</span>
                      </li>
                    );
                  })
                  : null}
              </>
              {/* <li className="categorie-li active">
                <img src="../images/icon/food-icon-1.png"></img>
                <span>Vegetarian</span>
              </li>
              <li className="categorie-li">
                <img src="../images/icon/food-icon-1.png"></img>
                <span>Vegan</span>
              </li>
              <li className="categorie-li">
                <img src="../images/icon/food-icon-1.png"></img>
                <span>Meat</span>
              </li>
              <li className="categorie-li">
                <img src="../images/icon/food-icon-1.png"></img>
                <span>Chicken</span>
              </li>
              <li className="categorie-li">
                <img src="../images/icon/food-icon-1.png"></img>
                <span>SeaFood</span>
              </li>
              <li className="categorie-filter">
                <i className="fas fa-bars"></i>
              </li> */}
              <li className="search-filter">
                <form>
                  <div className="form-col">
                    <input type="text" placeholder="What are you craving?"></input>
                    <button><i className="fas fa-search"></i></button>
                  </div>
                </form>
              </li>
            </ul>
          </div>
        </div>


        <section className="menu-section">
          <div className="container">
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
                      <a className="nav-link rounded-pill" id="v-pills-one-tab" data-toggle="pill" href="#v-pills-one" role="tab" aria-controls="v-pills-one" aria-selected="true"

                        onClick={(e) => {
                          this.getItems(itm._id, "category_id");
                        }}
                      >
                        <img src="../images/icon/categorie-icon.png"></img>{itm.name && itm.name}
                      </a>
                    );
                  })
                  : null}

                <select>
                  <option>More</option>
                  <option>More 1</option>
                  <option>More 2</option>
                  <option>More 3</option>
                </select>

                <div className="categorie-basket" onClick={(e) => {
                  this.setState({ showCart: !showCart })
                }}>
                  <span className="icofont-cart-alt cart"></span> Basket - 0
                </div>

              </div>
            </div>
          </div>
          <div className="container">
            <div className="menu-list-wrap">
              <div className={showCart === true ? "row menu-inner menu-cart-active" : "row menu-inner"}>
                <div className="categorie-product">
                  <div className="tab-content">

                    {ItemsMargeData &&
                      ItemsMargeData.length
                      ? ItemsMargeData.map((itm, indx) => {
                        return (
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
                                      {itm.category_id &&
                                        this.getName(
                                          itm.category_id
                                        )
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
                                      {itm.ItemData &&
                                        itm.ItemData
                                        ? itm.ItemData.map((item1, indx1) => {
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
                                                  <div className="body-head">
                                                    <h4 className="menu-card-title">{item1.name}</h4>
                                                    <span className="menu-card-price">{" "}
                                                      £ {item1.online_price ? item1.online_price : 0}
                                                    </span>
                                                  </div>
                                                  <div className="menu-card-des">
                                                    <p><input type="checkbox" class="read-more-input" id="read-more" />{/* {item1.description?item1.description:""} */}Chicken pieces marinated over night in light spices <span className="read-more-target">and then barbequed in a clay oven (comes with salad)</span><label for="read-more" class="read-more-trigger"></label></p>
                                                  </div>

                                                  <div className="add-slide">
                                                    <div className="slide-img">
                                                      <img src="../images/pro1.jpg" alt="" />
                                                      <img src="../images/pro1.jpg" alt="" />
                                                      <img src="../images/pro1.jpg" alt="" />
                                                    </div>
                                                    <a className="menu-card-btn" data-toggle="modal" data-target="#table" onClick={(e) => {
                                                      this.saveItems(item1)
                                                    }}>
                                                      <i className="icofont-cart-alt" data-toggle="modal" data-target="#table"></i>{" "}
                                                      {" "}
                                                      Add

                                                    </a>
                                                  </div>
                                                </div>


                                                {/* <div>
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
                                          </div> */}
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
                        );
                      })
                      : null}

                  </div></div>
                <div className="categorie-cart">
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
        </section>
      </>
    );
  }
}

export default OrderComponent;