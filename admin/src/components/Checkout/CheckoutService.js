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
import { ConfirmBox } from "../../Helpers/SweetAlert";
import Loader from "../../containers/Loader/Loader";
import {
    addCheckoutServiceRequest,
    getCheckoutServiceRequest,
    updateCheckoutServiceRequest,
} from "../../actions";
class CheckOutSerive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "BAG",
            name: "",
            price: 0,
            is_deleted: false,
            is_removed: false,
        };
    }
    componentDidMount() {
        this.props.getCardData({type:"BAG"});
        this.props.getCardData({type:"TIP"});
    }

    componentDidUpdate = ({ CheckoutServiceReducerData }) => {
       
        if (
            CheckoutServiceReducerData &&
            CheckoutServiceReducerData.updateReq &&
            CheckoutServiceReducerData.updateReq !== this.props.CheckoutServiceReducerData.updateReq
        ) {
            this.setState({
                newRow: false,
                selectRowClick: 1,
                name: "",
                price: "",
                is_deleted: false,
                is_removed: false,
                type: "",
            });
        }
    };
    onRowClick = (item) => {
        const { selectRowId, selectRowClick } = this.state;
        this.setState({
            selectRowId: item._id,
            newRow: false,
            type: item.type,
            name: item.name,
            price: item.price,
            selectRowClick: selectRowId === item._id ? selectRowClick + 1 : 1,
        });
    };

    handleChange = (e) => {
        const { selectRowId } = this.state;
        const { target } = e;
        const { value, name } = target;
        this.props.onUpdateData({
            [name]: value,
            service_id: selectRowId,
        });
        this.setState({
            [name]: value,
            errors: {
                ...this.state.errors,
                [name]: false,
            },
        });
    };
    onAddData = () => {
        const { type, name, price } = this.state;
        this.props.onAddCard({
            type: type,
            name: name,
            price: parseFloat(price),
        });

        this.setState({ newRow: false });
    };


    keypressHandler = (event) => {
        if (event.key === "Enter") {
            this.onAddData();
        }
    };

    keypressHandler1 = (event) => {
        if (event.key === "Enter") {
            this.onUpdateData();
        }
    };

    onUpdateData = () => {
        const { type, name, price, selectRowId } =
            this.state;
        this.props.onUpdateData({
            type: type,
            name: name,
            price: parseFloat(price),
            service_id: selectRowId,
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
                service_id: selectRowId,
            });
        }
    };
    render() {
        const { CheckoutServiceReducerData } = this.props;
        const {
            is_deleted,
            newRow,
            selectRowId,
            selectRowClick,
            day,
            name,
            price,
            type,
        } = this.state;
        return (
            <>
                <CCard>
                    <CCardHeader className="d-flex flex-row justify-content-between">
                        {" "}
                        <h6><i class="fas fa-list-alt mr-2" />Checkout Service</h6>
                        {/* <div>
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
                        </div> */}
                    </CCardHeader>

                    <CCardBody>

                        {" "}
                        <h6><i class="fa fa-shopping-bag mr-2" />BAG</h6>

                        <div className="table-responsive mt-3">
                            <table className="table table-bordered table-sm">
                                <thead className="table1header">
                                    <tr>
                                        {/* <th className="td2">Name</th> */}
                                        <th className="td2">Price</th>
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
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) =>
                                                        this.setState({
                                                            [e.target.name]: e.target.value,
                                                        })
                                                    }
                                                    onKeyPress={(event) => this.keypressHandler(event)}
                                                    onBlur={() => this.onAddData()}
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
                                    {CheckoutServiceReducerData &&
                                        CheckoutServiceReducerData.BegData &&
                                        CheckoutServiceReducerData.BegData.length ? (
                                        CheckoutServiceReducerData.BegData.map((itm, ind) => {
                                            return (
                                                <tr
                                                    key={ind}
                                                    onClick={() => this.onRowClick(itm)}
                                                    className={selectRowId === itm._id ? "table-active" : ""}
                                                >
                                                    {/* <td>
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
                                                    </td> */}

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
                                                        {/* {selectRowId === itm._id && selectRowClick > 1 ? (
                                                            <select
                                                                onChange={(e) => {
                                                                    this.handleChange(e);
                                                                }}
                                                                name="type"
                                                                value={type}
                                                            >
                                                                <option value={null}>
                                                                    Select One
                                                                </option>

                                                                <option value="BAG">
                                                                    BAG                                                                </option>

                                                                <option value="TIP">
                                                                    TIP
                                                                </option>
                                                            </select>
                                                        ) : itm.type ? (
                                                            itm.type
                                                        ) : null} */}

                                                        {itm.type ? itm.type : null}
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
                                                                                    service_id: itm._id,
                                                                                    type: "BAG",
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
                                                                                    service_id: itm._id,
                                                                                    type: "BAG",
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

                        <h6><i class="fas fa-money-bill-alt mr-2 mt-4"></i>TIP</h6>
                        <div className="table-responsive mt-3">
                            <table className="table table-bordered table-sm">
                                <thead className="table1header">
                                    <tr>
                                        <th className="td2">Name</th>
                                        {/* <th className="td2">Price</th> */}
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
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) =>
                                                        this.setState({
                                                            [e.target.name]: e.target.value,
                                                        })
                                                    }
                                                    onKeyPress={(event) => this.keypressHandler(event)}
                                                    onBlur={() => this.onAddData()}
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
                                    {CheckoutServiceReducerData &&
                                        CheckoutServiceReducerData.TipData &&
                                        CheckoutServiceReducerData.TipData.length ? (
                                        CheckoutServiceReducerData.TipData.map((itm, ind) => {
                                            return (
                                                <tr
                                                    key={ind}
                                                    onClick={() => this.onRowClick(itm)}
                                                    className={selectRowId === itm._id ? "table-active" : ""}
                                                >
                                                    {/* <td>
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
                                                    </td> */}

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
                                                        {/* {selectRowId === itm._id && selectRowClick > 1 ? (
                                                            <select
                                                                onChange={(e) => {
                                                                    this.handleChange(e);
                                                                }}
                                                                name="type"
                                                                value={type}
                                                            >
                                                                <option value={null}>
                                                                    Select One
                                                                </option>

                                                                <option value="BAG">
                                                                    BAG                                                                </option>

                                                                <option value="TIP">
                                                                    TIP
                                                                </option>
                                                            </select>
                                                        ) : itm.type ? (
                                                            itm.type
                                                        ) : null} */}

                                                        {itm.type ? itm.type : null}
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
                                                                                    service_id: itm._id,
                                                                                    type: "TIP"
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
                                                                                    service_id: itm._id,
                                                                                    type: "TIP"
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
    CheckoutServiceReducerData: state.CheckoutServiceReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCard: (data) => {
            dispatch(addCheckoutServiceRequest(data));
        },
        getCardData: (data) => {
            dispatch(getCheckoutServiceRequest(data));
        },
        onUpdateData: (data) => {
            dispatch(updateCheckoutServiceRequest(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutSerive);
