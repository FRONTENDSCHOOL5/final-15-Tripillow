import React from 'react';
import styled, { css } from 'styled-components';

const Input = (props) => {
  const { type } = props;
  return (
    <>
      <LabelStyle {...props}>{props.label}</LabelStyle>
      <InputStyle type={type ? type : 'text'} {...props} />
    </>
  );
};

const InputStyle = styled.input`
  font-size: ${(props) => props.fontSize || 'var(--sm)'};
  border-bottom: ${(props) => (props.onError ? '1px solid var(--error)' : '1px solid var(--light-gray)')};
  padding: ${(props) => props.padding || '10px'};

  &:focus {
    border-bottom: 1px solid var(--primary);
    margin-bottom: -1px;
  }

  &::placeholder {
    font-size: var(--sm);
  }
`;

const LabelStyle = styled.label`
  display: block;
  color: var(--dark-gray);
  font-size: ${(props) => props.fontSize || 'var(--xs)'};
`;

export default Input;
