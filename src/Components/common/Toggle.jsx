import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Button from './Button';

const Toggle = (props) => {
  const [toggleLeft, setToggleLeft] = useState(true);
  const [toggleRight, setToggleRight] = useState(false);

  const handleToggleLeft = () => {
    setToggleLeft(true);
    setToggleRight(false);
  };
  const handleToggleRight = () => {
    setToggleLeft(false);
    setToggleRight(true);
  };

  return (
    <ToggleLayout>
      <ToggleButton onClick={handleToggleLeft} active={toggleLeft}>
        {props.leftButton}
      </ToggleButton>
      <ToggleButton onClick={handleToggleRight} active={toggleRight}>
        {props.rightButton}
      </ToggleButton>
    </ToggleLayout>
  );
};

const ToggleLayout = styled.div`
  display: flex;
  gap: 6px;
`;

const ToggleButton = styled(Button)`
  width: 65px;
  font-size: 12px;
  font-weight: 500;
  border-radius: 8px;
  padding: 5px;

  ${(props) =>
    props.active
      ? css`
          border: none;
        `
      : css`
          background-color: #ffffff;
          color: #c8c3c0;
        `}
`;

export default Toggle;
