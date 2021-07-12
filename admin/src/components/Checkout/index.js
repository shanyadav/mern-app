import React, { Component } from "react";
import {
  CCol,
  CRow,
  CCardHeader,
  CCard,
  CCollapse,
  CTooltip,
} from "@coreui/react";
import DaySchedule from "./DaySchedule";
import CheckoutService from "./CheckoutService";
import Paymet from "../Payment/Payment";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show1: true,
      show: false,
    };
  }

  render() {
    const { show1, show } = this.state;
    return (
      <>
        <CCard>
          <CCardHeader className="d-flex flex-row justify-content-between pr-0 bg1 text-white">
            <h6 className="pt-1">
              <i className="fas fa-list-alt mr-2"></i>Checkout
            </h6>
            <div>
              {this.state.show1 === true ? (
                <CTooltip content="expanded">
                  <i
                    className="fas fa-caret-down text-white mr-2 fa-2x"
                    onClick={() =>
                      this.setState({
                        show1: false,
                      })
                    }
                  />
                </CTooltip>
              ) : (
                <i
                  className="fas fa-caret-right mr-2 fa-2x text-white"
                  aria-hidden="true"
                  onClick={() =>
                    this.setState({
                      show1: true,
                    })
                  }
                />
              )}
            </div>
          </CCardHeader>
        </CCard>

        <CCollapse show={show1}>
          <CRow>
            <CCol xs="12" sm="6">
              <DaySchedule  {...this.props} />
            </CCol>
            <CCol xs="12" sm="6">
              <CheckoutService  {...this.props} />
            </CCol>
          </CRow>
        </CCollapse>


        <Paymet />


      </>
    );
  }
}

export default Index;
