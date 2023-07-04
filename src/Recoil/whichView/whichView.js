import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const isList = atom({
  key: 'isList',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

const isAlbum = atom({
  key: 'isAlbum',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export { isList, isAlbum };
