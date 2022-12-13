import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  getUserActionSuccess,
  updateAvata,
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
  NameGroup,
  Signupbtn,
} from "./style.js";
import imgnull from "../../assets/images/trend-avatar-1.jpg";

const cookies = new Cookies();
const schema = yup
  .object()
  .shape({
    Phone: yup
      .string()
      .required("Old Password is required")
      .min(1, "Password min is 6 , max is 16 ."),
    //   .max(16, "Password min is 6 , max is 16 ."),
    Name: yup
      .string()
      .required("Confirm Password is required")
      .min(1, "Password min is 6 , max is 16 ."),
    //   .max(16, "Password min is 6 , max is 16 ."),
    Address: yup
      .string()
      .required("Confirm Password is required")
      .min(1, "Password min is 6 , max is 16 ."),
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
  // console.log(avatar);
  let roleID = data?.RoleId;
  const address = data?.Address;
  const Phone = data?.Phone;
  const [group, setGroup] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState();
  const [fileIMG, setfileIMG] = useState();
  const addImg = document.getElementById("img");
  const [filePatch, setFilePatch] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log("selectedImage", selectedImage);
  function addImgHandle() {
    const addImage = addImg.click();
    console.log('addImage: ', addImage);
  }

  useEffect(() => {
    setSelectedImage(avatar);
  }, [avatar]);

  const removeSelectedImage = () => {
    setSelectedImage(false); 
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function handleOnChange(e) {
    Object.values(e.target.files).forEach((e) => {
      if (selectedImage !== null) {
      setSelectedImage(URL.createObjectURL(e));
          setfileIMG(e);
         console.log("AT :" ,URL.createObjectURL(e));
        // console.log("ST : ",setfileIMG(e));
      } else
      {
       
        // setSelectedImage("blob:http://localhost:3000/7a9ab388-3e45-4aae-8cfc-5c2c77b09099")
      }
    });
  }
  async function postData() {
    const url = "http://localhost:3636/user/" + ID;
    const newForm = new FormData(form);
     console.log("newForm", newForm);
    await axios
      .post(url, newForm)
      .then((res) => {
        setIsLoading(false);
        console.log("loading xg");
        Swal.fire(" success!", "", "success");
        // loading = false;
        // console.log("hihi", res.data.Avatar);
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
        // console.log("getdata: ", res.data);
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
  console.log(isLoading, "isLoading");
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
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        // console.log("Dangload", loading);
        postData();
        getData();
        console.log("chừ loading");
        // console.log(loading);
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
        // console.log("getgroup: ", res.data);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getGroup();
  }, []);
  const groupNameID = [];
  // console.log("groupNameID", groupNameID);
  let groupID = data?.GroupId;
  groupID?.map(function (item) {
    {
      group?.map(function (name) {
        if (item === name._id) {
          groupNameID.push(name.Name);
          // console.log("abcdéadsdas", name.Name);
        }
      });
    }
  });
  groupNameID?.map(function (NameGroup) {
    // console.log("a", NameGroup);
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
            <TextRed>{errors.ID?.message}</TextRed>
            <span className="lableName">GMAIL </span>
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
          <span className="lableName">NAME </span>
          <Input
            type="text"
            placeholder="Name"
            defaultValue={fullname}
            {...register("Name")}
          />
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
            {/* <ImgContentButton type="button" onClick={() => addImgHandle()}>
              + Thêm Ảnh
            </ImgContentButton> */}

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
          <TextRed>{errors.Gmail?.message}</TextRed>
          <span className="lableName">PHONE NUMBER</span>
          <div className="phoneNumber">
            <div>+84</div>
            <Input
              type="number"
              placeholder="Phone Number"
              defaultValue={Phone}
              {...register("Phone")}
            />
          </div>

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
