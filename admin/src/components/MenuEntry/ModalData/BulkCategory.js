import React, { useState, useEffect } from "react";
import {
  CButton,
  CCol,
  CRow,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormGroup,
  CLabel,
} from "@coreui/react";

const BulkCategory = (props) => {
  const [bulk, setBulk] = useState();
  useEffect(() => {}, [props.isShow]);

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setBulk(file);
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    try {
      let data = new FormData();
      data.append("file",bulk);
      props.onSaveBulkData(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <CModal show={props.isShow} onClose={() => props.onClose()}>
        <CModalHeader closeButton className="bg1 text-white">
          <CModalTitle>Add Bulk</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm className="form-horizontal">
            <CFormGroup row className="px-5">
              <CLabel col md="3" htmlFor="file-input">
                Please Select File
              </CLabel>
              <CCol xs="12" md="9">
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  name="file"
                  onChange={(e) => uploadFile(e)}
                  className="mt-1"
                />
              </CCol>
            </CFormGroup>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CRow>
            <CCol xs="6">
              <CButton
                className="text-white bg1"
                onClick={(e) => {
                  handelSubmit(e);
                }}
              >
                Submit
              </CButton>
            </CCol>
            <CCol xs="6">
              <CButton color="secondary" onClick={() => props.onClose()}>
                Cancel
              </CButton>
            </CCol>
          </CRow>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default BulkCategory;
