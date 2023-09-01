import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import profileSm from '../../Assets/profile-sm.png';
import Button from './Button';
import FollowAPI from '../../Utils/FollowAPI';
import UnFollowAPI from '../../Utils/UnFollowAPI';
import MyInfoAPI from '../../Utils/MyInfoAPI';

const FollowUser = (props) => {
  const url = props.user?.image.split('/') || null;
  const isFollowed = props.user?.isfollow;
  const pathIdentifier = props.pathIdentifier;
  const { getUserData } = MyInfoAPI();
  const { followUser } = FollowAPI(props.user?.accountname);
  const { unFollowUser } = UnFollowAPI(props.user?.accountname);

  //eslint-disable-next-line
  const [followCount, setFollowCount] = useState(props.user?.followingCount);
  //eslint-disable-next-line
  const [isFollow, setIsFollow] = useState(props.user?.isfollow);
  const [followText, setFollowText] = useState(!isFollowed ? '팔로우' : '취소');

  useEffect(() => {
    if (isFollowed) {
      setFollowText('취소');
    } else if (!isFollowed) {
      setFollowText('팔로우');
    }
  }, [isFollowed]);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setFollowCount(data?.followingCount);
    };
    fetchUserData();
    //eslint-disable-next-line
  }, []);

  const handleFollowButtonClick = async (e) => {
    if (isFollow) {
      setFollowText('팔로우');
      setFollowCount((prevCount) => prevCount - 1);
      await unFollowUser();
    } else {
      setFollowText('취소');
      setFollowCount((prevCount) => prevCount + 1);
      await followUser();
    }
  };
  return (
    <UserLayout margin={props.margin}>
      <Link to={`/profile/${props.user.accountname}`}>
        <UserImgLayout>
          <UserImg src={url[url?.length - 1] === 'null' ? profileSm : props.user?.image} alt={props.user?.username} />
        </UserImgLayout>
      </Link>
      <UserContentsLayout>
        <div>
          <UserTitle>{props.user?.username}</UserTitle>
          <UserContent>{props.user?.intro} </UserContent>
        </div>
        {props.followers && pathIdentifier?.length < 4 && (
          <Button
            onClick={handleFollowButtonClick}
            clicked={followText === '취소'}
            width='56px'
            fontSize='var(--xs)'
            border='none'
            padding={props.user?.intro ? '5.75px' : '8.5px'}
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
