import React, { lazy } from "react";
import {
  CCardGroup,
  CCardFooter,
  CCol,
  CLink,
  CRow,
  CWidgetProgress,
  CWidgetIcon,
  CWidgetProgressIcon,
  CWidgetSimple,
  CProgress,
} from '@coreui/react'
import { Link } from 'react-router-dom';
const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));
const Dashboard = () => {
  return (
    <>
      {/* <WidgetsDropdown /> */}

      {/* <WidgetsBrand withCharts /> */}

      <CRow>
    
        <CCol xs="12" sm="6" lg="3">
          <Link to="/menu/list-item">
            <div className="card bg-info">
              <div class="top"><span></span>
                <div class="picture"></div>
              </div>
              <div class="bottom">
                <div class="name"></div>
              <Link to="/menu/list-item"><button class="customize">Menu Entry</button></Link>
              </div>
            </div></Link>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <Link to="/discount/list-discount">
            <div className="card bg-danger" color="info">
              <div class="top"><span></span>
                <div class="picture1"></div>
              </div>
              <div class="bottom">
                <div class="name"></div>
                <Link to="/discount/list-discount"><button class="customize">Discount Entry</button></Link>
              </div>
            </div></Link>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <Link to="/discount/list-discount">
            <div className="card bg-primary" color="info">
              <div class="top"><span></span>
                <div class="picturecheckout"></div>
              </div>
              <div class="bottom">
                <div class="name"></div>
                <Link to="/checkout"><button class="customize">Checkout</button></Link>
              </div>
            </div></Link>
        </CCol>
        <CCol xs="12" sm="6" lg="3">
          <Link to="/discount/list-discount">
            <div className="card  bg-warning " color="info">
              <div class="top"><span></span>
                <div class="picture1"></div>
              </div>
              <div class="bottom">
                <div class="name"></div>
                <Link to="/discount/list-discount"><button class="customize">Discount Entry</button></Link>
              </div>
            </div></Link>
        </CCol>

      </CRow>
    </>
  );
};

export default Dashboard;
