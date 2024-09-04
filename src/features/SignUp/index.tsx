import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, List, Typography, Box } from "@mui/material";
import { IFormInput } from "./types";
import { PasswordCriteria } from "./components/PasswordCriteria";
import {
  EMAIL_PATTERN,
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_PATTERN_NUMBER,
  PASSWORD_PATTERN_UPPERCASE,
  PASSWORD_SPACES_PATTERN,
  emailValidationScheme,
  passwordValidationScheme,
} from "./config";
import { FormInput } from "./components/FormInput";
import {
  boxStyles,
  buttonStyles,
  passwordCriteriaStyles,
  signUpButtonStyles,
} from "./styles";

const SignUp: React.FC = () => {
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [passwordEdited, setPasswordEdited] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<IFormInput>({
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    const isEmailValid = await trigger("email");
    const isPasswordValid = await trigger("password");

    if (isEmailValid && isPasswordValid) {
      console.log("Form submitted:", data);
    }
  };

  const passwordValue = watch("password", "");

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!passwordEdited) {
      setPasswordEdited(true);
    } else {
      const passwordValue = e.target.value;

      const isPasswordValidLength =
        passwordValue.length >= MIN_PASSWORD_LENGTH &&
        passwordValue.length <= MAX_PASSWORD_LENGTH;
      const isPasswordPatternValid =
        PASSWORD_PATTERN_UPPERCASE.test(passwordValue) &&
        PASSWORD_PATTERN_NUMBER.test(passwordValue) &&
        !PASSWORD_SPACES_PATTERN.test(passwordValue);

      const isPasswordValid = isPasswordValidLength && isPasswordPatternValid;

      setPasswordValid(isPasswordValid);
    }
  };

  const handleemailValidationScheme = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isEmailValid = EMAIL_PATTERN.test(e.target.value);
    setEmailValid(isEmailValid);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box sx={boxStyles}>
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={signUpButtonStyles}
      >
        Sign up
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          placeholder="Email"
          name="email"
          type="email"
          register={register}
          validation={emailValidationScheme}
          error={errors.email}
          onChange={(e) => {
            handleemailValidationScheme(e);
            register("email").onChange(e);
          }}
          {...{ isFormSubmitted, isEmailValid }}
        />

        <FormInput
          placeholder="Create your password"
          name="password"
          type={showPassword ? "text" : "password"}
          register={register}
          validation={passwordValidationScheme}
          error={errors.password}
          onChange={(e) => {
            handlePasswordChange(e);
            register("password").onChange(e);
          }}
          showPassword={showPassword}
          onTogglePasswordVisibility={togglePasswordVisibility}
          shouldShowError={false}
          {...{ isFormSubmitted, isPasswordValid }}
        />

        <List dense sx={passwordCriteriaStyles}>
          <PasswordCriteria
            criteria={
              passwordValue.length >= MIN_PASSWORD_LENGTH &&
              !PASSWORD_SPACES_PATTERN.test(passwordValue)
            }
            message="At least 8 characters (no spaces)"
            isEdited={passwordEdited}
            isError={!!errors.password}
          />
          <PasswordCriteria
            criteria={
              passwordValue.length <= MAX_PASSWORD_LENGTH &&
              !!passwordValue.length
            }
            message="Not longer than 64 characters"
            isEdited={passwordEdited || isFormSubmitted}
            isError={!!errors.password}
          />
          <PasswordCriteria
            criteria={PASSWORD_PATTERN_UPPERCASE.test(passwordValue)}
            message="Uppercase and lowercase letters"
            isEdited={passwordEdited}
            isError={!!errors.password}
          />
          <PasswordCriteria
            criteria={PASSWORD_PATTERN_NUMBER.test(passwordValue)}
            message="At least one digit"
            isEdited={passwordEdited}
            isError={!!errors.password}
          />
        </List>

        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={buttonStyles}
          onClick={() => setIsFormSubmitted(true)}
        >
          Sign up
        </Button>
      </form>
    </Box>
  );
};

export default SignUp;
