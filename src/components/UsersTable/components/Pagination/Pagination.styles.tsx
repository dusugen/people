import styled from "styled-components";
import ReactPaginate from "react-paginate";

export const Root = styled.div.attrs({
  className: "d-flex justify-content-between w-100 mb-3",
})``;

export const Select = styled.select.attrs({
  className: "form-select",
})`
  width: 13%;
`;

export const StyledReactPaginate = styled(ReactPaginate)`
  display: flex;
  padding-left: 0;
  align-items: center;
  margin: 0;

  li {
    display: inline-block;
    color: cornflowerblue;

    a {
      font-size: 14px;
      color: cornflowerblue;
      display: inline-block;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 27px;
      border-radius: 6px;
      margin-right: 5px;
      cursor: pointer;
      border: 1px solid cornflowerblue;
      text-decoration: none;

      &:hover {
        background-color: cornflowerblue;
        color: white !important;
      }
    }
  }

  .selected {
    a {
      background-color: cornflowerblue;
      color: white !important;
    }
  }
`;
