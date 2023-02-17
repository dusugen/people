import React, { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { sortUsers } from "../../utils";
import UsersTable from "../UsersTable/UsersTable";
import Filters from "../Filters/Filters";
import styles from "../UsersTable/UsersTable.module.scss";
import Spinner from "../shared/Spinner/Spinner";
import NotFound from "../NotFound/NotFound";
import config from "../../config.json";
import { TMetaData, TUserData } from "../../types";

export type TUsersListSort = {
  direction: string;
  field: string;
};

export type TPagination = {
  page: number;
  per_page: number;
};

export type TFilters = {
  name: string;
  email: string;
  gender: string;
  activeStatus: boolean;
  inActiveStatus: boolean;
};

const UsersList: React.FC = () => {
  const [filters, setFilters] = useState<TFilters>({
    name: "",
    email: "",
    gender: "",
    activeStatus: false,
    inActiveStatus: false,
  });

  const [sorting, setSorting] = useState<TUsersListSort>({
    direction: "",
    field: "",
  });

  const [pagination, setPagination] = useState<TPagination>({
    page: 0,
    per_page: 10,
  });

  const [usersData, setUsersData] = useState<TUserData[] | null>(null);

  // filter by params

  const searchParams = new URLSearchParams({
    page: String(pagination.page + 1),
    per_page: String(pagination.per_page),
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

  const users = useFetch<TUserData[], TMetaData>({
    url: config.apiUrl,
    params: searchParams.toString(),
  });

  // Sorting
  useEffect(() => {
    if (users.isLoading) return;

    if (users.data) {
      setUsersData(sortUsers(users.data, sorting.field, sorting.direction));
    }
    if (users.error) {
      alert(users.error);
    }
  }, [users.data, users.isLoading, sorting, users.error]);

  const handleFiltering = useCallback(
    (newFilters: Partial<TFilters>) => {
      setFilters({ ...filters, ...newFilters });
      setPagination({ ...pagination, page: 0 });
    },
    [filters, pagination]
  );

  const handleSorting = useCallback(
    (params: Partial<TUsersListSort>) => {
      setSorting({ ...sorting, ...params });
    },
    [sorting]
  );

  const handlePagination = useCallback(
    (params: Partial<TPagination>) => {
      setPagination({ ...pagination, ...params });
    },
    [pagination]
  );

  return (
    <div className={`row ${styles.root}`}>
      <div className={`col-lg-9 ${styles.table}`}>
        {users.isLoading ? (
          <Spinner />
        ) : usersData && users.meta ? (
          <UsersTable
            items={usersData}
            sorting={sorting}
            onSorting={handleSorting}
            pagination={pagination}
            onPagination={handlePagination}
            meta={users.meta}
          />
        ) : users.error ? (
          <NotFound />
        ) : null}
      </div>
      <Filters filters={filters} onFiltering={handleFiltering} />
    </div>
  );
};

export default UsersList;
