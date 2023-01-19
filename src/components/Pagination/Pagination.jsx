import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

function Pagination({ pagination, onPagination, meta }) {
  const totalCount = Math.ceil(meta.total / pagination.per_page);
  return (
    <div>
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
    </div>
  );
}

export default Pagination;
