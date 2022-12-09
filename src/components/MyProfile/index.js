import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  getUserActionSuccess
} from "../../stores/slices/user.slice";

import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";
import * as yup from "yup";
import { TextRed } from "../Login/style.js";
import {
  BtnImgRemove,
  Cancel,
  Clearfix,
  Container,
  H1,
  IconRemove,
  ImgContent,
  ImgContentButton,
  ImgPreview,
  ImgPreviewItem,
  Input,
  Signupbtn
} from "./style.js";
const cookies = new Cookies();
const schema = yup
  .object()
  .shape({
    address: yup
      .string()
      .required("Old Password is required")
      .min(1, "Password min is 6 , max is 16 ."),
    //   .max(16, "Password min is 6 , max is 16 ."),
    Gmail: yup
      .string()
      .required("New Password is required")
      .min(1, "Password min is 6 , max is 16 ."),
    //   .max(16, "Password min is 6 , max is 16 ."),
    Name: yup
      .string()
      .oneOf([yup.ref("Password"), null], "Passwords must match")
      .required("Confirm Password is required")
      .min(1, "Password min is 6 , max is 16 ."),
    //   .max(16, "Password min is 6 , max is 16 ."),
  })
  .required();

const MyProfile = () => {
  const userInfo = useSelector((state) => state.users.userInfoState);
  // const [userInfo, setUserInfo] = useState(
  //   useSelector((state) => state.users.userInfoState)
  // );
  const [data, setData] = useState();
  // console.log("data: ", userInfo.data.user);
  //  console.log(ID);

  //  const refresh = cookies.get('myCat')
  // useEffect (() => {
  //   refreshData()
  //   if (refresh === true) {document.addEventListener("mousedown", getData)}
  //   }, [refresh]);

  const form = document.getElementById("form");
  const ID = userInfo?.data?.user?.id;
  const EGmail = data?.Gmail;
  // const fullname = data??.Name;
  const fullname = data?.Name;
  const avatar = data?.Avatar;
  console.log(avatar);
  let roleID = data?.RoleId;
  const address = data?.Address;
  const Phone = data?.Phone;
  const groupID = data?.GroupId;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState();
  const [fileIMG, setfileIMG] = useState();
  const addImg = document.getElementById("img");
  const [filePatch, setFilePatch] = useState([]);

  function addImgHandle() {
    addImg.click();
  }

  useEffect(() => {
    setSelectedImage(avatar);
  }, [avatar]);

  const removeSelectedImage = () => {
    setSelectedImage(null);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function handleOnChange(e) {
    Object.values(e.target.files).forEach((e) => {
      setSelectedImage(URL.createObjectURL(e));
      setfileIMG(e);
      console.log("file" ,e);
    });
  }

  async function postData() {
    const url = "http://localhost:3636/user/" + ID;
    const newForm = new FormData(form);
    console.log("newForm",newForm);
    await axios
      .post(url, newForm)
      .then((res) => {
        console.log("data : ",res.data);
      })
      .catch((err) => console.log(err));
  }

  const getData = async () => {
    const url = `http://localhost:3636/user/${ID}`;
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

  let rolename = null;
  if (roleID === "1") {
    rolename = "USER";
  }
  if (roleID === "2") {
    rolename = "MASTER";
  }
  if (roleID === "3") {
    rolename = "HR";
  }

  const onSubmit = () => {
    Swal.fire({
      title: "Update my Profile?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(" success!", "", "success");
        postData();
        getData();
      } else {
        Swal.fire(" Cancel!", "", "error");
      }
    });
  };

  return (
    <div className="col-sm-9">
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <Container className="container">
          <H1>MY PROFILE</H1>
          <hr />
         <div className="container_show1">
         <span>ROLE NAME : </span>
          <Input
            type="text"
            disabled
            placeholder="RoleName"
            defaultValue={rolename}
          />
          <Input
            disabled
            type="text"
            placeholder="GroupID"
            defaultValue={groupID}
          />
         </div>
          <div className="container_show">
            <TextRed>{errors.ID?.message}</TextRed>

            <Input
              disabled
              type="email"
              placeholder="Gmail Address"
              defaultValue={EGmail}
              {...register("Gmail")}
            />
            <TextRed>{errors.Gmail?.message}</TextRed>
            <span className="show-btn">
              <i className="fas fa-eye"></i>
            </span>
          </div>
          <Input
            type="text"
            placeholder="Name"
            defaultValue={fullname}
            {...register("Name")}
          />
          <Input
            type="file"
            hidden
            id="img"
            name="img"
            // {...register("file")}
            onChange={(e) => handleOnChange(e)}
            accept="image/*"
          />
          {
            <ImgPreview className="img__preview">
              <ImgContentButton type="button" onClick={() => addImgHandle()}>
                + Thêm Ảnh
              </ImgContentButton>
              {selectedImage ? (
                <ImgContent className="img__preview-content">
                  <ImgPreviewItem
                    className="img__preview-image"
                    // src={selectedImage}
                    src={selectedImage}
                    alt="Image Preview"
                  />
                  <BtnImgRemove
                    onClick={() => removeSelectedImage()}
                    className="btn__remove-img"
                  >
                    <IconRemove className="fa-solid fa-xmark"></IconRemove>
                  </BtnImgRemove>
                </ImgContent>
              ) : (
                ""
              )}
            </ImgPreview>
          }
          <Input
            type="text"
            placeholder="Address"
            defaultValue={address}
            {...register("Address")}
          />
          <TextRed>{errors.Gmail?.message}</TextRed>
          <Input
            type="number"
            placeholder="Phone Number"
            defaultValue={Phone}
            {...register("Phone")}
          />
          <TextRed>{errors.Gmail?.message}</TextRed>

          <Clearfix>
            <Signupbtn className="submit" type="submit">
              Update My Profile
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
export default MyProfile;
