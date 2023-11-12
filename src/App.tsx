import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import './App.css'

// Pages
import Booking from './pages/booking/'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Booking />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
