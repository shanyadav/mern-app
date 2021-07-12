import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTooltip,
  CBadge,
  CSwitch,
  CCollapse,
} from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import Loader from "src/containers/Loader/Loader";
import {
  addOptionsRequest,
  getOptionsRequest,
  updateOptionsRequest,
} from "../../actions";

import { ConfirmBox } from "../../Helpers/SweetAlert";
class SpecialDis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      max_qty: "",
      is_multi_selected: true,
      is_deleted: false,
      is_removed: false,
      newRow: false,
      selectRowId: "",
      selectRowClick: 0,
      show: false,
    };
  }
  componentDidMount() {
    this.props.getOptionsData();
  }
  componentDidUpdate = ({ ReducerData }) => {
    if (
      ReducerData &&
      ReducerData.updateReq &&
      ReducerData.updateReq !== this.props.ReducerData.updateReq
    ) {
      this.setState({
        newRow: false,
        selectRowClick: 1,
        name: "",
        max_qty: "",
        selectRowId: "",
      });
    }
  };

  onRowClick = (item) => {
    const { selectRowId, selectRowClick } = this.state;
    this.setState({
      selectRowId: item._id,
      name: item.name,
      max_qty: item.max_qty,
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
      option_id: selectRowId,
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

  onRowClick = (item) => {
    const { selectRowId, selectRowClick } = this.state;
    if (selectRowClick === 1) {
      this.props.setOptionId(item._id);
    }
    this.setState({
      selectRowId: item._id,
      name: item.name,
      max_qty: item.max_qty,
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
      option_id: selectRowId,
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
      this.onAddAtrribute();
    }
  };

  onAddAtrribute = () => {
    const { name, max_qty } = this.state;
    let json = {
      name: name,
      max_qty: parseFloat(max_qty),
      is_multi_selected: false,
      is_deleted: false,
      is_removed: false,
    };
    this.props.onAddOptions(json);
  };

  onUpdateData = () => {
    const { selectRowId, name, max_qty } = this.state;
    this.props.onUpdateData({
      max_qty: parseFloat(max_qty),
      name: name,
      is_deleted: false,
      is_removed: false,
      option_id: selectRowId,
    });
  };
  onRemove = async () => {
    const { selectRowId } = this.state;
    if (selectRowId === "") {
      toast.error("Please Select Row.");
    } else {
      const { value } = await ConfirmBox({
        text: "Do you want to Remove ?",
      });
      if (value) {
        this.props.onUpdateData({
          is_removed: true,
          option_id: selectRowId,
        });
      }
    }
  };

  render() {
    const { ReducerData } = this.props;

    const {
      name,
      max_qty,
      is_multi_selected,
      is_deleted,
      is_removed,
      newRow,
      selectRowId,
      selectRowClick,
      show,
    } = this.state;
    return (
      <>
        <CCard>
          <CCardHeader className="d-flex flex-row justify-content-between pr-0">
            <h6 className="pt-1">
              <i className="fas fa-list-alt mr-2"></i>List of Options
            </h6>
            <div className="d-flex flex-row">
              <CTooltip content="remove">
                <CButton
                  className="btn-youtube text-white  mr-2"
                  size="sm"
                  onClick={() => this.onRemove()}
                >
                  <i class="fas fa-minus text-white" />
                </CButton>
              </CTooltip>
              <CTooltip content="Add New">
                <CButton
                  className="bg1 text-white  mr-3"
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
                      <th className="w-25">Name</th>
                      <th className="w-25">Max Qty </th>
                      <th className="w-25">Multi Selected	</th>
                      <th className="w-50">Action</th>
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
                        <td>
                          <CSwitch
                            variant={"3d"}
                            shape={"pill"}
                            size={"md"}
                            checked={true}
                          />
                        </td>
                        <td>
                          <div className="d-flex flex-row justify-content-center">
                            <CBadge
                              className={`${!is_deleted ? "bg1" : "bg-secondary"
                                } text-white px-1 pt-1 pb-1`}
                            >
                              Enable
                            </CBadge>

                            <CBadge
                              className={`${is_deleted ? "btn-youtube" : "bg-secondary"
                                } text-white px-1 pt-1 pb-1 ml-1`}
                            >
                              Disable
                            </CBadge>
                          </div>
                        </td>
                      </tr>
                    ) : null}
                    {ReducerData &&
                      ReducerData.data &&
                      ReducerData.data.length ? (
                      ReducerData.data.map((itm, ind) => {
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

                            <td>
                              {selectRowId === itm._id && selectRowClick > 1 ? (
                                <input
                                  type="text"
                                  name="max_qty"
                                  value={max_qty}
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
                              ) : itm.max_qty ? (
                                itm.max_qty
                              ) : null}
                            </td>

                            <td>
                              <CSwitch
                                variant={"3d"}
                                shape={"pill"}
                                size={"md"}
                                name="is_multi_selected"
                                checked={itm.is_multi_selected}
                                onChange={(e) =>
                                  this.setState(
                                    {
                                      selectRowId: itm._id,
                                      selectRowClick: 1,
                                    },
                                    () =>
                                      this.props.onUpdateData({
                                        option_id: itm._id,
                                        is_multi_selected:
                                          !itm.is_multi_selected,
                                      })
                                  )
                                }
                              />
                            </td>
                            <td>
                              <div className="d-flex flex-row justify-content-center">
                                <CTooltip content="Change Status">
                                  <CBadge
                                    className={`${!itm.is_deleted
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
                                            option_id: itm._id,
                                          })
                                      )
                                    }
                                  >
                                    Enable
                                  </CBadge>
                                </CTooltip>
                                <CTooltip content="Change Status">
                                  <CBadge
                                    className={`${itm.is_deleted
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
                                            option_id: itm._id,
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
                        <td colspan="5">
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
  ReducerData: state.OptionsReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onAddOptions: (data) => {
      dispatch(addOptionsRequest(data));
    },
    getOptionsData: (data) => {
      dispatch(getOptionsRequest(data));
    },
    onUpdateData: (data) => {
      dispatch(updateOptionsRequest(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialDis);
