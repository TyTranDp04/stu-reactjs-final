import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import avatarnull from "../../assets/images/avatarnull.png";
import logo from "../../assets/images/power_red.svg";
import profile from "../../assets/images/profile.png";
import resetpassword from "../../assets/images/reset-password.png";
import shutdown from "../../assets/images/shutdown.png";
import { logoutAction } from "../../stores/slices/user.slice";
import Notifycation from "../Notification";
import NewSideBar from "../Sidebar/newSidebar";
import {
  HeaderAvatar,
  HeaderDropdown,
  HeaderDropdownImg,
  HeaderDropdownInner,
  HeaderLogoff,
  HeaderRow,
  SidebarDesc,
  SidebarHeader,
  StImg,
  StyleLink
} from "./style";

const Header = ({ Toggle, isOpen }) => {
  const userInfo = useSelector((state) => state.users.userInfoState);
  const dispatch = useDispatch();
  const Name = userInfo.data?.Name;
  const Avatar = userInfo.data?.Avatar;
  const roleId = useSelector(state => state.roleId.roleIdState);
  const roleIdData = roleId?.data;
  const userRoleId = userInfo?.data?.RoleId;
  const filterRoleId = roleIdData?.find(item => item.Id === userRoleId);
  const permission = filterRoleId?.RoleName;

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

  const [showSidebar, setShowSidebar] = useState(false);
  const handleShow = () => setShowSidebar(true);
  const handleClose = () => setShowSidebar(false);

  return (
    <HeaderRow className="row">
      <HeaderLogoff >
        <Dropdown>
          <div style={{ paddingRight: "20px" }}>
            <Dropdown.Toggle>
              <HeaderAvatar>
                {Avatar ? (
                  <StImg className="avatar" src={Avatar} />
                ) : (
                  <StImg className="avatar" src={avatarnull} />
                )}
              </HeaderAvatar>
            </Dropdown.Toggle>
          </div>
          <Notifycation ></Notifycation>
          <SidebarDesc className="header-name">
            Hi, {Name}
          </SidebarDesc>
          <HeaderDropdown>
            <Dropdown.Menu className="drop-down-item" style={{padding: "0"}}>
              <StyleLink to="/change-password">
                <HeaderDropdownInner>
                  <HeaderDropdownImg><StImg src={resetpassword} /></HeaderDropdownImg>
                  <SidebarDesc className="drop-down-item">Change Password</SidebarDesc>
                </HeaderDropdownInner>
              </StyleLink>
              <StyleLink to="/my-profile">
                <HeaderDropdownInner>
                  <HeaderDropdownImg><StImg src={profile} /></HeaderDropdownImg>
                  <SidebarDesc className="drop-down-item">My Profile</SidebarDesc>
                </HeaderDropdownInner>
              </StyleLink>
              <StyleLink onClick={() => logout()}>
                <HeaderDropdownInner>
                  <HeaderDropdownImg><StImg src={shutdown} /></HeaderDropdownImg>
                  <SidebarDesc className="drop-down-item">Logout</SidebarDesc>
                </HeaderDropdownInner>
              </StyleLink>
            </Dropdown.Menu>
          </HeaderDropdown>
        </Dropdown>
      </HeaderLogoff>
      <div style={{ padding: "0px", position: "absolute", width: "auto" }} className="text-start">
        <Button style={{ border: "none", paddingBottom: "0px" }} variant="primary" className="d-md-none bg-white" onClick={handleShow}>
          <FontAwesomeIcon style={{ color: "#8000ff", fontSize: "20px" }} icon={faBars} />
        </Button>
      </div>
      <SidebarHeader style={{ display: "none" }} className="col-12">
        <Offcanvas style={{ width: "200px" }} show={showSidebar} onHide={handleClose} responsive="sm">
          <Offcanvas.Title style={{ display: "flex", borderBottom: "1px solid #D8D8D8", justifyContent: "space-between", backgroundColor: "#8000ff" }}>
            <div style={{ height: "32px", margin: "10px", width: "90%", display: "flex", justifyContent: "space-evenly", color: "#fff" }}>
              <div style={{ width: "30px", height: "30px", fontSize: "12px", margin: "0px" }}>
                <Link to="/"><StImg src={logo} /></Link>
              </div>
              <Link to="/" style={{ display: "flex", justifyContent: "center", alignItems: "center", textDecoration: "none", backgroundColor: "#8000ff", color: "#fff" }}>
                <p style={{ margin: "0px" }}>Log Off SRS</p>
              </Link>
            </div>
            <Offcanvas.Header style={{ backgroundColor: "#8000ff", flex: "0 0 auto", width: "25px", height: "25px" }} variant="white" closeButton />
          </Offcanvas.Title>
          <Offcanvas.Body style={{ backgroundColor: "#8000ff" }}>
            <SidebarHeader>
              <NewSideBar />
            </SidebarHeader>
          </Offcanvas.Body>
        </Offcanvas>
      </SidebarHeader>
    </HeaderRow>
  );
};

export default Header;
