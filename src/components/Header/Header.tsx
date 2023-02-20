import React from "react";
import { useLocation } from "react-router-dom";
import {
  ButtonAddUser,
  ButtonUserList,
  Container,
  Logo,
  LogoContainer,
  LogoLink,
  Navbar,
} from "./Header.styles";

function Header() {
  const { pathname } = useLocation();

  return (
    <Navbar>
      <Container>
        <LogoContainer>
          <LogoLink to="/">
            <Logo
              src="https://cdn.dribbble.com/users/3494217/screenshots/6423133/01_preview.jpg?compress=1&resize=768x576&vertical=top"
              alt="logo"
            />
          </LogoLink>
          <h1>People</h1>
        </LogoContainer>
        <div>
          <ButtonUserList to={`/`} $active={pathname === "/"}>
            Users list
          </ButtonUserList>
          <ButtonAddUser to={"/addUser"} $active={pathname === "/addUser"}>
            Add user
          </ButtonAddUser>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
