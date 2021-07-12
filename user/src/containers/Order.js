import React, { Component } from "react";
import OrderComponent from "../components/order";
import { connect } from "react-redux";
import {
  getFoodTypesRequest,
  getFilterTypeRequest,
  getCategoriesRequest,
  getListItemsRequest,
  getOptionRequest,
  getCartRequest,addCartRequest
} from "../actions";
class Order extends Component {
  componentDidMount() {
    this.props.getFoodTypesData({ is_deleted: false });
    this.props.getFillterTypesData({ is_deleted: false });
    this.props.getCategoriesData({ is_deleted: false });
    this.props.getItemData({ is_deleted: false });
    this.props.getOptions({ is_deleted: false });
    this.props.getCartItem();
  }
  getItem = (data) => {
    this.props.getItemData({ is_deleted: false, ...data });
  }
  saveCartData = (data)=>{
    this.props.addCart(data);
  }
  render() {
    const { FoodTypeData, FillterTypeData, CategorieReducerData, ItemsData, OptionData, CartData } = this.props;
    return (
      <OrderComponent
        {...this.props}
        FoodTypeData={FoodTypeData}
        FillterTypeData={FillterTypeData}
        CategorieReducerData={CategorieReducerData}
        ItemsData={ItemsData}
        getItem={this.getItem}
        OptionData={OptionData}
        CartData={CartData}
        saveCartData={this.saveCartData}
      />
    );
  }
}

// export default withRouter(Order);
const mapStateToProps = (state) => ({
  FoodTypeData: state.FoodTypeReducer,
  FillterTypeData: state.FillterReducer,
  CategorieReducerData: state.CategorieReducer,
  ItemsData: state.ItemsReducer,
  CartData: state.CartReducer,
  OptionData: state.OptionsReducer,
});
const mapDispatchToProps = (dispatch) => {
  return {
    addCart:(data)=>{
        dispatch(addCartRequest(data));
    },
    getFoodTypesData: (data) => {
      dispatch(getFoodTypesRequest(data));
    },
    getFillterTypesData: (data) => {
      dispatch(getFilterTypeRequest(data));
    },
    getCategoriesData: (data) => {
      dispatch(getCategoriesRequest(data));
    },
    getOptions: (data) => {
      dispatch(getOptionRequest(data));
    },
    getItemData: (data) => {
      dispatch(getListItemsRequest(data));
    },
    getCartItem: (data) => {
      dispatch(getCartRequest(data))
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Order);
