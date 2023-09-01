import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import accountName from 'Recoil/accountName/accountName';
import FollowingListAPI from 'Api/Profile/FollowingListAPI';

const UseFollowing = () => {
  const accountname = useRecoilValue(accountName);
  const { fetchFollowing } = FollowingListAPI(accountname);
  const [followingData, setFollowingData] = useState([]);

  const handleFetch = async () => {
    const data = await fetchFollowing();
    if (data) setFollowingData(data);
  };

  useEffect(() => {
    handleFetch();
    //eslint-disable-next-line
  }, []);

  return { followingData };
};

export default UseFollowing;
