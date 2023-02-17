import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div.attrs({
  className: "mb-3",
})``;

export const Label = styled.label.attrs({
  className: "form-label",
})`
  font-weight: 600;
`;

export const InputText = styled.input.attrs({
  className: "form-control",
  type: "text",
})``;

export const InputDescr = styled.div.attrs({
  className: "form-text",
})`
  color: red;
  font-size: 14px;
  font-weight: 600;
  font-style: italic;
`;

export const SelectWrapper = styled.div`
  margin-bottom: 20px;
`;

export const CheckboxWrapper = styled.div.attrs({
  className: "form-check mb-4",
})``;

export const InputCheckbox = styled.input.attrs({
  className: "form-check-input",
  type: "checkbox",
})``;

export const CheckboxLabel = styled.label.attrs({
  className: "form-check-label",
})``;

export const ButtonWrapper = styled.div.attrs({
  className: "d-flex justify-content-between",
})``;

export const ButtonDelete = styled.button.attrs({
  className: "btn  btn-outline-danger me-4",
  type: "button",
})``;

export const ButtonSuccess = styled.button.attrs({
  className: "btn  btn-outline-success me-4",
  type: "submit",
})``;

export const ButtonCancel = styled(Link).attrs({
  className: "btn  btn-outline-danger",
})``;
