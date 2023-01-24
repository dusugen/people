import * as yup from "yup";

export const schema = yup.object({
  name: yup
    .string()
    .required("Please,enter your name")
    .min(2, "Name is too short"),
  email: yup
    .string()
    .required("Please, enter your email")
    .email("Invalid email")
    .lowercase()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
    .trim(),
  gender: yup.mixed().required("Please, choose your gender"),
});
