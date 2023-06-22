import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import profileSm from '../../Assets/profile-sm.png';
import more from '../../Assets/icons/s-icon-more-vertical.svg';
import Button from './Button';

const User = (props) => {
  const setIsPostModalOn = props.setIsPostModalOn;
  const handleOnClick = () => {
    setIsPostModalOn((prev) => !prev);
  };

  return (
    <UserLayout margin={props.margin}>
      <Link to={`/profile/${props.accountname}`}>
        <UserImg src={props.userImg || profileSm} alt={props.username} />
      </Link>
      <UserContentsLayout>
        <div>
          <UserTitle>{props.username}</UserTitle>
          <UserContent>{props.content} </UserContent>
        </div>
        {props.moreBtn && <MoreBtn type='button' onClick={handleOnClick} />}
        {props.followers && (
          <Button width='56px' fontSize='var(--xs)' border='none' padding='5.75px'>
            팔로우
          </Button>
        )}
        {props.chat && <ChatDate>{props.date}</ChatDate>}
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

const UserImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
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

const ChatDate = styled.span`
  color: var(--light-gray);
  font-size: 10px;
  margin-top: auto;
`;

const MoreBtn = styled.button`
  width: 18px;
  height: 18px;
  margin-right: 3px;
  background-image: url(${more});
`;

export default User;
