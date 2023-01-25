import React from "react";
import { Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import ReactSelect from "react-select";
import styles from "./AddUser.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./AddUserSchema";
import useMutate from "../../hooks/useMutate";

const options = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
];

const AddUser = () => {
  const [response, createUser] = useMutate({
    method: "post",
    url: `https://gorest.co.in/public-api/users`,
  });

  console.log(response, "response");

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    setValue,
    reset,
    control,
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    createUser({
      ...data,
      gender: data.gender.value,
      status: data.status ? "active" : "inactive",
    });

    reset();
    setValue("gender", null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="formName" className="form-label">
          Name
        </label>
        <input
          {...register("name")}
          type="text"
          className="form-control"
          id="formName"
        />
        <div id="nameHelp" className={`form-text ${styles.error}`}>
          {errors?.name && <p>{errors?.name?.message || "Error"}</p>}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="formEmail" className="form-label">
          Email
        </label>
        <input
          {...register("email")}
          name="email"
          type="text"
          className="form-control"
          id="formEmail"
        />
        <div id="emailHelp" className={`form-text ${styles.error}`}>
          {errors?.email && <p>{errors?.email?.message || "Error"}</p>}
        </div>
      </div>
      <label htmlFor="formGender" className="form-label">
        Gender
      </label>
      <Controller
        control={control}
        name="gender"
        render={({ field, fieldState }) => {
          return (
            <div className={styles.customSelect}>
              <ReactSelect
                {...field}
                options={options}
                placeholder="Choose your gender"
              />
              <div id="genderHelp" className={`form-text ${styles.error}`}>
                {fieldState.error && (
                  <p>{fieldState.error.message || "Error"}</p>
                )}
              </div>
            </div>
          );
        }}
      />
      <label htmlFor="formStatus" className="form-label">
        Status
      </label>
      <div className="form-check">
        <input
          {...register("status")}
          className="form-check-input"
          type="checkbox"
          value=""
          id="formStatus"
        />
        <label className="form-check-label" htmlFor="formStatus">
          Active
        </label>
      </div>
      <div className="d-flex justify-content-end">
        <button
          type="submit"
          className="btn  btn-outline-success me-4"
          disabled={!isValid || isSubmitting}
        >
          Confirm
        </button>
        <Link to={"/"} type="submit" className="btn  btn-outline-danger">
          Cancel
        </Link>
      </div>
    </form>
  );
};
export default AddUser;
