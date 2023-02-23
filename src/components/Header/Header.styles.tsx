import styled from "styled-components";
import { Link } from "react-router-dom";

export const Navbar = styled.nav.attrs({
  className: "navbar navbar-expand-lg navbar-light  justify-content-between",
})`
   {
    position: sticky;
    top: 0;
    width: 100% !important;
    z-index: 1;
    background-color: white;
  }
`;

export const Container = styled.div.attrs({
  className: "container-fluid p-0 mb-2 flex-nowrap",
})`
  @media (max-width: 470px) {
    flex-direction: column;
    margin-bottom: 0;
  }
`;

export const LogoContainer = styled.div.attrs({
  className: "navbar-brand fw-bolder me-0 p-0 d-flex align-items-center",
})``;

export const LogoLink = styled(Link)({});

export const Logo = styled.img`
  width: 200px;
  height: 70px;
  @media (max-width: 470px) {
    margin-bottom: 10px;
  }
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
