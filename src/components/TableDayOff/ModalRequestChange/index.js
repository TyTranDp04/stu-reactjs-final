import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import Modal from 'react-bootstrap/Modal';
import { ButtonAddDayOff } from '../style';
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import axios from 'axios';
import { InputArea, P, Form } from './style';
const schema = yup.object({
  reason: yup.string().required(),
}).required();


function ModalRequestChange(props) {
  const { showRequestChange, setShowRequestChange, setCallApiTable, callApiTable } = props.handle
  const [dataRequestChange, setDataRequestChange] = useState()
  const { data, formData, type } = props
  const [url, setUrl] = useState()
  function handleOnchange(e) {
    const newData = { ...data }
    newData.ReasonChange = e.target.value
    setDataRequestChange(newData)
  }
  const urlRequestChange = process.env.REACT_APP_URL_WEBSITE + '/request-change'
  const urlRevert = process.env.REACT_APP_URL_WEBSITE + '/revert'
  const urlReject = process.env.REACT_APP_URL_WEBSITE + '/reject'
  useEffect(() => {
    switch (type) {
      case 'change':
        setUrl(urlRequestChange)
        break
      case 'reject':
        setUrl(urlReject)
        break;
      case 'revert':
        setUrl(urlRevert)
        break;
      default:
        break;
    }
  }, [type, urlRevert, urlReject, urlRequestChange])

  function handleAction() {
    const newdata = { ...dataRequestChange }
    newdata.UserActionId = formData?.UserActionId
    newdata.RequestId = formData?.RequestId
    axios.post(url, newdata)
      .then((data) => {
        if (data?.data?.success) {
          Swal.fire({
            icon: 'success',
            title: 'Request change success',
            showConfirmButton: false,
            timer: 1000
          })
          setShowRequestChange(false)
          setCallApiTable(!callApiTable)
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
  async function submit(e) {
    Swal.fire({
      title: "Send this data?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Send",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: '#8000ff',
    }).then((result) => {
      if (result.isConfirmed) {
        handleAction()
        reset()
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
  const { reset, register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  return (
    <Modal className='modal__request' show={showRequestChange}>
      <Modal.Header>
        <Modal.Title>{`Reason for ${type}:`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(submit)}>
          <InputArea {...register("reason")} onChange={(e) => handleOnchange(e)} />
          <P>{errors.reason?.message}</P>
          <ButtonAddDayOff type='button' style={{ backgroundColor: '#6e7881', height: '45px' }} onClick={() => setShowRequestChange(false)}>
            Cancel
          </ButtonAddDayOff>
          <ButtonAddDayOff type='submit' style={{ backGroundColor: '#8000FF', height: '45px' }}>
            Send
          </ButtonAddDayOff>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalRequestChange