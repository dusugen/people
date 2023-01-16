import React from 'react';

function Employee({id, email, name, gender, status}) {
  return (
    <tr>
      <th scope="row">{id}</th>
      <th>{email}</th>
      <td>{name}</td>
      <td>{gender}</td>
      <td>{status}</td>
    </tr>
  );
}

export default Employee;