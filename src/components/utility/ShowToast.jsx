import React, { useContext } from "react";
import Toast from "react-bootstrap/Toast";
import { ShowContext } from "../../context";
import { ToastContainer } from "react-bootstrap";

function ShowToast() {
  const { toastStatus, toastType, toastMessage, setToast } =
    useContext(ShowContext);
  return (
    <ToastContainer className={`p-3`} position={`bottom-center`}>
      <Toast
        onClose={() => setToast({ toastStatus: false })}
        show={toastStatus}
        delay={3000}
        autohide
        bg={toastType}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Bootstrap</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ShowToast;
