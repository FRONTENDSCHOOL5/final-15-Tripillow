import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const isProduct = atom({
  key: 'isProduct',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

const isMonetary = atom({
  key: 'isMonetary',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export { isProduct, isMonetary };
