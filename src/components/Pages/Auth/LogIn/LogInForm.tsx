import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "../../../Global/FormContent/Input";
import { Button } from "../../../Global/FormContent/Button";
import { logInFormValidator } from "./logInFormValidator";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import supabase from "../../../../config/superBaseClient";

interface ILogIn {
  password: string;
}

export const LogInForm = () => {
  const redirect = useNavigate();
  const defaultEmail = "david@gmail.com";

  const methods = useForm<ILogIn>({
    resolver: yupResolver(logInFormValidator),
  });

  const {  mutate, isPending } = useMutation({
    mutationFn: async (data: ILogIn) => {
      const response = await supabase.auth.signInWithPassword({
        email: defaultEmail,
        password: data.password,
      });
      if (response.error) {
        throw new Error(response.error.message);
      }
      return response;
    },

    onError: (error: any) => {
      toast.error(error.message);
    },

    onSuccess: () => {
      methods.reset();
      redirect("/home");
    },
  });

  const handleLogIn = (data: any) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="p-5 mt-8 rounded shadow-md bg-white/95 flex gap-2 flex-col"
        onSubmit={methods.handleSubmit(handleLogIn)}
      >
        <p className="text-center uppercase font-bold text-xl">log in</p>
        <div>
          <label className="capitalize" htmlFor="password">
            password
          </label>
          <Input
            name="password"
            type="password"
            placeholder="password"
            id="password"
            error={String(methods.formState.errors.password?.message ?? "")}
          />
        </div>
        {/*  */}
        <Button isLoading={isPending} className="mt-5">
          Log In
        </Button>
      </form>
    </FormProvider>
  );
};
