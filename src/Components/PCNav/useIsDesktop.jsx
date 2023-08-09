import React from 'react';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import isDesktop from '../../Recoil/isDesktop/isDesktop';

const useIsDesktop = () => {
  // const [isPCScreen, setIsPCScreen] = useState(false);
  const [isDesktopState, setIsDesktopState] = useRecoilState(isDesktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) setIsDesktopState(true);
      else setIsDesktopState(false);
      // if (window.innerWidth > 1280) setIsPCScreen(true);
      // else setIsPCScreen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
  }, []);

  return isDesktopState;
};

export default useIsDesktop;
