import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

function Pagination({ pagination, onPagination, meta }) {
  const totalCount = Math.ceil(meta.total / pagination.per_page);
  return (
    <div className={`d-flex justify-content-between w-100 mb-3`}>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onPagination({ page: event.selected })}
        pageRangeDisplayed={3}
        pageCount={totalCount}
        previousLabel="<"
        forcePage={pagination.page}
        renderOnZeroPageCount={null}
      />
      <select
        className={`form-select ${styles.dropdown}`}
        value={pagination.per_page}
        onChange={(e) => onPagination({ page: 0, per_page: e.target.value })}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}

export default Pagination;
