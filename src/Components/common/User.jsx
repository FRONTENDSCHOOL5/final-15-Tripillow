import React from 'react';
import styled from 'styled-components';

const User = (props, { post, followers, chat }) => {
  let content = null;

  if (post) {
    content = <button>...</button>;
  } else if (followers) {
    content = <button>팔로우</button>;
  } else if (chat) {
    content = <span>2023.06.12</span>;
  }
  return (
    <UserLayout>
      <UserImg />
      <UserContentLayout>
        <div>
          <UserTitle>{props.children}</UserTitle>
          <UserSub>{props.children} </UserSub>
        </div>
        <div>{content}</div>
      </UserContentLayout>
    </UserLayout>
  );
};

const UserLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const UserTitle = styled.h3`
  font-size: var(--sm);
`;

const UserSub = styled.span`
  font-size: var(--xs);
  color: var(--dark-gray);
`;

const UserContentLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default User;
