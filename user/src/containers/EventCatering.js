import React, { Component } from "react";
import EventCateringComponent from "../components/eventCatering";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {
  getFoodTypesRequest,
  getFilterTypeRequest,
  getCategoriesRequest,
  getListItemsRequest,
} from "../actions";
class EventCatering extends Component {
  componentDidMount() {
    this.props.getItemData({ panel_type:"CATERING" });
  }
  render() {


    const { ItemsData } = this.props;
    return (
      <>
        <EventCateringComponent {...this.props} ItemsData={ItemsData} />
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
export default connect(mapStateToProps, mapDispatchToProps)(EventCatering);