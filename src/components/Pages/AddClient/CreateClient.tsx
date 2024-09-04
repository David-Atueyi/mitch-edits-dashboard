import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Input } from "../../Global/FormContent/Input";
import { Button } from "../../Global/FormContent/Button";
import { addClientValidator } from "./addClientValidator";
import { yupResolver } from "@hookform/resolvers/yup";
import { ICreateClient } from "../../base/interface/ICreateClient";
import { useCreateClient } from "../../base/utilities/handleClients/useInsertClient";

export const CreateClient = () => {
  const methods = useForm<ICreateClient>({
    resolver: yupResolver(addClientValidator),
  });

  const { handleCreateClient, isPending, isSuccess } = useCreateClient();

  useEffect(() => {
    if (isSuccess) {
      methods.reset();
    }
  }, [isSuccess, methods]);

  return (
    <div className="w-full pc:col-span-3 mediumPc:col-span-4 p-4 m-auto flex justify-center text-black">
      <div className="w-full max-w-[800px] bg-white rounded-md h-fit p-3 py-9">
        <p className="font-bold text-xl text-center mb-5">Add Client</p>
        <FormProvider {...methods}>
          <form
            className="grid gap-6"
            onSubmit={methods.handleSubmit(handleCreateClient)}
          >
            <div>
              <label className="capitalize">Attach Picture</label>
              <Input
                name="select_file"
                type="file"
                accept="image/*"
                extraStyle="w-full p-0 cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-normal outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter"
                id="select_file"
                error={String(
                  methods.formState.errors.select_file?.message ?? ""
                )}
              />
            </div>

            <div>
              <label className="capitalize" htmlFor="account-name">
                Account Name
              </label>
              <Input
                name="account_name"
                type="text"
                placeholder="Account Name"
                extraStyle="w-full"
                id="account_name"
                error={String(
                  methods.formState.errors.account_name?.message ?? ""
                )}
              />
            </div>

            <div>
              <label className="capitalize" htmlFor="account-handle">
                Account Handle
              </label>
              <Input
                name="account_handle"
                type="text"
                placeholder="Account Handle"
                extraStyle="w-full"
                id="account_handle"
                error={String(
                  methods.formState.errors.account_handle?.message ?? ""
                )}
              />
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
