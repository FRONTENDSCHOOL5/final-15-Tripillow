import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const navbarIcon = atom({
  key: 'navbarIcon',
  default: 'Home',
  effects_UNSTABLE: [persistAtom],
});

export default navbarIcon;
