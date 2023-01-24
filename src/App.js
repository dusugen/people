import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import Filters from "./components/Filters/Filters";
import styles from "./components/Table/Table.module.scss";
import Table from "./components/Table/Table";
import { sortUsers } from "./utils";
import { useFetch } from "./hooks/useFetch";
import Header from "./components/Header/Header";
import { Route, Routes } from "react-router-dom";
import AddUser from "./components/AddUser/AddUser";

function App() {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    gender: "",
    activeStatus: false,
    inActiveStatus: false,
  });

  const [sorting, setSorting] = useState({
    direction: "",
    field: "",
  });

  const [pagination, setPagination] = useState({
    page: 0,
    per_page: 10,
  });

  const [usersData, setUsersData] = useState(null);

  // filter by params
  const searchParams = new URLSearchParams({
    page: pagination.page + 1,
    per_page: pagination.per_page,
    name: filters.name,
    email: filters.email,
    gender: filters.gender,
    status:
      filters.activeStatus && !filters.inActiveStatus
        ? "active"
        : !filters.activeStatus && filters.inActiveStatus
        ? "inactive"
        : "",
  });

  const users = useFetch({
    url: `https://gorest.co.in/public-api/users`,
    params: searchParams.toString(),
    method: "get",
  });

  // Sorting
  useEffect(() => {
    if (users.isLoading) return;

    if (users.data) {
      setUsersData(
        sortUsers(users.data.data, sorting.field, sorting.direction)
      );
    }
  }, [users.data, users.isLoading, sorting]);

  const handleFiltering = useCallback(
    (newFilters) => {
      setFilters({ ...filters, ...newFilters });
      setPagination({ ...pagination, page: 0 });
    },
    [filters, pagination]
  );

  const handleSorting = useCallback(
    (params) => {
      setSorting({ ...sorting, ...params });
    },
    [sorting]
  );

  const handlePagination = useCallback(
    (params) => {
      setPagination({ ...pagination, ...params });
    },
    [pagination]
  );

  return (
    <div className="container-lg container-md">
      <Header />
      <div className={`row ${styles.root}`}>
        <div className={`col-lg-9 ${styles.table}`}>
          {users.isLoading ? (
            <div
              className={`d-flex justify-content-center align-items-center h-100`}
            >
              <div className=" spinner-border " role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : usersData ? (
            <Routes>
              <Route
                path="/"
                element={
                  <Table
                    items={usersData}
                    sorting={sorting}
                    onSorting={handleSorting}
                    pagination={pagination}
                    onPagination={handlePagination}
                    meta={users.data.meta.pagination}
                  />
                }
              />
            </Routes>
          ) : users.error ? (
            <div>Error</div>
          ) : null}
        </div>
        <Routes>
          <Route
            path={"/"}
            element={
              <Filters filters={filters} onFiltering={handleFiltering} />
            }
          />
          <Route path={"/addUser"} element={<AddUser />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
