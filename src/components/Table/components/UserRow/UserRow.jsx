import React from "react";
import { useNavigate } from "react-router-dom";

const UserRow = React.memo(({ id, email, name, gender, status }) => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`/editUser/${id}`);
  };
  return (
    <tr onClick={handleRedirect} style={{ cursor: "pointer" }}>
      <th scope="row">{id}</th>
      <th>{email}</th>
      <td>{name}</td>
      <td>{gender}</td>
      <td>{status}</td>
    </tr>
  );
});

export default UserRow;
