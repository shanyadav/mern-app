import React, { Component } from "react";
import {
  CCol,
  CRow,
  CCardHeader,
  CCard,
  CCollapse,
  CTooltip,
} from "@coreui/react";
import Stripe  from "./Stripe";
import Paypal from "./Paypal";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {

      show:false,
    };
  }

  render() {
    const {show1,show } = this.state;
    return (
      <>

        
        <CCard>
          <CCardHeader className="d-flex flex-row justify-content-between pr-0 bg1 text-white">
            <h6 className="pt-1">
            <i class="fas fa-cogs mr-2"></i>Payment Setting
            </h6>
            <div>
              {this.state.show === true ? (
                <CTooltip content="expanded">
                  <i
                    className="fas fa-caret-down text-white mr-2 fa-2x"
                    onClick={() =>
                      this.setState({
                        show: false,
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
                      show: true,
                    })
                  }
                />
              )}
            </div>
          </CCardHeader>
        </CCard>

        <CCollapse show={show}>
          <CRow>
            <CCol xs="12" sm="6">
              <Stripe/>
            </CCol>
            
            <CCol xs="12" sm="6">
              <Paypal/>
            </CCol>
          </CRow>
        </CCollapse>

      </>
    );
  }
}

export default Index;
