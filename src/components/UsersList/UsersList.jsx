import React, { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { sortUsers } from "../../utils";
import UsersTable from "../Table/UsersTable";
import Filters from "../Filters/Filters";
import styles from "../Table/UsersTable.module.scss";
import Spinner from "../shared/Spinner/Spinner";
import NotFound from "../NotFound/NotFound";
import config from "../../config.json";

function UsersList() {
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
    url: `${config.apiUrl}`,
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
    if (users.error) {
      alert(users.error);
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
    <div className={`row ${styles.root}`}>
      <div className={`col-lg-9 ${styles.table}`}>
        {users.isLoading ? (
          <Spinner />
        ) : usersData ? (
          <UsersTable
            items={usersData}
            sorting={sorting}
            onSorting={handleSorting}
            pagination={pagination}
            onPagination={handlePagination}
            meta={users.data.meta.pagination}
          />
        ) : users.error ? (
          <NotFound />
        ) : null}
      </div>
      <Filters filters={filters} onFiltering={handleFiltering} />
    </div>
  );
}

export default UsersList;
