import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ConfirmModal({ show, onConfirm, onClose, disableBtn }) {
  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Do you want to delete user?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={disableBtn}>
            Close
          </Button>
          <Button variant="primary" onClick={onConfirm} disabled={disableBtn}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmModal;
