import React, { Component } from "react";
import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CTooltip,
    CBadge
} from "@coreui/react";
import "react-datepicker/dist/react-datepicker.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
    addOptionsAttributeRequest,
    getOptionsAttributeRequest,
    updateOptionsAttributeRequest,
} from "../../actions";

import { ConfirmBox } from "../../Helpers/SweetAlert";
import Loader from "src/containers/Loader/Loader";
class SpecialDis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            price: 0,
            is_multi_selected: true,
            is_deleted: false,
            is_removed: false,
            newRow: false,
            selectRowId: "",
            selectRowClick: 0,
        };

    }
    componentDidMount() {
        this.props.getOptionsAttributeData();
    }
    componentDidUpdate = ({ ReducerData }) => {
        if (
            ReducerData &&
            ReducerData.updateReq &&
            ReducerData.updateReq !==
            this.props.ReducerData.updateReq
        ) {
            this.setState({
                newRow: false,
                selectRowClick: 1,
                name: "",
                price: 0,
                selectRowId: "", show: true

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
            name: item.name,
            price: item.price,
            newRow: false,
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
            attribute_id: selectRowId,
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

    onAddDiscount = () => {
        const { name, price } = this.state;
        if (this.props.Option_id === "") {
            toast.error("Please select option");
            return false
        } else {
            let json = {
                "name": name,
                "option_id": this.props.Option_id,
                "price": parseFloat(0.0),
                "is_deleted": false,
                "is_removed": false,
            }
            this.props.onAddOptionsAttribute(json)
        }
    }
    keypressHandler1 = event => {
        if (event.key === "Enter") {
            this.onUpdateData();
        }
    };

    onUpdateData = () => {
        const { selectRowId, name,
            price } = this.state;
        this.props.onUpdateData({
            price: parseFloat(price),
            name: name,
            is_deleted: false,
            is_removed: false,
            attribute_id: selectRowId,
        })
    }
    onRemove = async () => {
        const { selectRowId } = this.state;
        if (selectRowId === "") {
            toast.error("Please Select Row.")
        }
        else {
            const { value } = await ConfirmBox({
                text: "Do you want to Remove ?",
            });
            if (value) {
                this.props.onUpdateData(
                    {
                        is_removed: true,
                        attribute_id: selectRowId,

                    }
                )

            }
        }
    };

    getName = (Id) => {
        const { ReducerDataOptions } = this.props;
        let data = "";
        if (
            ReducerDataOptions &&
            ReducerDataOptions.data &&
            ReducerDataOptions.data.length
        ) {
            data = ReducerDataOptions.data.filter((itm) => itm._id === Id)[0];
        }
        return data && data.name ? data.name : "";
    };

    render() {

        const { ReducerData, Option_id } = this.props;
        const {
            name,
            price,
            is_multi_selected,
            is_deleted,
            is_removed,
            newRow,
            selectRowId,
            selectRowClick, show
        } = this.state;
        return (
            <>
                <CCard>
                    <CCardHeader className="d-flex flex-row justify-content-between pr-0">

                        <h6>
                            <i className="fas fa-list-alt mr-2"></i>Options Attribute
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
                                </CButton></CTooltip>

                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <div className="table-responsive table1div">
                            <table className="table table-bordered table-sm">
                                <thead className="table1header">
                                    <tr>
                                        <th className="w-25">Name</th>
                                        <th className="w-25">Price</th>
                                        <th className="w-25">Options</th>
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
                                                            [e.target.name]:
                                                                e.target.value,
                                                        })
                                                    }

                                                    onKeyPress={event => this.keypressHandler(event)}
                                                    onBlur={() => this.onAddDiscount()}
                                                />
                                            </td>
                                            <td></td>
                                            <td>
                                                {this.getName(this.props.Option_id)}</td>
                                            <td>
                                                <div className="d-flex flex-row justify-content-center">
                                                    <CBadge
                                                        className={`${!is_deleted
                                                            ? "bg1"
                                                            : "bg-secondary"
                                                            } text-white px-1 pt-1 pb-1`}
                                                    >
                                                        Enable
                                                    </CBadge>

                                                    <CBadge
                                                        className={`${is_deleted
                                                            ? "btn-youtube"
                                                            : "bg-secondary"
                                                            } text-white px-1 pt-1 pb-1 ml-1`}
                                                    >
                                                        Disable
                                                    </CBadge>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : null}
                                    {ReducerData && !ReducerData.isLoading ?
                                        ReducerData.data &&
                                            ReducerData.data.length ? (
                                            ReducerData.data.map((itm, ind) => {
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
                                                        <td >
                                                            {selectRowId === itm._id &&
                                                                selectRowClick > 1 ? (

                                                                <input
                                                                    className="w-100"
                                                                    type="text"
                                                                    name="name"
                                                                    value={name}
                                                                    onChange={(e) =>
                                                                        this.setState({
                                                                            [e.target.name]:
                                                                                e.target.value,

                                                                        })
                                                                    }
                                                                    onKeyPress={event => this.keypressHandler1(event)}
                                                                    onBlur={() =>
                                                                        this.onUpdateData()}
                                                                />
                                                            ) : itm.name ? (
                                                                itm.name
                                                            ) : null}
                                                        </td>

                                                        <td >
                                                            {selectRowId === itm._id &&
                                                                selectRowClick > 1 ? (
                                                                <input
                                                                    type="text"
                                                                    name="price"
                                                                    value={price}
                                                                    onChange={(e) =>
                                                                        this.setState({
                                                                            [e.target.name]:
                                                                                e.target.value,
                                                                        })
                                                                    }
                                                                    onKeyPress={event => this.keypressHandler1(event)}
                                                                    onBlur={() =>
                                                                        this.onUpdateData()}
                                                                />
                                                            ) : itm.price ? (
                                                                itm.price
                                                            ) : null}
                                                        </td>


                                                        <td>

                                                            {this.getName(itm.option_id)}
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
                                                                                    attribute_id: itm._id,
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
                                                                                    attribute_id: itm._id,
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
                                                <td colspan="5">
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
    ReducerData: state.OptionsAttributeReducer,
    ReducerDataOptions: state.OptionsReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        onAddOptionsAttribute: (data) => {
            dispatch(addOptionsAttributeRequest(data));
        },
        getOptionsAttributeData: (data) => {
            dispatch(getOptionsAttributeRequest(data));
        },
        onUpdateData: (data) => {
            dispatch(updateOptionsAttributeRequest(data));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SpecialDis);