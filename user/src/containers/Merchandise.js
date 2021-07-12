import React, { Component } from "react";
import MerchandiseComponent from "../components/MerchandiseComponent";
import { connect } from "react-redux";
import {
  getListItemsRequest,
} from "../actions";
class Merchandise extends Component {
  componentDidMount() {
    this.props.getItemData({ panel_type:"MERCHANDISE" });
    // this.props.getItemData();
  }
  render() {


    const { ItemsData } = this.props;
    return (
      <>
        <MerchandiseComponent {...this.props} ItemsData={ItemsData} />
      </>
    );
  }
}


const mapStateToProps = (state) => ({
  ItemsData: state.ItemsReducer,
});
const mapDispatchToProps = (dispatch) => {
  return {
    getItemData: (data) => {
      dispatch(getListItemsRequest(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Merchandise);