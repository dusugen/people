import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactSelect from "react-select";
import { yupResolver } from "@hookform/resolvers/yup";
import ConfirmModal from "../shared/ConfirmModal/ConfirmModal";
import { TUserData } from "../../types";
import { TUserForm } from "./types";
import { userFormSchema } from "./schemas";
import {
  ButtonCancel,
  ButtonDelete,
  ButtonSubmit,
  ButtonWrapper,
  CheckboxLabel,
  CheckboxWrapper,
  InputCheckbox,
  InputError,
  InputText,
  Label,
  SelectWrapper,
  Wrapper,
} from "./UserForm.styles";

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
        text: "Are you sure?",
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
    }, [data, reset]);

    return (
      <>
        <form onSubmit={handleSubmit(handleForm)}>
          <Wrapper>
            <Label htmlFor="formName">Name</Label>
            <InputText {...register("name")} id="formName" />
            <InputError id="nameHelp">
              {errors?.name ? errors.name.message : null}
            </InputError>
          </Wrapper>
          <Wrapper>
            <Label htmlFor="formEmail">Email</Label>
            <InputText
              placeholder="example@gmail.com"
              {...register("email")}
              name="email"
              id="formEmail"
            />
            <InputError id="emailHelp">
              {errors?.email ? errors.email.message : null}
            </InputError>
          </Wrapper>
          <Label htmlFor="formGender">Gender</Label>
          <Controller
            control={control}
            name="gender"
            render={({ field, fieldState }) => {
              return (
                <SelectWrapper>
                  <ReactSelect {...field} options={options} placeholder="..." />
                  <InputError id="genderHelp">
                    {fieldState.error ? fieldState.error.message : null}
                  </InputError>
                </SelectWrapper>
              );
            }}
          />
          <Label htmlFor="formStatus">Status</Label>
          <CheckboxWrapper>
            <InputCheckbox {...register("status")} value="" id="formStatus" />
            <CheckboxLabel htmlFor="formStatus">Active</CheckboxLabel>
          </CheckboxWrapper>
          <ButtonWrapper>
            <div>
              {data && (
                <ButtonDelete
                  disabled={!isValid || isLoading}
                  onClick={handleDeleteClick}
                >
                  Delete
                </ButtonDelete>
              )}
            </div>
            <div>
              <ButtonSubmit disabled={!isValid || isLoading}>
                {data ? "Edit" : "Save"}
              </ButtonSubmit>
              <ButtonCancel to={"/"}>Cancel</ButtonCancel>
            </div>
          </ButtonWrapper>
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
