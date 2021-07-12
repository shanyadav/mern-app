import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTooltip,
  CBadge,
  CSwitch,
} from "@coreui/react";
import { connect } from "react-redux";
import {
  updateSubCategoriesRequest,
  addSubCategoriesRequest,
  getSubCategoriesRequest,
  getFilterTypeRequest,
  getFoodTypesRequest,
  updateSubCategoryOrderRequest,
} from "../../actions";
import Loader from "../../containers/Loader/Loader";
import { Multiselect } from "multiselect-react-dropdown";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
class ListItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addSubCategory: false,
      is_deleted: false,
      selectRowId: "",
      selectRowClick: 0,
      updateCategoryData: {
        name: "",
        description: "",
        is_deleted: false,
        allergy_ids: [],
        food_type_ids: [],
        is_web: false,
        is_tw: false,
        is_discount_applied: false,
        order: 0,
      },
      allergyData: [],
      allergyOptions: [],
      allergy_ids: [],
      foodTypeData: [],
      foodTypeOptions: [],
      food_type_ids: [],
    };
  }
  componentDidMount() {
    this.props.getSubCategoriesData({ panel_type: "E-COM" });
    // this.props.getFilterTypeDate();
    // this.props.getFoodTypesDate();
  }
  componentDidUpdate({
    subCategorieReducerData,
    FilterTypeData,
    FoodTypeReducerData,
  }) {
    if (
      FilterTypeData &&
      FilterTypeData.updateReq &&
      FilterTypeData.updateReq !== this.props.FilterTypeData.updateReq
    ) {
      const { FilterTypeData } = this.props;
      let allergyOptions = [];
      let allergyData =
        FilterTypeData &&
        FilterTypeData.data &&
        FilterTypeData.data.filter((item) => item.name === "Allergy")[0];
      if (
        allergyData &&
        allergyData.filter_data &&
        allergyData.filter_data.length
      ) {
        allergyData.filter_data
          .filter((itm) => !itm.is_deleted)
          .map((item) => {
            allergyOptions.push({
              name: item.name,
              id: item._id,
            });
            return true;
          });
      }
      this.setState({
        allergyData: allergyData ? allergyData.filter_data : [],
        allergyOptions,
      });
    }

    if (
      FoodTypeReducerData &&
      FoodTypeReducerData.updateReq &&
      FoodTypeReducerData.updateReq !== this.props.FoodTypeReducerData.updateReq
    ) {
      const { FoodTypeReducerData } = this.props;
      let foodTypeOptions = [];
      let foodTypeData =
        FoodTypeReducerData &&
        FoodTypeReducerData.data &&
        FoodTypeReducerData.data.length
          ? FoodTypeReducerData.data
          : [];
      if (foodTypeData && foodTypeData.length) {
        foodTypeData
          .filter((itm) => !itm.is_deleted)
          .map((item) => {
            foodTypeOptions.push({
              name: item.name ? item.name : "",
              id: item._id,
            });
            return true;
          });
      }
      this.setState({ foodTypeData, foodTypeOptions });
    }
    if (
      subCategorieReducerData &&
      subCategorieReducerData.updateReq &&
      this.props.subCategorieReducerData &&
      this.props.subCategorieReducerData.updateReq &&
      this.props.subCategorieReducerData.updateReq !==
        subCategorieReducerData.updateReq
    ) {
      let data = this.props.subCategorieReducerData.data.filter(
        (item) => item._id === this.state.selectRowId
      )[0];
      let updateCategoryData = {
        name: data && data.name ? data.name : "",
        is_deleted: data && data.is_deleted ? data.is_deleted : false,
        description: data && data.description ? data.description : "",
      };

      this.setState({
        addSubCategory: false,
        name: "",
        is_deleted: false,
        description: "",
        selectRowId: data && data._id,
        selectRowClick: 1,
        updateCategoryData: updateCategoryData,
      });
    }
  }

  onDragEnd = (result) => {
    const { pannelType } = this.props;
    const { destination, source, reason, draggableId } = result;
    // Not a thing to do...
    if (!destination || reason === "CANCEL") {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    this.props.onUpdateSubCategoryOrder({
      start_index: source.index + 1,
      end_index: destination.index + 1,
      start_index_id: draggableId,
      panel_type: pannelType,
    });
  };

  onSelect = (selectedList, name) => {
    const { selectRowId } = this.state;
    if (name === "allergyData") {
      let allergyIds = [];
      for (let i = 0; i < selectedList.length; i++) {
        allergyIds.push(selectedList[i].id);
      }
      this.props.onUpdateSubCategory({
        sub_category_id: selectRowId,
        allergy_ids: allergyIds,
      });
      this.setState({
        allergy_ids: selectedList,
      });
    }
    if (name === "foodTypeData") {
      let foodTypeIds = [];
      for (let i = 0; i < selectedList.length; i++) {
        foodTypeIds.push(selectedList[i].id);
      }
      this.props.onUpdateSubCategory({
        sub_category_id: selectRowId,
        food_type_ids: foodTypeIds,
      });
      // this.setState({
      //   food_type_ids: selectedList,
      // });
    }
  };

  onRemove = (selectedList, name) => {
    const { selectRowId } = this.state;
    if (name === "allergyData") {
      let allergyIds = [];
      for (let i = 0; i < selectedList.length; i++) {
        allergyIds.push(selectedList[i].id);
      }
      this.props.onUpdateSubCategory({
        sub_category_id: selectRowId,
        allergy_ids: allergyIds,
      });
      this.setState({
        allergy_ids: selectedList,
      });
    }
    if (name === "foodTypeData") {
      let foodTypeIds = [];
      for (let i = 0; i < selectedList.length; i++) {
        foodTypeIds.push(selectedList[i].id);
      }
      this.props.onUpdateSubCategory({
        sub_category_id: selectRowId,
        food_type_ids: foodTypeIds,
      });
      this.setState({
        food_type_ids: selectedList,
      });
    }
  };

  onRowClick = (item) => {
    const {
      selectRowId,
      selectRowClick,
      updateCategoryData,
      allergyData,
      foodTypeData,
    } = this.state;
    let allergy_ids = [];
    let food_type_ids = [];
    if (
      item &&
      item.allergy_ids &&
      item.allergy_ids.length &&
      allergyData &&
      allergyData.length
    ) {
      let data = "";
      item.allergy_ids.map((itm) => {
        data = allergyData.filter((i) => i._id === itm)[0];
        allergy_ids.push({
          name: data && data.name ? data.name : "",
          id: data && data._id ? data._id : "",
        });
      });
    }
    if (
      item &&
      item.food_type_ids &&
      item.food_type_ids.length &&
      foodTypeData &&
      foodTypeData.length
    ) {
      let data = "";
      item.food_type_ids.map((itm) => {
        data = foodTypeData.filter((i) => i._id === itm)[0];
        food_type_ids.push({
          name: data && data.name ? data.name : "",
          id: data && data._id ? data._id : "",
        });
      });
    }
    if (selectRowId !== item._id) this.props.setSubCId(item._id);
    this.setState({
      selectRowId: item._id,
      addCategory: false,
      selectRowClick: selectRowId === item._id ? selectRowClick + 1 : 1,
      allergy_ids,
      food_type_ids,
      updateCategoryData:
        selectRowId === item._id
          ? updateCategoryData
          : {
              name: item.name ? item.name : "",
              description: item.description ? item.description : "",
              is_deleted: item.is_deleted ? item.is_deleted : false,
            },
    });
  };
  getAllergyDataName = (allergyIds) => {
    const { allergyData } = this.state;
    let allergyDataName = "";
    if (allergyData && allergyData.length) {
      let data = "";
      allergyIds.map((itm, ind) => {
        data = allergyData.filter((i) => i._id === itm)[0];
        allergyDataName +=
          ind === 0
            ? data && data.name
              ? data.name
              : ""
            : data && data.name
            ? ", " + data.name
            : "";
      });
    }
    return allergyDataName;
  };

  getFoodTypeName = (foodTypeIds) => {
    const { foodTypeData } = this.state;
    let foodTypeDataName = "";
    if (foodTypeData && foodTypeData.length) {
      let data = "";
      foodTypeIds.map((itm, ind) => {
        data = foodTypeData.filter((i) => i._id === itm)[0];
        foodTypeDataName +=
          ind === 0
            ? data && data.name
              ? data.name
              : ""
            : data && data.name
            ? ", " + data.name
            : "";
      });
    }
    return foodTypeDataName;
  };
  onAddSubCategory = () => {
    const { pannelType, categoryID } = this.props;
    const { name } = this.state;
    this.props.onAddSubCategory({
      name,
      description: "",
      is_deleted: false,
      is_web: false,
      is_discount_applied: false,
      is_tw: false,
      order: 0,
      allergy_ids: [],
      food_type_ids: [],
      panel_type: pannelType,
      category_id: categoryID,
    });
  };
  render() {
    const { subCategorieReducerData, pannelType } = this.props;
    const {
      addSubCategory,
      name,
      is_deleted,
      selectRowId,
      updateCategoryData,
      selectRowClick,
      allergy_ids,
      allergyOptions,
      foodTypeOptions,
      food_type_ids,
    } = this.state;
    return (
      <>
        <CCard>
          <CCardHeader className="d-flex  flex-row justify-content-between">
            <h6 className="pt-1">
              <i class="fas fa-list-alt mr-2"></i>List Of Sub Category
            </h6>
            <div>
              <CButton
                className="btn-youtube text-white mr-2"
                size="sm"
                onClick={() => alert("Pending with backend")}
              >
                <i class="fas fa-minus" />
              </CButton>
              <CButton
                className="bg1 text-white"
                size="sm"
                onClick={() =>
                  this.setState({
                    addSubCategory: true,
                    selectRowId: "",
                    name: "",
                    is_deleted: false,
                  })
                }
              >
                <i class="fas fa-plus" />
              </CButton>
              <CTooltip content="Add Bulk">
                <CButton
                  color="info"
                  size="sm"
                  className="ml-2"
                  onClick={() => alert("Pending with backend")}
                >
                  <i className="fas fa-file-download"></i>
                </CButton>
              </CTooltip>
            </div>
          </CCardHeader>
          <CCardBody>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <div className="table-responsive table1div">
                <table class="table table-bordered table-sm">
                  <thead className="table1header">
                    <tr>
                      <th className="td2">Order</th>
                      <th className="td2">Name</th>
                      <th className="td2">Description</th>
                      <th className="td2">Allergy Selection</th>
                      <th className="td2">Food Type Selection</th>
                      <th className="td2">For Web</th>
                      <th className="td2">Fot TW</th>
                      <th className="td2">Discount</th>
                      <th className="td2">Pannel</th>
                      <th className="td2">Action</th>
                    </tr>
                  </thead>
                  <Droppable droppableId="table">
                    {(provided, snapshot) => (
                      <tbody
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <>
                          {addSubCategory ? (
                            <tr>
                              <td></td>
                              <td>
                                
                                <input
                                  className="w-100"
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
                                      ? this.onAddSubCategory()
                                      : null
                                  }
                                  onBlur={() => this.onAddSubCategory()}
                                />
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td>
                                <CSwitch
                               variant={"3d"}
                               shape={"pill"}
                               size={"md"}
                                  name="is_web"
                                />
                              </td>
                              <td>
                                <CSwitch
                                 variant={"3d"}
                                 shape={"pill"}
                                 size={"md"}
                                  name="is_tw"
                                />
                              </td>
                              <td>
                                <CSwitch
                                 variant={"3d"}
                                 shape={"pill"}
                                 size={"md"}
                                  name="is_discount_applied"
                                />
                              </td>
                              <td>{pannelType ? pannelType : "E-Com"}</td>
                              <td>
                                <div className="d-flex flex-row text-center">
                                  <CBadge
                                    className={`${
                                      !is_deleted
                                        ? "bg1"
                                        : "bg-secondary text-dark"
                                    } text-white px-1 pt-1 pb-1`}
                                  >
                                    Enable
                                  </CBadge>

                                  <CBadge
                                    className={`${
                                      is_deleted
                                        ? "btn-youtube"
                                        : "bg-secondary text-dark"
                                    } text-white px-1 pt-1 pb-1 ml-1`}
                                  >
                                    Disable
                                  </CBadge>
                                </div>
                              </td>
                            </tr>
                          ) : null}
                          {subCategorieReducerData &&
                          !subCategorieReducerData.isLoading ? (
                            subCategorieReducerData.data &&
                            subCategorieReducerData.data.length ? (
                              subCategorieReducerData.data.map(
                                (item, index) => {
                                  return (
                                    <Draggable
                                      draggableId={item._id}
                                      index={index}
                                      key={item._id}
                                    >
                                      {(provided, snapshot) => (
                                        <tr
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          key={index}
                                          className={
                                            selectRowId === item._id
                                              ? "bg2"
                                              : ""
                                          }
                                          onClick={() => this.onRowClick(item)}
                                        >
                                          <td>{item.order ? item.order : 0}</td>
                                          <td>
                                            {selectRowId === item._id &&
                                            selectRowClick > 1 ? (
                                              <input
                                                className="w-100"
                                                type="text"
                                                name="name"
                                                value={updateCategoryData.name}
                                                onChange={(e) =>
                                                  this.setState({
                                                    updateCategoryData: {
                                                      ...updateCategoryData,
                                                      [e.target.name]:
                                                        e.target.value,
                                                    },
                                                  })
                                                }
                                                onKeyPress={({ key }) =>
                                                  key === "Enter"
                                                    ? this.props.onUpdateSubCategory(
                                                        {
                                                          name: updateCategoryData.name,
                                                          sub_category_id:
                                                            selectRowId,
                                                        }
                                                      )
                                                    : null
                                                }
                                                onBlur={() =>
                                                  this.props.onUpdateSubCategory(
                                                    {
                                                      name: updateCategoryData.name,
                                                      sub_category_id:
                                                        selectRowId,
                                                    }
                                                  )
                                                }
                                              />
                                            ) : item.name ? (
                                              item.name
                                            ) : null}
                                          </td>

                                          <td>
                                            {selectRowId === item._id &&
                                            selectRowClick > 1 ? (
                                              <input
                                                className="w-100"
                                                type="text"
                                                name="description"
                                                value={
                                                  updateCategoryData.description
                                                }
                                                onChange={(e) =>
                                                  this.setState({
                                                    updateCategoryData: {
                                                      ...updateCategoryData,
                                                      [e.target.name]:
                                                        e.target.value,
                                                    },
                                                  })
                                                }
                                                onKeyPress={({ key }) =>
                                                  key === "Enter"
                                                    ? this.props.onUpdateSubCategory(
                                                        {
                                                          description:
                                                            updateCategoryData.description,
                                                          sub_category_id:
                                                            selectRowId,
                                                        }
                                                      )
                                                    : null
                                                }
                                                onBlur={() =>
                                                  this.props.onUpdateSubCategory(
                                                    {
                                                      description:
                                                        updateCategoryData.description,
                                                      sub_category_id:
                                                        selectRowId,
                                                    }
                                                  )
                                                }
                                              />
                                            ) : (
                                              item.description
                                            )}
                                          </td>
                                          <td>
                                            {selectRowId === item._id &&
                                            selectRowClick > 1 ? (
                                              <Multiselect
                                                options={allergyOptions}
                                                selectedValues={allergy_ids}
                                                onSelect={(selectedList) =>
                                                  this.onSelect(
                                                    selectedList,
                                                    "allergyData"
                                                  )
                                                }
                                                onRemove={(selectedList) =>
                                                  this.onRemove(
                                                    selectedList,
                                                    "allergyData"
                                                  )
                                                }
                                                displayValue="name"
                                                showCheckbox={true}
                                                id="css_custom"
                                                style={{
                                                  chips: { display: "none" },
                                                  searchBox: {
                                                    border: "none",
                                                    borderBottom:
                                                      "1px solid #19c133",
                                                    borderRadius: "0px",
                                                    background: "#fff",
                                                  },
                                                }}
                                              />
                                            ) : (
                                              <>
                                                {item.allergy_ids &&
                                                item.allergy_ids.length
                                                  ? this.getAllergyDataName(
                                                      item.allergy_ids
                                                    )
                                                  : null}
                                              </>
                                            )}
                                          </td>
                                          <td>
                                            {selectRowId === item._id &&
                                            selectRowClick > 1 ? (
                                              <Multiselect
                                                options={foodTypeOptions}
                                                selectedValues={food_type_ids}
                                                onSelect={(selectedList) =>
                                                  this.onSelect(
                                                    selectedList,
                                                    "foodTypeData"
                                                  )
                                                }
                                                onRemove={(selectedList) =>
                                                  this.onRemove(
                                                    selectedList,
                                                    "foodTypeData"
                                                  )
                                                }
                                                displayValue="name"
                                                showCheckbox={true}
                                                id="css_custom"
                                                style={{
                                                  chips: { display: "none" },
                                                  searchBox: {
                                                    border: "none",
                                                    borderBottom:
                                                      "1px solid #19c133",
                                                    borderRadius: "0px",
                                                    background: "#fff",
                                                  },
                                                }}
                                              />
                                            ) : (
                                              <>
                                                {item.food_type_ids &&
                                                item.food_type_ids.length
                                                  ? this.getFoodTypeName(
                                                      item.food_type_ids
                                                    )
                                                  : null}
                                              </>
                                            )}
                                          </td>
                                          <td>
                                            <CSwitch
                                           variant={"3d"}
                                           shape={"pill"}
                                           size={"md"}
                                              name="is_web"
                                              checked={item.is_web}
                                              onChange={(e) =>
                                                this.props.onUpdateSubCategory({
                                                  sub_category_id: selectRowId,
                                                  is_web: e.target.checked,
                                                })
                                              }
                                            />
                                          </td>
                                          <td>
                                            <CSwitch
                                             variant={"3d"}
                                             shape={"pill"}
                                             size={"md"}
                                              name="is_tw"
                                              checked={item.is_tw}
                                              onChange={(e) =>
                                                this.setState(
                                                  {
                                                    selectRowId: item._id,
                                                    selectRowClick: 1,
                                                  },
                                                  () =>
                                                    this.props.onUpdateSubCategory(
                                                      {
                                                        sub_category_id:
                                                          item._id,
                                                        is_tw: !item.is_tw,
                                                      }
                                                    )
                                                )
                                              }
                                            />
                                          </td>
                                          <td>
                                            <CSwitch
                                              variant={"3d"}
                                              shape={"pill"}
                                              size={"md"}
                                              name="is_discount_applied"
                                              checked={item.is_discount_applied}
                                              onChange={(e) =>
                                                this.setState(
                                                  {
                                                    selectRowId: item._id,
                                                    selectRowClick: 1,
                                                  },
                                                  () =>
                                                    this.props.onUpdateSubCategory(
                                                      {
                                                        sub_category_id:
                                                          item._id,
                                                        is_discount_applied:
                                                          !item.is_discount_applied,
                                                      }
                                                    )
                                                )
                                              }
                                            />
                                          </td>
                                          <td>{item.panel_type}</td>
                                          <td>
                                            <div className="d-flex flex-row">
                                              <CTooltip content="Change Status">
                                                <CBadge
                                                  className={`${
                                                    !item.is_deleted
                                                      ? "bg1"
                                                      : "bg-secondary text-dark"
                                                  } text-white px-1`}
                                                  onClick={() =>
                                                    this.setState(
                                                      {
                                                        selectRowId: item._id,
                                                        selectRowClick: 1,
                                                      },
                                                      () =>
                                                        this.props.onUpdateSubCategory(
                                                          {
                                                            is_deleted: false,
                                                            sub_category_id:
                                                              item._id,
                                                          }
                                                        )
                                                    )
                                                  }
                                                >
                                                  Enable
                                                </CBadge>
                                              </CTooltip>
                                              <CTooltip content="Change Status">
                                                <CBadge
                                                  className={`${
                                                    item.is_deleted
                                                      ? "btn-youtube"
                                                      : "bg-secondary text-dark"
                                                  } text-white px-1 ml-1`}
                                                  onClick={() =>
                                                    this.setState(
                                                      {
                                                        selectRowId: item._id,
                                                        selectRowClick: 1,
                                                      },
                                                      () =>
                                                        this.props.onUpdateSubCategory(
                                                          {
                                                            is_deleted: true,
                                                            sub_category_id:
                                                              item._id,
                                                          }
                                                        )
                                                    )
                                                  }
                                                >
                                                  Disable
                                                </CBadge>
                                              </CTooltip>
                                            </div>
                                          </td>
                                        </tr>
                                      )}
                                    </Draggable>
                                  );
                                }
                              )
                            ) : (
                              <tr>
                                <td colspan="11">
                                  <h6>
                                    <i class="fas fa-exclamation-triangle text-danger mr-2" />
                                    Not Found
                                  </h6>
                                </td>
                              </tr>
                            )
                          ) : (
                            <tr>
                              <td colspan="11">
                                <Loader />
                              </td>
                            </tr>
                          )}
                        </>
                      </tbody>
                    )}
                  </Droppable>
                </table>
              </div>
            </DragDropContext>
          </CCardBody>
        </CCard>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  CategorieReducerData: state.CategorieReducer,
  subCategorieReducerData: state.SubCategorieReducer,
  FilterTypeData: state.FilterTypeReducer,
  FoodTypeReducerData: state.FoodTypeReducer,
  ReducerData: state.ItemsReducer,
  ModalReducer: state.ModalReducer,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onAddSubCategory: (data) => {
      dispatch(addSubCategoriesRequest(data));
    },
    getFoodTypesDate: (data) => {
      dispatch(getFoodTypesRequest(data));
    },
    getFilterTypeDate: (data) => {
      dispatch(getFilterTypeRequest(data));
    },
    getSubCategoriesData: (data) => {
      dispatch(getSubCategoriesRequest(data));
    },
    onUpdateSubCategory: (data) => {
      dispatch(updateSubCategoriesRequest(data));
    },
    onUpdateSubCategoryOrder: (data) => {
      dispatch(updateSubCategoryOrderRequest(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListItems);
