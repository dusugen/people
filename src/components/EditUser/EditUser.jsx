import React, { useEffect } from "react";
import UserForm from "../AddUser/components/UserForm";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import useMutate from "../../hooks/useMutate";
import Spinner from "../Table/components/Spinner/Spinner";
import { showMessage } from "../../utils";

function EditUser() {
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

  const [{ chooseUser }, deletedUser] = useMutate({
    method: "delete",
    url: `https://gorest.co.in/public-api/users/${id}`,
  });

  const handleSubmit = (data) => {
    updateUser({
      ...data,
      gender: data.gender.value,
      status: data.status ? "active" : "inactive",
    });
  };

  const handleDelete = () => {
    const request = window.confirm(`Do you want to delete user ${id}?`);
    if (request) {
      deletedUser().then((res) => {
        alert("User deleted.");
        navigate("/");
      });
    }
  };

  useEffect(() => {
    if (user.error) {
      showMessage({ type: "error", message: user.error.message });
    }

    if (user.data) {
      showMessage({ type: "success", message: "Success !" });
      navigate("/");
    }
  }, [user.error, user.data]);

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
