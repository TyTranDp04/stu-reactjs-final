// import axios from "axios";
import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import avatarnull from "../../assets/images/avatarnull.png";
import profile from "../../assets/images/profile.png";
import resetpassword from "../../assets/images/reset-password.png";
import shutdown from "../../assets/images/shutdown.png";
import { logoutAction } from "../../stores/slices/user.slice";
import Notifycation from "../Notification";
import logo from "../../assets/images/power_red.svg";
import {
  Back,
  DivLogo,
  DropdownLogo,
  HeaderAvatar,
  HeaderInner,
  HeaderLogoff,
  HeaderLogoInner,
  HeaderName,
  HeaderRow,
  HeaderWrapper,
  ResetImg,
  StImg,
  StyleLink
} from "./style";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import { BtnArrow, P } from "../Sidebar/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";

const Header = ({ Toggle, isOpen }) => {
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
      <DivLogo style={{ width: isOpen ? "16%" : "6%" }} className={isOpen ? "col-sm-3 col-lg-2" : "col-sm-3 col-lg-2"}>
        <div style={{ width: "60px", height: "60px" }}>
          <Link to="/"><StImg style={{display: isOpen ? "inline-block" : "none"}} src={logo} /></Link>
        </div>
        <P style={{display: isOpen ? "inline-block" : "none"}}>Log Off SRS</P>
        <BtnArrow>
          <FontAwesomeIcon onClick={Toggle} icon={isOpen ? faBarsStaggered : faBars } />
        </BtnArrow>
      </DivLogo>
      <HeaderLogoff
        className={isOpen ? "col-sm-9 col-lg-10" : "col-sm-9 col-lg-11"}
        style={{ width: isOpen ? "84%" : "94%" }}
      >
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
    </HeaderRow>
  );
};

export default Header;
