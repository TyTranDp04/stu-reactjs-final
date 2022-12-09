
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BtnAdd, BtnCancel, FormDataInput, InPutContainer, LableInput, ModalBtn } from '../../TableDayOff/ModalAddData/style';
import { Input, Option } from './style';
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const ModalAddUserGroup = (props) => {
  const { setShowAddUserGroup, showAddUserGroup, callApiGroup, setCallApiGroup} = props.handle;
  const [dataInput, setDataInput] = useState();
  const url = process.env.REACT_APP_URL_WEBSITE
  function handleCancel() {
    setShowAddUserGroup(false)
  }
  function handleOnchange(e) {
    const data = e.target.value
    setDataInput(data);
  }
  async function addGroup() {
    const form = {
      Name: dataInput
    }
    await axios.post(url + '/group', form)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Add success',
          showConfirmButton: false,
          timer: 1500
        })
        setCallApiGroup(!callApiGroup)
      })
      .catch(err => console.log(err))
  }
  const {
    handleSubmit,
    reset,
  } = useForm();
  async function submit(e) {
    e.preventDefault();
    Swal.fire({
      title: "Add This Group?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        addGroup()
        reset();
        setShowAddUserGroup(false)
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
        < FormDataInput id='form' onSubmit={(e) => handleSubmit(submit(e))}>
          <InPutContainer className="mb-6">
            <LableInput style={{ width: '120px' }} className="form-label">Enter User Name</LableInput>
            <Input required type='text' id='user' name='user'></Input>
          </InPutContainer>
          <InPutContainer className="mb-6">
            <Form.Select style={{ border: '2px solid #ccc', color: "#ccc" }} aria-label="Default select example">
              <Option>Select position</Option>
              <Option value="1">User</Option>
              <Option value="2">Master</Option>
              <Option value="3">Hr</Option>
            </Form.Select>
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

export default ModalAddUserGroup;