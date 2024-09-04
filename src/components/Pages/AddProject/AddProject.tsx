import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../Global/FormContent/Input";
import { Button } from "../../Global/FormContent/Button";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProjectValidator } from "./addProjectValidator";
import { useCreateProject } from "../../base/utilities/handleProjects/useInsertProjects";
import { useEffect } from "react";

interface ICreateProject {
  select_file: FileList;
  project_name: string;
}

export const AddProject = () => {
  const methods = useForm<ICreateProject>({
    resolver: yupResolver(addProjectValidator),
  });

  const { handleCreateProject, isPending, isSuccess } = useCreateProject();

  useEffect(() => {
    if (isSuccess) {
      methods.reset();
    }
  }, [isSuccess, methods]);

  return (
    <div className="w-full pc:col-span-3 mediumPc:col-span-4 p-4 m-auto flex justify-center text-black">
      <div className=" w-full max-w-[800px] bg-white rounded-md h-fit p-3 py-9">
        <p className="font-bold text-xl text-center mb-5">Add Project</p>
        <FormProvider {...methods}>
          <form
            className="grid gap-6"
            onSubmit={methods.handleSubmit(handleCreateProject)}
          >
            <div>
              <label className="capitalize">Attach Video</label>
              <Input
                name="select_file"
                type="file"
                accept="video/*"
                extraStyle="w-full p-0 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-normal outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                id="select_file"
                error={String(
                  methods.formState.errors.select_file?.message ?? ""
                )}
              ></Input>
            </div>

            <div>
              <label className="capitalize" htmlFor="project_name">
                Project Name
              </label>
              <Input
                name="project_name"
                type="text"
                placeholder="Project Name"
                extraStyle="w-full"
                id="project_name"
                error={String(
                  methods.formState.errors.project_name?.message ?? ""
                )}
              ></Input>
            </div>
            <Button isLoading={isPending} className="w-full">
              Create
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};
