import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { dataAlumni } from "../../../constants/data.js";
import {
  Body,
  Btn,
  Container,
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
const ManagementUser = () => {
  const dpManagement = useSelector(
    (state) => state.dpManagement.dpManagementState
  );
  const dispatch = useDispatch();
  const data = dpManagement.data;
  useEffect(() => {
    dispatch(getListDpManagementAction());
  }, [dispatch]);

  const [show, setShow] = useState(false);
  const renderTableHeader = () => {
    const header = Object.keys(dataAlumni[0]);
    return header.map((key, index) => <TH key={index}>{key.toUpperCase()}</TH>);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
                        reset();
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
                    />
                    <Error className="w-100">{errors.Name?.message}</Error>
                  </div>
                  <div>
                    <Label className="w-100">Email</Label>
                    <Input
                      type="email"
                      {...register("Email", {
                        required: "The field is required.",
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Email Invalid",
                        },
                      })}
                      className="w-100"
                    />
                    <Error className="w-100">{errors.Email?.message}</Error>
                  </div>
                  <div>
                    <Label className="w-100">RoleId</Label>
                    <Input
                      {...register("RoleId", {
                        required: "The field is required.",
                      })}
                      className="w-100"
                    />
                    <Error className="w-100">{errors.RoleId?.message}</Error>
                  </div>
                  <div>
                    <Label className="w-100">password</Label>

                    <Input
                      type="text"
                      {...register("password", {
                        required: "The field is required.",
                      })}
                      className="w-100"
                    />
                    <Error className="w-100">{errors.password?.message}</Error>
                  </div>
                  <Submit value="Send" className="mt-2" type="submit" />
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
                <input placeholder="search"></input>
                <button  type="button" className="btn btn-primary search-product-box" 
                onChange={1}>
                  search
                </button>
              </div>
            </div>
          </div>

          <div className="container-fluid">
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
                      <TD>{item.password}</TD>
                    </TR>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Body>
      </Container>
    </React.Fragment>
  );
};

export default ManagementUser;
