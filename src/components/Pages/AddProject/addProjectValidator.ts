import * as yup from "yup";

export const addProjectValidator = yup.object({
  select_file: yup
    .mixed<FileList>()
    .required("Select an video")
    .test(
      "fileRequired",
      "You must select a file",
      (value: FileList | null): boolean => {
        return !!value && value.length > 0;
      }
    )
    .typeError("File is required and must be a valid video"),
  project_name: yup
    .string()
    .required("project name is required")
    .typeError("project name must be a string"),
});
