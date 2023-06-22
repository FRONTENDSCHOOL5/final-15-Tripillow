import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import profileSm from '../../Assets/profile-sm.png';
import Button from './Button';

const FollowUser = (props) => {
  const url = props.user?.image.split('/') || null;

  return (
    <UserLayout margin={props.margin}>
      <Link to={`/profile/${props.user.accountname}`}>
        <UserImgLayout>
          <UserImg src={url[url.length - 1] === 'null' ? profileSm : props.user?.image} alt={props.user?.username} />
        </UserImgLayout>
      </Link>
      <UserContentsLayout>
        <div>
          <UserTitle>{props.user?.username}</UserTitle>
          <UserContent>{props.user?.intro} </UserContent>
        </div>
        {props.followers && (
          <Button width='56px' fontSize='var(--xs)' border='none' padding='5.75px'>
            팔로우
          </Button>
        )}
      </UserContentsLayout>
    </UserLayout>
  );
};

const UserLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  margin: ${(props) => props.margin};
`;

const UserImgLayout = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
`;

const UserImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const UserTitle = styled.h3`
  font-size: var(--sm);
  margin-bottom: 2px;
`;

const UserContent = styled.span`
  font-size: var(--xs);
  color: var(--dark-gray);
`;

const UserContentsLayout = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export default FollowUser;
