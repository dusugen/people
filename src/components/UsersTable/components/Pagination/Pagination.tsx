import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
import { TMetaData } from "../../../../types";
import { TPagination } from "../../../UsersList/UsersList";

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
    <div className={`d-flex justify-content-between w-100 mb-3`}>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel="→"
        onPageChange={(event) => onPagination({ page: event.selected })}
        pageRangeDisplayed={3}
        pageCount={totalCount}
        previousLabel="←"
        forcePage={pagination.page}
      />
      <select
        className={`form-select ${styles.dropdown}`}
        value={pagination.per_page}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          onPagination({ page: 0, per_page: Number(e.target.value) })
        }
      >
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  );
};

export default Pagination;
