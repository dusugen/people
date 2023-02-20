import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type TConfirmModalProps = {
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
  isDisabled: boolean;
  title: string;
  text: string;
};

const ConfirmModal: React.FC<TConfirmModalProps> = ({
  show,
  onConfirm,
  onClose,
  isDisabled,
  title,
  text,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{text}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={isDisabled}>
          Close
        </Button>
        <Button variant="primary" onClick={onConfirm} disabled={isDisabled}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
