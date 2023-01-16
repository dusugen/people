import React from 'react';

function Table(props) {




  return (
    <table className={`table table-hover`}>
      <thead>
      <tr>
        <th scope="col">№</th>
        <th scope="col">Id</th>
        <th scope="col">Email</th>
        <th scope="col">Name</th>
        <th scope="col">Gender</th>
        <th scope="col">Status</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">1</th>
        <th scope="row">12312</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td colSpan="2">Larry the Bird</td>
        <td>@twitter</td>
        <td>@twitter</td>
      </tr>
      </tbody>
    </table>)
}

export default Table;