import useCheckDevice from 'Components/SideNav/useCheckDevice';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import AppRoutes from 'Router/AppRoutes';
import GlobalStyle from './GlobalStyle';

function App() {
  const queryClient = new QueryClient();

  useCheckDevice();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={true} />}
      <AppRoutes />
    </QueryClientProvider>
  );
}
export default App;
