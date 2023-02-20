import React, { useCallback, useMemo } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import UserRow from "./components/UserRow/UserRow";
import Pagination from "./components/Pagination/Pagination";
import { TMetaData, TUserData } from "../../types";
import { TPagination, TUsersListSort } from "../UsersList/UsersList";
import {
  SortingAsc,
  SortingDesc,
  Table,
  TableWrapper,
  Th,
  Thead,
  Tr,
  Unsorted,
} from "./UsersTable.styles";

interface IUsersTableProps {
  items: TUserData[];
  sorting: TUsersListSort;
  onSorting: (params: Partial<TUsersListSort>) => void;
  pagination: TPagination;
  onPagination: (params: Partial<TPagination>) => void;
  meta: TMetaData;
}

const UsersTable: React.FC<IUsersTableProps> = React.memo(
  ({ items, sorting, onSorting, pagination, onPagination, meta }) => {
    const users = useMemo(() => {
      return items.map((item) => <UserRow key={item.id} {...item} />);
    }, [items]);

    const handleSort = useCallback(
      (value: TUsersListSort) => {
        onSorting({
          ...value,
          direction: sorting.direction === "asc" ? "desc" : "asc",
        });
      },
      [sorting, onSorting]
    );

    return (
      <TableWrapper>
        <Table>
          <Thead>
            <Tr>
              <Th>
                <div
                  onClick={() => {
                    handleSort({ field: "id", direction: "asc" });
                  }}
                >
                  <span>Id</span>
                  {sorting.field !== "id" ? (
                    <Unsorted />
                  ) : sorting.direction === "asc" ? (
                    <SortingAsc />
                  ) : (
                    <SortingDesc />
                  )}
                </div>
              </Th>
              <th>Email</th>
              <th>Name</th>
              <th>Gender</th>
              <Th
                onClick={() => {
                  handleSort({ field: "status", direction: "asc" });
                }}
              >
                Status
                {sorting.field !== "status" ? (
                  <Unsorted />
                ) : sorting.direction === "asc" ? (
                  <SortingAsc />
                ) : (
                  <SortingDesc />
                )}
              </Th>
            </Tr>
          </Thead>
          <tbody>{users}</tbody>
        </Table>
        <Pagination
          meta={meta}
          onPagination={onPagination}
          pagination={pagination}
        />
      </TableWrapper>
    );
  }
);

export default UsersTable;
