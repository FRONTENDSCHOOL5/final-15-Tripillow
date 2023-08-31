import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const isTab = atom({
  key: 'isTab',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export default isTab;