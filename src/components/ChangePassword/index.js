import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import * as yup from "yup";
import { changePasswordAction } from "../../stores/slices/user.slice";
import { DayOffHistoryCol } from "../Admin/DayOffHistory/style";
import { Form, TextRed } from "../Login/style";
import {
  Cancel,
  Clearfix,
  Container,
  FormInner,
  H1,
  Input,
  P,
  Signupbtn,
  SubmitDiv,
} from "./style.js";
const schema = yup
  .object()
  .shape({
    oldPassword: yup
      .string()
      .required("Old Password is required"),
    Password: yup
      .string()
      .required("New Password is required")
      .min(8, "Password min is 8 , max is 16 .")
      .max(16, "Password min is 8 , max is 16 ."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("Password"), null], "Passwords must match")
      .required("Confirm Password is required")
      .min(8, "Password min is 8 , max is 16 .")
      .max(16, "Password min is 8 , max is 16 ."),
  })
  .required();
const ChangePassword = () => {
  const [data, setData] = useState();
  const userInfo = useSelector((state) => state.users.userInfoState);
  const id = userInfo?.data?.id;

  let ChangePassword = data?.Password;
  console.log("data",ChangePassword);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getData = async () => {
    const url = process.env.REACT_APP_URL_WEBSITE + `/user-getone/${id}`;
    await axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (adata, notify) => {
    Swal.fire({
      title: "Change Password ?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#8000ff",
    }).then((result) => {
      if (result.isConfirmed) {
        if (adata.Password === adata.oldPassword) {
          Swal.fire(
            "Old Password and New Password cannot be the same!",
            "",
            "error"
          );
          toast.error("Old Password and New Password cannot be the same");
        } else if (ChangePassword === adata.oldPassword) {
          dispatch(
            changePasswordAction({
              id: id,
              Password: adata.Password,
            })
          );
          Swal.fire({
            title: "Update success",
            icon: "success",
            confirmButtonText: "Ok",
            showCloseButton: true,
            confirmButtonColor: "#8000ff",
          })
          ChangePassword = adata.Password;
          navigate("/");
        } else {
          toast.error("Old Password Incorrect");
          Swal.fire("Old Password Incorrect!", "", "error");
        }
      } else {
        Swal.fire({
          title: "Cancel !!",
          icon: "error",
          confirmButtonText: "Ok",
          showCloseButton: true,
          confirmButtonColor: "#8000ff",
        })
      }
    });
  };

  return (
    <DayOffHistoryCol className='col-sm-9 col-lg-10'>
      <Form style={{ padding: "0", margin: "auto", backgroundColor: "#f0f4f7" }} onSubmit={handleSubmit(onSubmit)}>
        <Container className="container">
          <H1>CHANGE PASSWORD</H1>
          <P>Please enter the information below.</P>
          <hr />
          <FormInner>
            <Input
              type="password"
              placeholder="Old Password"
              {...register("oldPassword")}
            />
            <TextRed>{errors.oldPassword?.message}</TextRed>

            <div className="container_show">
              <Input
                type="password"
                placeholder="New Password"
                {...register("Password")}
              />
              <TextRed >{errors.Password?.message}</TextRed>
              <span className="show-btn">
                <i className="fas fa-eye"></i>
              </span>
            </div>

            <Input
              type="password"
              placeholder="Confirm New Password"
              {...register("confirmPassword")}
            />
            <TextRed>{errors.confirmPassword?.message}</TextRed>

            <Clearfix>
              <SubmitDiv>
                <Signupbtn className="submit" type="submit">Change Password</Signupbtn>
              </SubmitDiv>
              <Cancel className="submit">
                <Link className="linkcanel" to={"/"}>Cancel</Link>
              </Cancel>
            </Clearfix>
          </FormInner>
          <ToastContainer
            style={{ display: "block", position: "fixed", zIndex: "99999" }}
            autoClose={1000}
          />
        </Container>
      </Form>
    </DayOffHistoryCol>
  );
};

export default ChangePassword;
