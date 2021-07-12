import React, { Component } from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CTooltip,
    CBadge,
} from "@coreui/react";

import { ConfirmBox } from "../../../Helpers/SweetAlert";
import { connect } from "react-redux";
import {
    addDeliveryChargesRequest,
    getDeliveryChargesRequest,
    updateDeliveryChargesRequest,
} from "../../../actions";
class DeliveryCharges extends Component {
    constructor(props) {
        super(props);
        this.state = {
            min_order_value: 0,
            is_deleted: true,
            is_removed: true,
            newRow: false,
            selectRowId: "",
            selectRowClick: 0,
            tax: 0,
            max_order_value: 0,
        };

    }
    componentDidMount() {
        this.props.getDiscountData();
    }

    componentDidUpdate = ({ DiscountReducerData }) => {
        if (
            DiscountReducerData &&
            DiscountReducerData.updateReq &&
            DiscountReducerData.updateReq !==
            this.props.DiscountReducerData.updateReq
        ) {
            this.setState({
                newRow: false,
                min_order_value: 0,
                selectRowClick: 1,
                tax: 0,
            })
        }
    }

    onRowClick = (item) => {
        const {
            selectRowId,
            selectRowClick,
        } = this.state;

        this.setState({
            selectRowId: item._id,
            newRow: false,
            min_order_value: item.min_order_value,
            tax: item.tax,
            selectRowClick: selectRowId === item._id ? selectRowClick + 1 : 1,
        });
    };
    handleChange = (e) => {
        const {
            selectRowId,
        } = this.state;
        const { target } = e;
        const { value, name } = target;
        this.props.onUpdateData({
            [name]: value,
            condition_id: selectRowId,
        })
        this.setState({
            [name]: value,
            errors: {
                ...this.state.errors,
                [name]: false,
            },
        });
    };

    keypressHandler = event => {
        if (event.key === "Enter") {
            this.onAddDiscount();
        }
    };


    keypressHandler1 = event => {
        if (event.key === "Enter") {
            this.onUpdateData();
        }
    };
    onAddDiscount = () => {
        const { min_order_value } = this.state;
        this.props.onAddDiscount({
            tax: parseFloat(0.0),
            min_order_value: parseFloat(min_order_value),
            max_order_value: parseFloat(0.0),
            type: "FLAT",
            is_deleted: false,
            is_removed: false,
        })
    }
    onUpdateData = () => {
        const { min_order_value, selectRowId, tax, type, max_order_value } = this.state;
        this.props.onUpdateData({
            min_order_value: parseInt(min_order_value),
            max_order_value: parseInt(max_order_value),
            type: type,
            tax: parseInt(tax),
            condition_id: selectRowId
        })
    }
    handleChange = (e) => {
        const {
            selectRowId,
        } = this.state;
        const { target } = e;
        const { value, name } = target;

        this.setState({
            [name]: value,
            errors: {
                ...this.state.errors,
                [name]: false,
            },
        }, () => this.onUpdateData());
    };
    onRemove = async () => {
        const { selectRowId } = this.state;
        const { value } = await ConfirmBox({
            text: "Do you want to Remove ?",
        });
        if (value) {
            this.props.onUpdateData(
                {
                    is_removed: true,
                    condition_id: selectRowId,

                }
            )

        }
    };


    render() {
        const { DiscountReducerData } = this.props;
        const {
            min_order_value,
            max_order_value,
            is_deleted,
            newRow,
            selectRowId, selectRowClick, tax, type
        } = this.state;
        return (
            <>
                <CCard>
                    <CCardHeader className="d-flex flex-row justify-content-between">
                        {" "}
                        <h6>
                            Delivery Charges
                        </h6>
                        <div>
                            <CTooltip content="remove">
                                <CButton
                                    className="btn-youtube text-white ml-2"
                                    size="sm"
                                    onClick={() => this.onRemove()}>
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
                                </CButton></CTooltip>
                        </div>
                    </CCardHeader>

                    <CCardBody>
                        <div className="table-responsive table1div">
                            <table className="table table-bordered table-sm">
                                <thead className="table1header">
                                    <tr>
                                        <th>Sr.</th>
                                        <th scope="col">Minimum Order Value</th>
                                        <th scope="col">Maximum Order Value</th>
                                        <th scope="col">Delivery Charges</th>
                                        <th>Type</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newRow ? (
                                        <tr>
                                            <td></td>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="min_order_value"
                                                    value={min_order_value}
                                                    onChange={(e) =>
                                                        this.setState({
                                                            [e.target.name]:
                                                                e.target.value,
                                                        })
                                                    }
                                                    onKeyPress={event => this.keypressHandler(event)}
                                                    onBlur={() =>
                                                        this.onAddDiscount()}

                                                />
                                            </td>
                                            <td></td>

                                            <td></td>
                                            <td></td>
                                            <td>
                                                <div className="d-flex flex-row justify-content-center">
                                                    <CBadge
                                                        className={`${!is_deleted
                                                            ? "bg1"
                                                            : "bg-secondary text-dark"
                                                            } text-white px-1 pt-1 pb-1`}
                                                    >
                                                        Enable
                                                    </CBadge>

                                                    <CBadge
                                                        className={`${is_deleted
                                                            ? "btn-youtube"
                                                            : "bg-secondary text-dark"
                                                            } text-white px-1 pt-1 pb-1 ml-1`}
                                                    >
                                                        Disable
                                                    </CBadge>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : null}
                                    {DiscountReducerData && DiscountReducerData.data &&
                                        DiscountReducerData.data.length ? (
                                        DiscountReducerData.data.map((itm, ind) => {
                                            return (
                                                <tr
                                                    key={ind}
                                                    onClick={() =>
                                                        this.onRowClick(itm)
                                                    }
                                                    className={
                                                        selectRowId === itm._id ? "bg2" : ""
                                                    }
                                                >
                                                    <td>
                                                        {ind + 1}
                                                    </td>


                                                    <td>
                                                        {selectRowId === itm._id &&
                                                            selectRowClick > 1 ? (
                                                            <input
                                                                className="w-100"
                                                                type="text"
                                                                name="min_order_value"
                                                                value={min_order_value}
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        [e.target.name]:
                                                                            e.target.value,
                                                                    })
                                                                }
                                                                onKeyPress={event => this.keypressHandler1(event)}
                                                                onBlur={() => this.onUpdateData()}
                                                            />
                                                        ) : itm.min_order_value ? (
                                                            itm.min_order_value
                                                        ) : null}
                                                    </td>




                                                    <td>
                                                        {selectRowId === itm._id &&
                                                            selectRowClick > 1 ? (
                                                            <input
                                                                className="w-100"
                                                                type="text"
                                                                name="max_order_value"
                                                                value={max_order_value}
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        [e.target.name]:
                                                                            e.target.value,
                                                                    })
                                                                }
                                                                onKeyPress={event => this.keypressHandler1(event)}
                                                                onBlur={() => this.onUpdateData()}
                                                            />
                                                        ) : itm.max_order_value ? (
                                                            itm.max_order_value
                                                        ) : null}
                                                    </td>
                                                    <td>
                                                        {selectRowId === itm._id &&
                                                            selectRowClick > 1 ? (
                                                            <input
                                                                className="w-100"
                                                                type="text"
                                                                name="tax"
                                                                value={tax}
                                                                onChange={(e) =>
                                                                    this.setState({
                                                                        [e.target.name]:
                                                                            e.target.value,
                                                                    })
                                                                }
                                                                onKeyPress={event => this.keypressHandler1(event)}
                                                                onBlur={() => this.onUpdateData()}
                                                            />
                                                        ) : itm.tax ? (
                                                            itm.tax
                                                        ) : null}
                                                    </td>
                                                    <td>

                                                        {selectRowId === itm._id &&
                                                            selectRowClick > 1 ? (
                                                            <select onChange={(e) => {
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

                                                    <td>
                                                        <div className="d-flex flex-row justify-content-center">
                                                            <CTooltip content="Change Status">
                                                                <CBadge
                                                                    className={`${!itm.is_deleted
                                                                        ? "bg1"
                                                                        : "bg-secondary text-dark"
                                                                        } text-white px-1`}
                                                                    onClick={() => this.setState({ selectRowId: itm._id, selectRowClick: 1 }, () =>
                                                                        this.props.onUpdateData(
                                                                            {
                                                                                is_deleted: false,
                                                                                condition_id: itm._id
                                                                            }
                                                                        )
                                                                    )}
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
                                                                    onClick={() => this.setState({ selectRowId: itm._id, selectRowClick: 1 }, () =>
                                                                        this.props.onUpdateData(
                                                                            {
                                                                                is_deleted: true,
                                                                                condition_id: itm._id,
                                                                            }
                                                                        )
                                                                    )}
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
                                            <td colspan="6">
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
    DiscountReducerData: state.DeliveryChargesReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        onAddDiscount: (data) => {
            dispatch(addDeliveryChargesRequest(data));
        },
        getDiscountData: (data) => {
            dispatch(getDeliveryChargesRequest(data));
        },
        onUpdateData: (data) => {
            dispatch(updateDeliveryChargesRequest(data));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryCharges);