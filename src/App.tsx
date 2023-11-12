import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import './App.css'

// Pages
import Home from './pages/home'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
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
