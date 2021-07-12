import React, { Component } from "react";
import {
  CCol,
  CRow,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTooltip,
  CBadge,
  CCollapse,
} from "@coreui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Dropzone from "react-dropzone";
import moment from "moment";
import { connect } from "react-redux";
import { ConfirmBox } from "../../../Helpers/SweetAlert";
import {
  addDiscountCardRequest,
  getDiscountCardRequest,
  updateDiscountCardRequest,
} from "../../../actions";
class Coupon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discount: "",
      type: "FLAT",
      day_time: {},
      min_order_value: 0,
      is_deleted: true,
      is_removed: true,
      newRow: false,
      selectRowId: "",
      selectRowClick: 0,
      discount_type: "",
      payment_type: "",
      name: "",
      image: "",
      price: 0,
      amount: 0,
      card_type: "COUPON",
      expiry_date: new Date(),
    };
  }
  componentDidMount() {
    this.props.getCardDiscountData({ card_type: "COUPON" });
  }

  componentDidUpdate = ({ DiscountReducerData }) => {
    if (
      DiscountReducerData &&
      DiscountReducerData.updateReq &&
      DiscountReducerData.updateReq !== this.props.DiscountReducerData.updateReq
    ) {
      this.setState({
        newRow: false,
        min_order_value: 0,
        selectRowClick: 1,
        tax: 0,
        discount: "",
        type: "",
        min_order_value: 0,
        is_deleted: false,
        is_removed: false,
        selectRowId: "",
        discount_type: "",
        payment_type: "",
        name: "",
        image: "",
        price: 0,
        amount: 0,
      });
    }
  };
  onRowClick = (item) => {
    const { selectRowId, selectRowClick } = this.state;

    this.setState({
      selectRowId: item._id,
      newRow: false,
      name: item.name,
      discount: item.discount,
      imageUrl: selectRowId === item._id ? item.image : "",
      selectRowClick: selectRowId === item._id ? selectRowClick + 1 : 1,
    });
  };

  handleChange = (e) => {
    const { selectRowId } = this.state;
    const { target } = e;
    const { value, name } = target;
    this.props.onUpdateData({
      [name]: value,
      discount_id: selectRowId,
      card_type: "COUPON",
    });
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: false,
      },
    });
  };
  onAddDiscount = () => {
    const { name } = this.state;
    this.props.onAddCardDiscount({
      name: name,
      discount: 0,
      type: "FLAT",
      min_order_value: 0.0,
      image: "",
      price: 0,
      amount: 0,
      card_type: "COUPON",
      expiry_date: new Date(),
      is_deleted: false,
      is_removed: false,
      imageUrl: "",
    });
    this.setState({ newRow: false });
  };

  onSelectFile = async (file) => {
    const { selectRowId } = this.state;
    file.map(async (data, i) => {
      let picReader = new FileReader();
      let scope = this;
      await picReader.addEventListener("load", async (event) => {
        var image = new Image();
        image.src = event.target.result;
        image.onload = async function () {
          let dataURL = picReader.result;
          let Data = new FormData();
          Data.append("image", file[0]);
          Data.append("discount_id", selectRowId);
          Data.append("card_type", "COUPON");
          alert("image issue pending from backend");
          // scope.setState({ image: file[0], imageUrl: dataURL },()=>scope.props.onUpdateData(Data));
        };
      });
      await picReader.readAsDataURL(data);
    });
  };
  keypressHandler = (event) => {
    if (event.key === "Enter") {
      this.onAddDiscount();
    }
  };

  onDeleteImg = () => {
    this.setState({ image: "", imageUrl: "" });
  };
  keypressHandler1 = (event) => {
    if (event.key === "Enter") {
      this.onUpdateData();
    }
  };

  onUpdateData = () => {
    const { name, discount, amount, min_order_value, price, selectRowId } =
      this.state;
    this.props.onUpdateData({
      discount: parseFloat(discount),
      min_order_value: parseFloat(min_order_value),
      price: parseFloat(price),
      amount: parseFloat(amount),
      name: name,
      discount_id: selectRowId,
      card_type: "COUPON",
    });
    this.setState({ newRow: false, selectRowClick: 1 });
  };
  onRemove = async () => {
    const { selectRowId } = this.state;
    const { value } = await ConfirmBox({
      text: "Do you want to Remove ?",
    });
    if (value) {
      this.props.onUpdateData({
        is_removed: true,
        discount_id: selectRowId,
        card_type: "COUPON",
      });
    }
  };
  render() {
    const { DiscountReducerData } = this.props;
    const {
      discount,
      type,
      min_order_value,
      is_deleted,
      newRow,
      selectRowId,
      selectRowClick,
      name,
      price,
      amount,
      expiry_date,
      imageUrl,
    } = this.state;
    return (
      <>
        <CCard>
          <CCardHeader className="d-flex flex-row justify-content-between">
            {" "}
            <h6>Coupon</h6>
            <div>
              <CTooltip content="remove">
                <CButton
                  className="btn-youtube text-white ml-2"
                  size="sm"
                  onClick={() => this.onRemove()}
                >
                  <i class="fas fa-minus text-white" />
                </CButton>
              </CTooltip>
              <CTooltip content="Add New">
                <CButton
                  className="bg1 text-white ml-2"
                  size="sm"
                  onClick={() => this.setState({ newRow: true })}
                >
                  <i class="fas fa-plus" />
                </CButton>
              </CTooltip>
            </div>
          </CCardHeader>

          <CCardBody>
            <div className="table-responsive table1div">
              <table className="table table-bordered">
                <thead className="table1header">
                  <tr>
                    <th className="td2">Name</th>
                    <th className="td2">Code</th>
                    <th className="td2">Image</th>
                    <th className="td2">Price</th>
                    <th className="td2">Amount</th>
                    <th className="td2">Discount</th>
                    <th className="td2">Minimum_Order</th>
                    <th className="td2">Expiry Day Date</th>
                    <th className="td2">Type</th>
                    
                    {/* <th className="td2">Discount_Type</th> */}
                    {/* <th className="td2">Payment_Type</th> */}
                    <th className="td2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {newRow ? (
                    <tr>
                      <td>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) =>
                            this.setState({
                              [e.target.name]: e.target.value,
                            })
                          }
                          onKeyPress={(event) => this.keypressHandler(event)}
                          onBlur={() => this.onAddDiscount()}
                        />
                      </td>

                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>

                      <td></td>
                      <td></td>
                      <td></td>
                      <td>
                        <div className="d-flex flex-row justify-content-center">
                          <CBadge
                            className={`${
                              !is_deleted ? "bg1" : "bg-secondary"
                            } text-white px-1 pt-1 pb-1`}
                          >
                            Enable
                          </CBadge>

                          <CBadge
                            className={`${
                              is_deleted ? "btn-youtube" : "bg-secondary"
                            } text-white px-1 pt-1 pb-1 ml-1`}
                          >
                            Disable
                          </CBadge>
                        </div>
                      </td>
                    </tr>
                  ) : null}
                  {DiscountReducerData &&
                  DiscountReducerData.copanData &&
                  DiscountReducerData.copanData.length ? (
                    DiscountReducerData.copanData.map((itm, ind) => {
                      return (
                        <tr
                          key={ind}
                          onClick={() => this.onRowClick(itm)}
                          className={selectRowId === itm._id ? "bg2" : ""}
                        >
                          <td>
                            {selectRowId === itm._id && selectRowClick > 1 ? (
                              <input
                                className="w-100"
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) =>
                                  this.setState({
                                    [e.target.name]: e.target.value,
                                  })
                                }
                                onKeyPress={(event) =>
                                  this.keypressHandler1(event)
                                }
                                onBlur={() => this.onUpdateData()}
                              />
                            ) : itm.name ? (
                              itm.name
                            ) : null}
                          </td>
                          <td></td>
                          <td>
                            {selectRowId === itm._id && selectRowClick > 1 ? (
                              <>
                                {imageUrl ? (
                                  <div className="home-img-span mr-3">
                                    <i
                                      className="far fa-times-circle text-danger"
                                      onClick={() => this.onDeleteImg()}
                                    />
                                    <img
                                      src={imageUrl ? imageUrl : null}
                                      alt=""
                                      className="zoom"
                                    />
                                  </div>
                                ) : (
                                  <Dropzone
                                    multiple={false}
                                    onDrop={(e) => this.onSelectFile(e)}
                                  >
                                    {({ getRootProps, getInputProps }) => {
                                      return (
                                        <div className="welcome-image-select-background w-100">
                                          <div
                                            className="text-center"
                                            {...getRootProps()}
                                          >
                                            <input
                                              {...getInputProps()}
                                              accept="image/png, image/jpeg"
                                            />
                                            {
                                              <>
                                                <div className="text-center welcome-image-text">
                                                  image
                                                </div>
                                              </>
                                            }
                                          </div>
                                        </div>
                                      );
                                    }}
                                  </Dropzone>
                                )}
                              </>
                            ) : (
                              <>
                                {itm.image ? (
                                  <div className="home-img-span mr-3">
                                    <img
                                      src={itm.image ? itm.image : null}
                                      alt=""
                                      className="zoom"
                                    />
                                  </div>
                                ) : null}
                              </>
                            )}
                          </td>
                          <td>
                            {selectRowId === itm._id && selectRowClick > 1 ? (
                              <input
                                className="w-100"
                                type="text"
                                name="price"
                                onChange={(e) => {
                                  this.setState({
                                    [e.target.name]: e.target.value,
                                  });
                                }}
                                onKeyPress={(event) =>
                                  this.keypressHandler1(event)
                                }
                                onBlur={() => this.onUpdateData()}
                              />
                            ) : itm.price ? (
                              itm.price
                            ) : null}
                          </td>
                          <td>
                            {selectRowId === itm._id && selectRowClick > 1 ? (
                              <input
                                className="w-100"
                                type="text"
                                name="amount"
                                onChange={(e) => {
                                  this.setState({
                                    [e.target.name]: e.target.value,
                                  });
                                }}
                                onKeyPress={(event) =>
                                  this.keypressHandler1(event)
                                }
                                onBlur={() => this.onUpdateData()}
                              />
                            ) : itm.amount ? (
                              itm.amount
                            ) : null}
                          </td>
                          <td>
                            {selectRowId === itm._id && selectRowClick > 1 ? (
                              <input
                                className="w-100"
                                type="text"
                                name="discount"
                                onChange={(e) => {
                                  this.setState({
                                    [e.target.name]: e.target.value,
                                  });
                                }}
                                onKeyPress={(event) =>
                                  this.keypressHandler1(event)
                                }
                                onBlur={() => this.onUpdateData()}
                              />
                            ) : itm.discount ? (
                              itm.discount
                            ) : null}
                          </td>
                          <td>
                            {selectRowId === itm._id && selectRowClick > 1 ? (
                              <input
                                className="w-100"
                                type="text"
                                name="min_order_value"
                                onChange={(e) => {
                                  this.setState({
                                    [e.target.name]: e.target.value,
                                  });
                                }}
                                onKeyPress={(event) =>
                                  this.keypressHandler1(event)
                                }
                                onBlur={() => this.onUpdateData()}
                              />
                            ) : itm.min_order_value ? (
                              itm.min_order_value
                            ) : null}
                          </td>
                          <td className="flex-row">
                            {selectRowId === itm._id && selectRowClick > 1 ? (
                            //   <input
                            //   className="w-100"
                            //   type="number"
                            //   name="expiry_date"
                            //   value={expiry_date}
                            //   onChange={(e) =>
                            //     this.setState({
                            //       [e.target.name]: e.target.value,
                            //     })
                            //   }
                            //   onKeyPress={({ key }) =>
                            //       key === "Enter"
                            //         ? this.props.onUpdateData({
                            //             expiry_date: expiry_date,
                            //             discount_id: selectRowId,
                            //             card_type: "COUPON",
                            //           })
                            //         : null
                            //     }
                            //     onBlur={() =>
                            //       this.props.onUpdateData({
                            //         expiry_date: expiry_date,
                            //         discount_id: selectRowId,
                            //         card_type: "COUPON",
                            //       })
                            //     }
                            // />
                              <DatePicker
                                selected={expiry_date}
                                // timeInputLabel="Time:"
                                dateFormat="yyyy/MM/dd h:mm aa"
                                name="expiry_date"
                                value={expiry_date}
                                showTimeSelect
                                onChange={(date) => {
                                  this.setState({
                                    expiry_date: date,
                                  });
                                }}
                                onKeyPress={({ key }) =>
                                  key === "Enter"
                                    ? this.props.onUpdateData({
                                        expiry_date: expiry_date,
                                        discount_id: selectRowId,
                                        card_type: "COUPON",
                                      })
                                    : null
                                }
                                onBlur={() =>
                                  this.props.onUpdateData({
                                    expiry_date: expiry_date,
                                    discount_id: selectRowId,
                                    card_type: "COUPON",
                                  })
                                }
                              />
                            ) : itm.expiry_date ? (
                              moment(itm.expiry_date).format("LLL")
                            ) : null}
                          </td>
                          <td>
                            {selectRowId === itm._id && selectRowClick > 1 ? (
                              <select
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                name="type"
                                value={type}
                              >
                                <option value={null} className="bg1">
                                  Select One
                                </option>

                                <option value="PERCENTAGE" className="bg1">
                                  PERCENTAGE
                                </option>

                                <option value="FLAT" className="bg1">
                                  FLAT
                                </option>
                              </select>
                            ) : itm.type ? (
                              itm.type
                            ) : null}
                          </td>
                          {/* <td>
                              {selectRowId === itm._id &&
                                selectRowClick > 1 ? (
                                <select onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                  name="discount_type"
                                >
                                  <option value={null}>
                                    Select One
                                  </option>

                                  <option value="ONE_TIME_SUBSCRIBER" className="bg1">
                                    ONE TIME SUBSCRIBER
                                  </option>

                                  <option value="PAYMENT_TYPE" className="bg1">
                                    PAYMENT TYPE
                                  </option>

                                  <option value="REDUNDANT_CART" className="bg1">
                                    REDUNDANT CART
                                  </option>
                                </select>
                              ) : itm.discount_type ? (
                                itm.discount_type
                              ) : null}
                            </td> */}

                          {/* <td>
                            {selectRowId === itm._id && selectRowClick > 1 ? (
                              <select
                                onChange={(e) => {
                                  this.handleChange(e);
                                }}
                                name="payment_type"
                              >
                                <option value={null}>Select One</option>

                                <option value="CARD" className="bg1">
                                  CARD
                                </option>

                                <option value="WALLET" className="bg1">
                                  WALLET
                                </option>

                                <option value="CASH" className="bg1">
                                  CASH
                                </option>
                              </select>
                            ) : itm.payment_type ? (
                              itm.payment_type
                            ) : null}
                          </td> */}
                          
                          <td>
                            <div className="d-flex flex-row justify-content-center">
                              <CTooltip content="Change Status">
                                <CBadge
                                  className={`${
                                    !itm.is_deleted ? "bg1" : "bg-secondary"
                                  } text-white px-1`}
                                  onClick={() =>
                                    this.setState(
                                      {
                                        selectRowId: itm._id,
                                        selectRowClick: 1,
                                      },
                                      () =>
                                        this.props.onUpdateData({
                                          is_deleted: false,
                                          discount_id: itm._id,
                                          card_type: "COUPON",
                                        })
                                    )
                                  }
                                >
                                  Enable
                                </CBadge>
                              </CTooltip>
                              <CTooltip content="Change Status">
                                <CBadge
                                  className={`${
                                    itm.is_deleted
                                      ? "btn-youtube"
                                      : "bg-secondary"
                                  } text-white px-1 ml-1`}
                                  onClick={() =>
                                    this.setState(
                                      {
                                        selectRowId: itm._id,
                                        selectRowClick: 1,
                                      },
                                      () =>
                                        this.props.onUpdateData({
                                          is_deleted: true,
                                          discount_id: itm._id,
                                          card_type: "COUPON",
                                        })
                                    )
                                  }
                                >
                                  Disable
                                </CBadge>
                              </CTooltip>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colspan="13">
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
          </CCardBody>
        </CCard>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  DiscountReducerData: state.DiscountCardReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCardDiscount: (data) => {
      dispatch(addDiscountCardRequest(data));
    },
    getCardDiscountData: (data) => {
      dispatch(getDiscountCardRequest(data));
    },
    onUpdateData: (data) => {
      dispatch(updateDiscountCardRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Coupon);
