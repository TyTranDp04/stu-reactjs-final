import React from "react";
import logo from "../../assets/images/stlogo.png";
import {
  DropdownLogo,
  HeaderAvatar,
  HeaderBg,
  HeaderInner,
  HeaderLogo,
  HeaderLogoff,
  HeaderLogoffButton,
  HeaderRow,
  HeaderWrapper,
  StImg,
} from "./style";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";

const Header = () => {
  return (
    <HeaderRow className="row">
      <HeaderBg className="col-sm-12"></HeaderBg>
      <HeaderWrapper className="container-fluid">
        <HeaderInner className="row">
          <HeaderLogo className="col-sm-2">
            <StImg src={logo} />
          </HeaderLogo>
          <HeaderLogoff className="col-sm-10">
            <HeaderLogoffButton>Log off</HeaderLogoffButton>
            <Dropdown>
              <DropdownLogo>
              <Dropdown.Toggle className="Droplogo" variant="success" id="dropdown-basic">
              <HeaderAvatar>
                <StImg src={logo} />
            </HeaderAvatar>
              </Dropdown.Toggle>
              </DropdownLogo>
              <Dropdown.Menu>
                <Link to="/change-password">
                <Dropdown.Item href="#/action-1">Change Password</Dropdown.Item>
                </Link>
                <Link to="/admin">
                <Dropdown.Item href="#/action-2" >My Profile</Dropdown.Item>
                </Link>
              </Dropdown.Menu>
            </Dropdown>
          </HeaderLogoff>
        </HeaderInner>
      </HeaderWrapper>
    </HeaderRow>
  );
};

export default Header;
