import React from 'react';
import Button from './Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ErrorContents = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <ErrorContentLayout>
        <LogoImg src={props.image} alt={props.alt} />
        <ErrorContent>{props.children}</ErrorContent>
        <Button
          onClick={() => {
            navigate(props.navigate);
          }}
          fontSize='14px'
          border='none'
          padding='12.75px 0px'
        >
          {props.buttonName}
        </Button>
      </ErrorContentLayout>
    </>
  );
};

const ErrorContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LogoImg = styled.img`
  width: 120px;
`;

const ErrorContent = styled.p`
  text-align: center;
  color: var(--dark-gray);
`;
export default ErrorContents;
