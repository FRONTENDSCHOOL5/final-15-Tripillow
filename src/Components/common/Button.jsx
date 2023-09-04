import React from 'react';
import styled, { css } from 'styled-components';

const Button = (props) => {
  const { type } = props;
  return (
    <BtnStyle type={type ? type : 'button'} {...props} aria-label={props.children}>
      {props.children}
    </BtnStyle>
  );
};

const BtnStyle = styled.button`
  width: ${(props) => props.width || '120px'};
  padding: ${(props) => props.padding || '10px '};
  color: ${(props) => props.color || 'white'};
  background: ${(props) => props.bgColor || 'var(--primary)'};
  font-size: ${(props) => props.fontSize || '16px'};
  font-weight: ${(props) => props.fontWeight || '400'};
  border-radius: ${(props) => props.borderRadius || '44px'};
  margin: ${(props) => props.margin || '0px'};
  position: ${(props) => props.position || ''};
  right: ${(props) => props.right || '0px'};

  ${(props) =>
    props.disabled &&
    css`
      background-color: var(--secondary);
      cursor: default;
    `};

  ${(props) =>
    props.clicked &&
    css`
      box-shadow: 0 0 0 1px var(--light-gray);
      background-color: #fff;
      color: var(--dark-gray);
    `}
`;

export default Button;
