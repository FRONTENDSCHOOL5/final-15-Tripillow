import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  const { type } = props;
  return (
    <>
      <LabelStyle htmlFor={props.forId} {...props}>
        {props.label}
      </LabelStyle>
      <InputStyle id={props.forId} type={type ? type : 'text'} {...props} />
    </>
  );
};

const InputStyle = styled.input`
  width: ${(props) => props.width || '100%'};
  font-size: ${(props) => props.fontSize || 'var(--sm)'};
  border-bottom: ${(props) => (props.onError ? '1px solid var(--error)' : '1px solid var(--light-gray)')};
  padding: ${(props) => props.padding || '5px 0 10px 0'};
  margin-bottom: ${(props) => props.mb || '0'};

  &:focus {
    border-bottom: 1px solid var(--primary);
  }

  &::placeholder {
    font-size: var(--sm);
    color: var(--light-gray);
  }
`;

const LabelStyle = styled.label`
  display: block;
  color: var(--dark-gray);
  font-size: ${(props) => props.fontSize || 'var(--xs)'};
  margin-bottom: 10px;
`;

export default Input;
