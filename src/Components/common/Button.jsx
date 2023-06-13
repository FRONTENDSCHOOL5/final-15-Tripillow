import React from 'react';
import styled, { css } from 'styled-components';

const Button = (props) => {
  const { type } = props;
  return (
    <BtnStyle type={type ? type : 'button'} {...props}>
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
  border: ${(props) => (props.border ? '1px solid var(--light-gray)' : 'none')};
  border-radius: ${(props) => props.borderRadius || '44px'};
  margin: ${(props) => props.margin || '0px'};

  ${(props) =>
    props.disabled &&
    css`
      background-color: var(--secondary);
      cursor: default;
    `};
`;

export default Button;
