import Modal from 'react-bootstrap/Modal';
import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { URL_API } from '../../../api/dayoff.api.js';
import moment from 'moment/moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from 'react-bootstrap';

import {
  InputArea,
  BtnAdd,
  BtnCancel,
  ModalBtn,
  LableInput,
  InPutContainer,
  FormDataInput,
  InPutContainerFrom,
  Option,
  Input,

} from '../ModalAddData/style.js'
import axios from 'axios';

const ModalUpdateData = (props) => {
  const { setShowModalUpdate, setCallApiTable, callApiTable, showModalUpdate } = props.handle
  const { idRequest } = props
  const [data, setData] = useState()
  const [currentQuantity, setCurrentQuantity] = useState()
  const [quantity, setQuantity] = useState()
  const [showMidDay, setShowMidDay] = useState(true)
  const [callApiModal, setCallApiModal] = useState(false)
  const [changeData, setChangeData] = useState(false)
  const [callTotalDay, setCallTotalDay] = useState(false)
  function handleCancel() {
    setShowModalUpdate(false)
    const newdata = { ...data }
    newdata.DayOffFrom = null
    newdata.DayOffTo = null
    setData(newdata)
  }
  useEffect(()=>{
    if(showModalUpdate === true){
      setCallApiModal(!callApiModal)
    }
  },[showModalUpdate])
  function changeDate(date) {
    const dateReplace = date.replace(/-/, '/').replace(/-/, '/')
    const dateSlice = dateReplace.slice(0, 10)
    return new Date(dateSlice)
  }
  const url = URL_API + '/dayoff/' + idRequest
 function getDataUpdate() {
    axios.get(url)
      .then(res => {
        const newdata = { ...res?.data?.data }
        const dateFrom = changeDate(newdata?.DayOffFrom)
        const dateTo = changeDate(newdata?.DayOffTo)
        newdata.DayOffFrom = dateFrom
        newdata.DayOffTo = dateTo
        setData(newdata)
        setDataTime(newdata?.Time)
        setQuantity(newdata?.Quantity)
        setChangeData(!changeData)
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getDataUpdate()
  }, [callApiModal])
  function changeDateUpdate(date) {
    const dataDate = moment(date).format('YYYY-MM-DD')
    return dataDate
  }

  useEffect(() => {
    if (data) {
      if (data?.DayOffTo - data?.DayOffFrom === 0) {
        setShowMidDay(true)
      } else {
        setShowMidDay(false)
        const newdata3 = { ...data }
        newdata3.Time = 'All day'
        setCurrentQuantity(1)
        setDataTime('3')
        setData(newdata3)
      }
    setCallTotalDay(!callTotalDay)
  }
}, [changeData])

useEffect(()=>{
  if(data){
    totalDay(data)
  }
},[callTotalDay])
  useEffect(() => {
    const newdata3 = { ...data }
    newdata3.Quantity = quantity
    setData(newdata3)
  }, [quantity])

  function totalDay(data) {
    const { DayOffFrom, DayOffTo } = data
    if (DayOffFrom && DayOffTo) {
      const time = (((DayOffTo - DayOffFrom) / 360 / 24 / 10000) + 1) * currentQuantity
      setQuantity(time)
    }
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
      case 'Morning':
        setCurrentQuantity(0.5)
        break;
      case 'Afternoon':
        setCurrentQuantity(0.5)
        break;
      case 'All day':
        setCurrentQuantity(1)
        break;
      default:
        break;
    }
  }
  async function UpdateData() {
    const dataFrom = changeDateUpdate(data?.DayOffFrom)
    const dataTo = changeDateUpdate(data?.DayOffTo)
    const newdata = { ...data }
    newdata.DayOffFrom = dataFrom
    newdata.DayOffTo = dataTo
    await axios.patch(url, newdata)
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

  function handleOnChangeForm(e) {
    const newdata = { ...data }
    newdata.DayOffFrom = e
    setData(newdata)
    setChangeData(!changeData)
  }
  function handleOnChangeTo(e) {
    const newdata = { ...data }
    newdata.DayOffTo = e
    setData(newdata)
    setChangeData(!changeData)

  }
  function handleOnChangeReason(e) {
    const newdata = { ...data }
    newdata.Reason = e?.target?.value
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
    setChangeData(!changeData)
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
            <LableInput for='reason' className="form-label">Reason</LableInput>
            <InputArea value={data?.Reason} required type='text' id='Reason' name='reason' onChange={(e) => handleOnChangeReason(e)} />
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

export default ModalUpdateData

