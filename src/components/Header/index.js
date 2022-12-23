import { faBars, faBarsStaggered, faCalendar, faCodePullRequest, faList, faPeopleGroup, faPeopleRoof, faTableList, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
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
import { BtnArrow, P } from "../Sidebar/style";
import {
  DivLogo,
  DivP,
  HeaderAvatar,
  HeaderDropdown,
  HeaderDropdownImg,
  HeaderDropdownInner,
  HeaderLogoff,
  HeaderRow,
  SidebarDesc,
  SidebarHeader,
  StImg,
  StyleLink,
  SidebarCategory,
  SidebarInner
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
  const accountRouter = {
    daysoff: { name: "List", url: "/log-off", icon: faCalendar },
    requests: { name: "Requests", url: "/request-log-off", icon: faCodePullRequest },
  };
  const managerRouter = {
    sync: { name: "Day off history", displayIcon: userRoleId === "1" || userRoleId === "2" ? "none" : "inline-block", display: userRoleId === "1" || userRoleId === "2" ? "none" : 'inline', url: `${permission === "Admin" ? "/admin/day-off-history" : "/404"}`, icon: faList },
    User: { name: "User", displayIcon: userRoleId === "1" ? "none" : "inline-block", url: `${permission === "Staff" ? "/404" : "/admin/user"}`, display: userRoleId === "1" ? "none" : 'inline', icon: faUser },
  };
  const [showSidebar, setShowSidebar] = useState(false);
  const handleShow = () => setShowSidebar(true);
  const handleClose = () => setShowSidebar(false);
  const [showItem, setShowItem] = useState(false);
  const handleItem = () => setShowItem(!showItem);
  const [showItem1, setShowItem1] = useState(false);
  const handleItem1 = () => setShowItem1(!showItem1);
  useEffect(() => {
    setShowItem()
  }, [showSidebar]);

  useEffect(() => {
    setShowItem1()
  }, [showSidebar]);
  return (
    <HeaderRow className="row">
      <HeaderLogoff >
        <Dropdown>
          <div style={{paddingRight:"20px"}}>
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
            <Dropdown.Menu className="drop-down-item">
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
      <div style={{ padding: "0px",position:"absolute",width:"auto" }} className="text-start">
        <Button style={{ border: "none",paddingBottom:"0px" }} variant="primary" className="d-md-none bg-white" onClick={handleShow}>
          <FontAwesomeIcon style={{ color: "#8000ff", fontSize: "20px" }} icon={faBars} />
        </Button>
      </div>
      <SidebarHeader style={{ display: "none" }} className="col-12">
        <Offcanvas style={{ width: "200px" }} show={showSidebar} onHide={handleClose} responsive="sm">
          <Offcanvas.Title style={{display:"flex", borderBottom: "1px solid #D8D8D8" , justifyContent:"space-between",backgroundColor: "#8000ff"}}>
            <div style={{flex:"0 0 auto", width:"70%", display:"flex", justifyContent:"center", alignItems:"center"}}>
              <div style={{ width: "25px", height: "35px" }}>
                <Link to="/"><StImg src={logo} /></Link>
              </div>
              <div>
                <h6 style={{fontSize: "12px", margin:"0px",color:"#fff",paddingLeft:"5px"}}>Log Off SRS</h6>
              </div>
            </div>
            <Offcanvas.Header style={{ backgroundColor: "#8000ff", flex:"0 0 auto", width:"25px", height:"25px" }} variant="white" closeButton />
          </Offcanvas.Title>
          <Offcanvas.Body style={{ backgroundColor: "#8000ff" }}>
            <SidebarInner style={{ height: showItem1 ? "100px" : "20px" }}>
              <Dropdown
                autoClose={"inside"}
                drop={showSidebar ? "" : 'down'}
                style={{ border: "none", width: "100%" }}
                onClick={handleItem1}
              >
                <Dropdown.Toggle
                  style={{ backgroundColor: "#8000ff", border: "none" }}
                >
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Day Off
                      </Tooltip>
                    }
                  >
                    <FontAwesomeIcon
                      className="font-icon"
                      style={{ display: "inline-block", color: 'white', paddingRight: "10px", fontSize: "20px" }}
                      icon={faTableList}
                    />
                  </OverlayTrigger>
                  <SidebarCategory
                    style={{ display: "inline-block" }}
                  >Day Off
                  </SidebarCategory>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{ backgroundColor: "#8000ff", border: "none", padding: "0px" }}
                >
                  {Object.entries(accountRouter).map(([index, value]) =>
                    <Dropdown.Item key={index}>
                      <SidebarDesc>
                        <OverlayTrigger
                          overlay={
                            <Tooltip>
                              {value.name}
                            </Tooltip>
                          }
                        >
                          <Link to={value.url}>
                            <FontAwesomeIcon
                              className="font-icon"
                              style={{ color: 'white', paddingRight: "10px", fontSize: "20px" }}
                              icon={value.icon}
                            />
                          </Link>
                        </OverlayTrigger>
                        <Link
                          to={value.url}
                        >{value.name}
                        </Link>
                      </SidebarDesc>
                    </Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
            </SidebarInner>
            <SidebarInner style={{ height: userRoleId === "1" ? "0px" : showItem ? "100px" : "30px" }}>
              <Dropdown
                autoClose={"inside"}
                drop={""}
                style={{ border: "none" }}
                onClick={handleItem}
              >
                <Dropdown.Toggle
                  style={{ display: userRoleId === "1" ? "none" : "inline-block", backgroundColor: "#8000ff", border: "none" }}
                >
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        Management
                      </Tooltip>
                    }
                  >
                    <FontAwesomeIcon
                      className="font-icon"
                      style={{ display: userRoleId === "1" ? "none" : "inline-block", color: 'white', paddingRight: "10px", fontSize: "20px" }}
                      icon={faPeopleRoof}
                    />
                  </OverlayTrigger>
                  <SidebarCategory
                    style={{ display: userRoleId === "1" ? "none" : "inline-block" }}
                  >
                    Management
                  </SidebarCategory>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{ backgroundColor: "#8000ff", border: "none", padding: "0px" }}
                >
                  {Object.entries(managerRouter).map(([index, value]) =>
                    <Dropdown.Item key={index}>
                      <SidebarDesc>
                        <OverlayTrigger
                          overlay={
                            <Tooltip>
                              {value.name}
                            </Tooltip>
                          }
                        >
                          <Link to={value.url}>
                            <FontAwesomeIcon
                              className="font-icon"
                              style={{ display: value.displayIcon, color: 'white', paddingRight: "10px", fontSize: "20px" }}
                              icon={value.icon}
                            />
                          </Link>
                        </OverlayTrigger>
                        <Link
                          style={{ display: value.display }}
                          to={value.url}>{value.name}
                        </Link>
                      </SidebarDesc>
                    </Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
            </SidebarInner>
            <SidebarInner  >
              <SidebarDesc >
                <OverlayTrigger
                  overlay={
                    <Tooltip>
                      User Group
                    </Tooltip>
                  }
                >
                  <Link to={"/user-group"}>
                    <FontAwesomeIcon
                      className="font-icon"
                      style={{ color: 'white', paddingLeft: "10px", paddingRight: "10px", fontSize: "20px" }}
                      icon={faPeopleGroup}
                    />
                  </Link>
                </OverlayTrigger>
                <Link
                  style={{ display: "" }}
                  to={"/user-group"}
                >
                  <SidebarCategory style={{ display: "inline-block" }}>
                    User Group
                  </SidebarCategory>
                </Link>
              </SidebarDesc>
            </SidebarInner>
          </Offcanvas.Body>
        </Offcanvas>
      </SidebarHeader>
    </HeaderRow>
  );
};

export default Header;
