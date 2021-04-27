import { GlobalStyles } from "twin.macro";
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
const queryClient = new QueryClient()
const App = ({ Component, pageProps }) => (
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <Component {...pageProps} />

  </QueryClientProvider>
);

export default App;