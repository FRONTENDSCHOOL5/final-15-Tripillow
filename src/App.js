// import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from 'Router/AppRoutes';
import GlobalStyle from './GlobalStyle';
import useCheckDevice from './Components/SideNav/useCheckDevice';

function App() {
  const queryClient = new QueryClient();

  useCheckDevice();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <AppRoutes />
    </QueryClientProvider>
  );
}
export default App;
