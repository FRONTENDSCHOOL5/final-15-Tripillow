import React from 'react';
import styled, { css } from 'styled-components';
import kakao from '../../Assets/icons/kakao.svg';
import google from '../../Assets/icons/google.svg';
import facebook from '../../Assets/icons/facebook.svg';

export default function SnsButton(props) {
  return <Button {...props}>{props.children}</Button>;
}

const Button = styled.button`
  display: block;
  border-radius: 44px;
  background-color: #bad6ee;
  width: 322px;
  padding: 13px 0px;
  margin-bottom: ${(props) => props.mb};
  
  ${(props) =>
    props.kakao &&
    css`
      border: 1px solid #f2c94c;
      background: url(${kakao}) no-repeat 17px;
    `}
  ${(props) =>
    props.google &&
    css`
      border: 1px solid var(--dark-gray);
      background: url(${google}) no-repeat 17px;

    `}
    ${(props) =>
    props.facebook &&
    css`
      border: 1px solid #2d9cdb;
      background: url(${facebook}) no-repeat 17px;

    `};
`;

// <button kakao></button>
