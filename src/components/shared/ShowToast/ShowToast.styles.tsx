import styled from "styled-components";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";

export const StyledToastContainer = styled(ToastContainer).attrs({
  className: "p-3",
  position: "bottom-center",
})``;

export const Title = styled.strong.attrs({
  className: "me-auto",
})``;

export const StyledToastBody = styled(Toast.Body).attrs({
  className: "text-white",
})``;
