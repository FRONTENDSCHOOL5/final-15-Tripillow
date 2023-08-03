import React, { useEffect, useState } from 'react';
import { LayoutStyle } from '../Styles/Layout';
import styled, { keyframes } from 'styled-components';
import LoginMethod from '../Components/LoginMethod';
import { useLocation } from 'react-router-dom';
import AlertTop from '../Components/common/Modal/AlertTop';
import tripillowCharacter from '../Assets/tripillowCharacter.gif';
import logo from '../Assets/logo.png';

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

      <TripillowLayout>
        <img src={tripillowCharacter} alt='Tripillow 베게를 껴안고 작은 지구 위에 앉은 나무늘보 캐릭터' />
        <img src={logo} alt='Tripillow' />
      </TripillowLayout>
      <LoginMethod />
    </LandingLayout>
  );
};

const FadeIn = keyframes`
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

const logoFadeIn = keyframes`
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

const LandingLayout = styled.div`
  ${LayoutStyle}
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 300px;
  background-color: var(--secondary);
  text-align: center;
`;

const TripillowLayout = styled.div`
  width: 390px;
  animation: ${FadeIn} 4s forwards;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  img:last-child {
    width: 230px;
    animation: ${logoFadeIn} 4s forwards;
    margin-top: -30px;
  }
`;

export default Landing;
