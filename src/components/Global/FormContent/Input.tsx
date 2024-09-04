import { useFormContext } from "react-hook-form";
import { useTogglePassword } from "../../base/hooks/useTogglePassWord";
import { IAuthFormInput } from "../../base/interface/IAuthFormInput";
import { EyeOpenIcon } from "../icons/EyeOpenIcon";
import { EyeCloseIcon } from "../icons/EyeCloseIcon";
import { cn } from "../../base/libs/cn";

export const Input = ({
  type,
  placeholder,
  name,
  id,
  extraStyle,
  maxLength,
  accept,
  error,
  togglePasswordExtraStyle,
}: IAuthFormInput) => {
  //
  const { register } = useFormContext();

  const { togglePasswordVisibility, passwordVisibility } = useTogglePassword();

  return (
    <div className={`relative`}>
      <input
        type={passwordVisibility ? "text" : type}
        accept={ accept }
        placeholder={placeholder}
        className={cn(`placeholder:text-textColor/60 placeholder:text-[1rem] tracking-wider text-textColor/80 
           border  rounded-[14px]  pt-3 pb-4 bg-white w-full px-3 ${extraStyle}
          ${
            error
              ? "border-rose-500/70 focus:border-rose-500/70"
              : "focus:border-primaryColor border-black/30"
          }
         `)}
        id={id}
        maxLength={maxLength}
        {...register(name)}
        onChange={(e) => register(name).onChange(e)}
      />
      {type === "password" ? (
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className={`absolute right-3 top-4 ${togglePasswordExtraStyle}`}
        >
          {passwordVisibility ? (
            <EyeOpenIcon className="stroke-black h-5 w-5" />
          ) : (
            <EyeCloseIcon className="fill-black h-5 w-5" />
          )}
        </button>
      ) : null}

      <p
        className="absolute -bottom-6 right-0 text-right py-1 pt-2 text-rose-500
         mobile:text-xs tablet:text-sm tracking-wide"
      >
        {error ?? ""}
      </p>
    </div>
  );
};
