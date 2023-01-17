import React from 'react';
import Employee from "./components/Employee";
import styles from "./Table.module.scss"
import sortImg from "../../images/sort.png"


function Table({items, sortDirection, setSortDirection, sortField, setSortField}) {

  const users = items.map(obj => <Employee key={obj.id} {...obj}/>)

  const handleSortId = () => {
    setSortField('id')
    return (sortDirection === 'asc') ? setSortDirection("desc") : setSortDirection("asc");
  }

  const handleSortStatus = () => {
    setSortField('status')
    return (sortDirection === 'asc') ? setSortDirection("desc") : setSortDirection("asc");
  }


  return (
    <table className={`table table-hover`}>
      <thead>
      <tr>
        <th scope="col">
          <span>Id</span>
          <img src={sortImg} alt="sort" className={styles.img} onClick={() => handleSortId()}/>
        </th>
        <th scope="col">Email</th>
        <th scope="col">Name</th>
        <th scope="col">Gender</th>
        <th scope="col">
          Status
          <img src={sortImg} alt="sort" className={styles.img} onClick={() => handleSortStatus()}/>
        </th>
      </tr>
      </thead>
      <tbody>
      {users}
      </tbody>
    </table>)
}

export default Table;