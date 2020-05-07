import React from 'react';
import { Typography } from '@material-ui/core';
import { StyledSelect } from '../Order/StyledOrder';

export const OrderFormInput = ({ input, meta, options, name, onChange }) => {
  let error = false;
  let errorMessage = '';
  if (meta.error && meta.visited && !meta.active) {
    error = true;
    errorMessage = meta.error;
  }

  return (
    <>
      <StyledSelect
        {...input}
        name={name}
        options={options}
        onChange={(e) => {
          input.onChange(e);
          if (onChange) {
            onChange(e);
          }
        }}
      />
      <Typography variant="subtitle2" align="center" color="error">
        <span>{error && errorMessage}</span>
      </Typography>
    </>
  );
};
