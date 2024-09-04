import { FieldError } from "react-hook-form";

export interface IFormInput {
  email: string;
  password: string;
}

export type FormInputStylesType = {
  error?: FieldError;
  isFormSubmitted: boolean;
  isEmailValid?: boolean;
  isPasswordValid?: boolean;
};
