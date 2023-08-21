import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useRecoilValue } from 'recoil';
import AppRoutes from './Router/AppRoutes';
import GlobalStyle from './GlobalStyle';
import useIsDesktop from './Components/PCNav/useIsDesktop';
import PCNavBar from './Components/PCNav/PCNavBar';

function App() {
  const isPCScreen = useIsDesktop();

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
      {/* {isPCScreen && <PCNavBar />} */}
      <AppRoutes />
    </QueryClientProvider>
  );
}
export default App;
