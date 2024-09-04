export const EMAIL_PATTERN =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 64;
export const PASSWORD_PATTERN_UPPERCASE = /(?=.*[A-Z])/;
export const PASSWORD_PATTERN_NUMBER = /(?=.*\d)/;
export const PASSWORD_SPACES_PATTERN = /\s/;

export const VALIDATION_MESSAGES = {
  required: "This field is required",
  emailPattern: "Please enter a valid email address",
  minLength: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
  maxLength: `Password must be no more than ${MAX_PASSWORD_LENGTH} characters long`,
  uppercase: "Password must contain at least one uppercase letter",
  number: "Password must not contain whitespace",
};

export const passwordValidationScheme = {
  required: VALIDATION_MESSAGES.required,
  minLength: {
    value: MIN_PASSWORD_LENGTH,
    message: VALIDATION_MESSAGES.minLength,
  },
  maxLength: {
    value: MAX_PASSWORD_LENGTH,
    message: VALIDATION_MESSAGES.maxLength,
  },
  pattern: {
    value: PASSWORD_PATTERN_UPPERCASE,
    message: VALIDATION_MESSAGES.uppercase,
  },
  validate: {
    containsNumber: (value: string) =>
      PASSWORD_PATTERN_NUMBER.test(value) || VALIDATION_MESSAGES.number,
    doesNotContainWhitespace: (value: string) =>
      !PASSWORD_SPACES_PATTERN.test(value) || VALIDATION_MESSAGES.number,
  },
};

export const emailValidationScheme = {
  required: VALIDATION_MESSAGES.required,
  pattern: {
    value: EMAIL_PATTERN,
    message: VALIDATION_MESSAGES.emailPattern,
  },
};
