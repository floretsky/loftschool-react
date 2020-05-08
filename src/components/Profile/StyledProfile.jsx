import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import FormHelperText from '@material-ui/core/FormHelperText';

export const StyledFormHelperText = styled(FormHelperText)`
  bottom: auto !important;
`;

export const StyledButtonContainer = styled.div`
  margin-top: 5%;
  text-align: center;
`;

export const StyledPaper = styled(Paper)`
  width: 300px;
  position: relative;
  padding-top: 16px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 16px;
  margin: auto;
  height: 189px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

export const StyledIconContainer = styled.div`
  top: 8px;
  right: 8px;
  width: 32px;
  position: absolute;
`;
