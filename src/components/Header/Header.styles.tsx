import styled from "styled-components";
import { Link } from "react-router-dom";

export const Navbar = styled.nav.attrs({
  className: "navbar navbar-expand-lg navbar-light  justify-content-between",
})``;

export const Container = styled.div.attrs({
  className: "container-fluid p-0 mb-1 flex-nowrap",
})``;

export const LogoContainer = styled.div.attrs({
  className: "navbar-brand fw-bolder me-0 p-0 d-flex align-items-center",
})`
  margin-left: -35px;
`;

export const LogoLink = styled(Link)({});

export const Logo = styled.img`
  width: 150px;
  height: 100px;
  border-radius: 50%;
  object-fit: contain;
`;

export const ButtonUserList = styled(Link).attrs(
  ({ $active }: { $active: boolean }) => ({
    className: `btn btn-outline-primary me-4 ${$active ? "active" : ""}`,
    type: "button",
  })
)<{ $active: boolean }>``;

export const ButtonAddUser = styled(Link).attrs(
  ({ $active }: { $active: boolean }) => ({
    className: `btn btn-outline-success ${$active ? "active" : ""}`,
    type: "button",
  })
)<{ $active: boolean }>``;

export const ButtonContainer = styled.div``;
