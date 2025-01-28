import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeLayout,About, Landing, Cocktail, Newsletter,Error, SinglePageError} from "./pages";

import { loader as landingLoader } from "./pages/Landing";
import { loader as SingleCocktailLoader} from "./pages/Cocktail";
import { action as newsletterAction} from "./pages/Newsletter"
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient=new QueryClient({

  defaultOptions:{
    queries:{

      staleTime: 1000 * 60 *5,
    }
  }
})
const router=createBrowserRouter([
  {
    path:'/',
    element:<HomeLayout/>,
    errorElement:<Error/>,
    children:[
      {
        index:true,
        element:<Landing/>,
        errorElement:<SinglePageError/>,
        loader:landingLoader(queryClient),
        
      },
      {
        path:'/about',
        element:<About/>,
        children:[
          {
            path:'person',
            element:<h2>John Deo</h2>

          }
        ],
      },
      {
        path:'/cocktail/:id',
        errorElement:<SinglePageError/>,
        loader: SingleCocktailLoader(queryClient),
        element:<Cocktail/>,
       
        
      },
      {
        path:'/newsletter',
        element:<Newsletter/>,
        action: newsletterAction,
        errorElement:<SinglePageError/>,
      },
     
    ]
  },

  

])

const App = () => {

  return (
    <QueryClientProvider client={queryClient}>

        <RouterProvider router={router}/>
        <ReactQueryDevtools/>
    </QueryClientProvider>

  )
  
  
  
};
export default App;
