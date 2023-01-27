import React, { useCallback, useContext, useState } from "react";
import UserForm from "../AddUser/components/UserForm";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useMutate from "../../hooks/useMutate";
import Spinner from "../Table/components/Spinner/Spinner";
import { ShowContext } from "../../context";

function EditUser() {
  const { setToast } = useContext(ShowContext);

  const navigate = useNavigate();

  const { id } = useParams();

  const { data, isLoading, error } = useFetch({
    url: `https://gorest.co.in/public-api/users/${id}`,
    method: "get",
  });

  const [user, updateUser] = useMutate({
    method: "put",
    url: `https://gorest.co.in/public-api/users/${id}`,
  });

  const [deletedUser, removeUser] = useMutate({
    method: "delete",
    url: `https://gorest.co.in/public-api/users/${id}`,
  });

  const [disableBtn, setDisableBtn] = useState(false);

  const handleSubmit = (data) => {
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

  const handleDelete = () => {
    setDisableBtn(true);
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
        console.log(err);
      })
      .finally(() => {
        setDisableBtn(false);
      });
  };

  return (
    <div>
      <div className={`h2 mb-4 text-center fst-italic`}> Edit user</div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div>Error</div>
      ) : data ? (
        <UserForm
          data={data}
          deletedUser={deletedUser}
          usersData={user}
          disableBtn={disableBtn}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      ) : null}
    </div>
  );
}

export default EditUser;
