import styled from "styled-components";

export const Wrapper = styled.div.attrs({
  className: "d-flex justify-content-center align-items-center",
})`
  min-height: 250px;
`;

export const Border = styled.div.attrs({
  className: "spinner-border",
  role: "status",
})``;

export const Span = styled.span.attrs({
  className: "sr-only",
})``;
