import styled from 'styled-components';
import background from '../../common/login-background.jpg';

export const StyledBackgroundContainer = styled.div`
  width: 100%;
  height: 100%;
  background: url(${background}) no-repeat;
  background-size: cover;
  position: relative;

  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(50, 50, 53, 0.7);
  }
`;

export const StyledFormWithBackground = styled.div`
  height: 100%;
  margin: auto !important;
`;

export const StyledColumnForm = styled.div`
  padding: 44px 60px !important;
  margin-top: 48px;
  margin-bottom: 48px;
  background: #fff;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.87);
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: #fff;
`;

