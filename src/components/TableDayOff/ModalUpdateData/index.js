import Modal from 'react-bootstrap/Modal';
import Axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { URL_API } from '../../../api/dayoff.api.js';
import moment from 'moment/moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  InputArea,
  BtnAdd,
  BtnCancel,
  ModalBtn,
  LableInput,
  InPutContainer,
  FormDataInput,
  LableInputReason
} from '../ModalAddData/style.js'



const ModalUpdateData = (props) => {
  const { setShowModalUpdate, setCallApiTable, callApiTable, showModalUpdate } = props.handle
  const { idRequest } = props
  const [data, setData] = useState()

  function handleCancel() {
    setShowModalUpdate(false)
  }
  function changeDate(date) {
    const dateReplace = date.replace(/-/, '/').replace(/-/, '/')
    const dateSlice = dateReplace.slice(0, 10)
    return new Date(dateSlice)
  }
  const url = URL_API + '/dayoff/' + idRequest
  async function getDataUpdate() {
    await Axios.get(url)
      .then(res => {
        const newdata = { ...res?.data?.data }
        const dateFrom = changeDate(newdata?.DayOffFrom)
        const dateTo = changeDate(newdata?.DayOffTo)
        newdata.DayOffFrom = dateFrom
        newdata.DayOffTo = dateTo
        setData(newdata)
      })
      .catch(err => console.log(err))
  }
  function changeDateUpdate(date) {
    const dataDate = moment(date).format('YYYY-MM-DD')
    return dataDate
  }
  async function UpdateData() {
    const dataFrom = changeDateUpdate(data?.DayOffFrom)
    const dataTo = changeDateUpdate(data?.DayOffTo)
    const newdata = { ...data }
    newdata.DayOffFrom = dataFrom
    newdata.DayOffTo = dataTo
    await Axios.patch(url, newdata)
      .then((data) => {
        if (data?.data?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Update request success',
            showConfirmButton: false,
            timer: 1500
          })
          setCallApiTable(!callApiTable)
        } else {
          Swal.fire("Error!", "", "error");
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getDataUpdate()
  }, [showModalUpdate])
  function handleOnChangeForm(e) {
    const newdata = { ...data }
    newdata.DayOffFrom = e
    setData(newdata)
  }
  function handleOnChangeTo(e) {
    const newdata = { ...data }
    newdata.DayOffTo = e
    setData(newdata)
  }
  function handleOnChangeReason(e) {
    const newdata = { ...data }
    newdata.Reason = e?.target?.value
    setData(newdata)
  }
  const {
    handleSubmit,
    reset,
  } = useForm();
  async function submit(e) {
    e.preventDefault();
    Swal.fire({
      title: "Update this request?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        UpdateData()
        reset();
        setShowModalUpdate(false)
      } else {
        Swal.fire(" Cancel!", "", "error");
      }
    });
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Day Off
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        < FormDataInput id='form' method="POST" onSubmit={(e) => handleSubmit(
          submit(e)
        )}>
          <InPutContainer className="mb-6">
            <LableInput for='dateTo' className="form-label">Day Off From</LableInput>
            <DatePicker placeholderText="DD/MM/YYYY" selected={data?.DayOffFrom} id='DayOffFrom' name='dateFrom' onChange={(e) => handleOnChangeForm(e)} dateFormat='dd/MM/yyyy' />
          </InPutContainer>
          <InPutContainer className="mb-6">
            <LableInput for='dateTo' className="form-label">Day Off To</LableInput>
            <DatePicker placeholderText="DD/MM/YYYY" selected={data?.DayOffTo} id='DayOffTo' name='dateTo' onChange={(e) => handleOnChangeTo(e)} dateFormat='dd/MM/yyyy' />
          </InPutContainer>
          <InPutContainer className="mb-6">
            <LableInputReason for='reason' className="form-label">Reason</LableInputReason>
            <InputArea value={data?.Reason} required type='text' className="form-control" id='Reason' name='reason' onChange={(e) => handleOnChangeReason(e)} />
          </InPutContainer> 
          <ModalBtn className='modal__btn'>       
              <BtnAdd type="submit">Update</BtnAdd>
              <BtnCancel type="button" onClick={() => handleCancel()}>Cancel</BtnCancel>
          </ModalBtn>
        </ FormDataInput>
      </Modal.Body>
    </Modal>
  );
}

export default ModalUpdateData

