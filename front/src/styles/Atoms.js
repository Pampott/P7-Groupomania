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
  margin: 10px;
  border: 2px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 100%;
  animation: ${rotate} 2s infinite linear;
  height: 50px;
  width: 50px;
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
  padding: 5px 10px;
  margin: 10px 0;
  border: 0;
  background: ${colors.tertiary};
  color: #fff;
  text-transform: capitalize;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 6px;
  &:hover {
    background: ${colors.primary}
  }  
`;

export const StyledHeader = styled.header`
display: flex;
align-items: center;
justify-content: space-around;
box-shadow: 1px -11px 11px 6px ${colors.primary};
height: 60px;
border-bottom-left-radius: 20px;
border-bottom-right-radius: 20px;
margin-bottom: 1em;
` 

export const StyledMessage = styled.p`
padding: 5px 10px;
border: 1px solid ${colors.primary};
background: ${colors.primary};
border-radius: 10px;
color: #fff;
`