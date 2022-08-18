import styled, {keyframes} from 'styled-components';
import { colors } from './colors';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loader = styled.div`
  padding: 10px;
  border: 2px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 100%;
  animation: ${rotate} 3s infinite linear;
  height: 100px;
  width: 100px;
  position: relative;
  &:before {
    border-radius: 100%;
    border: 1px dotted ${colors.tertiary};
    border-top-color: transparent;
    height: 70px;
    width: 70px;
    animation: ${rotate} 1s infinite linear;
    position: absolute;
  }
`
export const StyledInput = styled.input`
  padding: 8px 10px;
  letter-spacing: 1px;
  background: #fff;
  color: ${colors.tertiary};
  border: 1px solid ${colors.tertiary};
  border-radius: 10px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 12px;
`