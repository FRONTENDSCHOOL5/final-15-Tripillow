import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import isTab from 'Recoil/isTab/isTab';

const useCheckDevice = () => {
  const setIsPCScreen = useSetRecoilState(isDesktop);
  const setIsTabScreen = useSetRecoilState(isTab);

  useEffect(() => {
    const handleResize = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      if (window.innerWidth > 1280) setIsPCScreen(true);
      else setIsPCScreen(false);
      if (640 < window.innerWidth && window.innerWidth < 1279) setIsTabScreen(true);
      else setIsTabScreen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
  }, [setIsPCScreen, setIsTabScreen]);
};

export default useCheckDevice;
