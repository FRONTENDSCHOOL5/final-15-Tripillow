import React from 'react';
import PCTripillow from '../Landing/PCTripillow';
import LoginForm from './LoginForm';
import styled from 'styled-components';

const PCLogin = () => {
  return (
    <PCLayout>
      <PCTripillow />
      <LoginForm />
    </PCLayout>
  );
};

export default PCLogin;

const PCLayout = styled.div`
  width: 780px;
  height: 740px;
  margin: 0 auto;
  display: flex;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  filter: drop-shadow(20px 20px 40px rgba(37, 85, 149, 0.2));
  border-radius: 10px;
  overflow: hidden;
`;
