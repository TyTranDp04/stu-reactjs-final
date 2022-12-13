import React from "react";
import logo from "../../assets/images/stlogo.png";
import resetpassword from "../../assets/images/reset-password.png";
import profile from "../../assets/images/profile.png";
import shutdown from "../../assets/images/shutdown.png";
import Swal from "sweetalert2";
import Notifycation from "../Notification";
import {logoutAction } from "../../stores/slices/user.slice";
import {
  Back,
  DropdownLogo,
  HeaderAvatar,
  HeaderBg,
  HeaderInner,
  HeaderLogo,
  HeaderLogoff,
  HeaderLogoffButton,
  HeaderRow,
  HeaderWrapper,
  ResetImg,
  StImg,
  StyleLink,
} from "./style";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
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
 }

  return (
    <HeaderRow className="row">
      <HeaderBg className="col-sm-12"></HeaderBg>
      <HeaderWrapper className="container-fluid">
        <HeaderInner className="row">
          <HeaderLogo className="col-sm-2">
            <StImg src={logo} />
          </HeaderLogo>
          <HeaderLogoff className="col-sm-10">
            <Notifycation></Notifycation>
            <HeaderLogoffButton>Log off</HeaderLogoffButton>
            <Link to="/admin/user">user</Link>
            <Dropdown>
              <DropdownLogo>
                <Dropdown.Toggle
                  className="droplogo"
                  variant="success"
                  id="dropdown-basic"
                >
                  <HeaderAvatar>
                    <StImg src={logo} />
                  </HeaderAvatar>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <StyleLink to="/change-password">
                    <Dropdown.Item className="content" href="#/action-1">
                      <ResetImg src={resetpassword} />
                      Change Password
                    </Dropdown.Item>
                  </StyleLink>
                  <StyleLink to="/admin">
                    <Dropdown.Item className="content" href="#/action-2">
                      <ResetImg src={profile} />
                      My Profile
                    </Dropdown.Item>
                  </StyleLink>
                  <Dropdown.Item className="content" href="#/action-2">
                    <Back  onClick={() => logout()} >
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
