import { QueryClient, QueryClientProvider } from 'react-query';
import AppRoutes from 'Router/AppRoutes';
import GlobalStyle from './GlobalStyle';
import useCheckDevice from 'Components/SideNav/useCheckDevice';
import { ReactQueryDevtools } from 'react-query/devtools';

function App() {
  const queryClient = new QueryClient();

  useCheckDevice();

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <ReactQueryDevtools initialIsOpen={true} />
      <AppRoutes />
    </QueryClientProvider>
  );
}
export default App;
