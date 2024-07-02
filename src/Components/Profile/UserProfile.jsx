import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import FollowAPI from 'Api/Profile/FollowAPI';
import UnFollowAPI from 'Api/Profile/UnFollowAPI';
import chatLists from 'Mock/chatLists';
import accountName from 'Recoil/accountName/accountName';
import { followerURL, followingURL } from 'Recoil/followPath/followPath';
import { useQueryClient, useMutation } from 'react-query';
import AlertTop from 'Components/common/Modal/AlertTop';
import MobileUser from 'Components/Profile/MobileUser';
import PCUser from 'Components/Profile/PCUser';
import useIsWideView from 'Components/SideNav/useIsWideView';

const UserProfile = ({ user, profileLoading, userProfileLoading }) => {
  const queryClient = useQueryClient();
  const isWideView = useIsWideView();
  const [isModal, setIsModal] = useState(false);
  const params = useParams();
  const userAccount = params.accountname;
  const navigate = useNavigate();
  const myAccount = useRecoilValue(accountName);
  const account = userAccount ? userAccount : myAccount;
  const followerPath = useRecoilValue(followerURL);
  const followingPath = useRecoilValue(followingURL);
  const [randomMessage, setRandomMessage] = useState('');

  const username = user?.username;
  const userImg = user?.image;
  const [isFollow, setIsFollow] = useState(null);
  const [followText, setFollowText] = useState(user?.isFollow ? '언팔로우' : '팔로우');
  const [followCount, setFollowCount] = useState(user?.followerCount);

  useEffect(() => {
    if (user) {
      setIsFollow(user.isfollow);
      setFollowText(user.isfollow ? '언팔로우' : '팔로우');
      setFollowCount(user.followerCount);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      queryClient.setQueryData(['userData', { account }], user);
    }
  }, [user, queryClient, account]);

  const { followUser } = FollowAPI(account);
  const { unFollowUser } = UnFollowAPI(account);

  const followMutation = useMutation(followUser, {
    onSuccess: () => {
      setIsFollow(true);
      setFollowText('언팔로우');
      setFollowCount((prevCount) => prevCount + 1);
    },
    onError: (error) => {
      console.error('Error following user:', error);
    },
  });

  const unFollowMutation = useMutation(unFollowUser, {
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
        <PCUser
          user={user}
          followCount={followCount}
          myAccount={myAccount}
          handleChatClick={handleChatClick}
          followText={followText}
          handleFollowButtonClick={handleFollowButtonClick}
          followerPath={followerPath}
          followingPath={followingPath}
          handleCopy={handleCopy}
        />
      ) : (
        <MobileUser
          user={user}
          followCount={followCount}
          myAccount={myAccount}
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
