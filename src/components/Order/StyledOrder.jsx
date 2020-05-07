import styled from 'styled-components';

import { Paper, Button } from '@material-ui/core';
import Select from 'react-select';

export const StyledPaper = styled(Paper)`
  padding: 44px 50px;
  margin-top: 48px;
  margin-bottom: 48px;
  top: 0;
  left: 20px;
  position: absolute;
  max-width: 30%;
  z-index: 1;
`;

export const StyledButton = styled(Button)`
  &:hover {
    color: #000;
  }
`;

export const StyledSelect = styled(Select)`
  width: 230px;
`;
