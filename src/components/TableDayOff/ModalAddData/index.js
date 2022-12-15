import Modal from 'react-bootstrap/Modal';
import Axios from 'axios'
import React, { useEffect, useState } from 'react';
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
  FormDataInput, Input, InPutContainerFrom, Option
} from './style.js'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { Form } from 'react-bootstrap';

const ModalAddData = (props) => {
  const { setShowModalAdd, setCallApiTable, callApiTable } = props.handle
  const { user } = props
  const [showMidDay, setShowMidDay] = useState(true)
  function handleCancel() {
    setShowModalAdd(false)
    const newdata = { ...data }
    newdata.DayOffFrom = null
    newdata.DayOffTo = null
    setData(newdata)
    setQuantity(0)
  }
  const url = URL_API + '/newdayoff'
  const [dayOffFrom, setDayOffFrom] = useState()
  const [dayOffTo, setDayOffTo] = useState()
  const [reason, setReason] = useState()
  const [quantity, setQuantity] = useState()
  const [currentQuantity, setCurrentQuantity] = useState(1)
  const [time, setTime] = useState('')
  const [data, setData] = useState({
    UserId: user?.UserId,
    Name: user?.Name,
    RoleId: user?.RoleId,
    DayOffFrom: dayOffFrom,
    DayOffTo: dayOffTo,
    Reason: reason,
    Quantity: quantity,
    Time: time,
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
    newdata.Quantity = quantity
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
  useEffect(() => {
    totalDay(data)
    if (data?.DayOffFrom - data?.DayOffTo === 0) {
      setShowMidDay(true)
    } else {
      setShowMidDay(false)
      const newdata3 = { ...data }
        newdata3.Time = 'All day'
        setCurrentQuantity(1)
        setData(newdata3)
    }
  }, [data?.DayOffFrom, data?.DayOffTo,data?.Time], currentQuantity)
  function totalDay(data) {
    const { DayOffFrom, DayOffTo, Time } = data
    if (DayOffFrom && DayOffTo) {
      const time = (((DayOffTo - DayOffFrom) / 360 / 24 / 10000) + 1) * currentQuantity
        setQuantity(time)
    }
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
    newdata[e.target.id] = e.target.value
    setData(newdata)
  }
  function handleOnChangeType(e) {
    const newdata = { ...data }
    const num = Number(e.target.value)
    newdata[e.target.name] = num
    setData(newdata)
  }
  function handleOnChangeTime(e) {
    setDataTime(e.target.value)
  }
  function setDataTime(value) {
    switch (value) {
      case '1':
        const newdata1 = { ...data }
        newdata1.Time = 'Morning'
        setData(newdata1)
        setCurrentQuantity(0.5)
        break;
      case '2':
        const newdata2 = { ...data }
        newdata2.Time = 'Afternoon'
        setCurrentQuantity(0.5)
        setData(newdata2)
        break;
      case '3':
        const newdata3 = { ...data }
        newdata3.Time = 'All day'
        setCurrentQuantity(1)
        setData(newdata3)
        break;
      default:
        break;
    }
  }
  const {
    handleSubmit,
    reset,
  } = useForm();
  async function submit(e) {
    e.preventDefault();
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
            <LableInput style={{ marginBottom: '22px', }} className="form-label">Type of day off</LableInput>
            <Form.Group style={{ display: 'flex', flexDirection: 'column' }}>
              <Form.Check label="OFF" value={0} name="Type" type='radio' onChange={(e) => handleOnChangeType(e)} />
              <Form.Check label="WFH" value={1} name="Type" type='radio' onChange={(e) => handleOnChangeType(e)} />
            </Form.Group>
          </InPutContainer>
          <InPutContainerFrom>
            <LableInput style={{ width: '51%', margin: '0', }} className="form-label">From</LableInput>
            <InPutContainer style={{ width: '100%', margin: '0', }} className="mb-6">
              <DatePicker autoComplete='off' placeholderText="DD/MM/YYYY" selected={data?.DayOffFrom} id='DayOffFrom' name='dateFrom' onChange={(e) => handleOnChangeForm(e)} dateFormat='dd/MM/yyyy' />
            </InPutContainer>
            <InPutContainer style={{ width: '100%', margin: '0', }} className="mb-6 input__select">
              <Form.Select style={{ width: '70%', margin: '0', }} id='Quantity' onChange={(e) => handleOnChangeTime(e)} aria-label="Default select example">
                {
                  showMidDay === false ? '' :
                    <Option value={1}>Morning</Option>
                }
                {
                  showMidDay === false ? '' :
                    <Option value={2} >Afternoon</Option>
                }
                <Option value={3}>All day</Option>
              </Form.Select>
            </InPutContainer>
          </InPutContainerFrom>
          <InPutContainer className="mb-6">
            <LableInput style={{ width: '28.4%', margin: '0', }} className="form-label">To</LableInput>
            <DatePicker autoComplete='off' placeholderText="DD/MM/YYYY" selected={data?.DayOffTo} id='DayOffTo' name='dateTo' onChange={(e) => handleOnChangeTo(e)} dateFormat='dd/MM/yyyy' />
          </InPutContainer>
          <InPutContainer className="mb-6">
            <LableInput className="form-label">Quantity</LableInput>
            <Input value={quantity} disabled autoComplete='off' id='Quantity' name='Quantity' />
          </InPutContainer>
          <InPutContainer className="mb-6">
            <LableInput value={data?.Reason} for='reason' className="form-label">Reason</LableInput>
            <InputArea required type='text' id='Reason' name='reason' onChange={(e) => handleOnChangeReason(e)} />
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

