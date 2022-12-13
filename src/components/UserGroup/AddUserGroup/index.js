
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BtnAdd, BtnCancel, FormDataInput, InPutContainer, LableInput, ModalBtn } from '../../TableDayOff/ModalAddData/style';
import { Input, Option, BoxUser, OptionUser, IconUser, NameUser } from './style';
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useSelector } from 'react-redux'

const ModalAddUserGroup = (props) => {
  const { setShowAddUserGroup, callApiGroup, setCallApiGroup } = props.handle;
  const {group} = props

  const [dataInput, setDataInput] = useState({
    RoleId: "1"
  });
  const userInfo = useSelector(state => state.users.userInfoState);
  const [dataUser, setDataUser] = useState();
  const [arrayIdUser, setArrayIdUser] = useState()
  const [dataUserUpdate, setDataUserUpdate] = useState()
  const [dataUserFilter, setDataUserFilter] = useState();
  const [dataAddUser, setDataAddUser ] = useState();
  const url = process.env.REACT_APP_URL_WEBSITE
  const urlGetUser = process.env.REACT_APP_URL_WEBSITE + '/user'
  async function getDataUser() {
    await axios.get(urlGetUser)
      .then(res => setDataUser(res?.data))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getDataUser()
  }, [callApiGroup])
  useEffect(()=>{
    const ArrayId = []
    const data = dataUser?.filter(function(e){
        return e.GroupId.includes(group._id)
    })
    data?.map((user)=>{
      ArrayId.push(user._id)
    })
    setArrayIdUser(ArrayId)
  },[dataUser])
  function handleCancel() {
    setShowAddUserGroup(false)
    setDataUserUpdate([])
    setDataUserFilter([])
    setDataInput({
      RoleId: "1",
      user: ''
    })
  }
  function chooseData(user) {
    setDataUserUpdate(user)
    setDataAddUser(user)
    setDataUserFilter([])
  }


  function handleOnchange(e) {
    const newData = { ...dataInput }
    newData[e.target.id] = e.target.value
    setDataInput(newData)
    const data = dataUser?.filter(function (e) {
      return e.RoleId === newData?.RoleId
    })

    if (newData?.user?.length > 0) {
      const UserFilter = data?.filter(function (e) {
        return e.Name.includes(newData.user) && !arrayIdUser.includes(e._id)
      })
      setDataUserFilter(UserFilter)
    } else {
      setDataUserFilter([])
    }
  }
  async function addUserGroup() {
    const form = {
      ...dataAddUser,
      GroupIdAdd: group._id
    }
    await axios.post(url + '/add-user-group', form)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Add success',
          showConfirmButton: false,
          timer: 1500
        })
        setCallApiGroup(!callApiGroup)
        setShowAddUserGroup(false)
        setDataUserUpdate([])
        setDataInput({
          RoleId: "1",
          user: ''
        })
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
      title: "Add this user into group?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        addUserGroup()
        reset();
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
            <LableInput style={{ width: '120px' }} className="form-label">Select position</LableInput>
            <Form.Select id='RoleId' required style={{ width: '50%', border: '2px solid #ccc', color: "#ccc" }} onChange={(e) => handleOnchange(e)}>
              <Option  value="1">Member</Option>
              {
                userInfo?.data?.user?.RoleId ==="3"?<Option   value="2">Master</Option>:''
              }
            </Form.Select>
          </InPutContainer>
          <InPutContainer className="mb-6">
            <LableInput style={{ width: '120px' }} className="form-label">Enter User Name</LableInput>
            <Input value={dataInput?.user} required type='search' id='user' name='user' onChange={(e) => handleOnchange(e)}></Input>
            {
              dataUserFilter?.length !== 0 && dataUserFilter? 
                <BoxUser style={{ margin: '5px 0', width: '50%', border: '2px solid #ccc', color: "#ccc" }}>
                  {
                    dataUserFilter?.map((e, index) => (
                      <OptionUser key={index} onClick={() => chooseData(e)}>
                        <IconUser src={e.Avatar} alt={e.Name}></IconUser>
                        <NameUser>{e.Name}</NameUser>
                      </OptionUser>
                    ))
                  }
                </BoxUser>:''
            }
          </InPutContainer>
          <InPutContainer className="mb-6" style={{ height: '50px' }}>
            {
              dataUserUpdate?.length!== 0 && dataUserUpdate?<OptionUser>
              <IconUser src={dataUserUpdate?.Avatar} alt={dataUserUpdate?.Name}></IconUser>
              <NameUser><b>Name: </b> {dataUserUpdate?.Name}</NameUser>
              <NameUser><b>Email: </b> {dataUserUpdate?.Gmail}</NameUser>
              <NameUser><b>Phone: </b>{dataUserUpdate?.Phone}</NameUser>
            </OptionUser>:''
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

export default ModalAddUserGroup;