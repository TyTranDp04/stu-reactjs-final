import React from "react";
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
import { SidebarDesc } from "../Sidebar/style";
import {
  HeaderAvatar,
  HeaderBg,
  HeaderDropdown,
  HeaderDropdownImg,
  HeaderDropdownInner,
  HeaderLogo,
  HeaderLogoInner,
  HeaderLogoWrapper,
  HeaderLogoff,
  HeaderRow,
  StImg,
  StyleLink
} from "./style";

const Header = () => {
  const userInfo = useSelector((state) => state.users.userInfoState);
  const dispatch = useDispatch();
  const Name = userInfo?.data?.Name;
  const Avatar = userInfo?.data?.Avatar;
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
      <HeaderLogo className="col-sm-3 col-lg-2">
        <HeaderLogoWrapper>
          <HeaderLogoInner><Link to="/"><StImg src={logo} /></Link></HeaderLogoInner>
        </HeaderLogoWrapper>
      </HeaderLogo>
      <HeaderLogoff className="col-sm-9 col-lg-10">
        <Dropdown>
          <div>
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
          <Notifycation />
          <SidebarDesc className="header-name">
            Hi, {Name}
          </SidebarDesc>
          <HeaderDropdown>
            <Dropdown.Menu>
              <StyleLink to="/change-password">
                <HeaderDropdownInner>
                  <HeaderDropdownImg><StImg src={resetpassword} /></HeaderDropdownImg>
                  <SidebarDesc>Change Password</SidebarDesc>
                </HeaderDropdownInner>
              </StyleLink>
              <StyleLink to="/my-profile">
                <HeaderDropdownInner>
                  <HeaderDropdownImg><StImg src={profile} /></HeaderDropdownImg>
                  <SidebarDesc>My Profile</SidebarDesc>
                </HeaderDropdownInner>
              </StyleLink>
              <StyleLink onClick={() => logout()}>
                <HeaderDropdownInner>
                  <HeaderDropdownImg><StImg src={shutdown} /></HeaderDropdownImg>
                  <SidebarDesc>Logout</SidebarDesc>
                </HeaderDropdownInner>
              </StyleLink>
            </Dropdown.Menu>
          </HeaderDropdown>
        </Dropdown>
      </HeaderLogoff>
    </HeaderRow>
  );
};

export default Header;
