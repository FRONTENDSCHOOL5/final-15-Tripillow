import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { LayoutStyle } from '../../Styles/Layout';
import LoginMethod from '../LoginMethod';
import tripillowCharacter from '../../Assets/tripillowCharacter.gif';
import AlertTop from '../common/Modal/AlertTop';
import Logo from '../../Assets/logo.png';
import isDesktop from '../../Recoil/isDesktop/isDesktop';
import { FadeIn, logoFadeIn, PCBackFadeout } from '../../Styles/LandingAnimation';
import PCTripillow from './PCTripillow';

const Landings = () => {
  const isPCScreen = useRecoilValue(isDesktop);
  const navigate = useNavigate();

  useEffect(() => {
    if (isPCScreen) {
      const timer = setTimeout(() => {
        navigate('login');
      }, 4500);

      return () => clearTimeout(timer);
    }
  }, [isPCScreen]);

  if (isPCScreen) {
    return (
      <PCLandingLayout>
        <PCTripillow />
      </PCLandingLayout>
    );
  } else {
    return (
      <MobileLandingLayout>
        <TripillowLayout>
          <img src={tripillowCharacter} alt='Tripillow 베게를 껴안고 작은 지구 위에 앉은 나무늘보 캐릭터' />
          <img src={Logo} alt='Tripillow' />
        </TripillowLayout>
        <LoginMethod />
      </MobileLandingLayout>
    );
  }
};

const Layout = css`
  background-color: var(--secondary);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const MobileLandingLayout = styled.div`
  ${LayoutStyle}
  ${Layout}
  padding-bottom: 300px;
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

// PC버전

const PCLandingLayout = styled.div`
  ${Layout}
  height: calc(var(--vh, 1vh) * 100);
  box-sizing: border-box;
  animation: ${PCBackFadeout} 6s forwards;
`;

export default Landings;
