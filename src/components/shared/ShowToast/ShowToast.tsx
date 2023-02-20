import React, { useContext } from "react";
import Toast from "react-bootstrap/Toast";
import { AppContext } from "../../../appContext";
import {
  Title,
  StyledToastBody,
  StyledToastContainer,
} from "./ShowToast.styles";

const ShowToast = () => {
  const { toastData, setToast } = useContext(AppContext);
  const { status, type, message, title } = toastData;
  return (
    <StyledToastContainer>
      <Toast
        onClose={() => setToast({ ...toastData, status: false })}
        show={status}
        delay={3000}
        autohide
        bg={type}
      >
        <Toast.Header>
          <Title>{title}</Title>
        </Toast.Header>
        <StyledToastBody>{message}</StyledToastBody>
      </Toast>
    </StyledToastContainer>
  );
};

export default ShowToast;
