import React, { useCallback, useContext } from "react";

import useMutate from "../../hooks/useMutate";
import UserForm from "./components/UserForm";
import { useNavigate } from "react-router-dom";
import { appContext } from "../../context";
import config from "../../config.json";

const AddUser = () => {
  const { setToast } = useContext(appContext);
  const navigate = useNavigate();

  const [userData, createUser] = useMutate({
    method: "post",
    url: `${config.apiUrl}`,
  });

  const handleSubmit = useCallback((data) => {
    createUser({
      ...data,
      gender: data.gender.value,
      status: data.status ? "active" : "inactive",
    })
      .then((res) => {
        setToast({
          status: true,
          message: "User was added",
          type: "success",
          title: "Add user",
        });
        navigate(`/editUser/${res.id}`);
      })
      .catch((err) => {
        setToast({
          status: true,
          message: `${err.message}`,
          type: "danger",
          title: "Add user",
        });
      });
  }, []);

  return (
    <div>
      <div className={`h2 text-center mb-4 fst-italic`}>Add user</div>
      <UserForm onSubmit={handleSubmit} {...userData} />
    </div>
  );
};
export default AddUser;
