import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import CommonButton from '../common/Button';
import { UserProfileLayout, ImgLayout, IconBox, ShareIconStyle } from './UserStyle';
import UseUserProfile from '../../Hooks/useUserProfile';
import Chat from '../../Assets/icons/icon-message-circle-1.svg';
import ProfileImg from '../../Assets/profile-lg.png';

const MobileUser = ({ user, handleCopy }) => {
  const navigate = useNavigate();
  const { followerPath, followingPath, name, followText, handleFollowButtonClick, handleChatClick, followCount } =
    UseUserProfile(user);

  return (
    <UserProfileLayout>
      <ImgFollowLayout>
        <FollowLayout to={followerPath} state={user}>
          <strong>{followCount}</strong>
          <p>pillowers</p>
        </FollowLayout>
        <ImgLayout>
          <img src={user.image ? user.image : ProfileImg} alt='사용자 프로필 사진' />
        </ImgLayout>
        <FollowLayout to={followingPath} state={user} color='#767676'>
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
          <ShareIconStyle onClick={handleCopy} />
        </IconLayout>
      )}
    </UserProfileLayout>
  );
};

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

const FollowLayout = styled(Link)`
  text-align: center;
  color: ${(props) => props.color};
  cursor: pointer;

  strong {
    font-size: var(--lg);
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

const ChatIconStyle = styled.button`
  ${IconBox}
  background: url(${Chat}) no-repeat center;
`;

export default MobileUser;
