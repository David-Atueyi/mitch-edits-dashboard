
import { ReactNode } from "react";
import { cn } from "../../base/libs/cn";
import { LoadingIcon } from "../icons/LoadingIcon";

interface ButtonProps {
  onClick?: () => void;
  icon?: ReactNode;
  textClassName?: string;
  className?: string;
  smSize?: boolean;
  disabled?: boolean;
  children: any;
  isLoading?: boolean;
}

export const Button = ({
  onClick,
  className,
  smSize,
  disabled = false,
  children,
  isLoading,
}: ButtonProps) => {
  return (
    <button
      className={cn(
        `rounded-[15px] bg-[#38b6ff] text-white font-bold ${
          smSize ? "px-4 py-2.5" : "px-5 py-5"
        } flex flex-row
items-center justify-center`,
        className
      )}
      onClick={onClick}
      onTouchEnd={(e) => {
        e.stopPropagation();
      }}
      disabled={disabled}
    >
      {children}
      {isLoading ? (
      <LoadingIcon className="fill-white h-6 w-6 ml-2 animate-spin"/>
      ) : null}
    </button>
  );
};
