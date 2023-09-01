import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import isTab from 'Recoil/isTab/isTab';

const useIsTab = () => {
  const [isTabScreen, setIsTabScreen] = useRecoilState(isTab);

  useEffect(() => {
    const handleResize = () => {
      if (640 < window.innerWidth && window.innerWidth < 1279) setIsTabScreen(true);
      else setIsTabScreen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
  }, [setIsTabScreen]);

  return isTabScreen;
};

export default useIsTab;
