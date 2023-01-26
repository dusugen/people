import React, { useContext } from "react";
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

  const [{ chooseUser }, deleteUser] = useMutate({
    method: "delete",
    url: `https://gorest.co.in/public-api/users/${id}`,
  });

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
    const request = window.confirm(`Do you want to delete user ${id}?`);
    if (request) {
      deleteUser()
        .then((res) => {
          setToast({
            status: true,
            message: "User was deleted",
            type: "success",
          });
          navigate("/");
        })
        .catch((err) => {});
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : error ? (
        <div>Error</div>
      ) : data ? (
        <UserForm
          data={data}
          onSubmit={handleSubmit}
          usersData={user}
          onDelete={handleDelete}
        />
      ) : null}
    </div>
  );
}

export default EditUser;
