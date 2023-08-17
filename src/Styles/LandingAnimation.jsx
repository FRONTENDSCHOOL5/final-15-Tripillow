import { keyframes } from 'styled-components';

export const FadeIn = keyframes`
    0% {
      opacity: 0;
      transform: translateY(100px);
    }
    60%{
      opacity: 1;
      transform: translateY(100px);
    }
    100% {
      transform: translateY(0px);
    }
`;

export const logoFadeIn = keyframes`
  0% {
      opacity: 0;
    }
    90%{
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
`;

export const PCFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;

export const PCBackFadeout = keyframes`
  0% {
    background-color: var(--secondary);
  }
  90% {
    background-color: white;
  }
  100% {
    background-color: white;
  }
`;

export const shrinkWidth = keyframes`
  from {
    width: 100%;
    height: 100%;
  }
  to {
    position: absolute;
    margin-left: -390px;
    border-radius: 10px 0 0 10px;
    width: 390px;
    height: 740px;
  }
`;

export const CharWidth = keyframes`
  0% {
    width: 30%;
  }
  90% {
    width: 80%;
  }
  100%{
    width: 80%;
  }
`;

export const LogoWidth = keyframes`
  0% {
    width: 20%;
  }
  100%{
    width: 70%;
  }
`;
