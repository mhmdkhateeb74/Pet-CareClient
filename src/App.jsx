import { RouterProvider} from 'react-router';
import router from "./Routers/main_R";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();


function App() {

  return (
<QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>

  )

};

export default App;