import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextRed } from "../Login/style";
import { changePasswordAction } from "../../stores/slices/user.slice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Cancel,
  Clearfix,
  Container,
  H1,
  Input,
  P,
  Signupbtn,
} from "./style.js";
import Swal from "sweetalert2";
import axios from "axios";
const schema = yup
  .object()
  .shape({
    oldPassword: yup
      .string()
      .required("Old Password is required")
      .min(6, "Password min is 6 , max is 16 .")
      .max(16, "Password min is 6 , max is 16 ."),
    Password: yup
      .string()
      .required("New Password is required")
      .min(6, "Password min is 6 , max is 16 .")
      .max(16, "Password min is 6 , max is 16 ."),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("Password"), null], "Passwords must match")
      .required("Confirm Password is required")
      .min(6, "Password min is 6 , max is 16 .")
      .max(16, "Password min is 6 , max is 16 ."),
  })
  .required();
const ChangePassword = () => {
    const [data, setData] = useState();
  const userInfo = useSelector((state) => state.users.userInfoState);
  console.log(userInfo.data?.user , "user");
  const id = userInfo.data?.user?.id;
  let ChangePassword = data?.Password;
  console.log("abc : " ,ChangePassword);
  console.log(userInfo?.data?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getData = async () => {
    const url = `http://localhost:3636/user/${id}`;
    await axios
      .get(url)
      .then((res) => {
        setData(res.data);
        console.log('getdata: ', res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect (() => {
    getData()
    }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (adata, notify) => {
    console.log(adata);
    Swal.fire({
      title: "Change Password ?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
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
              id:id,
              Password: adata.Password,
            })
          );
          navigate("/");
          Swal.fire("Change password success!", "", "success");
          ChangePassword = adata.Password;
          console.log(userInfo.adata?.user);
        } else {
          toast.error("Old Password Incorrect");
          Swal.fire("Old Password Incorrect!", "", "error");
        }
      } else {
        Swal.fire(" Cancel!", "", "error");
      }
    });
  };

  return (
    <div className="col-sm-9">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container className="container">
          <H1>CHANGE PASSWORD</H1>
          <P>Please enter the information below.</P>
          <hr />
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
            <TextRed>{errors.Password?.message}</TextRed>
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
            <Signupbtn className="submit" type="submit">
              Change Password
            </Signupbtn>
            <Cancel className="submit">
              <Link className="linkcanel" to={"/"}>
                Cancel
              </Link>
            </Cancel>
          </Clearfix>
          <ToastContainer
            style={{ display: "block", position: "fixed", zIndex: "99999" }}
            autoClose={1000}
          />
        </Container>
      </form>
    </div>
  );
};

export default ChangePassword;
