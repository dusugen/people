import React, { useCallback, useContext } from "react";

import useMutate from "../../hooks/useMutate";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../appContext";
import config from "../../config.json";
import { TUserBody, TUserData } from "../../types";
import { TUserForm } from "../UserForm/types";
import { UserForm } from "../UserForm";
import { PageTitle } from "../shared/PageTitle/PageTitle.styled";

const AddUser = () => {
  const { setToast } = useContext(AppContext);
  const navigate = useNavigate();

  const [userData, createUser] = useMutate<TUserBody, TUserData>({
    method: "post",
    url: config.apiUrl,
  });

  const handleSubmit = useCallback((data: TUserForm) => {
    createUser({
      ...data,
      gender: data.gender.value,
      status: data.status ? "active" : "inactive",
    })
      .then((res) => {
        if (res) {
          setToast({
            status: true,
            message: "User was added",
            type: "success",
            title: "Add user",
          });
          navigate(`/editUser/${res.id}`);
        }
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
      <PageTitle>Add User</PageTitle>
      <UserForm onSubmit={handleSubmit} {...userData} />
    </div>
  );
};
export default AddUser;
