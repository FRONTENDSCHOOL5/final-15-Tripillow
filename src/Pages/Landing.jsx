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
  background-color: var(--secondary);
  text-align: center;
`;

export default Landing;
