import styled from "styled-components";

export const Row = styled.div.attrs({
  className: "row",
})`
  @media (max-width: 992px) {
    flex-direction: column-reverse;
  }
`;

export const Col = styled.div.attrs({
  className: "col-lg-9",
})`
  padding-right: 25px;
`;
