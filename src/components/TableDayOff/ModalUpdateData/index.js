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
  Span,
  FormContainer, InputContainerStyle
} from '../ModalAddData/style.js'
import axios from 'axios';
import { checkHoliday, checkSameDay, countDate, returnQuantity } from '../../../constants/dayoff.js';
import SelectTime from '../ModalAddData/SelectTime/index.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ModalUpdateData = (props) => {
  const { setShowModalUpdate, setCallApiTable, callApiTable, showModalUpdate } = props.handle
  const { idRequest } = props
  const [data, setData] = useState()
  const [quantity, setQuantity] = useState()
  const [currentQuantity, setCurrentQuantity] = useState()
  const [dataDayOff, setDataDayOff] = useState()
  const [showMidDay, setShowMidDay] = useState(true)
  const [callApiModal, setCallApiModal] = useState(false)
  const [changeData, setChangeData] = useState(false)
  const [oldData, setOldData] = useState()
  const [checked, setChecked] = useState(true)
  const [showType, setShowType] = useState(true)

  function handleCancel() {
    setShowModalUpdate(false)
    setShowType(true)
  }
  useEffect(() => {
    if (data?.Type === 1) {
      setShowType(false)
      setCurrentQuantity(0.5)
    } else {
      setShowType(true)
    }
  }, [data?.Type])
  useEffect(() => {
    setCallApiModal(!callApiModal)
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
        if (newdata?.Type === 0) {
          setChecked(true)
        } else {
          setChecked(false)
        }
        if(newdata?.Quantity < 1){
          setCurrentQuantity(newdata?.Quantity)
        }
        if(newdata?.Quantity >= 1){
          setCurrentQuantity(1)
        }
      })
  }
  useEffect(() => {
    if (idRequest) {
      getDataUpdate()
    }
  }, [callApiModal, callApiTable])
  function changeDateUpdate(date) {
    const dataDate = moment(date).format('YYYY-MM-DD')
    return dataDate
  }

  useEffect(() => {
    totalDate(data)
    if ((new Date(data?.DayOffFrom) - new Date(data?.DayOffTo)) === 0) {
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
      const time = ((returnQuantity(data?.DayOffFrom, data?.DayOffTo) * currentQuantity))
      setQuantity(time)
    }
  }
  useEffect(() => {
    const checkHolidate = checkHoliday(data?.DayOffFrom, data?.DayOffTo)
    if (checkHolidate) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Coincide with Saturday, Sunday and holidays!",
        showConfirmButton: true,
        confirmButtonColor: '#8000ff',
      })
      const newData = { ...data }
      newData.DayOffTo = oldData?.DayOffTo
      newData.DayOffFrom = oldData?.DayOffFrom
      setData(newData)
    }
  }, [data?.DayOffFrom, data?.DayOffTo, data?.Quantity])
  useEffect(() => {
    if (data?.DayOffFrom && data?.DayOffTo) {
      if ( data?.DayOffTo - data?.DayOffFrom < 0) {
        const newData = { ...data }
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
        setCurrentQuantity(data?.Quantity)
        break;
      case 'Afternoon':
        setCurrentQuantity(data?.Quantity)
        break;
      case 'All day':
        setCurrentQuantity(data?.Quantity)
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
  }, [callApiTable, callApiModal, data])
  function UpdateData() {
    const checkSameDate = checkSameDay(data?.DayOffFrom, data?.DayOffTo, dataDayOff)
    if (checkSameDate) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Day off already exist!",
        showConfirmButton: true,
        confirmButtonColor: '#8000ff',
      })
      const newData = { ...data }
      newData.DayOffTo = oldData?.DayOffTo
      newData.DayOffFrom = oldData?.DayOffFrom
      setData(newData)
    } else {
      if (quantity > 5) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Maximum 5 days",
          showConfirmButton: true,
          confirmButtonColor: '#8000ff',
        })
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
              setShowModalUpdate(false)
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
    if (num === 0) {
      setChecked(true)
    } else {
      setChecked(false)

    }

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
      dialogClassName="modal__add-request"
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Day Off
        </Modal.Title>
        <BtnCancel type="button" style={{ backgroundColor: 'transparent' }} onClick={() => handleCancel()}>
          <FontAwesomeIcon style={{ color: '#8000ff', fontSize: '28px' }} icon={faXmark} />
        </BtnCancel>
      </Modal.Header>
      <Modal.Body>
        < FormDataInput id='form' method="POST" onSubmit={(e) => handleSubmit(
          submit(e)
        )}>
          <InPutContainer className="mb-6">
            <LableInput style={{ marginBottom: '22px', }} className="form-label">Type of day off</LableInput>
            <Form.Group className='type__dayoff' style={{ display: 'flex', flexDirection: 'column' }}>
              <Form.Check checked={checked} label="OFF" value={0} name="Type" type='radio' onChange={(e) => handleOnChangeType(e)} />
              <Form.Check checked={!checked} label="WFH" value={1} name="Type" type='radio' onChange={(e) => handleOnChangeType(e)} />
            </Form.Group>
          </InPutContainer>
          <FormContainer>
            <InPutContainerFrom style={{ marginLeft: '0', width: '70%' }}>
              <InputContainerStyle>
                <LableInput style={{ width: '153px', textAlign: 'start' }} className="form-label lable-w50">From</LableInput>
                <InPutContainer style={{ margin: '0', }} className="mb-6">
                  <DatePicker required autoComplete='off' placeholderText="DD/MM/YYYY" selected={data?.DayOffFrom} id='DayOffFrom' name='dateFrom' onChange={(e) => handleOnChangeForm(e)} dateFormat='dd/MM/yyyy' />
                </InPutContainer>
              </InputContainerStyle>
              <InputContainerStyle>
                <LableInput style={{ width: '153px' }} className="form-label lable-w50">To</LableInput>
                <InPutContainer style={{ margin: '0', }} className="mb-6">
                  <DatePicker required autoComplete='off' placeholderText="DD/MM/YYYY" selected={data?.DayOffTo} id='DayOffTo' name='dateTo' onChange={(e) => handleOnChangeTo(e)} dateFormat='dd/MM/yyyy' />
                </InPutContainer>
              </InputContainerStyle>
            </InPutContainerFrom>
            <InPutContainerFrom className={`input__container-css ${showType?'':'top-25'}`} style={{ top: '10px', position: 'relative', width: '23%' }} >
             
              <InPutContainer style={{ width: '100%'}} className="mb-6 input__select">
                <Form.Select style={{ width: '100%', margin: '0', }} id='Quantity' onChange={(e) => handleOnChangeTime(e)} aria-label="Default select example">
                  <Option value={3}>All day</Option> 
                  {
                    showMidDay === true || quantity <= 0.5 ?
                      <Option value={1}>Morning</Option>:''
                  }
                  {
                    showMidDay === true || quantity <= 0.5 ? 
                      <Option value={2} >Afternoon</Option>:''
                  }
                </Form.Select>
              </InPutContainer>
              {
                showType ?
                  <SelectTime quantity={quantity} handle={{ setCurrentQuantity, currentQuantity }}></SelectTime> : ''
              }
            </InPutContainerFrom>
          </FormContainer>
          <InPutContainer className="mb-6">
            <LableInput className="form-label">Quantity</LableInput>
            <Input id='Quantity'>
              <Span>{quantity}</Span>
            </Input>
          </InPutContainer>
          <InPutContainer className="mb-6">
            <LableInput for='reason' className="form-label">Reason</LableInput>
            <InputArea value={data?.Reason} required type='text' id='Reason' name='reason' onChange={(e) => handleOnChangeReason(e)} />
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

