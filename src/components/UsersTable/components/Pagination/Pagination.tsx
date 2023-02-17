import React from "react";
import { TMetaData } from "../../../../types";
import { TPagination } from "../../../UsersList/UsersList";
import { ReactPaginateStyled, Select, Wrapper } from "./Pagination.styles";

type TPaginationProps = {
  meta: TMetaData;
  pagination: TPagination;
  onPagination: (params: Partial<TPagination>) => void;
};

const Pagination: React.FC<TPaginationProps> = ({
  pagination,
  onPagination,
  meta,
}) => {
  const totalCount = Math.ceil(meta.pagination.total / pagination.per_page);
  return (
    <Wrapper>
      <ReactPaginateStyled
        breakLabel="..."
        nextLabel="→"
        onPageChange={(event) => onPagination({ page: event.selected })}
        pageRangeDisplayed={3}
        pageCount={totalCount}
        previousLabel="←"
        forcePage={pagination.page}
      />
      <Select
        value={pagination.per_page}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onPagination({ page: 0, per_page: Number(e.target.value) })
        }
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </Select>
    </Wrapper>
  );
};

export default Pagination;
