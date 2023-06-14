import React from 'react';
import Button from './Button';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Empty = (props) => {
  const navigate = useNavigate();
  return (
    <>
      <EmptyLayout>
        <LogoImg src={props.image} alt={props.alt} />
        <EmptyContent>{props.children}</EmptyContent>
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
      </EmptyLayout>
    </>
  );
};

const EmptyLayout = styled.div`
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

const EmptyContent = styled.p`
  text-align: center;
  color: var(--dark-gray);
`;
export default Empty;
