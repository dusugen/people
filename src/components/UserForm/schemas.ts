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
    .required("Required")
    .min(2, "Min length 2 letter")
    .default(""),
  email: yup
    .string()
    .required("Required")
    .lowercase()
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, "Incorrect email")
    .trim()
    .default(""),
  gender: yup.mixed().required("Required"),
  status: yup.boolean().default(false).defined(),
});
