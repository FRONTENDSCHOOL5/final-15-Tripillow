import React, { useState } from 'react';
import AlertTop from 'Components/common/Modal/AlertTop';
import MobileUser from 'Components/Profile/MobileUser';
import PCUser from 'Components/Profile/PCUser';
import useIsWideView from 'Components/SideNav/useIsWideView';

const UserProfile = (props) => {
  const isWideView = useIsWideView();
  const user = props.user || props.author;
  const [isModal, setIsModal] = useState(false);

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
      {user && (
        <>
          {isModal && (
            <AlertTop isModal={isModal} isWideView={isWideView}>
              클립보드에 복사되었습니다
            </AlertTop>
          )}
          <h1 className='a11y-hidden'>사용자 프로필</h1>
          {isWideView ? (
            <PCUser user={user} handleCopy={handleCopy} />
          ) : (
            <MobileUser user={user} handleCopy={handleCopy} />
          )}
        </>
      )}
    </>
  );
};

export default UserProfile;
