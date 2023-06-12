import React from 'react';
import styled from 'styled-components';

const Input = (props) => {
  const { type } = props;
  return <InputStyle type={type ? type : 'text'} {...props} />;
};

const InputStyle = styled.input`
  font-size: ${(props) => props.fontSize || 'var(--sm)'};
  border-bottom: ${(props) => props.borderBottom || 'var(--primary)'};
  padding: ${(props) => props.padding || '10px'};

  &:focus {
    border-bottom: 1px solid var(--primary);
    margin-bottom: -1px;
  }

  &::placeholder {
    font-size: var(--sm);
  }
`;

export default Input;
