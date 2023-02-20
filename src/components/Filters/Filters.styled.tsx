import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Root = styled.div.attrs({
  className: "col-lg-3",
})`
  @media (max-width: 992px) {
    margin-left: 0px;
    margin-bottom: 20px;
  }
`;

export const Title = styled.h3.attrs({
  className: "fw-bolder text-start mb-4",
})``;

export const Input = styled.input.attrs({
  className: "form-control mb-3",
})``;

export const Select = styled.select.attrs({
  className: "form-select mb-4",
})``;

export const CheckboxContainer = styled.div.attrs({
  className: "form-check form-check-inline mb-4",
})``;

export const Checkbox = styled.input.attrs({
  className: "form-check-input",
  type: "checkbox",
})`
  cursor: pointer;
`;

export const Label = styled.label.attrs({
  className: "form-check-label",
})`
  cursor: pointer;
`;

export const StyledButton = styled(Button).attrs({
  className: " btn-danger",
})`
  display: block;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: inherit;
  }
`;
