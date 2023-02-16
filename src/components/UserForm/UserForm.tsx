import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import styles from "./UserForm.module.scss";
import ConfirmModal from "../shared/ConfirmModal";
import { TUserData } from "../../types";
import { TUserForm } from "./types";
import { userFormSchema } from "./schemas";

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

interface UserFormProps {
  data: TUserData | null;
  onSubmit: (form: TUserForm) => void;
  onDelete?: () => void;
  isLoading: boolean;
}

type TModalShow = {
  title: string;
  text: string;
};

export const UserForm: React.FC<UserFormProps> = React.memo(
  ({ data, onSubmit, isLoading, onDelete }) => {
    const [modalShow, setModalShow] = useState(false);
    const [modalInfo, setModalInfo] = useState<TModalShow>({
      title: "Notification",
      text: "Are u sure?",
    });

    const {
      register,
      formState: { errors, isValid },
      handleSubmit,
      reset,
      control,
    } = useForm<TUserForm>({
      mode: "onBlur",
      resolver: yupResolver(userFormSchema),
    });

    const handleForm = (form: TUserForm) => {
      onSubmit(form);
    };

    const handleDeleteClick = () => {
      setModalShow(true);
      setModalInfo({
        title: "Delete",
        text: "Are you agree to delete this user?",
      });
    };

    const handleDeleteCancel = () => {
      setModalShow(false);
    };

    const handleDeleteConfirm = () => {
      if (onDelete) {
        onDelete();
      }
    };

    useEffect(() => {
      if (data) {
        reset({
          ...data,
          status: data.status === "active",
          gender: {
            label: data.gender,
            value: data.gender,
          },
        });
      }
    }, [data]);

    return (
      <>
        <form onSubmit={handleSubmit(handleForm)}>
          <div className="mb-3">
            <label
              htmlFor="formName"
              className={`form-label ${styles.labelForm}`}
            >
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
            <label
              htmlFor="formEmail"
              className={`form-label ${styles.labelForm}`}
            >
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
          <label
            htmlFor="formGender"
            className={`form-label ${styles.labelForm}`}
          >
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
          <label
            htmlFor="formStatus"
            className={`form-label ${styles.labelForm}`}
          >
            Status
          </label>
          <div className="form-check mb-4">
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
          <div className="d-flex justify-content-between">
            <div>
              {data && (
                <button
                  type={"button"}
                  className="btn  btn-outline-danger me-4"
                  disabled={!isValid || isLoading}
                  onClick={handleDeleteClick}
                >
                  Delete
                </button>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="btn  btn-outline-success me-4"
                disabled={!isValid || isLoading}
              >
                {data ? "Edit" : "Add"}
              </button>
              <Link to={"/"} className="btn  btn-outline-danger">
                Cancel
              </Link>
            </div>
          </div>
        </form>
        {modalShow && (
          <ConfirmModal
            show={modalShow}
            {...modalInfo}
            isDisabled={isLoading}
            onConfirm={handleDeleteConfirm}
            onClose={handleDeleteCancel}
          />
        )}
      </>
    );
  }
);
