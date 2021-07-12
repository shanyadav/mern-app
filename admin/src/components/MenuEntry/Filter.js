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
import { ConfirmBox } from "../../Helpers/SweetAlert";
import { connect } from "react-redux";
import {
  modalOpenRequest,
  modalCloseRequest,
  addFilterTypeRequest,
  getFilterTypeRequest,
  addFilterDataRequest,
  updateFilterDataRequest,
  addBulkFilterDataRequest,
  updateFilterRequest,
} from "../../actions";
import BulkFilter from "./ModalData/BulkFilter";
import AddModal from "./ModalData/AddFilterTypeModal";
import FoodType from "./FoodType";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectRowId: "",
      selectRowClick: 0,
      filter_type_id: "",
      show: true,
      newRow: false,
    };
  }
  componentDidMount() {
    this.props.getFilterTypeDate();
  }
  componentDidUpdate({ FilterTypeData }) {
    if (
      FilterTypeData &&
      FilterTypeData.updateReq &&
      this.props.FilterTypeData &&
      this.props.FilterTypeData.updateReq &&
      this.props.FilterTypeData.updateReq !== FilterTypeData.updateReq
    ) {
      this.setState({
        filter_type_id: "",
        newRow: false,
        name: "",
        selectRowClick: 1,
      });
    }
  }

  addFilterData = () => {
    const { name, filter_type_id } = this.state;
    if (name !== "" && filter_type_id !== "") {
      let json = {
        name,
        is_deleted: false,
        filter_type_id,
      };
      this.props.addData(json);
    } else {
      this.setState({
        filter_type_id: "",
        name: "",
        selectRowClick: 0,
        selectRowId: "",
      });
    }
  };

  onRowClick = (data, id) => {
    const { selectRowId, selectRowClick } = this.state;
    const { _id, name } = data;
    this.setState({
      name: name,
      selectRowId: _id,
      filter_type_id: id,
      selectRowClick: selectRowId === _id ? selectRowClick + 1 : 1,
    });
  };

  onUpdateData = () => {
    const { selectRowId, name, filter_type_id } = this.state;
    if (selectRowId && name !== "" && filter_type_id !== "")
      this.props.updateFilterData({ name, filter_type_id, FDId: selectRowId });
    else {
      this.setState({
        name: "",
        filter_type_id: "",
        selectRowId: "",
        selectRowClick: 0,
      });
    }
  };

  activateFilterType = async (id, name) => {
    const { value } = await ConfirmBox({
      text: `Do you want to Enable ${name} ?`,
    });
    if (value) {
      let json = {
        is_deleted: false,
        filter_type_id: id,
      };

      this.props.updateFilterRequest(json);
    }
  };

  inActivateFilterType = async (id, name) => {
    const { value } = await ConfirmBox({
      text: `Do you want to Disable ${name} ?`,
    });
    if (value) {
      let json = {
        is_deleted: true,
        filter_type_id: id,
      };
      this.props.updateFilterRequest(json);
    }
  };

  deleteFilterType = async (id, name) => {
    const { value } = await ConfirmBox({
      text: `Do you want to Remove ${name} ?`,
    });
    if (value) {
      let json = {
        is_removed: true,
        filter_type_id: id,
      };
      this.props.updateFilterRequest(json);
    }
  };

  onDeleteFilterData = async () => {
    const { filter_type_id, selectRowId } = this.state;
    if (filter_type_id && selectRowId) {
      const { value } = await ConfirmBox({
        text: "Do you want to Remove ?",
      });
      if (value) {
        let json = {
          is_removed: true,
          filter_type_id: filter_type_id,
          FDId: selectRowId,
        };
        this.props.updateFilterData(json);
      }
    }
  };
  render() {
    const { FilterTypeData } = this.props;
    const { name, selectRowId, selectRowClick, filter_type_id, newRow, show } =
      this.state;
    return (
      <>
        <CCard
        // className="d-flex flex-row justify-content-between w-100"
        // style={{ height: "50px" }}
        >
          <CCardHeader className="d-flex flex-row justify-content-between pr-0 bg1 text-white">
            <h6 className="pt-1">
              <i className="fas fa-list-alt mr-2"></i>List Of Filter
            </h6>
            <div className="d-flex flex-row">
              <CButton
                className="bg-white text-dark mr-3"
                size="sm"
                onClick={() =>
                  this.props.modalOpenRequest({ addAllergyModalOpen: true })
                }
              >
                <i className="fas fa-plus mr-1" /> Add New Filter
              </CButton>

              {this.state.show === true ? (
                <CTooltip content="expanded">
                  <i
                    className="fas fa-caret-down text-white mr-2  fa-2x"
                    onClick={() =>
                      this.setState({
                        show: false,
                      })
                    }
                  />
                </CTooltip>
              ) : (
                <i
                  className="fas fa-caret-right fa-2x mr-2 text-white"
                  aria-hidden="true"
                  onClick={() =>
                    this.setState({
                      show: true,
                    })
                  }
                />
              )}
            </div>
          </CCardHeader>
        </CCard>
        <CCollapse show={show}>
          <CRow className="mt-2">
            {FilterTypeData.data && FilterTypeData.data.length
              ? FilterTypeData.data.map((item, index) => {
                  return (
                    <CCol xs="12" sm="6" key={index}>
                      <CCard>
                        <CCardHeader className="d-flex flex-row justify-content-between">
                          <h6 className="pt-1">
                            <i className="fas fa-list-alt mr-2"></i>List Of{" "}
                            {item.name}
                          </h6>
                          <div>
                            <CTooltip content={`Delete ${item.name}`}>
                              <CButton
                                className="btn-youtube"
                                size="sm"
                                onClick={() => {
                                  this.deleteFilterType(item._id, item.name);
                                }}
                              >
                                <i className="fas fa-trash-alt text-white"></i>
                              </CButton>
                            </CTooltip>

                            <CTooltip
                              content={
                                !item.is_deleted
                                  ? `Disable ${item.name}`
                                  : `Enable ${item.name}`
                              }
                            >
                              <CButton
                                className={`${
                                  !item.is_deleted ? "bg1" : "btn-youtube"
                                } text-white ml-2`}
                                size="sm"
                                onClick={() => {
                                  item.is_deleted
                                    ? this.activateFilterType(
                                        item._id,
                                        item.name
                                      )
                                    : this.inActivateFilterType(
                                        item._id,
                                        item.name
                                      );
                                }}
                              >
                                <i className="fas fa-ban text-white" />
                              </CButton>
                            </CTooltip>
                            {/* <CTooltip content="remove">
                              <CButton
                                className="btn-youtube text-white ml-2"
                                size="sm"
                                onClick={() => this.onDeleteFilterData()}
                              >
                                <i className="fas fa-minus text-white" />
                              </CButton>
                            </CTooltip> */}
                            <CTooltip content="Add New">
                              <CButton
                                className="bg1 text-white ml-2"
                                size="sm"
                                onClick={() => {
                                  this.setState({
                                    filter_type_id: item._id,
                                    newRow: true,
                                    name: "",
                                    selectRowClick: 0,
                                    selectRowId: "",
                                  });
                                }}
                              >
                                <i className="fas fa-plus" />
                              </CButton>
                            </CTooltip>
                            <CTooltip content="Add Bulk">
                              <CButton
                                color="info"
                                size="sm"
                                className="ml-2"
                                onClick={() => {
                                  this.setState({
                                    filter_type_id: item._id,
                                  });
                                  this.props.modalOpenRequest({
                                    BulkFilterData: true,
                                  });
                                }}
                              >
                                <i className="fas fa-file-download"></i>
                              </CButton>
                            </CTooltip>
                          </div>
                        </CCardHeader>

                        <CCardBody>
                          <div className="table-responsive table1div">
                            <table className="table table-bordered table-sm">
                              <thead className="table1header">
                                <tr>
                                  <th scope="col" className="w-25">
                                    S.no
                                  </th>
                                  <th scope="col" className="w-50">
                                    Name
                                  </th>
                                  <th scope="col" className="w-25">
                                    Action
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {newRow && filter_type_id === item._id ? (
                                  <tr>
                                    <td className="w-25">-</td>
                                    <td className="w-50">
                                      <input
                                        type="text"
                                        name="name"
                                        value={name}
                                        onChange={(e) =>
                                          this.setState({
                                            [e.target.name]: e.target.value,
                                          })
                                        }
                                        onKeyPress={({ key }) =>
                                          key === "Enter"
                                            ? this.addFilterData()
                                            : null
                                        }
                                        onBlur={() => this.addFilterData()}
                                      />
                                    </td>
                                    <td className="w-25">
                                      <div className="d-flex flex-row justify-content-center">
                                        <CBadge
                                          className={
                                            "bg1 text-white px-1 pt-1 pb-1 "
                                          }
                                        >
                                          Enable
                                        </CBadge>

                                        <CBadge
                                          className={
                                            "bg-secondary text-dark px-1 pt-1 pb-1 ml-1"
                                          }
                                        >
                                          Disable
                                        </CBadge>
                                      </div>
                                    </td>
                                  </tr>
                                ) : null}
                                {item.filter_data && item.filter_data.length ? (
                                  item.filter_data.map((itm, ind) => {
                                    return (
                                      <tr
                                        key={ind}
                                        className={
                                          selectRowId === itm._id ? "bg2" : ""
                                        }
                                        onClick={() =>
                                          this.onRowClick(itm, item._id)
                                        }
                                      >
                                        <td className="w-25">{ind + 1}</td>
                                        <td className="w-50">
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
                                              onKeyPress={({ key }) =>
                                                key === "Enter"
                                                  ? this.onUpdateData()
                                                  : null
                                              }
                                              onBlur={() => this.onUpdateData()}
                                            />
                                          ) : itm.name ? (
                                            itm.name
                                          ) : null}
                                        </td>

                                        <td className="w-25">
                                          <div className="d-flex flex-row justify-content-center">
                                            <CTooltip content="Change Status">
                                              <CBadge
                                                className={`${
                                                  !itm.is_deleted
                                                    ? "bg1 text-white"
                                                    : "bg-secondary text-dark"
                                                }  px-1`}
                                                onClick={() => {
                                                  this.setState(
                                                    {
                                                      selectRowId: itm._id,
                                                      selectRowClick: 1,
                                                    },
                                                    () =>
                                                      this.props.updateFilterData(
                                                        {
                                                          is_deleted: false,
                                                          FDId: itm._id,
                                                          filter_type_id:
                                                            item._id,
                                                        }
                                                      )
                                                  );
                                                }}
                                              >
                                                Enable
                                              </CBadge>
                                            </CTooltip>
                                            <CTooltip content="Change Status">
                                              <CBadge
                                                className={`${
                                                  itm.is_deleted
                                                    ? "btn-youtube text-white"
                                                    : "bg-secondary text-dark"
                                                }  px-1 ml-1`}
                                                onClick={() => {
                                                  this.setState(
                                                    {
                                                      selectRowId: itm._id,
                                                      selectRowClick: 1,
                                                    },
                                                    () =>
                                                      this.props.updateFilterData(
                                                        {
                                                          is_deleted: true,
                                                          FDId: itm._id,
                                                          filter_type_id:
                                                            item._id,
                                                        }
                                                      )
                                                  );
                                                }}
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
                                    <td colSpan="5">
                                      <h6>
                                        <i className="fas fa-exclamation-triangle text-danger mr-2" />
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
                    </CCol>
                  );
                })
              : null}
            <CCol xs="12" sm="12">
              <FoodType {...this.props} />
            </CCol>
          </CRow>
        </CCollapse>
        <AddModal
          isShow={this.props.ModalReducer.addAllergyModalOpen}
          onClose={() =>
            this.props.modalCloseRequest({ addAllergyModalOpen: false })
          }
          addFilterData={(data) => this.props.addFilterType(data)}
        />
        <BulkFilter
          isShow={this.props.ModalReducer.BulkFilterData}
          onClose={() =>
            this.props.modalCloseRequest({ BulkFilterData: false })
          }
          onsaveBulk={(data) => this.props.onsaveBulk(data)}
          filter_type_id={filter_type_id}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ModalReducer: state.ModalReducer,
  FilterTypeData: state.FilterTypeReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addFilterType: (data) => {
      dispatch(addFilterTypeRequest(data));
    },
    addData: (data) => {
      dispatch(addFilterDataRequest(data));
    },
    onsaveBulk: (data) => {
      dispatch(addBulkFilterDataRequest(data));
    },
    updateFilterData: (data) => {
      dispatch(updateFilterDataRequest(data));
    },
    updateFilterRequest: (data) => {
      dispatch(updateFilterRequest(data));
    },
    getFilterTypeDate: (data) => {
      dispatch(getFilterTypeRequest(data));
    },
    modalOpenRequest: (data) => {
      dispatch(modalOpenRequest(data));
    },
    modalCloseRequest: (data) => {
      dispatch(modalCloseRequest(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Filter);
