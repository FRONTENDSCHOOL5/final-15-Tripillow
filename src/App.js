import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRecoilValue } from 'recoil';
import AppRoutes from './Router/AppRoutes';
import GlobalStyle from './GlobalStyle';
import useIsDesktop from './Components/PCNav/useIsDesktop';
import PCNavBar from './Components/PCNav/PCNavBar';
import MyPillowings from './Components/Home/MyPillowings';
import isDesktop from './Recoil/isDesktop/isDesktop';

function App() {
  const isPC = useRecoilValue(isDesktop);
  const isPCScreen = useIsDesktop();
  const location = useLocation();
  const path = location.pathname;
  const excludePath = path !== '/' && path !== '/login' && path !== '/signup' && isPCScreen;
  const isRightPath =
    path !== '/' && path !== '/login' && path !== '/signup' && path !== '/profile/followings' && path !== '/chat';

  const setScreenSize = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };
  const queryClient = new QueryClient();

  useEffect(() => {
    setScreenSize();
  });

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      {isRightPath && <MyPillowings $on={isPC} />}
      {excludePath && <PCNavBar />}
      <AppRoutes />
    </QueryClientProvider>
  );
}
export default App;
