import React, { Component } from "react";
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CTooltip,
  CBadge,
  CCollapse,
} from "@coreui/react";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import {
  addFoodTypesRequest,
  getFoodTypesRequest,
  updateFoodTypesRequest,
  updateFoodTypesStatusRequest,
  addBulkFoodTypesRequest,
  modalOpenRequest,
  modalCloseRequest,
} from "../../actions";
import Loader from "../../containers/Loader/Loader";
import BulkFoodTypeModal from "./ModalData/BulkFood";

class FoodType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      selectRowId: "",
      selectRowClick: 0,
      food_type_id: "",
      show: false,
      newRow: false,
      avatar_url: "",
      imageUrl: "",
    };
  }
  async componentDidMount() {
    this.props.getFoodTypesDate();
  }
  componentDidUpdate({ ReducerData }) {
    if (
      ReducerData &&
      ReducerData.updateReq &&
      this.props.ReducerData &&
      this.props.ReducerData.updateReq &&
      this.props.ReducerData.updateReq !== ReducerData.updateReq
    ) {
      this.setState({
        food_type_id: "",
        newRow: false,
        name: "",
        avatar_url: "",
        imageUrlL: "",
        selectRowClick: 1,
      });
    }
  }
  onSelectFile = async (file) => {
    file.map(async (data, i) => {
      let picReader = new FileReader();
      let scope = this;
      await picReader.addEventListener("load", async (event) => {
        var image = new Image();
        image.src = event.target.result;
        image.onload = async function () {
          let dataURL = picReader.result;
          scope.setState({ avatar_url: file[0], imageUrl: dataURL });
        };
      });
      await picReader.readAsDataURL(data);
    });
  };

  onDeleteImg = () => {
    this.setState({ avatar_url: "", imageUrl: "" });
  };

  addFoodTypeData = () => {
    const { avatar_url, name } = this.state;
    if (name !== "") {
      let data = new FormData();
      data.append("food_type_name", name);
      data.append("food_type_icon", avatar_url);
      this.props.onAddFoodTypes(data);
    } else {
      this.setState({
        newRow: false,
        name: "",
        avatar_url: "",
        imageUrl: "",
      });
    }
  };

  onRowClick = (data) => {
    const { selectRowId, selectRowClick } = this.state;
    const { _id, name, is_deleted, avatar_url } = data;
    this.setState({
      name: name,
      avatar_url: avatar_url,
      imageUrl: avatar_url,
      selectRowId: _id,
      food_type_id: _id,
      selectRowClick: selectRowId === _id ? selectRowClick + 1 : 1,
    });
  };
  handelUpdated = async () => {
    const { name, food_type_id } = this.state;
    if (name !== "" && food_type_id !== "") {
      let data = new FormData();
      data.append("food_type_name", name);
      // data.append("food_type_icon", updateData.food_type_icon);
      data.append("food_type_id", food_type_id);
      this.props.onUpdateFoodTypes(data);
    } else {
      this.setState({
        name: "",
        food_type_id: "",
        selectRowClick: 0,
        selectRowId: "",
      });
    }
  };

  render() {
    const { newRow, show, name, imageUrl, selectRowId, selectRowClick } =
      this.state;
    return (
      <>
        <CCard 
   
        >
          <CCardHeader className="d-flex flex-row justify-content-between pr-0 bg1 text-white">
            <h6 className="pt-1">
              <i className="fas fa-list-alt mr-2"></i>List Of FoodTypes
            </h6>
            <div className="d-flex flex-row">
              <CTooltip content="remove FoodType">
                <CButton
                  className="btn-youtube mr-2"
                  size="sm"
                  onClick={() => alert("Pending with backend!!")}
                >
                  <i className="fas fa-minus text-white" />
                </CButton>
              </CTooltip>
              <CTooltip content="Add New FoodTypes">
                <CButton
                  className="bg1 text-white mr-2"
                  size="sm"
                  onClick={() =>
                    this.setState({
                      newRow: true,
                      show: true,
                      name: "",
                      avatar_url: "",
                      imageUrl: "",
                    })
                  }
                >
                  <i className="fas fa-plus text-white" />
                </CButton>
              </CTooltip>
              <CTooltip content="Add Bulk Data">
                <CButton
                  color="info"
                  size="sm"
                  className="mr-3"
                  onClick={() =>
                    this.props.modalOpenRequest({ bulkFoodTypeModal: true })
                  }
                >
                  <i className="fas fa-file-download" />
                </CButton>
              </CTooltip>
              {this.state.show === true ? (
                <i
                  className="fas fa-caret-down text-white mr-2 fa-2x"
                  onClick={() =>
                    this.setState({
                      show: false,
                    })
                  }
                />
              ) : (
                <i
                  className="fas fa-caret-right text-white mr-2 fa-2x"
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

          <CCollapse show={show}>
            <CCardBody>
              <div className="table-responsive table1div">
                <table className="table table-bordered table-sm">
                  <thead>
                    <tr>
                      <th scope="col" className="w-25">
                        S.no
                      </th>
                      <th scope="col" className="w-25">
                        Image
                      </th>
                      <th scope="col" className="w-25">
                        Name
                      </th>
                      <th scope="col" className="w-25">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {newRow ? (
                      <tr>
                        <td className="w-25">-</td>
                        <td className="text-center w-25">
                          {imageUrl ? (
                            <div className="home-img-span mr-3">
                              <i
                                className="far fa-times-circle text-danger"
                                onClick={() => this.onDeleteImg()}
                              />
                              <img
                                src={imageUrl ? imageUrl : null}
                                alt=""
                                className="zoom"
                              />
                            </div>
                          ) : (
                            <Dropzone
                              multiple={false}
                              onDrop={(e) => this.onSelectFile(e)}
                              onBlur={() => this.addFoodTypeData()}
                            >
                              {({ getRootProps, getInputProps }) => {
                                return (
                                  <div className="welcome-image-select-background w-100">
                                    <div
                                      className="text-center"
                                      {...getRootProps()}
                                    >
                                      <input
                                        {...getInputProps()}
                                        accept="image/png, image/jpeg"
                                      />
                                      {
                                        <>
                                          {/* <i className="far fa-file-image welcome-image-icon" /> */}
                                          <div className="text-center welcome-image-text">
                                            image
                                          </div>
                                        </>
                                      }
                                    </div>
                                  </div>
                                );
                              }}
                            </Dropzone>
                          )}
                        </td>
                        <td className="w-25">
                          {/* <form onSubmit={() => this.addFoodTypeData()}> */}
                          <input
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) =>
                              this.setState({
                                [e.target.name]: e.target.value,
                              })
                            }
                            onKeyPress={({ key }) =>
                              key === "Enter" ? this.addFoodTypeData() : null
                            }
                            onBlur={() => this.addFoodTypeData()}
                          />
                          {/* </form> */}
                        </td>
                        <td className="w-25">
                          <CTooltip content="Change Status">
                            <CBadge className={"bg1 text-white px-1"}>
                              Enable
                            </CBadge>
                          </CTooltip>
                          <CTooltip content="Change Status">
                            <CBadge
                              className={"bg-secondary text-dark px-1 ml-1"}
                            >
                              Disable
                            </CBadge>
                          </CTooltip>
                        </td>
                      </tr>
                    ) : null}
                    {this.props.ReducerData &&
                    !this.props.ReducerData.isLoading ? (
                      this.props.ReducerData.data &&
                      this.props.ReducerData.data.length ? (
                        this.props.ReducerData.data.map((item, index) => {
                          return (
                            <tr
                              key={index}
                              className={selectRowId === item._id ? "bg2" : ""}
                              onClick={() => this.onRowClick(item)}
                            >
                              <td className="w-25">{index + 1}</td>
                              <td className="w-25">
                                {item.avatar_url ? (
                                  <img src={item.avatar_url} className="zoom" />
                                ) : null}
                              </td>
                              <td className="w-25">
                                {selectRowId === item._id &&
                                selectRowClick > 1 ? (
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
                                        ? this.handelUpdated()
                                        : null
                                    }
                                    onBlur={() => this.handelUpdated()}
                                  />
                                ) : item.name ? (
                                  item.name
                                ) : null}
                              </td>

                              <td className="w-25">
                                <div className="d-flex flex-row justify-content-center mt-3">
                                  <CTooltip content="Change Status">
                                    <CBadge
                                      className={`${
                                        !item.is_deleted
                                          ? "bg1 text-white"
                                          : "bg-secondary text-dark"
                                      }  px-1`}
                                      onClick={() =>
                                        this.setState(
                                          {
                                            selectRowId: item._id,
                                            selectRowClick: 1,
                                          },
                                          () =>
                                            this.props.updateFoodStatus({
                                              is_deleted: false,
                                              food_type_id: item._id,
                                            })
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
                                          ? "btn-youtube text-white"
                                          : "bg-secondary text-dark"
                                      }  px-1 ml-1`}
                                      onClick={() =>
                                        this.setState(
                                          {
                                            selectRowId: item._id,
                                            selectRowClick: 1,
                                          },
                                          () =>
                                            this.props.updateFoodStatus({
                                              is_deleted: true,
                                              food_type_id: item._id,
                                            })
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
                          <td colSpan="5">
                            <h1>Not Found</h1>
                          </td>
                        </tr>
                      )
                    ) : (
                      <tr>
                        <td colSpan="5">
                          <Loader />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CCardBody>
          </CCollapse>
        </CCard>
        <BulkFoodTypeModal
          isShow={this.props.ModalReducer.bulkFoodTypeModal}
          onClose={() =>
            this.props.modalCloseRequest({ bulkFoodTypeModal: false })
          }
          onSaveBulkData={(data) => this.props.onSaveBulkData(data)}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  ReducerData: state.FoodTypeReducer,
  ModalReducer: state.ModalReducer,
});
const mapDispatchToProps = (dispatch) => {
  return {
    onAddFoodTypes: (data) => {
      dispatch(addFoodTypesRequest(data));
    },
    onSaveBulkData: (data) => {
      dispatch(addBulkFoodTypesRequest(data));
    },
    getFoodTypesDate: (data) => {
      dispatch(getFoodTypesRequest(data));
    },
    onUpdateFoodTypes: (data) => {
      dispatch(updateFoodTypesRequest(data));
    },
    updateFoodStatus: (data) => {
      dispatch(updateFoodTypesStatusRequest(data));
    },
    modalOpenRequest: (data) => {
      dispatch(modalOpenRequest(data));
    },
    modalCloseRequest: (data) => {
      dispatch(modalCloseRequest(data));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FoodType);
