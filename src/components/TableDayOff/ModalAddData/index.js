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
  FormDataInput, Input, InPutContainerFrom, Option, Span, InputContainerStyle, FormContainer
} from './style.js'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form } from 'react-bootstrap';
import { checkHoliday, checkSameDay, returnQuantity } from '../../../constants/dayoff.js';
import SelectTime from './SelectTime/index.js';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModalAddData = (props) => {
  const { setShowModalAdd, setCallApiTable, callApiTable } = props.handle
  const { user } = props
  const [showMidDay, setShowMidDay] = useState(true)
  const url = URL_API + '/newdayoff'
  const [quantity, setQuantity] = useState()
  const [currentQuantity, setCurrentQuantity] = useState(1)
  const [dataDayOff, setDataDayOff] = useState()
  const [checked, setChecked] = useState(true)
  const [showType, setShowType] = useState(true)
  const [data, setData] = useState({
    UserId: user?.UserId,
    Name: user?.Name,
    RoleId: user?.RoleId,
  })

  function handleCancel() {
    setShowModalAdd(false)
    const newdata = { ...data }
    newdata.DayOffFrom = null
    newdata.DayOffTo = null
    setData(newdata)
    setQuantity(0)
    setChecked(true)
    setShowType(true)
    setCurrentQuantity(1)
  }
  function changeDate(date) {
    const dataDate = moment(date).format('YYYY-MM-DD')
    return dataDate
  }

  useEffect(() => {
    const urlGetDayOff = URL_API + '/dayoff-user/' + user?.UserId
    Axios.get(urlGetDayOff)
      .then((data) => {
        const newdata = data?.data?.filter(function (e) {
          return e?.Status !== 3
        })
        setDataDayOff(newdata)
      })
  }, [callApiTable])
  function addRequest() {
    const checkSameDate = checkSameDay(data?.DayOffFrom, data?.DayOffTo, dataDayOff)

    if (checkSameDate) {
      const newdata = { ...data }
      newdata.DayOffFrom = null
      newdata.DayOffTo = null
      setQuantity(0)
      setData(newdata)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Day off already exist!",
        showConfirmButton: true,
        confirmButtonColor: '#8000ff',
      })
    }
    else {
      if (quantity > 5) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Maximum 5 days",
          showConfirmButton: true,
          confirmButtonColor: '#8000ff',
        })
      } else {
        const dataFrom = changeDate(data?.DayOffFrom)
        const dataTo = changeDate(data?.DayOffTo)
        const newdata = { ...data }
        if (!data?.Type) {
          newdata.Type = 0
        }
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
              setShowModalAdd(false)
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
  useEffect(() => {
    totalDay(data)
    if (data?.DayOffFrom - data?.DayOffTo === 0) {
      setShowMidDay(true)
    } else {
      setShowMidDay(false)
      const newdata3 = { ...data }
      newdata3.Time = 3
      setCurrentQuantity(1)
      setData(newdata3)
    }
  }, [data?.DayOffFrom, data?.DayOffTo, data?.Time, currentQuantity])
  function totalDay(data) {
    const { DayOffFrom, DayOffTo } = data
    if (DayOffFrom && DayOffTo) {
      const time = ((returnQuantity(DayOffFrom, DayOffTo) * currentQuantity))
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
      const newdata = { ...data }
      newdata.DayOffFrom = null
      newdata.DayOffTo = null
      setQuantity(0)
      setData(newdata)
    }
  }, [data?.DayOffFrom, data?.DayOffTo, data?.Quantity])
  useEffect(() => {
    const date = new Date()
    if (data?.DayOffFrom && data?.DayOffTo) {
      if (data?.DayOffTo - data?.DayOffFrom < 0) {
        const newdata = { ...data }
        newdata.DayOffFrom = null
        newdata.DayOffTo = null
        setQuantity(0)
        setData(newdata)
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
    if (num === 0) {
      setChecked(true)
    } else {
      setChecked(false)

    }
    if (newdata?.Type === 1) {
      setShowType(false)
      setQuantity(0.5)
      setShowMidDay(true)
    } else {
      setShowType(true)
    }
  }
  function handleOnChangeTime(e) {
    setDataTime(e.target.value)
  }
  function setDataTime(value) {
    switch (value) {
      case '1':
        const newdata1 = { ...data }
        newdata1.Time = 1
        setData(newdata1)
        if(quantity > 0.5){      
            setCurrentQuantity(0.5)
        }
        break;
      case '2':
        const newdata2 = { ...data }
        newdata2.Time = 2
        if(quantity > 0.5){
          if(showType){
            setCurrentQuantity(0.5)
          }
        }
        break;
      case '3':
        const newdata3 = { ...data }
        newdata3.Time = 3   
        setData(newdata3)
        setCurrentQuantity(1)
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
      confirmButtonColor: '#8000ff',
    }).then((result) => {
      if (result.isConfirmed) {
        addRequest()
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
      dialogClassName="modal__add-request"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='modal__request '
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Day Off
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
                <LableInput style={{ width: '120px', textAlign: 'start' }} className="form-label lable-w50">From</LableInput>
                <InPutContainer style={{ margin: '0', }} className="mb-6">
                  <DatePicker required autoComplete='off' placeholderText="DD/MM/YYYY" selected={data?.DayOffFrom} id='DayOffFrom' name='dateFrom' onChange={(e) => handleOnChangeForm(e)} dateFormat='dd/MM/yyyy' />
                </InPutContainer>
              </InputContainerStyle>
              <InputContainerStyle>
                <LableInput style={{ width: '120px' }} className="form-label lable-w50">To</LableInput>
                <InPutContainer style={{ margin: '0', }} className="mb-6">  
                  <DatePicker required autoComplete='off' placeholderText="DD/MM/YYYY" selected={data?.DayOffTo} id='DayOffTo' name='dateTo' onChange={(e) => handleOnChangeTo(e)} dateFormat='dd/MM/yyyy' />
                </InPutContainer>
              </InputContainerStyle>
            </InPutContainerFrom>
            <InPutContainerFrom  className={`input__container-css ${showType?'':'top-25'}`} style={{ top: '10px', position: 'relative', width: '25%',marginRight: '58px', marginLeft: '0' }} >   
              <InPutContainer style={{ width: '100%'}} className="mb-6 input__select">
                <Form.Select style={{ width: '100%', margin: '0', }} id='Quantity' onChange={(e) => handleOnChangeTime(e)} aria-label="Default select example" >
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
            <Input id='Quantity' className=' Quantity__text'>
              <Span>{quantity}</Span>
            </Input>
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

