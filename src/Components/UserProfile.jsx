import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import accountName from '../Recoil/accountName/accountName';
import MyInfoAPI from '../Utils/MyInfoAPI';
import ProfileImg from '../Assets/profile-lg.png';
import Chat from '../Assets/icons/icon-message-circle-1.svg';
import Share from '../Assets/icons/icon-share.svg';
import CommonButton from './common/Button';
import FollowAPI from '../Utils/FollowAPI';
import UnFollowAPI from '../Utils/UnFollowAPI';
import URL from '../Utils/URL';
import AlertTop from './common/Modal/AlertTop';
import chatLists from '../Mock/chatLists';

const UserProfile = ({ followCount, setFollowCount, followerURL, followingURL, ...props }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = props.user || props.author;
  const follow = user?.isfollow;
  const account = user?.accountname;
  const userCount = user?.followerCount;
  const username = props.user?.username;
  const userImg = props.user?.image;
  const name = useRecoilValue(accountName);
  const { getUserData } = MyInfoAPI();
  const { followUser } = FollowAPI({ account });
  const { unFollowUser } = UnFollowAPI({ account });
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
      setIsModal(true);
    } catch (err) {
      console.error(err);
    }
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
        <UserProfileLayout>
          {isModal && <AlertTop isModal={isModal}>클립보드에 복사되었습니다</AlertTop>}
          <h1 className='a11y-hidden'>사용자 프로필</h1>
          <ImgFollowLayout>
            <FollowLayout to={followerURL} state={user}>
              <strong>{userCount}</strong>
              <p>pillowers</p>
            </FollowLayout>
            <ImgLayout>
              <img src={user.image ? user.image : ProfileImg} alt='사용자 프로필 사진' />
            </ImgLayout>
            <FollowLayout to={followingURL} state={user} color='#767676'>
              <strong>{user.followingCount}</strong>
              <p>pillowings</p>
            </FollowLayout>
          </ImgFollowLayout>
          <UserInfoLayout>
            <h2>{user.username}</h2>
            <p>{'@' + user.accountname}</p>
            <p>{user.intro}</p>
          </UserInfoLayout>
          {user.accountname === name ? (
            <IconLayout>
              <CommonButton clicked width='120px' fontSize='var(--sm)' onClick={() => navigate('/profile/edit')}>
                프로필 수정
              </CommonButton>
              <CommonButton onClick={() => navigate('/addproduct')} clicked width='100px' fontSize='var(--sm)'>
                상품 등록
              </CommonButton>
            </IconLayout>
          ) : (
            <IconLayout>
              <ChatIconStyle onClick={handleChatClick} />
              <CommonButton width='120px' clicked={followText === '언팔로우'} onClick={handleFollowButtonClick}>
                {followText}
              </CommonButton>
              <ShareIconStyle
                onClick={() => {
                  setIsModal(false);
                  return handleCopyClipBoard(URL + '/' + location.pathname);
                }}
              />
            </IconLayout>
          )}
        </UserProfileLayout>
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

const ImgFollowLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 42px;
  margin-bottom: 16px;

  & > * {
    flex-shrink: 0;
  }
`;

const ImgLayout = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const FollowLayout = styled(Link)`
  text-align: center;
  color: ${(props) => props.color};
  cursor: pointer;

  strong {
    font-size: 18px;
    font-weight: 700;
  }

  p {
    margin-top: 6px;
    font-size: 10px;
    font-weight: 400;
  }
`;

const UserInfoLayout = styled.div`
  margin-bottom: 24px;

  h2 {
    margin-bottom: 6px;
    font-size: 16px;
    font-weight: 700;
  }

  p:nth-of-type(1) {
    margin-bottom: 16px;
    color: #767676;
    font-size: 12px;
    font-weight: 400;
  }

  p:nth-of-type(2) {
    color: #767676;
    font-size: 14px;
  }
`;

const IconLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  & > * {
    flex-shrink: 0;
  }
`;

// Icon Container
const IconBox = css`
  width: 34px;
  height: 34px;
  background-color: #fff;
  border-radius: 50%;
  border: 1px solid var(--light-gray);
`;

const ChatIconStyle = styled.button`
  ${IconBox}
  background: url(${Chat}) no-repeat center;
`;

const ShareIconStyle = styled.button`
  ${IconBox}
  background: url(${Share}) no-repeat center;
`;

export default UserProfile;
