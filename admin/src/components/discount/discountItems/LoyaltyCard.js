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
class  LoyaltyCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            is_deleted: false,
            selectRowFDid: "",
            selectRowClick: 0,
            filter_type_id: "",
            show: false,
            openFilterId: "",
            newRow: false,
            updateData: {
                name: "",
                filter_type_id: "",
                is_deleted: false,
            },
        };

    }

    render() {

        const { FilterTypeData } = this.props;

        const {
            name,
            description,
            is_deleted,
            selectRowFDid,
            updateData,
            selectRowClick,
            filter_type_id,
            openFilterId,
            newRow,
            show,
        } = this.state;
        return (
            <>
                <CCard>
                    <CCardHeader className="d-flex flex-row justify-content-between">
                        {" "}
                        <h6>
                            Loyalty Card
                        </h6>
                        <div>
                            <CTooltip content="remove">
                                <CButton
                                    className="btn-youtube text-white ml-2"
                                    size="sm"
                                >
                                    <i class="fas fa-minus text-white" />
                                </CButton>
                            </CTooltip>
                            <CTooltip content="Add New">
                                <CButton
                                    className="bg1 text-white ml-2"
                                    size="sm"

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
                                        <th scope="col">S.no</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                {/* <tbody>
                      {newRow? (
                        <tr>
                          <td></td>
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
                              onBlur={() =>
                                this.addFilterData()
                              }
                            />
                          </td>
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
                      {filter_data &&
                        filter_data.length ? (
                        filter_data.map((itm, ind) => {
                          return (
                            <tr
                              key={ind}
                              className="w-100"
                              onClick={() =>
                                this.onRowClick(itm)
                              }
                            >
                              <td className="w-25">
                                {ind + 1}
                              </td>
                              <td className="w-25">
                                {selectRowFDid === itm._id &&
                                  selectRowClick > 1 ? (
                                  <input
                                    className="w-100"
                                    type="text"
                                    name="name"
                                    value={updateData.name}
                                    onChange={(e) =>
                                      this.setState({
                                        updateData: {
                                          ...updateData,
                                          [e.target.name]:
                                            e.target.value,
                                        },
                                      })
                                    }
                                    onBlur={() =>
                                      this.onUpdateData()
                                    }
                                  />
                                ) : itm.name ? (
                                  itm.name
                                ) : null}
                              </td>

                              <td className="w-50">
                                <div className="d-flex flex-row justify-content-center">
                                  <CTooltip content="Change Status">
                                    <CBadge
                                      className={`${!itm.is_deleted
                                        ? "bg1"
                                        : "bg-secondary"
                                        } text-white px-1`}
                                      onClick={() =>
                                        this.props.updateFilterData(
                                          {
                                            is_deleted: false,
                                            FDId: selectRowFDid,
                                            filter_type_id:
                                              item._id,
                                          }
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
                                        this.props.updateFilterData(
                                          {
                                            is_deleted: true,
                                            FDId: selectRowFDid,
                                            filter_type_id:
                                              item._id,
                                          }
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
                  </table> */}
                            </table>
                        </div>
                    </CCardBody>
                </CCard>

            </>
        );
    }
}


export default LoyaltyCard;
