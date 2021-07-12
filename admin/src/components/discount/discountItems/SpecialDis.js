import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTooltip,
  CBadge,
} from "@coreui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import moment from "moment";
import {
  addDayDiscountRequest,
  getDayDiscountRequest,
  updateDayDiscountRequest,
} from "../../../actions";

import { ConfirmBox } from "../../../Helpers/SweetAlert";
class SpecialDis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discount: "",
      type: "FLAT",
      discount_date: new Date(),
      min_order_value: 0,
      is_deleted: true,
      is_removed: true,
      newRow: false,
      selectRowId: "",
      selectRowClick: 0,
    };
  }
  componentDidMount() {
    this.props.getHoursDiscountData();
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
        discount: 0.0,
        type: "",
      });
    }
  };

  onRowClick = (item) => {
    const { selectRowId, selectRowClick } = this.state;

    this.setState({
      selectRowId: item._id,
      newRow: false,
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
    });
    this.setState({
      [name]: value,
      errors: {
        ...this.state.errors,
        [name]: false,
      },
    });
  };
  keypressHandler = (event) => {
    if (event.key === "Enter") {
      this.onAddDiscount();
    }
  };

  onAddDiscount = () => {
    const { discount } = this.state;
    let json = {
      discount: parseFloat(discount),
      type: "FLAT",
      discount_type: "",
      payment_type: "CARD",
      min_order_value: 0.0,
      is_deleted: false,
      is_removed: false,
      discount_date: new Date(),
    };
    this.props.onAddHoursDiscount(json);
  };
  keypressHandler1 = (event) => {
    if (event.key === "Enter") {
      this.onUpdateData();
    }
  };

  onUpdateData = () => {
    const { min_order_value, selectRowId, discount } = this.state;
    this.props.onUpdateData({
      discount: parseFloat(discount),
      min_order_value: parseFloat(min_order_value),
      is_deleted: false,
      is_removed: false,
      discount_id: selectRowId,
    });
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
      });
    }
  };

  render() {
    const { DiscountReducerData } = this.props;

    const {
      discount,
      type,
      is_deleted,
      newRow,
      selectRowId,
      min_order_value,
      selectRowClick,
      discount_date,
    } = this.state;
    return (
      <>
        <CCard>
          <CCardHeader className="d-flex flex-row justify-content-between">
            {" "}
            <h6>Special Discount</h6>
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
              <table className="table table-bordered table-sm">
                <thead className="table1header">
                  <tr>
                    <th className="td2">Discount</th>
                    <th className="td2">Type</th>
                    <th className="td2 px-3">Date Day Time</th>
                    <th className="td2">Minimum Order Value</th>
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
                          name="discount"
                          value={discount}
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

                      {/* <td></td> */}
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
                  DiscountReducerData.data &&
                  DiscountReducerData.data.length ? (
                    DiscountReducerData.data.map((itm, ind) => {
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
                                name="discount"
                                value={discount}
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
                            ) : itm.discount ? (
                              itm.discount
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
                                <option value={null}>Select One</option>

                                <option value="PERCENTAGE">PERCENTAGE</option>

                                <option value="FLAT">FLAT</option>
                              </select>
                            ) : itm.type ? (
                              itm.type
                            ) : null}
                          </td>
                          <td>
                            {selectRowId === itm._id && selectRowClick > 1 ? (
                              <DatePicker
                                selected={discount_date}
                                // timeInputLabel="Time:"
                                dateFormat="yyyy/MM/dd h:mm aa"
                                name="discount_date"
                                value={discount_date}
                                showTimeSelect
                                onChange={(date) => {
                                  this.setState({
                                    discount_date: date,
                                  });
                                }}
                                onKeyPress={({ key }) =>
                                  key === "Enter"
                                    ? this.props.onUpdateData({
                                        discount_date: discount_date,
                                        discount_id: selectRowId,
                                      })
                                    : null
                                }
                                onBlur={() =>
                                  this.props.onUpdateData({
                                    discount_date: discount_date,
                                    discount_id: selectRowId,
                                  })
                                }
                              />
                            ) : itm.discount_date ? (
                              moment(itm.discount_date).format("LLL")
                            ) : null}
                          </td>
                          <td>
                            {selectRowId === itm._id && selectRowClick > 1 ? (
                              <input
                                type="text"
                                name="min_order_value"
                                value={min_order_value}
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
                            ) : itm.min_order_value ? (
                              itm.min_order_value
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

                                <option value="ONE_TIME_SUBSCRIBER">
                                  ONE TIME SUBSCRIBER
                                </option>

                                <option value="PAYMENT_TYPE">
                                  PAYMENT TYPE
                                </option>

                                <option value="REDUNDANT_CART">
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

                                <option value="CARD">CARD</option>

                                <option value="WALLET">WALLET</option>

                                <option value="CASH">CASH</option>
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
                                    !itm.is_deleted
                                      ? "bg1"
                                      : "bg-secondary text-dark"
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
                                      : "bg-secondary text-dark"
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
                      <td colspan="8">
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
  DiscountReducerData: state.DayDiscountReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onAddHoursDiscount: (data) => {
      dispatch(addDayDiscountRequest(data));
    },
    getHoursDiscountData: (data) => {
      dispatch(getDayDiscountRequest(data));
    },
    onUpdateData: (data) => {
      dispatch(updateDayDiscountRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialDis);
