import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import profileSm from 'Assets/profile-sm.png';
import Button from 'Components/common/Button';
import FollowAPI from 'Api/Profile/FollowAPI';
import UnFollowAPI from 'Api/Profile/UnFollowAPI';
import MyInfoAPI from 'Api/Profile/MyInfoAPI';

const FollowUser = (props) => {
  const { user, margin } = props;
  const url = user?.image.split('/') || null;
  const isFollowed = user?.isfollow;
  const pathIdentifier = props.pathIdentifier;
  const { getUserData } = MyInfoAPI();
  const { followUser } = FollowAPI(props.user?.accountname);
  const { unFollowUser } = UnFollowAPI(props.user?.accountname);

  const [followText, setFollowText] = useState(!isFollowed ? '팔로우' : '취소');

  useEffect(() => {
    const fetchUserData = async () => {
      await getUserData();
    };
    fetchUserData();
  }, [getUserData]);

  const handleFollowButtonClick = async (e) => {
    if (e.target.textContent === '취소') {
      setFollowText('팔로우');
      await unFollowUser();
    } else {
      setFollowText('취소');
      await followUser();
    }
  };
  return (
    <UserLayout margin={margin}>
      <Link to={`/profile/${user.accountname}`}>
        <UserImgLayout>
          <UserImg src={url[url?.length - 1] === 'null' ? profileSm : user?.image} alt={user?.username} />
        </UserImgLayout>
      </Link>
      <UserContentsLayout>
        <div>
          <UserTitle>{user?.username}</UserTitle>
          <UserContent>{user?.intro} </UserContent>
        </div>
        {props.followers && pathIdentifier?.length < 4 && (
          <Button
            onClick={handleFollowButtonClick}
            clicked={followText === '취소'}
            width='56px'
            fontSize='var(--xs)'
            border='none'
            padding={user?.intro ? '5.75px' : '8.5px'}
          >
            {followText}
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
