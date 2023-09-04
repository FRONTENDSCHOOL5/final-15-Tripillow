import { useRecoilValue } from 'recoil';
import isDesktop from 'Recoil/isDesktop/isDesktop';
import isTab from 'Recoil/isTab/isTab';

const useIsWideView = () => {
  const isPCScreen = useRecoilValue(isDesktop);
  const isTabScreen = useRecoilValue(isTab);
  return isPCScreen || isTabScreen;
};

export default useIsWideView;
