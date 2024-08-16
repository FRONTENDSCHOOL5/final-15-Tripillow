import CheckTokenAPI from 'Api/Auth/CheckTokenAPI';
import isLogin from 'Recoil/isLogin/isLogin';
import userToken from 'Recoil/userToken/userToken';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect } from 'react';
import accountName from 'Recoil/accountName/accountName';
import { isKorea, isOverseas } from 'Recoil/whichCountry/whichCountry';
import { isAlbum, isList } from 'Recoil/whichView/whichView';
import navbarIcon from 'Recoil/navbarIcon/navbarIcon';
import { useNavigate } from 'react-router-dom';

export const useCheckToken = () => {
  const navigate = useNavigate();
  const setToken = useSetRecoilState(userToken);
  const setLogin = useSetRecoilState(isLogin);
  const setName = useSetRecoilState(accountName);
  const setKorea = useSetRecoilState(isKorea);
  const setOverseas = useSetRecoilState(isOverseas);
  const setListView = useSetRecoilState(isList);
  const setAlbumView = useSetRecoilState(isAlbum);
  const setNavbarIcon = useSetRecoilState(navbarIcon);
  const token = useRecoilValue(userToken);
  const checkValidToken = CheckTokenAPI();

  useEffect(() => {
    const checkToken = async () => {
      if (!token) return;

      const response = await checkValidToken();
      console.log('response', response);
      const isValid = response.isValid ? response.isValid : null;
      if (isValid) {
        return;
      } else {
        setToken('');
        setLogin(false);
        setName('');
        setKorea(true);
        setOverseas(false);
        setListView(true);
        setAlbumView(false);
        setNavbarIcon('Home');
        // window.location.href = '/';
        navigate('/');
      }
    };
    checkToken();
  }, [
    token,
    checkValidToken,
    setToken,
    setLogin,
    setName,
    setKorea,
    setOverseas,
    setListView,
    setAlbumView,
    setNavbarIcon,
  ]);
};
