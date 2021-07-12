import React, { Component } from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CTooltip,
    CBadge,
} from "@coreui/react";
import { connect } from "react-redux";
import {
    getPaymentGetwayRequest,
    updatePaymentGetwayRequest,
} from "../../actions";
class Paypal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_deleted: false,
        };
    }
    componentDidMount() {
        this.props.getCardData({ type: "PAYPAL" });
    }

    componentDidUpdate = ({ PaymentGetwayReducerData }) => {

        if (
            PaymentGetwayReducerData &&
            PaymentGetwayReducerData.updateReq &&
            PaymentGetwayReducerData.updateReq !== this.props.PaymentGetwayReducerData.updateReq
        ) {
            this.setState({
                selectRowClick: 1,
                is_deleted: false,
                type: "",
            });
        }
    };
    onRowClick = (item) => {
        const { selectRowId, selectRowClick } = this.state;
        this.setState({
            selectRowId: item._id,
            type: item.type,
            client_id: item.client_id,
            secret_key: item.secret_key,
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
           payment_geteway_id: selectRowId,
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
            this.onAddData();
        }
    };

    keypressHandler1 = (event) => {
        if (event.key === "Enter") {
            this.onUpdateData();
        }
    };

    onUpdateData = () => {
        const { client_id, secret_key, selectRowId } =
            this.state;
        this.props.onUpdateData({
            client_id: client_id,
            secret_key: secret_key,
            type: "PAYPAL",
           payment_geteway_id: selectRowId,
        });
        this.setState({ newRow: false, selectRowClick: 1 });
    };

    render() {
        const { PaymentGetwayReducerData } = this.props;
        const {
            selectRowId,
            selectRowClick,

        } = this.state;
        return (
            <>
                <CCard>
                    <CCardHeader className="d-flex flex-row justify-content-between">
        
                        
                        <h6><i class="fas fa-money-bill-alt mr-2 mt-4"></i>PAYPAL PAYMENT GETEWAY</h6>
                    </CCardHeader>

                    <CCardBody>


                        <div className="table-responsive mt-3">
                            <table className="table table-bordered table-sm">
                                <thead className="table1header">
                                    <tr>
                                        <th className="td2">Client Id</th>
                                        <th className="td2">secret key</th>
                                        <th className="td2">type</th>
                                        <th className="td2">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {PaymentGetwayReducerData &&
                                        PaymentGetwayReducerData.paypalData &&
                                        PaymentGetwayReducerData.paypalData.length ? (
                                        PaymentGetwayReducerData.paypalData.map((itm, ind) => {
                                            return (
                                                <tr
                                                    key={ind}
                                                    onClick={() => this.onRowClick(itm)}
                                                    className={selectRowId === itm._id ? "table-active" : ""}
                                                >

                                                    <td>
                                                        {selectRowId === itm._id && selectRowClick > 1 ? (
                                                            <input
                                                                className="w-100"
                                                                type="text"
                                                                name="client_id"
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
                                                        ) : itm.client_id ? (
                                                            itm.client_id
                                                        ) : null}
                                                    </td>

                                                    <td>
                                                        {selectRowId === itm._id && selectRowClick > 1 ? (
                                                            <input
                                                                className="w-100"
                                                                type="text"
                                                                name="secret_key"
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
                                                        ) : itm.secret_key ? (
                                                            itm.secret_key
                                                        ) : null}
                                                    </td>

                                                    <td>

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
                                                                                   payment_geteway_id: itm._id,
                                                                                    type: "PAYPAL"
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
                                                                                   payment_geteway_id: itm._id,
                                                                                    type: "PAYPAL"
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
    PaymentGetwayReducerData: state.paymentGetwayReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCardData: (data) => {
            dispatch(getPaymentGetwayRequest(data));
        },
        onUpdateData: (data) => {
            dispatch(updatePaymentGetwayRequest(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Paypal);
