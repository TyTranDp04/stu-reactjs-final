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
import { checkHoliday, checkSameDay, countDate } from '../../../constants/dayoff.js';
import { dataHoliday } from '../../../constants/holiday.js';
import SelectTime from '../ModalAddData/SelectTime/index.js';

const ModalUpdateData = (props) => {
  const { setShowModalUpdate, setCallApiTable, callApiTable, showModalUpdate } = props.handle
  const { idRequest } = props
  const [data, setData] = useState()
  const [currentQuantity, setCurrentQuantity] = useState(1)
  const [quantity, setQuantity] = useState()
  const [dataDayOff, setDataDayOff] = useState(1)
  const [showMidDay, setShowMidDay] = useState(true)
  const [callApiModal, setCallApiModal] = useState(false)
  const [changeData, setChangeData] = useState(false)
  const [callTotalDay, setCallTotalDay] = useState(false)
  const  [oldData, setOldData] = useState()
  function handleCancel() {
    setShowModalUpdate(false)
  }
  useEffect(() => {
    if (showModalUpdate === true) {
      setCallApiModal(!callApiModal)
    }
  }, [showModalUpdate])
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
        setOldData(newdata)
        setData(newdata)
        setDataTime(newdata?.Time)
        setQuantity(newdata?.Quantity)
        setChangeData(!changeData)
      })
  }
  useEffect(() => {
    getDataUpdate()
  }, [callApiModal, callApiTable])
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
  }, [changeData, callApiTable])

  useEffect(() => {
    totalDate(data)
    if (data?.DayOffFrom - data?.DayOffTo === 0) {
      setShowMidDay(true)
    } else {
      setShowMidDay(false)
      const newdata3 = { ...data }
      newdata3.Time = 'All day'
      setCurrentQuantity(1)
      setData(newdata3)
    }
  }, [data?.DayOffFrom, data?.DayOffTo, data?.Time, currentQuantity])
  function totalDate(data) {
    if (data?.DayOffFrom && data?.DayOffTo) {
      const time = (((data?.DayOffTo - data?.DayOffFrom) / 360 / 24 / 10000) + 1) * currentQuantity
      setQuantity(time)
    }
  }
  useEffect(() => {
    const date = new Date()
    if (data?.DayOffFrom && data?.DayOffTo) {
      if (countDate(data?.DayOffFrom,date) < 0 || data?.DayOffTo - data?.DayOffFrom < 0) {
        const newData = {...data}
        newData.DayOffTo = oldData?.DayOffTo
        newData.DayOffFrom = oldData?.DayOffFrom
        setData(newData)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Wrong date entered!",
          showConfirmButton: true,
          confirmButtonColor: '#8000ff',
        })
      }
    }

  }, [data?.DayOffFrom, data?.DayOffTo, data?.Quantity])
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
  useEffect(() => {
    const urlGetDayOff = URL_API + '/dayoff-user/' + data?.UserId
    axios.get(urlGetDayOff)
      .then((data) => {
        const newdata = data?.data?.filter(function (e) {
          return e?.Status !== 3 && e?._id !== idRequest
        })
        setDataDayOff(newdata)
      })
  }, [callApiTable])
  function UpdateData() {
    const check = checkSameDay(dataDayOff, data?.DayOffFrom, data?.DayOffTo)
    const checkHolidate = checkHoliday(dataHoliday, data?.DayOffFrom, data?.DayOffTo)
    if (check || checkHolidate) {
      if(check){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Day off already exist!",
          showConfirmButton: true,
          confirmButtonColor: '#8000ff',
        })
      }
      if(checkHolidate){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Coincide with Saturday, Sunday and holidays!",
          showConfirmButton: true,
          confirmButtonColor: '#8000ff',
        })
      }
      
    } else {
      const dataFrom = changeDateUpdate(data?.DayOffFrom)
      const dataTo = changeDateUpdate(data?.DayOffTo)
      const newdata = { ...data }
      newdata.Quantity = quantity
      newdata.DayOffFrom = dataFrom
      newdata.DayOffTo = dataTo
      axios.patch(url, newdata)
        .then((data) => {
          if (data?.data?.success) {
            Swal.fire({
              icon: 'success',
              title: 'Update request success',
              showConfirmButton: false,
              timer: 1000
            })
            setTimeout(() => {
              setCallApiTable(!callApiTable)
              setCallApiModal(!callApiModal)
            }, 500)
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Cancel!',
              showConfirmButton: false,
              timer: 1000
            })
          }
        })
    }
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
      confirmButtonColor: '#8000ff',
    }).then((result) => {
      if (result.isConfirmed) {
        UpdateData()
        reset();
        setShowModalUpdate(false)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Cancel!',
          showConfirmButton: false,
          timer: 1000
        })
      }
    });
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='modal__request'
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
                  showMidDay === false || quantity > 0.5 ? '' :
                    <Option value={1}>Morning</Option>
                }
                {
                  showMidDay === false || quantity > 0.5 ? '' :
                    <Option value={2} >Afternoon</Option>
                }
                {
                  quantity > 0.5?<Option value={3}>All day</Option>:''
                }
              </Form.Select>
            </InPutContainer>
          </InPutContainerFrom>
          <InPutContainerFrom>
            <LableInput style={{ width: '51%', margin: '0', }} className="form-label">To</LableInput>
            <InPutContainer style={{ width: '100%', margin: '0', }} className="mb-6">
              <DatePicker required autoComplete='off' placeholderText="DD/MM/YYYY" selected={data?.DayOffTo} id='DayOffTo' name='dateTo' onChange={(e) => handleOnChangeTo(e)} dateFormat='dd/MM/yyyy' />
            </InPutContainer>
            <SelectTime quantity={quantity} handle={{ setCurrentQuantity }}></SelectTime>
          </InPutContainerFrom>
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

