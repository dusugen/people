import React, { useEffect } from "react";

import useMutate from "../../hooks/useMutate";
import UserForm from "./components/UserForm";
import { useNavigate } from "react-router-dom";
import { showMessage } from "../../utils";

const AddUser = () => {
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
    });
  };

  useEffect(() => {
    if (user.error) {
      showMessage({ type: "error", message: user.error.message });
    }
    if (user.data) {
      showMessage({ type: "success", message: "Success !" });
      navigate(`/editUser/${user.data.data.id}`);
    }
  }, [user.error, user.data]);

  return <UserForm onSubmit={handleSubmit} usersData={user} />;
};
export default AddUser;
