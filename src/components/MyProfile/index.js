import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { updateAvata } from "../../stores/slices/user.slice";

import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import * as yup from "yup";
import imgnull from "../../assets/images/trend-avatar-1.jpg";
import { TextRed } from "../Login/style.js";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  BtnImgRemove,
  Cancel,
  Clearfix,
  Container,
  H1,
  IconRemove,
  ImgContent,
  ImgPreview,
  ImgPreviewItem,
  Input,
  NameGroup,
  Signupbtn,
} from "./style.js";

const schema = yup
  .object()
  .shape({
    Phone: yup
    .string()
      .required("Phone number is required")
      .max(12, "PhoneNumber is 9")
      .min(9, "PhoneNumber is 9 "),
    Name: yup
      .string()
      .max(50, "Name is required "),
    Address: yup
      .string()
      .max(50,"Address is required")
  });

const MyProfile = () => {
  const userInfo = useSelector((state) => state.users.userInfoState);

  const [data, setData] = useState();

  const form = document.getElementById("form");
  const ID = userInfo?.data?.user?.id;
  const EGmail = data?.Gmail;
  const fullname = data?.Name;
  const avatar = data?.Avatar;
  let roleID = data?.RoleId;
  const address = data?.Address;
  const Phone = data?.Phone;
  const [group, setGroup] = useState();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState();
  const [fileIMG, setfileIMG] = useState();
  const addImg = document.getElementById("img");
  const [isLoading, setIsLoading] = useState(false);
  
  function addImgHandle() {
     addImg.click();
  }

  useEffect(() => {
    setSelectedImage(avatar);
  }, [avatar]);

  const removeSelectedImage = () => {
    setSelectedImage("");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  function handleOnChange(e) {
    Object.values(e.target.files).forEach((e) => {
      if (selectedImage !== null) {
        setSelectedImage(URL.createObjectURL(e));
        setfileIMG(e);
      } else {
      }
    });
  }
  async function postData() {
    const url = "http://localhost:3636/user/" + ID;
    const newForm = new FormData(form);
    await axios
      .post(url, newForm)
      .then((res) => {
        setIsLoading(false);
        getData();
        Swal.fire(" Update Succes!", "", "success");
        dispatch(updateAvata(res.data));
      })
      .catch((err) => console.log(err));
  }
  const getData = async () => {
    const url = `http://localhost:3636/user/${ID}`;
    await axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
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
    let timerInterval;
    setIsLoading(true);
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
        Swal.fire({
          title: "Updating...!",
          timer: 40000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
          }
        });
        postData();
        
      } else {
        Swal.fire(" Cancel!", "", "error");
      }
    });
  };
  const getGroup = async () => {
    const url = `http://localhost:3636/group`;
    await axios
      .get(url)
      .then((res) => {
        setGroup(res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getGroup();
  }, []);
  const groupNameID = [];
  let groupID = data?.GroupId;
   groupID?.map(function (item) {
    {
      group.data?.map(function (name) {
        if (item === name._id) {
          groupNameID.push(name.Name);
         }
      });
    }
   });

  return (
    <div className="col-sm-9">
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <Container className="container">
          <H1>MY PROFILE</H1>
          <hr />
          <div className="container_show1">
            <span className="lableName">ROLE NAME </span>
            <Input
              type="text"
              disabled
              placeholder="RoleName"
              defaultValue={rolename}
            />
            <span className="lableName">GROUP NAME </span>
            <NameGroup className="Name">
              {" "}
              {groupNameID?.map((NameGroup) => (
                <div className="Groupname">
                  <h3>{NameGroup}</h3>
                </div>
              ))}
            </NameGroup>
          </div>
          <div className="container_show">
            <span className="lableName">GMAIL </span>
            <Input
              disabled
              type="email"
              placeholder="Gmail Address"
              defaultValue={EGmail}
              {...register("Gmail")}
            />
            <span className="show-btn">
              <i className="fas fa-eye"></i>
            </span>
          </div>
          <span className="lableName">NAME </span>
          <Input
            type="text"
            placeholder="Name"
            defaultValue={fullname}
            {...register("Name")}
            
          />
          <TextRed>{errors.Name?.message}</TextRed>

          <span className="lableName">IMAGE </span>
          <Input
            type="file"
            hidden
            id="img"
            name="img"
            // {...register("file")}
            onChange={(e) => handleOnChange(e)}
            accept="image/*"
          />
          <ImgPreview className="img__preview">

            {selectedImage ? (
              <ImgContent className="img__preview-content">
                <ImgPreviewItem
                  className="img__preview-image"
                  onClick={() => addImgHandle()}
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
              <ImgContent className="img__preview-content">
                <ImgPreviewItem
                  className="img__preview-image"
                  onClick={() => addImgHandle()}
                  src={imgnull}
                  alt="Image Preview"
                />
              </ImgContent>
            )}
          </ImgPreview>
          <span className="lableName">ADRESS</span>
          <Input
            type="text"
            placeholder="Address"
            defaultValue={address}
            {...register("Address")}
          />
          <TextRed>{errors.Address?.message}</TextRed>
          <div className="lableName">PHONE NUMBER</div> <br />
          <div className="phoneNumber">
            <Input className="phonedefault" placeholder="+84" disabled />
            <Input
              type="number"
              placeholder="Phone Number"
              defaultValue={Phone}
              {...register("Phone")}
            />
          </div>
          <TextRed>{errors.Phone?.message}</TextRed>
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
