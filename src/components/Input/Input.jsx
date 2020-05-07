import React from 'react';
import { StyledTextField } from './StyledInput';

export const Input = ({ input, meta, placeholder, label, onChange }) => {
  let error = false;
  let errorMessage = '';

  if (meta.error && meta.visited && !meta.active) {
    error = true;
    errorMessage = meta.error;
  }

  return (
    <StyledTextField
      {...input}
      label={label}
      placeholder={placeholder}
      error={error}
      helperText={errorMessage}
      autoFocus
      fullWidth
      required
      onChange={(e) => {
        input.onChange(e);
        if (onChange) {
          onChange(e);
        }
      }}
    />
  );
};
