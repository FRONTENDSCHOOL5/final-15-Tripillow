import useCheckDevice from 'Components/SideNav/useCheckDevice';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppRoutes from 'Router/AppRoutes';
import GlobalStyle from './GlobalStyle';
import { useCheckToken } from 'Hooks/useCheckToken';

function App() {
  const queryClient = new QueryClient();

  useCheckDevice();
  useCheckToken();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={true} />}
      <AppRoutes />
    </QueryClientProvider>
  );
}
export default App;
