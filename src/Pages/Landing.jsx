import React, { useEffect, useState } from 'react';
import { LayoutStyle } from '../Styles/Layout';
import styled, { keyframes } from 'styled-components';
import character from '../Assets/tripillowmain.svg';
import LoginMethod from '../Components/LoginMethod';
import { useLocation } from 'react-router-dom';
import AlertTop from '../Components/common/AlertTop';

const Landing = () => {
  const location = useLocation();
  const [errorMSG, setErrorMSG] = useState();

  useEffect(() => {
    if (!!location.state) {
      setErrorMSG(location.state);
      setTimeout(() => {
        setErrorMSG('');
      }, 2000);
    }
  }, []);

  return (
    <LandingLayout>
      {errorMSG && (
        <AlertTop top='0px' newAnimation isError={!!location.state}>
          {errorMSG}
        </AlertTop>
      )}
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
