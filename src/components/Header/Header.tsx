import React from "react";
import { useLocation } from "react-router-dom";
import {
  ButtonAddUser,
  ButtonContainer,
  ButtonUserList,
  Container,
  Logo,
  LogoContainer,
  LogoLink,
  Navbar,
} from "./Header.styles";

import headerLogo from "../../images/header__logo.png";

const Header = () => {
  const { pathname } = useLocation();

  return (
    <Navbar>
      <Container>
        <LogoContainer>
          <LogoLink to="/">
            <Logo src={headerLogo} alt="logo" />
          </LogoLink>
        </LogoContainer>
        <ButtonContainer>
          <ButtonUserList to={`/`} $active={pathname === "/"}>
            Users list
          </ButtonUserList>
          <ButtonAddUser to={"/addUser"} $active={pathname === "/addUser"}>
            Add user
          </ButtonAddUser>
        </ButtonContainer>
      </Container>
    </Navbar>
  );
};

export default Header;
