import React from 'react';
import { StyledTextField } from './StyledInput';

export const ProfileInput = ({
  input,
  meta,
  placeholder,
  label,
  onChange,
  inputProps,
}) => {
  let error = false;
  let errorMessage = '';

  if (meta.error && meta.visited && !meta.active) {
    error = true;
    errorMessage = meta.error;
  }

  return (
    <StyledTextField
      {...input}
      error={error}
      helperText={errorMessage}
      label={label}
      placeholder={placeholder || ''}
      autoFocus
      fullWidth
      required
      inputProps={inputProps || {}}
      onChange={(e) => {
        input.onChange(e);
        if (onChange) {
          onChange(e);
        }
      }}
    />
  );
};
