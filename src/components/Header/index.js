
import React, { useEffect, useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
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
import Offcanvas from 'react-bootstrap/Offcanvas';
import {
  Back,
  DivLogo,
  DivP,
  DropdownLogo,
  HeaderAvatar,
  HeaderLogoff,
  HeaderName,
  HeaderRow,
  ResetImg,
  SidebarDesc,
  SidebarHeader,
  SidebarInner,
  StImg,
  StyleLink
} from "./style";
import { BtnArrow, P, SidebarCategory,SidebarCategoryGr } from "../Sidebar/style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faBars, faBarsStaggered, faCalendar, faCodePullRequest, faTableList, faPeopleRoof, faUser, faList,faPeopleGroup } from "@fortawesome/free-solid-svg-icons";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { getListRoleIdAction } from "../../stores/slices/roleId.slice";

const Header = ({ Toggle, isOpen }) => {
  const userInfo = useSelector((state) => state.users.userInfoState);
  const dispatch = useDispatch();
  const Name = userInfo.data?.user?.Name;
  const Avatar = userInfo.data?.user?.Avatar;
  const roleId = useSelector(state => state.roleId.roleIdState);
  const roleIdData = roleId?.data;
  const userRoleId = userInfo?.data?.user?.RoleId;
  const filterRoleId = roleIdData?.find(item => item.Id === userRoleId);
  const permission = filterRoleId?.RoleName;
  useEffect(() => {
    dispatch(getListRoleIdAction())
  }, [dispatch]);
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
  const [showItem,setShowItem] = useState(false);
  const handleItem = () => setShowItem(!showItem);
  const [showItem1,setShowItem1] = useState(false);
  const handleItem1 = () => setShowItem1(!showItem1);
  useEffect(() => {
    setShowItem()
  }, [showSidebar]);

  useEffect(() => {
    setShowItem1()
  }, [showSidebar]);
  return (
    <HeaderRow className="row">
      <DivLogo style={{ width: isOpen ? "16%" : "7%" }} className={   isOpen ? "col-sm-3 col-lg-2" : "col-sm-3 col-lg-2"}>
       <div className="row" style={{padding:"0px", margin:"0px",width:"100%"}}>
       <div className= {isOpen? "col-6 text-center" : "col-12 text-center"} style={{padding:"0px", margin:"0px"}}>
          <Link to="/"><StImg src={logo} /></Link>
        </div>
        <DivP className="col-6" style={{padding:"0px", margin:"0px"}}>
        <P style={{ display: isOpen ? "inline-block" : "none" }}>Log Off SRS</P>
        </DivP>
        <BtnArrow style={{ right: isOpen ? "-10%" : "-25%" }}>
          <FontAwesomeIcon onClick={Toggle} icon={ faBarsStaggered} />
        </BtnArrow>
       </div>
      </DivLogo>
      <HeaderLogoff
        className={isOpen ? "col-sm-8 col-lg-9" : "col-sm-8 col-lg-10"}
        style={{ width: isOpen ? "84%" : "93%" }}
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
      <div style={{padding:"0px"}} className="text-start">
        <Button style={{border:"none"}} variant="primary" className="d-md-none bg-white" onClick={handleShow}>
          <FontAwesomeIcon style={{color:"#8000ff",fontSize:"20px"}} icon={faBars} />
        </Button>
      </div>
      <SidebarHeader style={{ display: "none" }} className="col-12">
        <Offcanvas style={{ width: "200px" }} show={showSidebar} onHide={handleClose} responsive="sm">
          <Offcanvas.Header style={{backgroundColor:"#8000ff", borderBottom:"1px solid #D8D8D8"}}  variant="white" closeButton>
            <Offcanvas.Title>
              <div style={{ width: "50px", height: "40px" }}>
                <Link to="/"><StImg src={logo} /></Link>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ backgroundColor: "#8000ff" }}>
            <SidebarInner style={{ height: showItem1? "100px" : "20px"}}>
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
                  style={{ backgroundColor: "#8000ff", border: "none",padding:"0px" }}
                >
                  {Object.entries(accountRouter).map(([index, value]) =>
                    <Dropdown.Item>
                      <SidebarDesc key={index}>
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
            <SidebarInner style={{ height: userRoleId === "1" ? "0px" :  showItem? "100px" : "30px"   }}>
              <Dropdown
                autoClose={"inside"}
                drop={""}
                style={{ border: "none"}}
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
                  style={{ backgroundColor: "#8000ff", border: "none",padding:"0px" }}
                >
                  {Object.entries(managerRouter).map(([index, value]) =>
                    <Dropdown.Item>
                      <SidebarDesc key={index}
                      >
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
                      style={{ color: 'white', paddingLeft:  "10px",paddingRight:  "10px" , fontSize: "20px" }}
                      icon={faPeopleGroup}
                    />
                  </Link>
                </OverlayTrigger>
                <Link
                  style={{ display:"" }}
                  to={"/user-group"}
                >
                  <SidebarCategory style={{display:"inline-block"}}>
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
