import { LoginCredentialsDto, RegisterCredentialsDto } from "models/auth/auth";
import { ValidationShape } from "utils/validation";
import * as yup from "yup";

export const loginValidationSchema = yup.object<ValidationShape<LoginCredentialsDto>>({
  email: yup.string().required("Email is required").email("Email is invalid"),
  password: yup.string().required("Password is required"),
});

export const registerValidationSchema = yup.object<ValidationShape<RegisterCredentialsDto>>({
  email: yup.string().required("Email is required").email("Email is invalid"),
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  password: yup.string().required("Password is required"),
});
