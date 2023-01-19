import React, { useCallback, useMemo } from "react";
import Employee from "./components/Employee";
import styles from "./Table.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Pagination from "../Pagination/Pagination";

const Table = React.memo(function Table({ items, sorting, onSorting }) {
  const users = useMemo(() => {
    const usersData = items.map((item) => {
      return <Employee key={item.id} {...item} />;
    });
    return usersData;
  }, [items]);

  const handleSort = useCallback(
    (value) => {
      onSorting({
        ...value,
        direction: sorting.direction === "asc" ? "desc" : "asc",
      });
    },
    [sorting, onSorting]
  );

  return (
    <table className={`table table-hover ${styles.table}`}>
      <thead className={`bg-warning bg-gradient`}>
        <tr className={` pb-4`}>
          <th scope="col">
            <div
              onClick={() => {
                handleSort({ field: "id", direction: "asc" });
              }}
            >
              <span>Id</span>
              {sorting.field !== "id" ? (
                <i className={`bi bi-chevron-expand ${styles.img}`}></i>
              ) : sorting.direction === "asc" ? (
                <i className={`bi bi-arrow-up ${styles.img}`}></i>
              ) : (
                <i className={`bi bi-arrow-down ${styles.img}`}></i>
              )}
            </div>
          </th>
          <th scope="col">Email</th>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th
            scope="col"
            className={styles.colStatus}
            onClick={() => {
              handleSort({ field: "status", direction: "asc" });
            }}
          >
            Status
            {sorting.field !== "status" ? (
              <i className={`bi bi-chevron-expand ${styles.img}`}></i>
            ) : sorting.direction === "asc" ? (
              <i className={`bi bi-arrow-up ${styles.img}`}></i>
            ) : (
              <i className={`bi bi-arrow-down ${styles.img}`}></i>
            )}
          </th>
        </tr>
      </thead>
      <tbody>{users}</tbody>
    </table>
  );
});

export default Table;
