import * as yup from "yup";

export const logInFormValidator = yup.object({
  password: yup
    .string()
    .required("password is required")
    .min(8, "Password must be 8+ characters long.")
    .typeError("password must be a string"),
});
