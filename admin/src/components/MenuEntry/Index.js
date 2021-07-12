import React, { Component } from "react";
import {
  CCol,
  CRow,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CCard,
  CTabs,
  CCollapse,
  CTooltip,
  CButton, CCardHeader
} from "@coreui/react";
import Category from "./Category";
import SubCategory from "./SubCategory";
import Item from "./Item";
import Filter from "./Filter";
import Options from "./Options";
import OptionsAttribute from "./OptionsAttribute";
// import FoodType from "./FoodType";
import {
  getCategoriesRequest,
  getSubCategoriesRequest,
  getListItemsRequest,
  getOptionsAttributeRequest,
} from "../../actions";
import { connect } from "react-redux";
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      active: 0,
      pannelType: "E-COM",
      categoryID: "",
      subCategoryId: "",
      Option_id: "",
      show1: false,
    };
  }
  onTabChange = (idx) => {
    if (idx === 0) {
      this.setState({ pannelType: "E-COM" });
      this.props.getCategoryData({ panel_type: "E-COM" });
      this.props.getSubCategoryData({ panel_type: "E-COM" });
      this.props.getItemsData({ panel_type: "E-COM" });
    } else if (idx === 1) {
      this.setState({ pannelType: "MERCHANDISE" });
      this.props.getCategoryData({ panel_type: "MERCHANDISE" });
      this.props.getSubCategoryData({ panel_type: "MERCHANDISE" });
      this.props.getItemsData({ panel_type: "MERCHANDISE" });
    } else {
      this.setState({ pannelType: "CATERING" });
      this.props.getCategoryData({ panel_type: "CATERING" });
      this.props.getSubCategoryData({ panel_type: "CATERING" });
      this.props.getItemsData({ panel_type: "CATERING" });
    }
    this.setState({ active: idx, show: true });
  };
  setCId = (data) => {
    const { pannelType, subCategoryId } = this.state;
    this.setState({ categoryID: data });
    this.props.getSubCategoryData({
      category_id: data ? data : "",
      panel_type: pannelType,
    });
    let filter = {};
    if (pannelType !== "") filter.panel_type = pannelType;
    if (subCategoryId !== "") filter.sub_category_id = subCategoryId;
    if (data) filter.category_id = data;
    this.props.getItemsData(filter);
  };

  setOptionId = (data) => {
    const { Option_id } = this.state;
    this.props.getOptionsAttributeData({ option_id: data })
    this.setState({ Option_id: data });
  };

  setSubCId = (data) => {
    const { categoryID, pannelType } = this.state;
    this.setState({ subCategoryId: data });
    let filter = {};
    if (pannelType !== "") filter.panel_type = pannelType;
    if (categoryID !== "") filter.category_id = categoryID;
    if (data) filter.sub_category_id = data;
    this.props.getItemsData(filter);
    // this.props.getItemsData({
    //   category_id: categoryID,
    //   sub_category_id: data,
    //   panel_type: pannelType,
    // });
  };
  render() {
    const { show, show1, active, categoryID, pannelType, subCategoryId, Option_id } = this.state;
    return (
      <>
        <Filter {...this.props} />
        <CRow>
          <CCol xs="12">
            <CTabs
              activeTab={active}
              onActiveTabChange={(idx) => this.onTabChange(idx)}
            >
              <CCard className="d-flex flex-row justify-content-between w-100 bg1">
                <CNav
                  variant="tabs"
                  className="d-flex flex-row justify-content-between w-100"
                >
                  <div className="d-flex flex-row">
                    <CNavItem>
                      <CNavLink>
                        E-Com
                        {active === 0}
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>
                        Marchindise
                        {active === 1}
                      </CNavLink>
                    </CNavItem>
                    <CNavItem>
                      <CNavLink>
                        Catering
                        {active === 2}
                      </CNavLink>
                    </CNavItem>
                  </div>
                  <div className="mt-2 mr-2">
                    {this.state.show === true ? (
                      <CTooltip content="expanded">
                        <i
                          className="fas fa-caret-down text-white fa-2x"
                          onClick={() =>
                            this.setState({
                              show: false,
                              openFilterId: "",
                            })
                          }
                        />
                      </CTooltip>
                    ) : (
                      <i
                        className="fas fa-caret-right fa-2x text-white"
                        aria-hidden="true"
                        onClick={() =>
                          this.setState({
                            show: true,
                          })
                        }
                      />
                    )}
                  </div>
                </CNav>
              </CCard>
              <CCollapse show={show}>
                <CTabContent>
                  <CTabPane>
                    <CRow>
                      <CCol xs="12">
                        <Category
                          pannelType={pannelType}
                          setCId={this.setCId}
                        />
                      </CCol>

                      <CCol xs="12">
                        <SubCategory
                          pannelType={pannelType}
                          categoryID={categoryID}
                          setSubCId={this.setSubCId}
                        />
                      </CCol>

                      <CCol xs="12">
                        <Item
                          subCategoryId={subCategoryId}
                          pannelType={pannelType}
                          categoryID={categoryID}
                        />
                      </CCol>
                    </CRow>
                  </CTabPane>
                  <CTabPane>
                    <CRow>
                      <CCol xs="12">
                        <Category
                          pannelType={pannelType}
                          setCId={this.setCId}
                        />
                      </CCol>

                      <CCol xs="12">
                        <SubCategory
                          pannelType={pannelType}
                          categoryID={categoryID}
                          setSubCId={this.setSubCId}
                        />
                      </CCol>

                      <CCol xs="12">
                        <Item
                          subCategoryId={subCategoryId}
                          pannelType={pannelType}
                          categoryID={categoryID}
                        />
                      </CCol>
                    </CRow>
                  </CTabPane>
                  <CTabPane>
                    <CRow>
                      <CCol xs="12">
                        <Category
                          pannelType={pannelType}
                          setCId={this.setCId}
                        />
                      </CCol>

                      <CCol xs="12">
                        <SubCategory
                          pannelType={pannelType}
                          categoryID={categoryID}
                          setSubCId={this.setSubCId}
                        />
                      </CCol>

                      <CCol xs="12">
                        <Item
                          subCategoryId={subCategoryId}
                          pannelType={pannelType}
                          categoryID={categoryID}
                        />
                      </CCol>


                    </CRow>
                  </CTabPane>
                </CTabContent>
              </CCollapse>
            </CTabs>
          </CCol>
          <CCol xs="12">

            <CCard>
              <CCardHeader className="d-flex flex-row justify-content-between pr-0 bg1 text-white">
                {" "}
                <h6>

                  <i className="fas fa-list-alt mr-2 text-white"></i>Options List
                </h6>
                <div className="d-flex flex-row">

                  {this.state.show === true ? (
                    <i
                      className="fas fa-caret-down text-white mr-2 fa-2x"
                      onClick={() =>
                        this.setState({
                          show1: false,
                        })
                      }
                    />
                  ) : (
                    <i
                      className="fas fa-caret-right  mr-2 fa-2x text-white"
                      aria-hidden="true"
                      onClick={() =>
                        this.setState({
                          show1: true,
                        })
                      }
                    />
                  )}
                </div>
              </CCardHeader></CCard>

            <CCollapse show={show1}>
              <CRow>
                <CCol xs="6">
                  <Options setOptionId={this.setOptionId} />
                </CCol>

                <CCol xs="6">

                  <OptionsAttribute Option_id={Option_id} />
                </CCol>
              </CRow>

            </CCollapse>
          </CCol>
        </CRow>

      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategoryData: (data) => {
      dispatch(getCategoriesRequest(data));
    },
    getSubCategoryData: (data) => {
      dispatch(getSubCategoriesRequest(data));
    },
    getItemsData: (data) => {
      dispatch(getListItemsRequest(data));
    },
    getOptionsAttributeData: (data) => {
      dispatch(getOptionsAttributeRequest(data));
    },
  };
};
export default connect(null, mapDispatchToProps)(Index);
