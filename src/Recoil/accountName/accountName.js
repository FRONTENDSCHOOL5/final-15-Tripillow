import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const accountName = atom({
  key: 'accountName',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export default accountName;
