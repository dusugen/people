import React, { useContext } from "react";

import useMutate from "../../hooks/useMutate";
import UserForm from "./components/UserForm";
import { useNavigate } from "react-router-dom";
import { ShowContext } from "../../context";

const AddUser = () => {
  const { setToast } = useContext(ShowContext);
  const navigate = useNavigate();

  const [user, createUser] = useMutate({
    method: "post",
    url: `https://gorest.co.in/public-api/users/`,
  });
  const handleSubmit = (data) => {
    createUser({
      ...data,
      gender: data.gender.value,
      status: data.status ? "active" : "inactive",
    })
      .then((res) => {
        setToast({
          status: true,
          message: "User was changed",
          type: "success",
        });
        navigate(`/editUser/${res.id}`);
      })
      .catch((err) => {
        setToast({
          status: true,
          message: `${err.message}`,
          type: "danger",
        });
      });
  };

  return <UserForm onSubmit={handleSubmit} usersData={user} />;
};
export default AddUser;
