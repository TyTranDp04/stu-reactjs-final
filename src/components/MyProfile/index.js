/* eslint-disable no-lone-blocks */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { updateAvata } from "../../stores/slices/user.slice";

import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import * as yup from "yup";
import imgnull from "../../assets/images/trend-avatar-1.jpg";
import { DayOffHistoryCol } from "../Admin/DayOffHistory/style";
import { Cancel, Clearfix, Input, Signupbtn, SubmitDiv } from "../ChangePassword/style";
import { TextRed } from "../Login/style.js";
import {
  Container,
  H1,
  ImgContent,
  ImgPreview,
  ImgPreviewItem,
  NameGroup,
} from "./style.js";
const schema = yup.object().shape({
  Phone: yup
    .string(),
  Name: yup.string().max(50, "Name is required "),
  Address: yup.string().max(50, "Address is required"),
});

const MyProfile = () => {
  const userInfo = useSelector((state) => state.users.userInfoState);
  const [data, setData] = useState();

  const form = document.getElementById("form");
  const ID = userInfo?.data?.id;
  const EGmail = data?.Gmail;
  const fullname = data?.Name;
  const avatar = data?.Avatar;
  let roleID = data?.RoleId;
  const address = data?.Address;
  const Phone = data?.Phone;
  const [group, setGroup] = useState();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState();
  const [, setfileIMG] = useState();
  const addImg = document.getElementById("img");
  const [, setIsLoading] = useState(false);

  function addImgHandle() {
    addImg.click();
  }

  useEffect(() => {
    setSelectedImage(avatar);
  }, [avatar]);

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
    const url = process.env.REACT_APP_URL_WEBSITE + "/user/" + ID;
    const newForm = new FormData(form);
    await axios
      .post(url, newForm)
      .then((res) => {
        setIsLoading(false);
        getData();
        Swal.fire({
          title: "Update success",
          icon: "success",
          confirmButtonText: "Ok",
          showCloseButton: true,
          confirmButtonColor: "#8000ff",
        })
        dispatch(
          updateAvata({
            Name: data.Name,
            Address: res.data.Address,
            Avatar: res.data.Avatar,
            Phone: res.data.Phone,
          })
        );
      })
      .catch((err) => console.log(err));
  }
  const getData = async () => {
    const url = process.env.REACT_APP_URL_WEBSITE + `/user-getone/${ID}`;
    await axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let rolename = null;
  if (roleID === "1") {
    rolename = "User";
  }
  if (roleID === "2") {
    rolename = "Master";
  }
  if (roleID === "3") {
    rolename = "Hr";
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
      confirmButtonColor: "#8000ff",
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
  const getGroup = async () => {
    const url = process.env.REACT_APP_URL_WEBSITE + `/group`;
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
  // eslint-disable-next-line array-callback-return
  groupID?.map(function (item) {
    {
      // eslint-disable-next-line array-callback-return
      group?.data?.filter(function (name) {
        if (item === name._id) {
          groupNameID.push(name.Name);
        }
      });
    }
  });

  return (
    <DayOffHistoryCol className='col-sm-9 col-lg-10'>
      <form id="form" onSubmit={handleSubmit(onSubmit)}>
        <Container className="container">
          <H1>MY PROFILE</H1>
          <hr />
          <div className="container_top">
            <div className="container_left">
              <div className="container_show1">
                <span className="lableName">Role </span>
                <Input
                  type="text"
                  disabled
                  placeholder="RoleName"
                  defaultValue={rolename}
                />
              </div>
              <div>
                <span className="lableName">Group </span>
                <NameGroup className="Name">
                  {" "}
                  {groupNameID?.map((NameGroup, index) => (
                    <div className="Groupname" key={index}>
                      <h3>{NameGroup}</h3>
                    </div>
                  ))}
                </NameGroup>
              </div>
              <div>
                <span className="lableName">Name </span>
                <Input
                  type="text"
                  placeholder="Name"
                  defaultValue={fullname}
                  {...register("Name")}
                  disabled
                />
                <TextRed>{errors.Name?.message}</TextRed>
              </div>

              <div className="container_show">
                <span className="lableName">Email </span>
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
            </div>

            <div className="container_right">
              <div className="container_avatar">
                <span className="lableName">Avatar </span>
                <Input
                  type="file"
                  hidden
                  id="img"
                  name="img"
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
              </div>
              <div>
                <span className="lableName">Address</span>
                <Input
                  type="text"
                  placeholder="Address"
                  defaultValue={address}
                  {...register("Address")}
                />
                <TextRed>{errors.Address?.message}</TextRed>
              </div>
              <div>
                <div className="lableName">Phone Number</div> <br />
                <div className="phoneNumber">
                  <Input
                    type="number"
                    placeholder="Phone Number"
                    defaultValue={Phone}
                    {...register("Phone")}
                  />
                </div>
                <TextRed>{errors.Phone?.message}</TextRed>
              </div>
            </div>
          </div>
          <Clearfix>
            <SubmitDiv>
              <Signupbtn className="submit" type="submit">Update</Signupbtn>
            </SubmitDiv>
            <Cancel className="submit">
              <Link className="linkcanel" to={"/"}>Cancel</Link>
            </Cancel>
          </Clearfix>
          <ToastContainer
            style={{ display: "block", position: "fixed", zIndex: "99999" }}
            autoClose={1000}
          />
        </Container>
      </form>
    </DayOffHistoryCol>
  );
};
export default MyProfile;
