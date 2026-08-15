import { useId } from "react";

import {
  FieldGroup,
  FieldLabel,
  FieldInput,
  ErrorMessage,
} from "../styles/AuthPage.styles";

const AuthInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  onBlur,
  autoComplete,
}) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;

  return (
    <FieldGroup>
      <FieldLabel htmlFor={inputId}>{label}</FieldLabel>

      <FieldInput
        id={inputId}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        $hasError={Boolean(error)}
      />

      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
    </FieldGroup>
  );
};

export default AuthInput;
