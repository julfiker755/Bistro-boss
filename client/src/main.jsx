import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import routes from './Routerdom/routes'
import Usercontaxt from './Hooks/Usercontaxt'

import {QueryClient,QueryClientProvider,} from '@tanstack/react-query'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Usercontaxt>
     <QueryClientProvider client={queryClient}>
     <RouterProvider router={routes}></RouterProvider>
    </QueryClientProvider>
     </Usercontaxt>
  </React.StrictMode>,
)
