import React, { useCallback, useMemo } from "react";
import styles from "./UsersTable.module.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserRow from "./components/UserRow/UserRow";
import Pagination from "./components/Pagination/Pagination";

const UsersTable = React.memo(
  ({ items, sorting, onSorting, pagination, onPagination, meta }) => {
    const users = useMemo(() => {
      return items.map((item) => <UserRow key={item.id} {...item} />);
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
      <div className={`table-responsive`}>
        <table className={`table table-hover ${styles.table} `}>
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
        <Pagination
          meta={meta}
          onPagination={onPagination}
          pagination={pagination}
        />
      </div>
    );
  }
);

export default UsersTable;
