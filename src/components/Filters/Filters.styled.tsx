import styled from "styled-components";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Wrapper = styled.div.attrs({
  className: "col-lg-3",
})`
  @media (max-width: 992px) {
    margin-left: 0px;
    margin-bottom: 20px;
  }
`;

export const Title = styled.h3.attrs({
  className: "fw-bolder text-center",
})``;

export const Input = styled.input.attrs({
  className: "form-control mb-3",
})``;

export const Select = styled.select.attrs({
  className: "form-select mb-4",
})``;

export const CheckboxWrapper = styled.div.attrs({
  className: "mb-4",
})``;

export const CheckboxInner = styled.div.attrs({
  className: "form-check form-check-inline",
})``;

export const Checkbox = styled.input.attrs({
  className: "form-check-input",
  type: "checkbox",
})``;

export const Label = styled.label.attrs({
  className: "form-check-label",
})``;

export const StyledButton = styled(Button).attrs({
  className: "btn-danger btn-lg",
})``;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover {
    color: inherit;
  }
`;
