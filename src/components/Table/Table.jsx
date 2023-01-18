import React from "react";
import Employee from "./components/Employee";
import styles from "./Table.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";

function Table({ items, sorting, onSorting }) {
  const users = items.map((item) => <Employee key={item.id} {...item} />);

  const handleSort = (value) => {
    onSorting({
      ...value,
      direction: sorting.direction === "asc" ? "desc" : "asc",
    });
  };

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
              {sorting.field === "id" && sorting.direction === "asc" ? (
                <i className={`bi bi-arrow-up ${styles.img}`}></i>
              ) : sorting.field === "id" && sorting.direction === "desc" ? (
                <i className={`bi bi-arrow-down ${styles.img}`}></i>
              ) : (
                <i className={`bi bi-chevron-expand ${styles.img}`}></i>
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
            {sorting.field === "status" && sorting.direction === "asc" ? (
              <i className={`bi bi-arrow-up ${styles.img}`}></i>
            ) : sorting.field === "status" && sorting.direction === "desc" ? (
              <i className={`bi bi-arrow-down ${styles.img}`}></i>
            ) : (
              <i className={`bi bi-chevron-expand ${styles.img}`}></i>
            )}
          </th>
        </tr>
      </thead>
      <tbody>{users}</tbody>
    </table>
  );
}

export default Table;
