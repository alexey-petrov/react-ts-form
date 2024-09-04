import { FormInputStylesType } from "./types";

export const COLOR_SUCCESS = "#27B274";
export const COLOR_ERROR = "#f44336";
export const COLOR_PRIMARY = "#4A4E71";
export const COLOR_GRAY = "rgb(74, 78, 113)";
const COLOR_DEFAULT_BACKGROUND = "#f6f8fa";

const buttonStyles = {
  mt: 3,
  width: 240,
  height: 48,
  padding: "12px",
  borderRadius: "30px",
  background: "linear-gradient(110.46deg, #70C3FF 12.27%, #4B65FF 93.92%)",
  textTransform: "none",
  fontSize: "16px",
};

const boxStyles = {
  maxWidth: 350,
  margin: "auto",
  color: COLOR_PRIMARY,
};

const passwordCriteriaStyles = {
  display: "flex",
  flexDirection: "column",
  paddingLeft: "20px",
  gap: "1px",
};

const formHelperStyles = {
  color: COLOR_ERROR,
  margin: "-12px 0 4px 14px",
};

const signUpButtonStyles = { mb: 4, fontSize: "28px", fontWeight: 700 };

const getInputColor = (
  error: boolean,
  isFormSubmitted: boolean,
  isEmailValid?: boolean,
  isPasswordValid?: boolean
): string => {
  if (error) {
    return COLOR_ERROR;
  } else if (isFormSubmitted || isEmailValid || isPasswordValid) {
    return COLOR_SUCCESS;
  } else {
    return COLOR_GRAY;
  }
};

const getFormInputStyles = ({
  error,
  isFormSubmitted,
  isEmailValid,
  isPasswordValid,
}: FormInputStylesType) => {
  const inputColor = getInputColor(
    !!error,
    isFormSubmitted,
    isEmailValid,
    isPasswordValid
  );

  return {
    mb: 2,
    borderRadius: "10px",
    height: 48,
    color: inputColor,
    "& .MuiInputBase-root": {
      backgroundColor: COLOR_DEFAULT_BACKGROUND,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: inputColor,
      borderRadius: "10px",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: inputColor,
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: inputColor,
    },
    "& .MuiIconButton-root": {
      outline: "none",
      color: inputColor,
    },
  };
};

export {
  buttonStyles,
  boxStyles,
  getFormInputStyles,
  passwordCriteriaStyles,
  formHelperStyles,
  signUpButtonStyles,
};
