import { RouterProvider } from 'react-router-dom'
import router from './routes/main'
import { createRoot } from 'react-dom/client'

import './index.css'

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />)