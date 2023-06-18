import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import accountname from '../../Recoil/accountName/accountName';
import ProfileImg from '../../Assets/profile-lg.png';
import Chat from '../../Assets/icons/icon-message-circle-1.svg';
import Share from '../../Assets/icons/icon-share.svg';
import CommonButton from '../../Components/common/Button';
import { useRecoilValue } from 'recoil';

const UserProfile = (props) => {
  const user = props.user || props.author;
  const name = useRecoilValue(accountname);
  const [isFollowClicked, setIsFollowClicked] = useState(false);
  const [isFollow, setIsFollow] = useState(user.isfollow);

  const handleFollowButtonClick = (e) => {
    setIsFollowClicked(!isFollowClicked);
    if (e.target.textContent === '팔로우') {
      e.target.textContent = '언팔로우';
    } else {
      e.target.textContent = '팔로우';
    }
  };

  return (
    <>
      {user && (
        <UserProfileLayout>
          <h1 className='a11y-hidden'>사용자 프로필</h1>
          <ImgFollowLayout>
            <FollowLayout>
              <strong>{user.followerCount}</strong>
              <p>followers</p>
            </FollowLayout>
            <ImgLayout>
              <img src={user.image ? user.image : ProfileImg} alt='사용자 프로필 사진' />
            </ImgLayout>
            <FollowLayout color='#767676'>
              <strong>{user.followingCount}</strong>
              <p>followings</p>
            </FollowLayout>
          </ImgFollowLayout>
          <UserInfoLayout>
            <h2>{user.username}</h2>
            <p>{'@' + user.accountname}</p>
            <p>{user.intro}</p>
          </UserInfoLayout>
          {user.accountname === name ? (
            <IconLayout>
              <CommonButton width='120px'>프로필 수정</CommonButton>
              <CommonButton width='100px'>상품 등록</CommonButton>
            </IconLayout>
          ) : (
            <IconLayout>
              <ChatIconStyle />
              <CommonButton width='120px' clicked={isFollowClicked} onClick={handleFollowButtonClick}>
                팔로우
              </CommonButton>
              <ShareIconStyle />
            </IconLayout>
          )}
        </UserProfileLayout>
      )}
    </>
  );
};

const UserProfileLayout = styled.article`
  margin: 0 auto;
  padding: 0 0 26px;
  text-align: center;
  /* box-shadow: 0 0 10px royalblue; */
  border-bottom: 1px solid var(--light-gray);
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

const FollowLayout = styled.div`
  text-align: center;
  color: ${(props) => props.color};

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
