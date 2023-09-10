import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

const followerURL = atom({
  key: 'followerURL',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

const followingURL = atom({
  key: 'followingURL',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

export { followerURL, followingURL };
