import styled from 'styled-components';

import { TextField } from '@material-ui/core';

export const StyledTextField = styled(TextField)`
  & > p {
    bottom: -1.5em;
  }
`;
