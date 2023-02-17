import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.nav.attrs({
  className: "navbar navbar-expand-lg navbar-light  justify-content-between",
})``;

export const LogoWrapper = styled.div.attrs({
  className: "container-fluid p-0 mb-1 flex-nowrap",
})``;

export const LinkLogo = styled(Link)({
  className: "navbar-brand fw-bolder me-0 p-0 d-flex align-items-center",
});

export const Image = styled.img`
  width: 150px;
  height: 100px;
  border-radius: 50%;
  object-fit: contain;
`;

export const Title = styled.span.attrs({
  className: "h1 ",
})``;

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
