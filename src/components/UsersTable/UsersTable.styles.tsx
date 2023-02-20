import styled from "styled-components";
import { TbArrowsSort, TbArrowUp, TbArrowDown } from "react-icons/tb";

export const TableWrapper = styled.div.attrs({
  className: "table-responsive",
})``;

export const Table = styled.table.attrs({
  className: "table table-hover ",
})`
  padding-right: 30px;
`;

export const Thead = styled.thead.attrs({
  className: "bg-warning bg-gradient",
})``;

export const Tr = styled.tr.attrs({
  className: "pb-4",
})``;

export const Th = styled.th`
  cursor: pointer;
  white-space: nowrap;
`;

export const Unsorted = styled(TbArrowsSort)({
  fontSize: 20,
  marginLeft: 4,
  cursor: "pointer",
});

export const SortingAsc = styled(TbArrowUp)({
  fontSize: 20,
  marginLeft: 4,
  cursor: "pointer",
});

export const SortingDesc = styled(TbArrowDown)({
  fontSize: 20,
  marginLeft: 4,
  cursor: "pointer",
});
