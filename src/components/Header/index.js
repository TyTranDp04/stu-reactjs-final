// import axios from "axios";
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import avatarnull from "../../assets/images/avatarnull.png";
import profile from "../../assets/images/profile.png";
import resetpassword from "../../assets/images/reset-password.png";
import shutdown from "../../assets/images/shutdown.png";
import logo from "../../assets/images/stlogo.png";
import Notifycation from "../Notification";
import { getUserAction, logoutAction } from "../../stores/slices/user.slice";
import {
  Back,
  DropdownLogo,
  HeaderAvatar,
  HeaderBg,
  HeaderInner,
  HeaderLogo,
  HeaderLogoff,
  HeaderName,
  HeaderRow,
  HeaderWrapper,
  ResetImg,
  StImg,
  StyleLink,
} from "./style";
// import Cookies from 'universal-cookie';
// const cookies = new Cookies();

const Header = () => {
  const userInfo = useSelector((state) => state.users.userInfoState);
  // const [data, setData] = useState();
  // console.log("data: ", data);
  const dispatch = useDispatch();
  const Name = userInfo.data?.user?.Name;
  const Avatar = userInfo.data?.user?.Avatar;
  const ID = userInfo.data?.user?.id;

  // useEffect(() => {
  //   dispatch(getUserAction(ID));
  // }, [dispatch]);

  // const refresh = cookies.get('myCat')
  //  console.log(refresh);
  // const getData = async () => {
  //   const url = `http://localhost:3636/user/${ID}`;
  //   await axios
  //       .get(url)
  //       .then((res) => {
  //         setData(res.data);
  //         cookies.set('myCat','false');

  //       })
  //       .catch((err) => console.log(err));
  // }

  // useEffect (() => {
  //   if (refresh === true) {document.addEventListener("mousedown", getData)}
  //   document.addEventListener("mousedown", getData)}, [refresh]);

  const logout = () => {
    Swal.fire({
      title: "Log out?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutAction());
      } else {
        Swal.fire(" Cancel!", "", "error");
      }
    });
  };

  return (
    <HeaderRow className="row">
      <HeaderBg className="col-sm-12"></HeaderBg>
      <HeaderWrapper className="container-fluid">
        <HeaderInner className="row">
          <HeaderLogo className="col-sm-2">
            <StImg src={logo} />
          </HeaderLogo>
          <HeaderLogoff className="col-sm-10">
            {/* <HeaderLogoffButton>{Name}</HeaderLogoffButton> */}
            <HeaderName className="navbar-user">
              Hi, <span> {Name} </span>{" "}
            </HeaderName>
            <Dropdown>
              <DropdownLogo>
                <Dropdown.Toggle
                  className="droplogo"
                  variant="success"
                  id="dropdown-basic"
                >
                  <HeaderAvatar>
                    {Avatar ? (
                      <StImg className="avatar" src={Avatar} />
                    ) : (
                      <StImg className="avatar" src={avatarnull} />
                    )}
                  </HeaderAvatar>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <StyleLink to="/change-password">
                    <Dropdown.Item className="content" href="#/action-1">
                      <ResetImg src={resetpassword} />
                      Change Password
                    </Dropdown.Item>
                  </StyleLink>
                  <StyleLink to="/my-profile">
                    <Dropdown.Item className="content" href="#/action-2">
                      <ResetImg src={profile} />
                      My Profile
                    </Dropdown.Item>
                  </StyleLink>
                  <Dropdown.Item className="content" href="#/action-3">
                    <Back onClick={() => logout()}>
                      <ResetImg src={shutdown} />
                      Logout
                    </Back>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </DropdownLogo>
            </Dropdown>
          </HeaderLogoff>
        </HeaderInner>
      </HeaderWrapper>
    </HeaderRow>
  );
};

export default Header;
