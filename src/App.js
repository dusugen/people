import "./App.css";
import React, { useCallback, useEffect, useState } from "react";
import Filters from "./components/Filters/Filters";
import axios from "axios";
import styles from "./components/Table/Table.module.scss";
import Table from "./components/Table/Table";

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

  const [meta, setMeta] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const apiUrl = `https://gorest.co.in/public-api/users`;
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

    axios
      .get(`${apiUrl}?${searchParams.toString()}`)
      .then((res) => {
        setMeta(res.data.meta.pagination);
        setUsersData(res.data.data);
      })
      .catch((err) => {
        alert(`Failed. Try Later`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filters, pagination]);

  // сортировка по id и status
  useEffect(() => {
    setUsersData((usersData) => {
      const copyUserData = [...usersData];
      copyUserData.sort((itemA, itemB) => {
        let result = 0;
        if (sorting.field === "id") {
          result =
            sorting.direction === "asc"
              ? itemA.id - itemB.id
              : itemB.id - itemA.id;
        }
        if (sorting.field === "status") {
          result =
            sorting.direction === "asc"
              ? itemA.status.localeCompare(itemB.status)
              : itemB.status.localeCompare(itemA.status);
        }
        return result;
      });
      return copyUserData;
    });
  }, [sorting]);

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
      <h1 className={" display-3 fw-bold text-center mb-4"}>People</h1>
      <div className={`row ${styles.root}`}>
        <div className={`col-lg-9 ${styles.table}`}>
          {isLoading ? (
            <div
              className={`d-flex justify-content-center align-items-center h-100`}
            >
              <div className=" spinner-border " role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <Table
              items={usersData}
              sorting={sorting}
              onSorting={handleSorting}
              pagination={pagination}
              onPagination={handlePagination}
              meta={meta}
            />
          )}
        </div>
        <Filters filters={filters} onFiltering={handleFiltering} />
      </div>
    </div>
  );
}

export default App;
