import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import './App.css'

// Pages
import Home from './pages/home'
import Booking from './pages/booking';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/booking/:id",
    element: <Booking />,
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
