import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import isDesktop from '../../Recoil/isDesktop/isDesktop';

const useIsDesktop = () => {
  const [isPCScreen, setIsPCScreen] = useRecoilState(isDesktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280) setIsPCScreen(true);
      else setIsPCScreen(false);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
  }, [setIsPCScreen]);

  return isPCScreen;
};

export default useIsDesktop;
