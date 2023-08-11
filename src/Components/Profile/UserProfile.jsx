import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import accountName from '../../Recoil/accountName/accountName';
import MyInfoAPI from '../../Utils/MyInfoAPI';
import FollowAPI from '../../Utils/FollowAPI';
import UnFollowAPI from '../../Utils/UnFollowAPI';
import AlertTop from '../common/Modal/AlertTop';
import MobileUser from './MobileUser';
import chatLists from '../../Mock/chatLists';
import PCUser from './PCUser';
import isDeskTop from '../../Recoil/isDesktop/isDesktop';

const UserProfile = ({ followCount, setFollowCount, followerURL, followingURL, ...props }) => {
  const navigate = useNavigate();
  const user = props.user || props.author;
  const follow = user?.isfollow;
  const account = user?.accountname;
  const userCount = user?.followerCount;
  const username = props.user?.username;
  const userImg = props.user?.image;
  const name = useRecoilValue(accountName);
  const isPCScreen = useRecoilValue(isDeskTop);
  const { getUserData } = MyInfoAPI();
  const { followUser } = FollowAPI(account);
  const { unFollowUser } = UnFollowAPI(account);
  const [myData, setMyData] = useState({});
  const [isFollow, setIsFollow] = useState(user?.isfollow);
  const [followText, setFollowText] = useState(!follow ? '팔로우' : '언팔로우');
  const [isModal, setIsModal] = useState(false);
  const [randomMessage, setRandomMessage] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * chatLists.length);
    const selectedMessage = chatLists[randomIndex];
    setRandomMessage(selectedMessage);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setMyData(data);
      setFollowCount(data.followingCount);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    setIsFollow(user?.isfollow);
  }, [follow]);

  useEffect(() => {
    if (isFollow) {
      setFollowText('언팔로우');
    } else if (!isFollow) {
      setFollowText('팔로우');
    }
  }, [isFollow]);

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopy = async (text) => {
    isModal && setIsModal(false);
    const modal = handleCopyClipBoard(window.location.href);
    setIsModal(modal);
  };

  const handleFollowButtonClick = async (e) => {
    if (isFollow) {
      setIsFollow(false);
      setFollowText('팔로우');
      setFollowCount((prevCount) => prevCount - 1);
      const data = await unFollowUser();
    } else {
      setIsFollow(true);
      setFollowText('언팔로우');
      setFollowCount((prevCount) => prevCount + 1);
      const data = await followUser();
    }
  };

  const handleChatClick = () => {
    navigate(`/chat/${username}`, { state: { username, randomMessage, userImg } });
  };

  return (
    <>
      {user && (
        <>
          {isModal && <AlertTop isModal={isModal}>클립보드에 복사되었습니다</AlertTop>}
          <h1 className='a11y-hidden'>사용자 프로필</h1>
          {isPCScreen ? (
            <PCUser
              followerURL={followerURL}
              user={user}
              userCount={userCount}
              followingURL={followingURL}
              name={name}
              handleChatClick={handleChatClick}
              followText={followText}
              handleFollowButtonClick={handleFollowButtonClick}
              handleCopy={handleCopy}
            />
          ) : (
            <MobileUser
              followerURL={followerURL}
              user={user}
              userCount={userCount}
              followingURL={followingURL}
              name={name}
              handleChatClick={handleChatClick}
              followText={followText}
              handleFollowButtonClick={handleFollowButtonClick}
              handleCopy={handleCopy}
            />
          )}
        </>
      )}
    </>
  );
};

const UserProfileLayout = styled.article`
  margin: 0 auto;
  padding: 30px 0 26px;
  text-align: center;
  background-color: #fff;
`;

export default UserProfile;
