import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { dataAlumni } from "../../../constants/data.js";
import {
  Body,
  Btn,
  Container,
  DivTable,
  Error,
  FooterForm,
  Image,
  Input,
  Label,
  Submit,
  TD,
  TH,
  TR,
} from "./style";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getListDpManagementAction, searchDpManagementAction } from "../../../stores/slices/ManagementUser.slice.js";
import axios, { Axios } from "axios";
const ManagementUser = () => {
  // const form = document.getElementById('form');
  const [data, setData] = useState();

  const dpManagement = useSelector(
    (state) => state.dpManagement.dpManagementState
  );
  const dispatch = useDispatch();
  useEffect(()=>{
    setData(dpManagement?.data)
  },[dpManagement])

  useEffect(() => {
    dispatch(getListDpManagementAction());
  }, [dispatch]);


  const [show, setShow] = useState(false);
  const renderTableHeader = () => {
    const header = Object.keys(dataAlumni[0]);
    return header.map((key, index) => <TH key={index}>{key.toUpperCase()}</TH>);
  };
  const searchHandle = async (e) => {
    let key = e.target.value;
    let result = await axios.get(`http://localhost:3636/user/${key}`)
    .then(res =>{
      setData(res?.data)
    });
  }
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  async function postData() {
    const formData = new FormData(document.getElementById('form'))
    await axios.post(`http://localhost:3636/user`, formData)
      .then(res => console.log(res.body)  )
      .catch(err => console.log(err)) 
  }


  async function DeleteData(e) {
    console.log(e)
    await fetch(`http://localhost:3636/user/${e}`, { method: "DELETE" })
    .then(res =>{
      setData(res?.data)
    });
  }

  return (
    <React.Fragment>
      <Container className="col-lg-10 col-sm-9 ">
        <Body className="m-4">
          <div className="row pt-2">
            <div className="text-center">
              <h3>Management User</h3>
            </div>
            <Modal
              show={show}
              onHide={() => setShow(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  ADD USER
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FooterForm
                id="form"
                  className="text-start"
                  onSubmit={handleSubmit((data) => {
                    Swal.fire({
                      title: "Are you sure sent information?",
                      icon: "question",
                      iconHtml: "?",
                      confirmButtonText: "OK",
                      cancelButtonText: "Cancel",
                      showCancelButton: true,
                      showCloseButton: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        postData();
                        reset();
                        setShow(false);
                        Swal.fire("Nice to meet you", "", "success");
                      } else Swal.fire(" Cancelled", "", "error");
                    });
                  })}
                >
                  <div>
                    <Label className="w-100">Name</Label>
                    <Input
                      {...register("Name", {
                        required: "The field is required.",
                      })}
                      className="w-100"
                      name="Name"
                    />
                    <Error className="w-100">{errors.Name?.message}</Error>
                  </div>
                  <div>
                    <Label className="w-100">Email</Label>
                    <Input
                    name="Gmail"
                      type="Gmail"
                      {...register("Gmail", {
                        required: "The field is required.",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Gmail Invalid",
                        },
                      })}
                      className="w-100"
                    />
                    <Error className="w-100">{errors.Gmail?.message}</Error>
                  </div>
                 
                  <div>
                    <Label className="w-100">Phone</Label>

                    <Input
                    name="Phone"
                      type="text"
                      {...register("Phone", {
                        required: "The field is required.",
                        minLength:{
                          value:10,
                          message:"Your phone error number = 10"
                        },maxLength:{
                          value:10,
                          message:"Your phone error number = 10"
                        }
                      })}
                      className="w-100"
                    />
                    <Error className="w-100">{errors.Phone?.message}</Error>
                  </div>
                  <div>
                    <Label className="w-100">Address</Label>
                    <Input
                    name="Address"
                      {...register("Address", {
                        required: "The field is required.",
                      })}
                      className="w-100"
                    />
                    <Error className="w-100">{errors.Address?.message}</Error>
                  </div>
                  <div>
                    <Label className="w-100">RoleId</Label>
                    <Input
                    name="RoleId"
                      {...register("RoleId", {
                        required: "The field is required.",
                      })}
                      className="w-100"
                    />
                    <Error className="w-100">{errors.RoleId?.message}</Error>
                  </div>
                  <div>
                    <Label className="w-100">Group</Label>
                    <Input
                    name="GroupId"
                      {...register("Group", {
                        required: "The field is required.",
                      })}
                      className="w-100"
                    />
                    <Error className="w-100">{errors.Group?.message}</Error>
                  </div>
                  <Submit value="Add User" className="mt-2" type="submit" />
                </FooterForm>
              </Modal.Body>
            </Modal>
          </div>
          <div className="container-fluid">
            <div className="row pb-5">
              <div className="col-4 text-start">
                <Btn onClick={() => setShow(true)}>ADD NEW USER</Btn>
              </div>
              <div className="col-4"></div>
              <div className="col-4">
                <input placeholder="search" onChange = {searchHandle}></input>
              </div>
            </div>
          </div>

          <DivTable className="container-fluid">
            <div className="row">
              <table className="">
                <tbody>
                  <TR>{renderTableHeader()}</TR>
                  {data?.map((item) => (
                    <TR key={item._id}>
                      <TD>{item.RoleId}</TD>
                      <TD>{item.Name}</TD>
                      <TD>
                        <Image src={item.Avatar}></Image>
                      </TD>
                      <TD>{item.Gmail}</TD>
                      <TD>{item.Phone}</TD>
                      <TD>{item.Address}</TD>
                      <TD>{item.Password}</TD>
                      <TD>{item.GroupId}</TD>
                      <div>
                        <div>
                          <button onClick={() => setShow(true)}>edit</button>
                        </div>
                        <div>
                        <button 
                      onClick={
                        () =>
                        Swal.fire({
                          title: "Are you sure DELETE?",
                          text:"You will not be able to recover this USER",
                          icon: "warning",
                          iconHtml: "!",
                          confirmButtonColor: '#DD6B55',
                          confirmButtonText: "YES, DELETE IT!!!",
                          cancelButtonText: "Cancel",
                          showCancelButton: true,
                          showCloseButton: true,
                        }).then((result) => {
                          if (result.isConfirmed) {
                        DeleteData(item._id)
                            setShow(false);
                            Swal.fire("Nice to meet you", "", "success");
                          } 
                          // else Swal.fire(" Cancelled", "", "error");
                        })
                      }
                      >delete</button>
                        </div>
                      </div>
                    </TR>
                  ))}
                </tbody>
              </table>
            </div>
          </DivTable>
        </Body>
      </Container>
    </React.Fragment>
  );
};

export default ManagementUser;
