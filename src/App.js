import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from 'Router/AppRoutes';
import GlobalStyle from './GlobalStyle';

function App() {
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
      <AppRoutes />
    </QueryClientProvider>
  );
}
export default App;
