import React from 'react';
import { LayoutStyle } from '../Styles/Layout';
import styled from 'styled-components';
import character from '../Assets/tripillowmain.svg';
import LoginMethod from '../Components/LoginMethod';

const Landing = () => {
  return (
    <LandingLayout>
      <img src={character} alt='캐릭터' />
      <LoginMethod />
    </LandingLayout>
  );
};

const LandingLayout = styled.div`
  ${LayoutStyle}
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 300px;
  background-color: var(--secondary);
  text-align: center;
`;

export default Landing;
