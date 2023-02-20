import React, { useCallback, useContext } from "react";
import { TUserForm, UserForm } from "../UserForm";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useMutate from "../../hooks/useMutate";
import Spinner from "../shared/Spinner/Spinner";
import { AppContext } from "../../appContext";
import config from "../../config.json";
import { TMetaData, TUserBody, TUserData } from "../../types";
import { PageTitle } from "../shared/PageTitle/PageTitle.styled";

function EditUser() {
  const { setToast } = useContext(AppContext);

  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading, error } = useFetch<TUserData, TMetaData>({
    url: `${config.apiUrl}/${id}`,
  });

  const [updatedUser, updateUser] = useMutate<TUserBody, TUserData>({
    method: "put",
    url: `${config.apiUrl}/${id}`,
  });

  const [deletedUser, removeUser] = useMutate({
    method: "delete",
    url: `${config.apiUrl}/${id}`,
  });

  const handleSubmit = (data: TUserForm) => {
    updateUser({
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
        navigate("/");
      })
      .catch((err) => {
        setToast({
          status: true,
          message: `${err}!`,
          type: "danger",
        });
      });
  };

  const handleDelete = useCallback(() => {
    removeUser()
      .then((res) => {
        setToast({
          status: true,
          message: "User was deleted",
          type: "success",
        });
        navigate("/");
      })
      .catch((err) => {
        setToast({
          status: true,
          message: `User delete failed. ${err}!`,
          type: "danger",
        });
      });
  }, [navigate, removeUser, setToast]);

  return (
    <div>
      <PageTitle>Edit User</PageTitle>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div>{error?.message ?? "Error"}</div>
      ) : data ? (
        <UserForm
          data={data}
          isLoading={deletedUser.isLoading || updatedUser.isLoading}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      ) : null}
    </div>
  );
}

export default EditUser;
