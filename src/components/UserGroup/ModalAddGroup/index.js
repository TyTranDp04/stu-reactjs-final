
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BtnAdd, BtnCancel, FormDataInput, InPutContainer, LableInput, ModalBtn, } from '../../TableDayOff/ModalAddData/style';
import { Input, Span } from './style';
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import axios from 'axios';

const ModalAddGroup = (props) => {
  const { callApiGroup, setCallApiGroup, setShowAddNewGroup } = props.handle;
  const { dataGroup } = props
  const [dataInput, setDataInput] = useState();
  const url = process.env.REACT_APP_URL_WEBSITE
  function handleCancel() {
    setShowAddNewGroup(false)
  }
  function checkNameGroup(dataGroup, inputName){
    const arrayName = []
    dataGroup?.map((e)=>(
      arrayName.push(e.Name)
    ))
    return arrayName.includes(inputName)
  }
  function handleOnchange(e) {
    const data = e.target.value
    setDataInput(data);
  }
  async function addGroup() {
    const form = {
      Name: dataInput,
    }
    await axios.post(url + '/group', form)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Add success',
          showConfirmButton: false,
          timer: 1000
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
      confirmButtonColor: '#8000ff',

    }).then((result) => {
      if (result.isConfirmed) {
        if (checkNameGroup(dataGroup, dataInput)){
          Swal.fire("Group name already exists!", "", "error");   
        }
        else {
          addGroup()
          reset();
          setShowAddNewGroup(false)
        }
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
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Group
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        < FormDataInput id='form' onSubmit={(e) => handleSubmit(
          submit(e)
        )}>
          <InPutContainer className="mb-6" >
            <LableInput style={{ width: '120px' }} for='dateTo' className="form-label">Name Group</LableInput>
            <Input autoComplete='off' required type='search' id='Name' name='Name' onChange={(e) => handleOnchange(e)}></Input>
            {
              dataInput ? '' : <Span>Name Group can't not be blank</Span>
            }
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

export default ModalAddGroup;