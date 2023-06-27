import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const isKorea = atom({
  key: 'isKorea',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

const isOverseas = atom({
  key: 'isOverseas',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export { isKorea, isOverseas };
