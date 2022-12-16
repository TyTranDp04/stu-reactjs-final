import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { dataAlumni } from "../../../constants/data.js";
import Avatar from "../../../assets/images/avatar-default.jpg"
import {
  Body,
  Btn,
  BtnAction,
  Container,
  DivBtn,
  DivTable,
  Error,
  FooterForm,
  H3,
  Image,
  Input,
  Label,
  Row,
  Search,
  Select,
  Submit,
  TH,
  TR,
} from "./style";

import Swal from "sweetalert2";
import { Modal, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getListDpManagementAction } from "../../../stores/slices/ManagementUser.slice.js";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePen, faTrash } from "@fortawesome/free-solid-svg-icons";

const ManagementUser = (props) => {
  const URL = process.env.REACT_APP_URL_WEBSITE;
  const [data, setData] = useState();
  const [dataEdit, setDataEdit] = useState();
  const dpManagement = useSelector(
    (state) => state.dpManagement.dpManagementState
  );
  const dispatch = useDispatch();
  useEffect(() => {
    setData(dpManagement?.data);
  }, [dpManagement]);

  useEffect(() => {
    dispatch(getListDpManagementAction());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const renderTableHeader = () => {
    const header = Object.keys(dataAlumni[0]);
    return header.map((key, index) => <TH key={index}>{key}</TH>);
  };
  const searchHandle = async (e) => {
    let key = e.target.value;
    await axios.get(`${URL}/user/${key}`).then((res) => {
      setData(res?.data);
    });
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  async function postData(data) {
    await axios
      .post(`${URL}/user`, data)
      .then((res) => console.log(res.body))
      .catch((err) => console.log(err));
  }

  async function DeleteData(e) {
    await fetch(`${URL}/user/${e}`, { method: "DELETE" }).then((res) => {
      setData(res?.data);
    });
  }
  const [idUser, setId] = useState();
  const [edit, setEdit] = useState(false);
  const EditData = async (data) => {
    console.log("data",data);
    await axios
      .patch(`${URL}/user/${idUser}`, data)
      .then((res) => console.log(res.body))
      .catch((err) => console.log(err));
  }
  async function getEdit(e) {
    setId(e);
    await axios
      .get(`${URL}/user-item/${e}`)
      .then((res) =>{
      console.log("data",res?.data.data);
      setDataEdit(res?.data.data)
      });
    if(!edit){
      reset();
    }
  }


  const [dataRole, setDataRole] = useState();
  const [numRole, setNumRole] = useState(1);

  async function submitRole() {
    await axios
      .get(`${URL}/role`)
      .then((res) => setDataRole(res?.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    submitRole();
  }, []);

  const [dataGroup, setDataGroup] = useState();
  async function submitGroup() {
    await axios
      .get(`${URL}/group`)
      .then(
        (res) => setDataGroup(res?.data.data)
      )
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    submitGroup();
  }, []);
  const getRole = (event) => {
    let RoleId = event.target.value;
    const idRole = dataRole?.data.filter((e) => {
      if (RoleId === e.RoleName) {
        const id = e.Id;
        return id;
      }
    });
    if (idRole.length === 0) {
      setNumRole(null);
    } else {
      setNumRole(idRole[0]._id);
    }
  };

  const [numGroup, setNumGroup] = useState();

  const getGroup = (event) => {
    let GroupId = event.target.value;
    const idGroup = dataGroup?.filter((e) => {
      if (GroupId === e.Name) {
        const id = e._id;
        return id;
      }
    });
    if (idGroup.length === 0) {
      setNumGroup("");
    } else {
      setNumGroup(idGroup[0]._id);
    }
  };

  return (
    <React.Fragment>
      <Container className="col-lg-10 col-sm-9 ">
        <Body>
          <div className="row pt-2 m-0">
            <div className="text-center">
              <H3>Management User</H3>
            </div>
            <Modal
              show={edit}
              onHide={() => setEdit(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <FooterForm
                id="form1"
                className="text-start"
                onSubmit={handleSubmit((data) => {
                  const object = {
                    ...data,
                    RoleId: numRole,
                  };
                  Swal.fire({
                    title: "Are You Sure Add User?",
                    icon: "question",
                    iconHtml: "?",
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    showCancelButton: true,
                    showCloseButton: true,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      EditData(object);
                      dispatch(getListDpManagementAction());
                      reset();
                      setEdit(false);
                      Swal.fire("Nice to meet you", "", "success");
                    } else {
                      Swal.fire(" Cancelled", "", "error")
                      reset();
                      setId(null);
                  };
                  });
                })}
              >
                <div>
                  <Label className="w-100">Name</Label>
                 {dataEdit?.Name &&  <Input
                  type="text"
                    {...register("Name")}
                    className="w-100"
                    name="Name"
                    defaultValue={ dataEdit?.Name ? dataEdit?.Name : 'Name'}
                  />

                 }
                  <Error className="w-100">{errors.Name?.message}</Error>
                </div>
                <div>
                  <Label className="w-100">Email</Label>
                  {dataEdit?.Gmail && <Input
                    name="Gmail"
                    type="Gmail"
                    defaultValue={dataEdit?.Gmail}
                    {...register("Gmail", {
                      pattern: {
                        value:
                          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: "Gmail Invalid",
                      },
                    })}
                    className="w-100"
                  />}
                  <Error className="w-100">{errors.Gmail?.message}</Error>
                </div>

                <div>
                  <Label className="w-100">Phone</Label>

                 {dataEdit?.Phone &&  <Input
                    name="Phone"
                    type="text"
                    defaultValue={dataEdit?.Phone}
                    {...register("Phone", {
                      minLength: {
                        value: 10,
                        message: "Your phone error number = 10",
                      },
                      maxLength: {
                        value: 10,
                        message: "Your phone error number = 10",
                      },
                    })}
                    className="w-100"
                  />}
                  <Error className="w-100">{errors.Phone?.message}</Error>
                </div>
                <div>
                  <Label className="w-100">Address</Label>
                  {dataEdit?.Address && <Input
                    name="Address"
                    defaultValue={dataEdit?.Address}
                    {...register("Address")}
                    className="w-100"
                  />}
                  <Error className="w-100">{errors.Address?.message}</Error>
                </div>
                <div>
                  <Label className="w-100">RoleId</Label>
                  <Select
                    id="RoleId"
                    name="RoleId"
                    {...register("RoleId", {
                      required: "The field is required.",
                    })}
                    className="w-100"
                    defaultValue={dataEdit?.RoleId}
                    onClick={(event) => {
                      getRole(event);
                    }}
                  >
                    <option></option>
                    {dataRole?.map((e) => (
                      <option key={e._id}>{e.RoleName}</option>
                    ))}
                  </Select>
                  <Error className="w-100">{errors.RoleId?.message}</Error>
                </div>
                <div>
                  <Label className="w-100">Group</Label>
                  <Select
                    name="GroupId"
                    {...register("Group", {
                      required: "The field is required.",
                    })}
                    className="w-100"
                    onClick={(event) => getGroup(event)}
                  >
                    <option className="text-center">...</option>
                    {dataGroup?.map((e) => (
                      <option key={e._id} className="text-center">
                        {e.Name}
                      </option>
                    ))}
                  </Select>
                  <Error className="w-100">{errors.Group?.message}</Error>
                </div>

                <Submit value="Edit User" className="mt-2" type="submit" />
              </FooterForm>
            </Modal>
            <Modal
              show={show}
              onHide={() => setShow(false)}
              dialogClassName="modal-90w"
              aria-labelledby="example-custom-modal-styling-title"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Add User
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FooterForm 
                  id="form"
                  className="text-start"
                  onSubmit={handleSubmit((data) => {
                    const object = {
                      ...data,
                      RoleId: numRole,
                      GroupId: numGroup,
                    };
                    Swal.fire({
                      title: "Are You Sure Add User ?",
                      icon: "question",
                      iconHtml: "?",
                      confirmButtonText: "OK",
                      cancelButtonText: "Cancel",
                      showCancelButton: true,
                      showCloseButton: true,
                    }).then((result) => {
                      if (result.isConfirmed) {
                        postData(object);
                        reset();
                        dispatch(getListDpManagementAction());
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
                        minLength: {
                          value: 10,
                          message: "Your phone error number = 10",
                        },
                        maxLength: {
                          value: 10,
                          message: "Your phone error number = 10",
                        },
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
                    <Label className="w-100">Role</Label>
                    <Select
                      id="RoleId"
                      name="RoleId"
                      {...register("RoleId", {
                        required: "The field is required.",
                      })}
                      className="w-100"
                      onClick={(event) => {
                        getRole(event);
                      }}
                    >
                      <option></option>
                      {dataRole?.map((e) => (
                        <option key={e._id}>{e.RoleName}</option>
                      ))}
                    </Select>
                    <Error className="w-100">{errors.RoleId?.message}</Error>
                  </div>
                  <div>
                    <Label className="w-100">Group</Label>
                    <Select
                      name="GroupId"
                      {...register("Group", {
                        required: "The field is required.",
                      })}
                      className="w-100"
                      onClick={(event) => getGroup(event)}
                    >
                      <option className="text-center">...</option>
                      {dataGroup?.map((e) => (
                        <option key={e._id} className="text-center">
                          {e.Name}
                        </option>
                      ))}
                    </Select>
                    <Error className="w-100">{errors.Group?.message}</Error>
                  </div>
                  <Submit value="Add User" className="mt-2" type="submit" />
                </FooterForm>
              </Modal.Body>
            </Modal>
          </div>
          <div className="container-fluid">
            <div className="row pb-5">
              <DivBtn className="col-4 text-start">
                <Btn onClick={() => {setShow(true);reset()}}>Add New User</Btn>
              </DivBtn>
              <div className="col-4"></div>
              <div className="col-4 p-0 text-end" >

                <OverlayTrigger
                  overlay={
                    <Tooltip id={`tooltip`}>
                      Search Name,Phone,Address
                    </Tooltip>
                  }
                >
                  <Search placeholder="Search" onChange={searchHandle}></Search>
                </OverlayTrigger>


              </div>
            </div>
          </div>

          <DivTable className="container-fluid">
            <Row className="row">
              <Table bordered>
                <thead className="text-center bgrHead">
                  <TR>{renderTableHeader()}</TR>
                </thead>
                <tbody className="text-start">
                  {data?.map((item, index) => (
                    <TR className="testHover" key={item._id}>
                      <td>{index + 1}</td>
                      <td className="testColor" style={{ textTransform: "capitalize" }}>{item.Name}</td>
                      <td>
                        <Image style={{width: "70px" }} src={item.Avatar ? item.Avatar : Avatar}></Image>
                      </td>
                      <td>{item.Gmail}</td>
                      <td>{item.Phone}</td>
                      <td style={{ textTransform: "capitalize" }}>{item.Address}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {dataRole?.map((e) =>
                          item?.RoleId.includes(e.Id) ? (
                            <h6 key={e._id}>{e.RoleName}</h6>
                          ) : (
                            ""
                          )
                        )}
                      </td>

                      <td>
                        {dataGroup?.map((e) =>
                          item?.GroupId.includes(e._id) ? (
                            <h6 key={e._id}>{e.Name}</h6>
                          ) : (
                            ""
                          )
                        )}
                      </td>
                      <td>
                        <td>
                          <BtnAction onClick={() => { 
                            setEdit(true); 
                            getEdit(item._id);
                            }}>
                            <OverlayTrigger
                              overlay={
                                <Tooltip>
                                  Edit
                                </Tooltip>
                              }
                            >
                              <FontAwesomeIcon style={{ color: '#1FCE2D' }} icon={faSquarePen} />
                            </OverlayTrigger>

                          </BtnAction>
                        </td>
                        <td>
                          {" "}
                          <BtnAction
                            onClick={() =>
                              Swal.fire({
                                title: "Are you sure DELETE?",
                                text: "You will not be able to recover this USER",
                                icon: "warning",
                                iconHtml: "!",
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "YES, DELETE IT!!!",
                                cancelButtonText: "Cancel",
                                showCancelButton: true,
                                showCloseButton: true,
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  DeleteData(item._id);
                                  setShow(false);
                                  dispatch(getListDpManagementAction());
                                  Swal.fire("Nice to meet you", "", "success");
                                }
                                // else Swal.fire(" Cancelled", "", "error");
                              })
                            }
                          >
                            <OverlayTrigger
                              overlay={
                                <Tooltip>
                                  Delete
                                </Tooltip>
                              }
                            >
                              <FontAwesomeIcon style={{ color: '#00AEEF' }} icon={faTrash} />
                            </OverlayTrigger>

                          </BtnAction>
                        </td>
                      </td>
                    </TR>
                  ))}
                </tbody>
              </Table>
            </Row>
          </DivTable>
        </Body>
      </Container>
    </React.Fragment>
  );
};

export default ManagementUser;
