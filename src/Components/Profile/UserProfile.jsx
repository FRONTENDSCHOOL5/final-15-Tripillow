import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import FollowAPI from 'Api/Profile/FollowAPI';
import UnFollowAPI from 'Api/Profile/UnFollowAPI';
import chatLists from 'Mock/chatLists';
import accountName from 'Recoil/accountName/accountName';
import { followerURL, followingURL } from 'Recoil/followPath/followPath';
import { useQueryClient, useMutation, useQuery } from 'react-query';
import MyInfoAPI from 'Api/Profile/MyInfoAPI';
import UserInfoAPI from 'Api/Profile/UserInfoAPI';
import AlertTop from 'Components/common/Modal/AlertTop';
import MobileUser from 'Components/Profile/MobileUser';
import PCUser from 'Components/Profile/PCUser';
import useIsWideView from 'Components/SideNav/useIsWideView';
import ProfileSkeleton from 'Components/common/Skeleton/ProfileSkeleton';
import PCProfileSkeleton from 'Components/common/Skeleton/PCProfileSkeleton';

const UserProfile = () => {
  const queryClient = useQueryClient();
  const isWideView = useIsWideView();
  const [isModal, setIsModal] = useState(false);
  const params = useParams();
  const userAccount = params.accountname;
  const navigate = useNavigate();
  const name = useRecoilValue(accountName);
  const account = userAccount ? userAccount : name;
  const followerPath = useRecoilValue(followerURL);
  const followingPath = useRecoilValue(followingURL);
  const [randomMessage, setRandomMessage] = useState('');

  const { getUserData } = MyInfoAPI();
  const { getUserInfo } = UserInfoAPI(account);

  const { data: profileData, isLoading: profileDataLoading } = useQuery(['myData', account], getUserData, {
    enabled: !userAccount,
  });
  const { data: userProfileData, isLoading: userProfileDataLoading } = useQuery(['userData', account], getUserInfo, {
    enabled: userAccount !== '',
  });

  const user = userAccount !== '' ? userProfileData : profileData;
  const loading = userAccount !== '' ? userProfileDataLoading : profileDataLoading;
  const shouldShowSkeleton = loading || (!loading && !user);
  const username = user?.username;
  const userImg = user?.image;
  const [isFollow, setIsFollow] = useState(null);
  const [followText, setFollowText] = useState(user?.isFollow ? '언팔로우' : '팔로우');
  const [followCount, setFollowCount] = useState(user?.followerCount);

  useEffect(() => {
    if (user) {
      setIsFollow(user.isfollow);
      setFollowText(user.isfollow ? '팔로우' : '언팔로우');
      setFollowCount(user.followerCount);
    }
  }, [user]);

  // NOTE: 팔로우 버튼의 깜빡임을 줄이기 위해서 메모이제이션 사용
  useEffect(() => {
    if (user) {
      queryClient.setQueryData(['userData', account], user);
    }
  }, [user, account, queryClient]);

  const { followUser } = FollowAPI(account);
  const { unFollowUser } = UnFollowAPI(account);

  const followMutation = useMutation(() => followUser, {
    onSuccess: () => {
      setIsFollow(true);
      setFollowText('언팔로우');
      setFollowCount((prevCount) => prevCount + 1);
    },
    onError: (error) => {
      console.error('Error following user:', error);
    },
  });

  const unFollowMutation = useMutation(() => unFollowUser, {
    onSuccess: () => {
      setIsFollow(false);
      setFollowText('팔로우');
      setFollowCount((prevCount) => prevCount - 1);
    },
    onError: (error) => {
      console.error('Error unfollowing user:', error);
    },
  });

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * chatLists.length);
    const selectedMessage = chatLists[randomIndex];
    setRandomMessage(selectedMessage);
  }, []);

  useEffect(() => {
    if (isFollow) {
      setFollowText('언팔로우');
    } else if (!isFollow) {
      setFollowText('팔로우');
    }
  }, [isFollow]);

  const handleFollowButtonClick = async (e) => {
    if (isFollow) {
      unFollowMutation.mutate();
    } else {
      followMutation.mutate();
    }
  };

  const handleChatClick = () => {
    navigate(`/chat/${username}`, { state: { username, randomMessage, userImg } });
  };

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error(err);
    }
  };

  const handleCopy = async () => {
    isModal && setIsModal(false);
    const modal = await handleCopyClipBoard(window.location.href);
    setIsModal(modal);
    setTimeout(() => setIsModal(false), 2300);
  };

  return (
    <>
      {isModal && (
        <AlertTop isModal={isModal} isWideView={isWideView}>
          클립보드에 복사되었습니다
        </AlertTop>
      )}
      {isWideView ? (
        shouldShowSkeleton ? (
          <PCProfileSkeleton />
        ) : (
          <PCUser
            user={user}
            followCount={followCount}
            name={name}
            handleChatClick={handleChatClick}
            followText={followText}
            handleFollowButtonClick={handleFollowButtonClick}
            followerPath={followerPath}
            followingPath={followingPath}
            handleCopy={handleCopy}
          />
        )
      ) : shouldShowSkeleton ? (
        <ProfileSkeleton />
      ) : (
        <MobileUser
          user={user}
          followCount={followCount}
          name={name}
          handleChatClick={handleChatClick}
          followText={followText}
          handleFollowButtonClick={handleFollowButtonClick}
          followerPath={followerPath}
          followingPath={followingPath}
          handleCopy={handleCopy}
        />
      )}
    </>
  );
};

export default UserProfile;
