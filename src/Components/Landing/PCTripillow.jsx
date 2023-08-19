import React from 'react';
import styled, { css } from 'styled-components';
import tripillowCharacter from '../../Assets/tripillowCharacter.gif';
import Logo from '../../Assets/logo.png';
import { shrinkWidth, CharWidth, LogoWidth } from '../../Styles/LandingAnimation';
import { useLocation } from 'react-router-dom';

const PCTripillow = () => {
  const location = useLocation();
  const path = location.pathname;
  const isRightPath = path === '/';
  const isLoginPath = path === '/login';

  return (
    <PCTripillowLayout $isRightPath={isRightPath} $isLoginPath={isLoginPath}>
      <img src={tripillowCharacter} alt='Tripillow 베게를 껴안고 작은 지구 위에 앉은 나무늘보 캐릭터' />
      <img src={Logo} alt='Tripillow' />
    </PCTripillowLayout>
  );
};

const PCTripillowLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--secondary);
  animation: ${({ $isRightPath }) =>
    $isRightPath
      ? css`
          ${shrinkWidth} 4s forwards
        `
      : 'none'};

  img:first-child {
    animation: ${({ $isRightPath }) =>
      $isRightPath
        ? css`
            ${CharWidth} 7s forwards
          `
        : 'none'};
    object-fit: cover;
    margin-top: -60px;
  }

  img:last-child {
    width: 230px;
    animation: ${({ $isRightPath }) =>
      $isRightPath
        ? css`
            ${LogoWidth} 6s forwards
          `
        : 'none'};
    object-fit: cover;
    margin-top: -30px;
  }

  ${({ $isLoginPath }) =>
    $isLoginPath &&
    css`
      width: 390px;

      img:first-child {
        width: 80%;
      }

      img:last-child {
        width: 70%;
      }
    `}
`;

export default PCTripillow;
