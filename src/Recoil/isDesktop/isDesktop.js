import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const isDesktop = atom({
  key: 'isDesktop',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default isDesktop;
