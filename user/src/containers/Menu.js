import React, { Component } from "react";
import MenuComponent from "../components/menu";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getFoodTypesRequest,
  getFilterTypeRequest,
  getCategoriesRequest,
  getListItemsRequest,
} from "../actions";
class Menu extends Component {
  componentDidMount() {
    this.props.getFoodTypesData({ is_deleted: false });
    this.props.getFillterTypesData({ is_deleted: false });
    this.props.getCategoriesData({ is_deleted: false });
    this.props.getItemData({ is_deleted: false });
  }
  getItem = (data) => {
    this.props.getItemData({ is_deleted: false, ...data });
  }
  render() {

    const { FoodTypeData, FillterTypeData, CategorieReducerData, ItemsData } = this.props;
    return (
      <>
        <MenuComponent
          {...this.props}
          FoodTypeData={FoodTypeData}
          FillterTypeData={FillterTypeData}
          CategorieReducerData={CategorieReducerData}
          ItemsData={ItemsData}
          getItem={this.getItem}

        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  FoodTypeData: state.FoodTypeReducer,
  FillterTypeData: state.FillterReducer,
  CategorieReducerData: state.CategorieReducer,
  ItemsData: state.ItemsReducer,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getFoodTypesData: (data) => {
      dispatch(getFoodTypesRequest(data));
    },
    getFillterTypesData: (data) => {
      dispatch(getFilterTypeRequest(data));
    },
    
    getCategoriesData: (data) => {
      dispatch(getCategoriesRequest(data));
    },
    getItemData: (data) => {
      dispatch(getListItemsRequest(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Menu);
