import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Avatar from "../../../assets/images/avatar-default.jpg";
import { dataAlumni } from "../../../constants/data.js";
import {
  Body,
  Btn,
  BtnAction,
  BtnCancel,
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

import { faSquarePen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { Modal, OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { getListDpManagementAction } from "../../../stores/slices/ManagementUser.slice.js";
import { useNavigate } from "react-router-dom";

const ManagementUser = (props) => {
  const URL = process.env.REACT_APP_URL_WEBSITE;
  const [data, setData] = useState();
  const [dataEdit, setDataEdit] = useState();
  const dpManagement = useSelector(
    (state) => state.dpManagement.dpManagementState
  );
  const userInfo = useSelector((state) => state.users.userInfoState);
  const roleId = useSelector((state) => state.roleId.roleIdState);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userRoleId = userInfo?.data?.user?.RoleId;
  const id = userInfo?.data?.user?.id;
  const roleIdData = roleId?.data;
  const filterRoleId = roleIdData?.find((item) => item.Id === userRoleId);
  const permission = filterRoleId?.RoleName;
  const roleName = filterRoleId?.RoleName;
  console.log("roleName", roleName);
  console.log("data", data);

  //  console.log("GroupManeger",GroupManeger);
  // useEffect(() => {
  //   if (!permission) {
  //     return
  //   } else if (permission !== "Admin") {
  //     navigate("/404")
  //   } else {
  //     navigate("/admin/user")
  //   }
  // }, [permission, navigate]);

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
    await axios
      .patch(`${URL}/user/${idUser}`, data)
      .then((res) => console.log(res.body))
      .catch((err) => console.log(err));
  };
  async function getEdit(e) {
    setId(e);
    await axios.get(`${URL}/user-item/${e}`).then((res) => {
      setDataEdit(res?.data.data);
    });
    if (!edit) {
      reset();
    }
  }

  const [dataGroup, setDataGroup] = useState();
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

  async function submitGroup() {
    await axios
      .get(`${URL}/group`)
      .then((res) => setDataGroup(res?.data.data))
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    submitGroup();
  }, []);

  const [dataRole, setDataRole] = useState();
  const [numRole, setNumRole] = useState();
  async function submitRole() {
    await axios
      .get(`${URL}/role`)
      .then((res) => {
        setDataRole(res?.data);
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    submitRole();
  }, []);
  const getRole = (event) => {
    let RoleId = event.target.value;
    dataRole.map((e) => (e.RoleName === RoleId ? setNumRole(e.Id) : ""));
  };

  const filterData = dataGroup?.filter(item => dataEdit?.GroupId?.includes(item._id)? item.Name : "" )
  return (
    <React.Fragment>
      {/* <Container className="col-lg-10 col-sm-9 "> */}
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
              <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                  Edit User
                </Modal.Title>
              </Modal.Header>
              <FooterForm
                id="form1"
                className="text-start"
                onSubmit={handleSubmit((data) => {
                  const object = {
                    ...data,
                    RoleId: numRole,
                  };
                  Swal.fire({
                    title: "Are You Sure Edit User?",
                    icon: "question",
                    iconHtml: "?",
                    confirmButtonText: "OK",
                    cancelButtonText: "Cancel",
                    showCancelButton: true,
                    showCloseButton: true,
                    confirmButtonColor: "#8000ff",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      EditData(object);
                      dispatch(getListDpManagementAction());
                      reset();
                      setEdit(false);
                      Swal.fire({
                        title: "succesfully",
                        icon:"success",
                        confirmButtonText: "OK",
                        confirmButtonColor:"#8000ff",
                      });
                    } else {
                      setId(null);
                    }
                  });
                })}
              >
                <div>
                  <Label className="w-100">Name</Label>
                  {dataEdit?.Name && <Input
                    type="text"
                    {...register("Name")}
                    className="w-100"
                    name="Name"
                    defaultValue={dataEdit?.Name ? dataEdit?.Name : ''}
                  />
                  }
                  <Error className="w-100">{errors.Name?.message}</Error>
                </div>
                <div>
                  <Label className="w-100">Email</Label>
                  {dataEdit?.Gmail && <Input
                    name="Gmail"
                    type="Gmail"
                    defaultValue={dataEdit?.Gmail ? dataEdit?.Gmail : ''}
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
                  {dataEdit?.Phone && <Input
                    name="Phone"
                    type="text"
                    defaultValue={dataEdit?.Phone ? dataEdit?.Phone : ''}
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
                    defaultValue={dataEdit?.Address ? dataEdit?.Address : ''}
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
                    defaultValue={dataEdit?.RoleId ? dataEdit?.RoleId : ''}
                    onClick={(event) => {
                      getRole(event);
                    }}
                  >
                    {dataRole?.map((e) => (
                      <option
                        selected={dataEdit?.RoleId === e?.Id ? e.RoleName : ""}
                        value={e.RoleName}
                        key={e._id}
                      >
                        {e.RoleName}
                      </option>
                    ))}
                  </Select>
                  <Error className="w-100">{errors.RoleId?.message}</Error>
                </div>
                <div>
                  <Label className="w-100">Group</Label>
                  {dataEdit?.GroupId && <Input
                    name="GroupId"
                    {...register("Group", {
                      // required: "The field is required.",
                      required:false
                    })}
                    className="w-100"

                    value={filterData.map(e => e.Name) ?? ""}
                  />}
                  <Error className="w-100">{errors.Group?.message}</Error>
                </div>
                <div className="row">
                  <div className="text-start col-3">
                    <Submit value="Edit User" type="submit" />
                  </div>
                  <div className="text-start col-9 p-0">
                    <BtnCancel type="button" onClick={() => setEdit(!edit)}>Cancel</BtnCancel>
                  </div>
                </div>
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
                      confirmButtonColor: "#8000ff",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        postData(object);
                        reset();
                        dispatch(getListDpManagementAction());
                        setShow(false);
                        Swal.fire({
                            title: "succesfully",
                            icon:"success",
                            confirmButtonText: "OK",
                            confirmButtonColor:"#8000ff",
                          });
                      } else {
                      }
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
                        required: false
                      })}
                      className="w-100"
                      onClick={(event) => getGroup(event)}
                    >
                      <option></option>
                      {dataGroup?.map((e) => (
                        <option key={e._id}>{e.Name}</option>
                      ))}
                    </Select>
                    <Error className="w-100">{errors.Group?.message}</Error>
                  </div>
                  <div className="row">
                    <div className="text-start col-3">
                      <Submit value="Add User" type="submit" />
                    </div>
                    <div className="text-start col-9 p-0">
                      <BtnCancel type="button" onClick={() => setShow(!show)}>Cancel</BtnCancel>
                    </div>
                  </div>
                </FooterForm>
              </Modal.Body>
            </Modal>
          </div>
          <div className="container-fluid">
            <div className="row pb-5">
              <DivBtn className="col-lg-4 col-sm-4 mb-2 text-start">
                <Btn onClick={() => { setShow(true); reset() }}>Add New User</Btn>
              </DivBtn>
              <div className="col-lg-5 col-sm-2"></div>
              <div className="col-lg-3 col-sm-3 p-0 text-end" >

                <OverlayTrigger
                  overlay={
                    <Tooltip id={`tooltip`}>Search Name,Phone,Address</Tooltip>
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
                      <td
                        className="testColor"
                        style={{ textTransform: "capitalize" }}
                      >
                        {item.Name}
                      </td>
                      <td>
                        <Image
                          style={{ width: "70px" }}
                          src={item.Avatar ? item.Avatar : Avatar}
                        ></Image>
                      </td>
                      <td>{item.Gmail}</td>
                      <td>{item.Phone}</td>
                      <td style={{ textTransform: "capitalize" }}>
                        {item.Address}
                      </td>
                      <td style={{ textTransform: "capitalize" }}>
                        {dataRole?.map((e) =>
                          item?.RoleId?.includes(e?.Id) ? (
                            <h6 key={e._id}>{e.RoleName}</h6>
                          ) : (
                            ""
                          )
                        )}
                      </td>

                      <td>
                        {dataGroup?.map((e) =>
                          item?.GroupId?.includes(e?._id) ? (
                            <h6 key={e._id}>{e.Name}</h6>
                          ) : (
                            ""
                          )
                        )}
                      </td>
                      {roleName === "Admin" ? (
                        item._id === id ||
                        item.RoleId === "1" ||
                        item.RoleId === "2" ? (
                          <td>
                            <BtnAction
                              onClick={() => {
                                setEdit(true);
                                getEdit(item._id);
                              }}
                            >
                              <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                                <FontAwesomeIcon
                                  style={{ color: "#1FCE2D" }}
                                  icon={faSquarePen}
                                />
                              </OverlayTrigger>
                            </BtnAction>{" "}
                            <BtnAction
                              onClick={() =>
                                Swal.fire({
                                  title: "Are you sure DELETE?",
                                  text: "You will not be able to recover this USER",
                                  icon: "warning",
                                  iconHtml: "!",
                                  confirmButtonColor: "#DD6B55",
                                  confirmButtonText: "Oke",
                                  cancelButtonText: "Cancel",
                                  showCancelButton: true,
                                  showCloseButton: true,
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    DeleteData(item._id);
                                    setShow(false);
                                    dispatch(getListDpManagementAction());
                                    Swal.fire("successfully", "", "success");
                                  }
                                })
                              }
                            >
                              <OverlayTrigger
                                overlay={<Tooltip>Delete</Tooltip>}
                              >
                                <FontAwesomeIcon
                                  style={{ color: "#00AEEF" }}
                                  icon={faTrash}
                                />
                              </OverlayTrigger>
                            </BtnAction>
                          </td>
                        ) : (
                          ""
                        )
                      ) : roleName === "Manager" ? (
                        item.RoleId === "1" || item._id === id ? (
                          <td>
                            <BtnAction
                              onClick={() => {
                                setEdit(true);
                                getEdit(item._id);
                              }}
                            >
                              <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                                <FontAwesomeIcon
                                  style={{ color: "#1FCE2D" }}
                                  icon={faSquarePen}
                                />
                              </OverlayTrigger>
                            </BtnAction>{" "}
                            <BtnAction
                              onClick={() =>
                                Swal.fire({
                                  title: "Are you sure DELETE?",
                                  text: "You will not be able to recover this USER",
                                  icon: "warning",
                                  iconHtml: "!",
                                  confirmButtonColor: "#DD6B55",
                                  confirmButtonText: "Oke",
                                  cancelButtonText: "Cancel",
                                  showCancelButton: true,
                                  showCloseButton: true,
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    DeleteData(item._id);
                                    setShow(false);
                                    dispatch(getListDpManagementAction());
                                    Swal.fire("successfully", "", "success");
                                  }
                                })
                              }
                            >
                              <OverlayTrigger
                                overlay={<Tooltip>Delete</Tooltip>}
                              >
                                <FontAwesomeIcon
                                  style={{ color: "#00AEEF" }}
                                  icon={faTrash}
                                />
                              </OverlayTrigger>
                            </BtnAction>
                          </td>
                        ) : (
                          ""
                        )
                      ) : (
                        ""
                      )}
                    </TR>
                  ))}
                </tbody>
              </Table>
            </Row>
          </DivTable>
        </Body>
      {/* </Container> */}
    </React.Fragment>
  );
};

export default ManagementUser;
