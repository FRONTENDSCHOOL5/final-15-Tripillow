import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const userToken = atom({
  key: 'userToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export default userToken;
