import * as yup from "yup";

export const addClientValidator = yup.object({
  select_file: yup
    .mixed<FileList>()
    .required("Select an image")
    .test(
      "fileRequired",
      "You must select a file",
      (value: FileList | null): boolean => {
        return !!value && value.length > 0;
      }
    )
    .typeError("File is required and must be a valid image"),

  account_name: yup
    .string()
    .required("Account name is required")
    .typeError("Account name must be a string"),

  account_handle: yup
    .string()
    .required("Account handle is required")
    .typeError("Account handle must be a string"),
});
