import * as yup from "yup";
import { AnySchema } from "yup";

export type Shape<Fields extends Record<string, unknown>> = {
  [Key in keyof Fields]: AnySchema<Fields[Key]>;
};

export type UserFields = {
  name: string;
  email: string;
  gender: string;
  status: boolean;
};

export const userFormSchema = yup.object<Shape<UserFields>>({
  name: yup
    .string()
    .required("Please,enter your name")
    .min(2, "Name is too short")
    .default(""),
  email: yup
    .string()
    .required("Please, enter your email")
    .lowercase()
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Enter correct email")
    .trim()
    .default(""),
  gender: yup.mixed().required("Please, choose your gender"),
  status: yup.boolean().default(false).defined(),
});
