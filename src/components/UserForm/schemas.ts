import * as yup from "yup";

export const userFormSchema = yup.object({
  name: yup
    .string()
    .required("Please,enter your name")
    .min(2, "Name is too short")
    .default(""),
  email: yup
    .string()
    .required("Please, enter your email")
    .lowercase()
    .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter correct email")
    .trim()
    .default(""),
  gender: yup.mixed().required("Please, choose your gender"),
  status: yup.boolean().default(false).defined(),
});
