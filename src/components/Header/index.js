// import axios from "axios";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import avatarnull from "../../assets/images/avatarnull.png";
import profile from "../../assets/images/profile.png";
import resetpassword from "../../assets/images/reset-password.png";
import shutdown from "../../assets/images/shutdown.png";
import logo from "../../assets/images/power_red.svg";
import { logoutAction } from "../../stores/slices/user.slice";
import Notifycation from "../Notification";
import {
  Back,
  DropdownLogo,
  HeaderAvatar,
  HeaderBg,
  HeaderInner,
  HeaderLogo,
  HeaderLogoInner,
  HeaderLogoWrapper,
  HeaderLogoff,
  HeaderName,
  HeaderRow,
  HeaderWrapper,
  ResetImg,
  StImg,
  StyleLink
} from "./style";
import { Link } from "react-router-dom";

const Header = () => {
  const userInfo = useSelector((state) => state.users.userInfoState);
  const dispatch = useDispatch();
  const Name = userInfo.data?.user?.Name;
  const Avatar = userInfo.data?.user?.Avatar;
  const logout = () => {
    Swal.fire({
      title: "Log out?",
      icon: "question",
      iconHtml: "?",
      confirmButtonText: "Yes",
      cancelButtonText: "Cancel",
      showCancelButton: true,
      showCloseButton: true,
      confirmButtonColor: "#8000ff",
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
          <HeaderLogo className="col-sm-3 col-lg-2">
            <HeaderLogoWrapper>
              <HeaderLogoInner><Link to="/"><StImg src={logo} /></Link></HeaderLogoInner>
            </HeaderLogoWrapper>
          </HeaderLogo>
          <HeaderLogoff className="col-sm-9 col-lg-10">
            <HeaderName className="navbar-user">
              Hi, <span> {Name} </span>{" "}
            </HeaderName>
            <Notifycation></Notifycation>
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
