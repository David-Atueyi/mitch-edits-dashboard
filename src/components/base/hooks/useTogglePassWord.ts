import { useState } from "react";

export const useTogglePassword = () => {
  const [passwordVisibility, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisibility);
  };

  return { togglePasswordVisibility, passwordVisibility };
};
