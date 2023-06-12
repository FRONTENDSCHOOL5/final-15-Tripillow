import React from 'react';
import styled from 'styled-components';

const UserName = (props) => {
  return (
    <UserNameLayout>
      <img src={props.userImg} alt={props.username} />
      <p>{props.username}</p>
    </UserNameLayout>
  );
};

const UserNameLayout = styled.div`
  margin: ${(props) => props.margin || '6px 0'};
  display: flex;
  align-items: center;
  gap: 10px;

  & > * {
    flex-shrink: 0;
  }

  p {
    font-size: var(--sm);
    font-weight: 500;
  }
`;

export default UserName;
