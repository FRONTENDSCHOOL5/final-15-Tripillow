import React from 'react';
import profileImg from '../Assets/profile-sm.png';
import styled from 'styled-components';
import more from '../Assets/icons/icon-more-vertical.svg';

// "comment": [
// 	{
// 			"id": String,
// 			"content": String,
// 			"createdAt": "2021-12-20T06:10:26.803Z",
// 			"author": {
// 					"_id": "작성자 id",
// 					"username": "1",
// 					"accountname": "1",
// 					"intro": "1",
// 					"image": "1",
// 					"following": [],
// 					"follower": [],
// 					"followerCount": 0,
// 					"followingCount": 0
// 			}
// 	}
// ]

export default function Comment(props) {
  return (
    <Ldiv>
      <Profile>
        <ProfileImg src={props.image || profileImg} alt='프로필 이미지'></ProfileImg>
        <UserName>{props.author.username || '더미유저'}</UserName>
        <Time>5분전</Time>
        <MoreBtn></MoreBtn>
      </Profile>
      <Text>{props.content || '더미코멘트'}</Text>
    </Ldiv>
  );
}

const Ldiv = styled.div`
  margin: 0 12px 16px 16px;
`;

const Profile = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const UserName = styled.span`
  font-size: var('--sm');
  font-weight: 500;
`;

const Time = styled.span`
  color: var(--dark-gray);
  font-size: 10px;
`;

const MoreBtn = styled.button`
  position: absolute;
  width: 20px;
  height: 20px;
  right: 0;
  background-image: url(${more});
`;

const Text = styled.p`
  margin: 0 0 0 51px;
  box-shadow: solid 1px 0 0;
  font-size: var(--sm);
`;
