import React from 'react';
import Employee from "./components/Employee";

function Table({items}) {

  const users = items.map(obj => <Employee key={obj.id} {...obj}/>)

  return (
    <table className={`table table-hover`}>
      <thead>
      <tr>
        <th scope="col">Id</th>
        <th scope="col">Email</th>
        <th scope="col">Name</th>
        <th scope="col">Gender</th>
        <th scope="col">Status</th>
      </tr>
      </thead>
      <tbody>
      {users}
      </tbody>
    </table>)
}

export default Table;