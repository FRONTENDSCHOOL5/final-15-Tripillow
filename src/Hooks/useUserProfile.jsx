import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import FollowAPI from '../Utils/FollowAPI';
import UnFollowAPI from '../Utils/UnFollowAPI';
import chatLists from '../Mock/chatLists';
import accountName from '../Recoil/accountName/accountName';
import { followerURL, followingURL } from '../Recoil/followPath/followPath';

const UseUserProfile = (props) => {
  const user = props;
  const navigate = useNavigate();
  const follow = user?.isfollow;
  const account = user?.accountname;
  const username = user?.username;
  const userImg = user?.image;
  const name = useRecoilValue(accountName);
  const followerPath = useRecoilValue(followerURL);
  const followingPath = useRecoilValue(followingURL);
  const [isFollow, setIsFollow] = useState(user?.isfollow);
  const [followText, setFollowText] = useState(!follow ? '팔로우' : '언팔로우');
  const [randomMessage, setRandomMessage] = useState('');
  const [followCount, setFollowCount] = useState(user.followerCount);

  const { followUser } = FollowAPI(account);
  const { unFollowUser } = UnFollowAPI(account);

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
      setIsFollow(false);
      setFollowText('팔로우');
      setFollowCount((prevCount) => prevCount - 1);
      await unFollowUser();
    } else {
      setIsFollow(true);
      setFollowText('언팔로우');
      setFollowCount((prevCount) => prevCount + 1);
      await followUser();
    }
  };

  const handleChatClick = () => {
    navigate(`/chat/${username}`, { state: { username, randomMessage, userImg } });
  };
  return {
    followCount,
    name,
    handleChatClick,
    followText,
    handleFollowButtonClick,
    followerPath,
    followingPath,
  };
};

export default UseUserProfile;
