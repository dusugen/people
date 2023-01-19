import "./App.css";
import Table from "./components/Table/Table";
import React, { useCallback, useEffect, useState } from "react";
import Filters from "./components/Filters/Filters";
import axios from "axios";
import styles from "../src/components/Table/Table.module.scss";

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

  const [isLoading, setIsLoading] = useState(false);

  const [usersData, setUsersData] = useState([]);

  const [filtredUsers, setFiltredUsers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://gorest.co.in/public-api/users?page=1&per_page=50")
      .then((res) => {
        setUsersData(res.data.data);
        setFiltredUsers(res.data.data);
      })
      .catch((err) => {
        alert(`Failed. Try Later`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtredItems = usersData
      .filter((userData) => {
        if (filters.name.length) {
          const names = filters.name
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim()
            .split(" ");
          const namesData = names.every((item) => {
            return userData.name.toLowerCase().includes(item);
          });
          return namesData;
        } else {
          return true;
        }
      })
      .filter((userData) => {
        return filters.email.length
          ? userData.email.toLowerCase().includes(filters.email.toLowerCase())
          : true;
      })
      .filter((userData) => {
        return filters.gender.length
          ? userData.gender === filters.gender
          : true;
      })
      .filter((userData) => {
        return filters.activeStatus && !filters.inActiveStatus
          ? userData.status === "active"
          : true;
      })
      .filter((userData) => {
        return filters.inActiveStatus && !filters.activeStatus
          ? userData.status === "inactive"
          : true;
      });

    // сортировка по id и status
    filtredItems.sort((itemA, itemB) => {
      if (sorting.field === "id") {
        return sorting.direction === "asc"
          ? itemA.id - itemB.id
          : itemB.id - itemA.id;
      }
      if (sorting.field === "status") {
        return sorting.direction === "asc"
          ? itemA.status.localeCompare(itemB.status)
          : itemB.status.localeCompare(itemA.status);
      }
    });
    setFiltredUsers(filtredItems);
  }, [filters, sorting, usersData]);

  const handleFiltering = useCallback(
    (newFilters) => {
      setFilters({ ...filters, ...newFilters });
    },
    [filters]
  );

  const handleSorting = useCallback(
    (params) => {
      setSorting({ ...sorting, ...params });
    },
    [sorting]
  );

  return (
    <div className="container-md">
      <h1 className={"display-3 fw-bold text-center mb-4"}>People</h1>
      <div className={`row ${styles.table}`}>
        <div className={`col-lg-8`}>
          {isLoading ? (
            <div
              className={`d-flex justify-content-center align-items-center h-100`}
            >
              <div className="spinner-border " role="status">
                <span className="sr-only"></span>
              </div>
            </div>
          ) : (
            <Table
              items={filtredUsers}
              sorting={sorting}
              onSorting={handleSorting}
            />
          )}
        </div>
        <Filters filters={filters} onFiltering={handleFiltering} />
      </div>
    </div>
  );
}

export default App;
