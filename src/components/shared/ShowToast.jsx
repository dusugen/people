import React, { useContext } from "react";
import Toast from "react-bootstrap/Toast";
import { AppContext } from "../../context";
import { ToastContainer } from "react-bootstrap";

function ShowToast() {
  const { toastData, setToast } = useContext(AppContext);
  const { status, type, message, title } = toastData;
  return (
    <ToastContainer className={`p-3`} position={`bottom-center`}>
      <Toast
        onClose={() => setToast({ status: false })}
        show={status}
        delay={3000}
        autohide
        bg={type}
      >
        <Toast.Header>
          <strong className="me-auto">{title}</strong>
        </Toast.Header>
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ShowToast;
