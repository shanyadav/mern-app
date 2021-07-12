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
    addDayScheduleRequest,
    getDayScheduleRequest,
    updateDayScheduleRequest,
} from "../../actions";
class ONE_TIME_SUBSCRIBER extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: "",
            morning_time: "",
            evening_time: "",
            is_deleted: false,
            is_removed: false,
        };
    }
    componentDidMount() {
        this.props.getCardDiscountData({ discount_type: "ONE_TIME_SUBSCRIBER" });
    }

    componentDidUpdate = ({ DayScheduleReducerData }) => {
        if (
            DayScheduleReducerData &&
            DayScheduleReducerData.updateReq &&
            DayScheduleReducerData.updateReq !== this.props.DayScheduleReducerData.updateReq
        ) {
            this.setState({
                newRow: false,
                selectRowClick: 1,
                day: "",
                morning_time: "",
                evening_time: "",
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
            day: item.day,
            morning_time: item.morning_time,
            evening_time: item.evening_time,
            selectRowClick: selectRowId === item._id ? selectRowClick + 1 : 1,
        });
    };

    handleChange = (e) => {
        const { selectRowId } = this.state;
        const { target } = e;
        const { value, name } = target;
        this.props.onUpdateData({
            [name]: value,
            schedule_id: selectRowId,
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
        const { day } = this.state;
        this.props.onAddCardDiscount({
            day: day,
            morning_time: "9.45",
            evening_time: "5.30",
            is_deleted: false,
            is_removed: false,
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
        const { evening_time, morning_time, day, selectRowId } =
            this.state;
        this.props.onUpdateData({
            day: day,
            morning_time: morning_time,
            evening_time: evening_time,
            schedule_id: selectRowId,
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
                schedule_id: selectRowId,
            });
        }
    };
    render() {
        const { DayScheduleReducerData } = this.props;
        const {
            is_deleted,
            newRow,
            selectRowId,
            selectRowClick,
            day,
            morning_time,
            evening_time,
        } = this.state;
        return (
            <>
                <CCard>
                    <CCardHeader className="d-flex flex-row justify-content-between">
                        {" "}
                        <h6><i class="fas fa-list-alt mr-2" />Day Schedule</h6>
                        <div>
                            {/* <CTooltip content="remove">
                                <CButton
                                    className="btn-youtube text-white ml-2"
                                    size="sm"
                                    onClick={() => this.onRemove()}
                                >
                                    <i class="fas fa-minus text-white" />
                                </CButton>
                            </CTooltip> */}
                            {/* <CTooltip content="Add New">
                                <CButton
                                    className="bg1 text-white ml-2"
                                    size="sm"
                                    onClick={() => this.setState({ newRow: true })}
                                >
                                    <i class="fas fa-plus" />
                                </CButton>
                            </CTooltip> */}
                        </div>
                    </CCardHeader>

                    <CCardBody>
                        <div className="table-responsive table1div">
                            <table className="table table-bordered table-sm">
                                <thead className="table1header">
                                    <tr>
                                        <th className="td2">Days</th>
                                        <th className="td2">Day Opening Time</th>
                                        <th className="td2">Evening Opening Time</th>
                                        <th className="td2">Action</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {/* {newRow ? (
                                        <tr>
                                            <td>
                                                <input
                                                    type="text"
                                                    name="day"
                                                    value={day}
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
                                    ) : null} */}
                                    {DayScheduleReducerData &&
                                        DayScheduleReducerData.data &&
                                        DayScheduleReducerData.data.length ? (
                                        DayScheduleReducerData.data.map((itm, ind) => {
                                            return (
                                                <tr
                                                    key={ind}
                                                    onClick={() => this.onRowClick(itm)}
                                                    className={selectRowId === itm._id ? "table-active" : ""}
                                                >
                                                    <td>
                                                        {
                                                            itm.day ? itm.day : null
                                                        }
                                                    </td>
                                                    <td>
                                                        {selectRowId === itm._id && selectRowClick > 1 ? (
                                                            <input
                                                                className="w-100"
                                                                type="text"
                                                                name="morning_time"
                                                                value={morning_time}
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
                                                        ) : itm.morning_time ? (
                                                            itm.morning_time
                                                        ) : null}
                                                    </td>

                                                    <td>
                                                        {selectRowId === itm._id && selectRowClick > 1 ? (
                                                            <input
                                                                className="w-100"
                                                                type="text"
                                                                name="evening_time"
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
                                                        ) : itm.evening_time ? (
                                                            itm.evening_time
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
                                                                                    schedule_id: itm._id,
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
                                                                                    schedule_id: itm._id,
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
    DayScheduleReducerData: state.ScheduleReducer,
});

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCardDiscount: (data) => {
            dispatch(addDayScheduleRequest(data));
        },
        getCardDiscountData: (data) => {
            dispatch(getDayScheduleRequest(data));
        },
        onUpdateData: (data) => {
            dispatch(updateDayScheduleRequest(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ONE_TIME_SUBSCRIBER);
