import ProfileImg from 'Assets/profile-lg.png';
import CommonButton from 'Components/common/Button';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ImgLayout, ShareIconStyle, UserProfileLayout } from 'Styles/UserStyle';

const PCUserProfile = ({ user, ...props }) => {
  const [isFollowing, setIsFollowing] = useState(user?.isfollow);
  const { followCount, myAccount, handleChatClick, handleFollowButtonClick, followerPath, followingPath, handleCopy } =
    props;
  const navigate = useNavigate();

  useEffect(() => {
    setIsFollowing(user?.isfollow);
  }, [user?.isfollow]);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    handleFollowButtonClick();
  };

  return (
    <UserProfileLayout $pc>
      <ImgLayout>
        <img src={user?.image ? user?.image : ProfileImg} alt='사용자 프로필 사진' />
      </ImgLayout>
      <UserInfo>
        <UserNameIcons>
          <h2>{user?.username}</h2>
          {user?.accountname === myAccount ? (
            <IconLayout>
              <CommonButton onClick={() => navigate('/profile/edit')} clicked width='91px' fontSize='var(--xs)'>
                프로필 수정
              </CommonButton>
              <CommonButton onClick={() => navigate('/addproduct')} clicked width='72px' fontSize='var(--xs)'>
                상품등록
              </CommonButton>
            </IconLayout>
          ) : (
            <IconLayout>
              <CommonButton width='76px' clicked={isFollowing} onClick={handleFollow} fontSize='var(--xs)'>
                {isFollowing ? '언팔로우' : '팔로우'}
              </CommonButton>

              <CommonButton onClick={handleChatClick} clicked width='56px' fontSize='var(--xs)'>
                메세지
              </CommonButton>
              <ShareIconStyle onClick={handleCopy} />
            </IconLayout>
          )}
        </UserNameIcons>
        <CommonParagraph>{'@' + user?.accountname}</CommonParagraph>
        <FollowsLayout>
          <FollowLayout to={followerPath} state={user}>
            <strong>{followCount}</strong>
            <p>pillowers</p>
          </FollowLayout>
          <FollowLayout to={followingPath} state={user} color='var(--dark-gray)'>
            <strong>{user?.followingCount}</strong>
            <p>pillowings</p>
          </FollowLayout>
        </FollowsLayout>
        <CommonParagraph>{user?.intro}</CommonParagraph>
      </UserInfo>
    </UserProfileLayout>
  );
};

export default PCUserProfile;

const UserInfo = styled.div`
  text-align: start;
  flex-grow: 1;
`;

const UserNameIcons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  h2 {
    font-size: var(--lg);
  }
`;

const IconLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommonParagraph = styled.p`
  font-size: var(--sm);
  color: var(--dark-gray);
  margin-bottom: 15px;
`;

const FollowsLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 15px;
`;

const FollowLayout = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${(props) => props.color};
  cursor: pointer;

  strong {
    font-size: var(--lg);
    font-weight: bold;
  }

  p {
    font-size: 10px;
  }
`;
