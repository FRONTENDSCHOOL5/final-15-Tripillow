import React from 'react';
import styled from 'styled-components';

const PCSnack = ({ warnMessage }) => {
  return (
    <SnackLayout>
      <p>{warnMessage}</p>
    </SnackLayout>
  );
};

const SnackLayout = styled.div`
  width: 150px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background-color: var(--error);
  border-radius: 15px;
  text-align: center;
`;

export default PCSnack;
