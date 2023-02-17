import React from "react";
import { useLocation } from "react-router-dom";
import {
  ButtonAddUser,
  ButtonUserList,
  Image,
  LinkLogo,
  LogoWrapper,
  Title,
  Wrapper,
} from "./Header.styles";

function Header() {
  const { pathname } = useLocation();
  const imageUrl: string =
    "https://cdn.dribbble.com/users/3494217/screenshots/6423133/01_preview.jpg?compress=1&resize=768x576&vertical=top";

  return (
    <Wrapper>
      <LogoWrapper>
        <LinkLogo to="/">
          <Image src={imageUrl} alt="logo" />
        </LinkLogo>
        <Title>People</Title>
        <div>
          <ButtonUserList to={`/`} $active={pathname === "/"}>
            Users list
          </ButtonUserList>
          <ButtonAddUser to={"/addUser"} $active={pathname === "/addUser"}>
            Add user
          </ButtonAddUser>
        </div>
      </LogoWrapper>
    </Wrapper>
  );
}

export default Header;
