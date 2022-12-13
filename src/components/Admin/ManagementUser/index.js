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
import { getListDpManagementAction } from "../../../stores/slices/ManagementUser.slice.js";
import axios from "axios";

const ManagementUser = () => {
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
  const [edit, setEdit] = useState(false);
  const renderTableHeader = () => {
    const header = Object.keys(dataAlumni[0]);
    return header.map((key, index) => <TH key={index}>{key.toUpperCase()}</TH>);
  };
  const searchHandle = async (e) => {
    let key = e.target.value;
    await axios.get(`http://localhost:3636/user/${key}`).then((res) => {
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
      .post(`http://localhost:3636/user`, data)
      .then((res) => console.log(res.body))
      .catch((err) => console.log(err));
  }

  async function DeleteData(e) {
    await fetch(`http://localhost:3636/user/${e}`, { method: "DELETE" }).then(
      (res) => {
        setData(res?.data);
      }
    );
  }
  const [idUser, setId] = useState();
  async function EditData(data) {
    await axios
      .patch(`http://localhost:3636/user/${idUser}`, data)
      .then((res) => console.log(res.body))
      .catch((err) => console.log(err));
  }

  const submitEdit = (e) => {
    setId(e);
    async function getEdit (e){
      await  axios
      .get(`http://localhost:3636/user-item/${e}`)
      .then((res) => setDataEdit(res?.data.data))
    }
    getEdit(e);
    setEdit(true);
  };
  const [dataRole, setDataRole] = useState();
  const [numRole, setNumRole] = useState(2);

  async function submitRole() {
    await axios
      .get(`http://localhost:3636/role`)
      .then((res) => setDataRole(res?.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    submitRole();
  }, []);

  const [dataGroup, setDataGroup] = useState();
  async function submitGroup() {
    await axios
      .get(`http://localhost:3636/group`)
      .then((res) => setDataGroup(res?.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    submitGroup();
  }, []);
  const getRole = (event) => {
    let RoleId = event.target.value;
    const idRole = dataRole?.filter((e) => {
      if (RoleId === e.RoleName) {
        const id = e.Id;
        return id;
      }
    });
    setNumRole(idRole[0].Id);
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
        <Body className="m-4">
          <div className="row pt-2">
            <div className="text-center">
              <h3>Management User</h3>
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
                    title: "Are you sure sent information?",
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
                    } else Swal.fire(" Cancelled", "", "error");
                  });
                })}
              >
                <div>
                  <Label className="w-100">Name</Label>
                  <Input
                    {...register("Name")
                  }
                    className="w-100"
                    name="Name"
                    defaultValue={dataEdit?.Name}
                  />
                  <Error className="w-100">{errors.Name?.message}</Error>
                </div>
                <div>
                  <Label className="w-100">Email</Label>
                  <Input
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
                  />
                  <Error className="w-100">{errors.Gmail?.message}</Error>
                </div>

                <div>
                  <Label className="w-100">Phone</Label>

                  <Input
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
                  />
                  <Error className="w-100">{errors.Phone?.message}</Error>
                </div>
                <div>
                  <Label className="w-100">Address</Label>
                  <Input
                    name="Address"
                    defaultValue={dataEdit?.Address}
                    {...register("Address")}
                    className="w-100"
                  />
                  <Error className="w-100">{errors.Address?.message}</Error>
                </div>
                <div>
                  <Label className="w-100">RoleId</Label>
                  <select
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
                    {dataRole?.map((e) => (
                      <option key={e._id}>{e.RoleName}</option>
                    ))}
                  </select>
                  <Error className="w-100">{errors.RoleId?.message}</Error>
                </div>
                <div>
                  <Label className="w-100">Group</Label>
                  <select
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
                  </select>
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
                  ADD USER
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
                      title: "Are you sure sent information?",
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
                    <Label className="w-100">RoleId</Label>
                    <select
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
                      {dataRole?.map((e) => (
                        <option key={e._id}>{e.RoleName}</option>
                      ))}
                    </select>
                    <Error className="w-100">{errors.RoleId?.message}</Error>
                  </div>
                  <div>
                    <Label className="w-100">Group</Label>
                    <select
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
                    </select>
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
                <input placeholder="search" onChange={searchHandle}></input>
              </div>
            </div>
          </div>

          <DivTable className="container-fluid">
            <div className="row">
              <table className="">
                <tbody>
                  <TR>{renderTableHeader()}</TR>
                  {data?.map((item, index) => (
                    <TR key={item._id}>
                      <TD>{index + 1}</TD>
                      <TD>{item.Name}</TD>
                      <TD>
                        <Image src={item.Avatar}></Image>
                      </TD>
                      <TD>{item.Gmail}</TD>
                      <TD>{item.Phone}</TD>
                      <TD>{item.Address}</TD>
                      <TD>
                        {dataRole?.map((e) =>
                        // console.log(e)
                          item?.RoleId.includes(e.Id) ? <h6 key={e._id}>{e.RoleName}</h6> : ""
                        )}
                      </TD>

                      <TD>
                        {dataGroup?.map((e) =>
                          item?.GroupId.includes(e._id) ? <h6 key={e._id}>{e.Name}</h6> : ""
                        )}
                      </TD>
                      <TD>
                        <TD>
                          <button onClick={() => submitEdit(item._id)}>
                            edit
                          </button>
                        </TD>
                        <TD>
                          {" "}
                          <button
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
                            delete
                          </button>
                        </TD>
                      </TD>
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
