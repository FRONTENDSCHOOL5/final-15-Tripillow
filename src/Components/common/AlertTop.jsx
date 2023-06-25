import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const AlertTop = ({ children, ...props }) => {
  return <AlertLayout {...props}>{children}</AlertLayout>;
};

const AlertLayout = styled.div`
  position: fixed;
  top: ${(props) => props.top || '48px'};
  left: calc((100vw - 388px) / 2);
  width: 388px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 0 0 20px 20px;
  background-color: ${(props) => (props.isError ? 'var(--error)' : 'var(--primary)')};
  color: white;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
  animation: ${(props) => (props.newAnimation ? 'landingFadeIn 2s' : 'fadeIn 2s forwards')};

  @keyframes fadeIn {
    0% {
      transform: translateY(-60px);
    }
    60% {
      transform: translateY(0px);
    }
    100% {
      transform: translateY(-60px);
    }
  }

  @keyframes landingFadeIn {
    0% {
      transform: translateY(-70px);
    }

    60% {
      transform: translateY(0px);
    }

    100% {
      transform: translateY(-70px);
    }
  }
`;

export default AlertTop;
