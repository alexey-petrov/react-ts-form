import { FieldError, UseFormRegister } from "react-hook-form";
import { IFormInput } from "../types";
import { FormHelperText, OutlinedInput } from "@mui/material";
import { useMemo } from "react";
import { formHelperStyles, getFormInputStyles } from "../styles";
import { InputIcon } from "./InputIcon";

interface FormInputProps {
  placeholder: string;
  name: keyof IFormInput;
  type: string;
  register: UseFormRegister<IFormInput>;
  validation: Record<string, any>;
  error?: FieldError;
  showPassword?: boolean;
  onTogglePasswordVisibility?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  shouldShowError?: boolean;
  isFormSubmitted: boolean;
  isEmailValid?: boolean;
  isPasswordValid?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({
  placeholder,
  name,
  type,
  register,
  validation,
  error,
  showPassword,
  onTogglePasswordVisibility,
  onChange,
  shouldShowError = true,
  isFormSubmitted,
  isEmailValid,
  isPasswordValid,
}) => {
  const formInputStyles = useMemo(
    () =>
      getFormInputStyles({
        error,
        isFormSubmitted,
        ...(name === "email" && { isEmailValid }),
        ...(name === "password" && { isPasswordValid }),
      }),
    [error, isFormSubmitted, isEmailValid, isPasswordValid]
  );

  return (
    <>
      <OutlinedInput
        fullWidth
        id={name}
        {...register(name, validation)}
        {...{ placeholder, type }}
        onChange={onChange}
        error={!!error}
        endAdornment={
          <InputIcon {...{ name, onTogglePasswordVisibility, showPassword }} />
        }
        sx={formInputStyles}
      />
      {shouldShowError && error && (
        <FormHelperText sx={formHelperStyles}>{error.message}</FormHelperText>
      )}
    </>
  );
};
