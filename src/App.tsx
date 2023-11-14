import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import './App.css'

// Pages
import Home from './pages/home'
import Book from './pages/book';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/book/:id",
    element: <Book />,
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
