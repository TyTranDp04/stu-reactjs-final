import Modal from 'react-bootstrap/Modal';
import Axios from 'axios'
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import moment from 'moment';
import { URL_API } from '../../../api/dayoff.api.js';
import {
  InputArea,
  BtnAdd,
  BtnCancel,
  ModalBtn,
  LableInput,
  InPutContainer,
  FormDataInput, LableInputReason
} from './style.js'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ModalAddData = (props)=> {
  const { setShowModalAdd, setCallApiTable, callApiTable } = props.handle
  const { user } = props
  function handleCancel() {
    setShowModalAdd(false)
  }
  const url = URL_API + '/newdayoff'
  const [dayOffFrom, setDayOffFrom] = useState()
  const [dayOffTo, setDayOffTo] = useState()
  const [reason, setReason] = useState()
  const [data, setData] = useState({
    UserId: user?.UserId,
    Name: user?.Name,
    RoleId: user?.RoleId,
    DayOffFrom: dayOffFrom,
    DayOffTo: dayOffTo,
    Reason: reason
  })
  function changeDate(date) {
    const dataDate = moment(date).format('YYYY-MM-DD')
    return dataDate
  }
  function addRequest() {
    const dataFrom = changeDate(data?.DayOffFrom)
    const dataTo = changeDate(data?.DayOffTo)
    const newdata = { ...data }
    newdata.DayOffFrom = dataFrom
    newdata.DayOffTo = dataTo
    Axios.post(url, newdata)
      .then((data) => {
        if (data?.data?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Add request success',
            showConfirmButton: false,
            timer: 1500
          })
          setCallApiTable(!callApiTable)
        } else {
          Swal.fire("Error!", "", "error");
        }
      })
  }
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
    newdata.Reason = e.target.value
    setData(newdata)
  }
  const {
    handleSubmit,
    reset,
  } = useForm();
  async function submit(e) {
    e.preventDefault();
    let timerInterval
    Swal.fire({
      title: "Add this data?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        addRequest()
        reset();
        setShowModalAdd(false)
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
          Add Day Off
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        < FormDataInput id='form' method="POST" onSubmit={(e) => handleSubmit(
          submit(e)
        )}>

          <InPutContainer className="mb-6">
            <LableInput style={{ width: '100px' }} for='dateTo' className="form-label">Day Off From</LableInput>
            <DatePicker autoComplete='off' placeholderText="DD/MM/YYYY" selected={data?.DayOffFrom} id='DayOffFrom' name='dateFrom' onChange={(e) => handleOnChangeForm(e)} dateFormat='dd/MM/yyyy' />
          </InPutContainer>
          <InPutContainer className="mb-6">
            <LableInput style={{ width: '80px' }} for='dateTo' className="form-label">Day Off To</LableInput>
            <DatePicker autoComplete='off' placeholderText="DD/MM/YYYY" selected={data?.DayOffTo} id='DayOffTo' name='dateTo' onChange={(e) => handleOnChangeTo(e)} dateFormat='dd/MM/yyyy' />
          </InPutContainer>
          <InPutContainer className="mb-6">
            <LableInputReason value={data?.Reason} for='reason' className="form-label">Reason</LableInputReason>
            <InputArea required type='text' className="form-control" id='Reason' name='reason' onChange={(e) => handleOnChangeReason(e)} />
          </InPutContainer>
          <ModalBtn className='modal__btn'>
            <BtnAdd type="submit">Add</BtnAdd>
            <BtnCancel type="button" onClick={() => handleCancel()}>Cancel</BtnCancel>
          </ModalBtn>
        </ FormDataInput>
      </Modal.Body>
    </Modal>
  );
}

export default ModalAddData

