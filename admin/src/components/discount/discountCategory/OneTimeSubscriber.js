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
} from "@coreui/react";
import { connect } from "react-redux";
import { ConfirmBox } from "../../../Helpers/SweetAlert";
import Loader from "../../../containers/Loader/Loader";
import {
    addDiscountCategoryRequest,
    getDiscountCategoryRequest,
    updateDiscountCategoryRequest,
} from "../../../actions";
class ONE_TIME_SUBSCRIBER extends Component {
    constructor(props) {
        super(props);
        this.state = {
            discount: "",
            type: "FLAT",
            min_order_value: 0.0,
            discount_type: "ONE_TIME_SUBSCRIBER",
            payment_type: "",
            expiry_time: 0,
            is_deleted: false,
            is_removed: false,
        };
    }
    componentDidMount() {
        this.props.getCardDiscountData({ discount_type: "ONE_TIME_SUBSCRIBER" });
    }

    componentDidUpdate = ({ DiscountCategoryReducerData }) => {
        if (
            DiscountCategoryReducerData &&
            DiscountCategoryReducerData.updateReq &&
            DiscountCategoryReducerData.updateReq !== this.props.DiscountCategoryReducerData.updateReq
        ) {
            this.setState({
                newRow: false,
                selectRowClick: 1,
                discount: "",
                type: "FLAT",
                min_order_value: 0.0,
                discount_type: "ONE_TIME_SUBSCRIBER",
                payment_type: "",
                expiry_time: 0,
                is_deleted: false,
                is_removed: false,
            });
        }
    };
    onRowClick = (item) => {
        const { selectRowId, selectRowClick } = this.state;
        this.setState({
            selectRowId: item._id,
            newRow: false,
            min_order_value: item.min_order_value,
            payment_type: item.payment_type,
            discount: item.discount,
            expiry_time: item.expiry_time,
            type: item.type,
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
            discount_type: "ONE_TIME_SUBSCRIBER",
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
        const { discount } = this.state;
        this.props.onAddCardDiscount({
            discount: parseFloat(discount),
            type: "FLAT",
            min_order_value: parseFloat(0.0),
            discount_type: "ONE_TIME_SUBSCRIBER",
            payment_type: "ALL",
            expiry_time: 0,
            is_deleted: false,
            is_removed: false,
        });

        this.setState({ newRow: false });
    };


    keypressHandler = (event) => {
        if (event.key === "Enter") {
            this.onAddDiscount();
        }
    };

    keypressHandler1 = (event) => {
        if (event.key === "Enter") {
            this.onUpdateData();
        }
    };

    onUpdateData = () => {
        const { discount, min_order_value, type, selectRowId, expiry_time, payment_type } =
            this.state;
        this.props.onUpdateData({
            discount: parseFloat(discount),
            min_order_value: parseFloat(min_order_value),
            discount_id: selectRowId,
            discount_type: "ONE_TIME_SUBSCRIBER",
            expiry_time: expiry_time,
            payment_type: payment_type,
            type: type,
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
                discount_type: "ONE_TIME_SUBSCRIBER",
            });
        }
    };
    render() {
        const { DiscountCategoryReducerData } = this.props;
        const {
            discount,
            type,
            is_deleted,
            newRow,
            selectRowId,
            selectRowClick,
            expiry_date,
        } = this.state;
        return (
            <>
                <CCard>
                    <CCardHeader className="d-flex flex-row justify-content-between">
                        {" "}
                        <h6><i class="fas fa-list-alt mr-2" /> ONE TIME SUBSCRIBER</h6>
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
                                        <th className="td2">Minimum Order</th>
                                        <th className="td2">Type</th>
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
                                    {DiscountCategoryReducerData && !DiscountCategoryReducerData.isLoading ?
                                        DiscountCategoryReducerData.subscriber &&
                                            DiscountCategoryReducerData.subscriber.length ? (
                                            DiscountCategoryReducerData.subscriber.map((itm, ind) => {
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
                                                        {/* <td>
                                                        {selectRowId === itm._id && selectRowClick > 1 ? (
                                                            <input
                                                                className="w-100"
                                                                type="text"
                                                                name="expiry_time"
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
                                                        ) : itm.expiry_time ? (
                                                            itm.expiry_time
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

                                                                <option value="CARD">
                                                                    CARD
                                                                </option>

                                                                <option value="WALLET">
                                                                    WALLET
                                                                </option>

                                                                <option value="CASH">
                                                                    CASH
                                                                </option>
                                                            </select>
                                                        ) : itm.payment_type ? (
                                                            itm.payment_type
                                                        ) : null}
                                                    </td> */}
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

                                                        <td>
                                                            <div className="d-flex flex-row justify-content-center">
                                                                <CTooltip content="Change Status">
                                                                    <CBadge
                                                                        className={`${!itm.is_deleted ? "bg1" : "bg-secondary"
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
                                                                                        discount_type: "ONE_TIME_SUBSCRIBER",
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
                                                                                        discount_type: "ONE_TIME_SUBSCRIBER",
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
                                        ) : (
                                            <tr>
                                                <td colspan="5">
                                                    <Loader />
                                                </td>
                                            </tr>)}
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
    DiscountCategoryReducerData: state.DiscountCategoryReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCardDiscount: (data) => {
            dispatch(addDiscountCategoryRequest(data));
        },
        getCardDiscountData: (data) => {
            dispatch(getDiscountCategoryRequest(data));
        },
        onUpdateData: (data) => {
            dispatch(updateDiscountCategoryRequest(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ONE_TIME_SUBSCRIBER);
