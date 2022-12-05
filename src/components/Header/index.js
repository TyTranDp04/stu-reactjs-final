import React from "react";
import logo from "../../assets/images/stlogo.png";
import {
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
            <HeaderAvatar>
              <Link to="/changepassword">
                <StImg src={logo} />
              </Link>
            </HeaderAvatar>
          </HeaderLogoff>
        </HeaderInner>
      </HeaderWrapper>
    </HeaderRow>
  );
};

export default Header;
