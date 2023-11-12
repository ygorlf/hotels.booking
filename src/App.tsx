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
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
