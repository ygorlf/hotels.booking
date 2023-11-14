import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'
import './App.css'

import Header from './components/header';

// Pages
import Home from './pages/home'
import Book from './pages/book';
import MyBooks from './pages/myBooks';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Home />
      </>
    ),
  },
  {
    path: "/book/:id",
    element: (
      <>
        <Header />
        <Book />
      </>
    ),
  },
  {
    path: "/book/edit/:id",
    element: (
      <>
        <Header />
        <Book />
      </>
    ),
  },
  {
    path: "/books",
    element: (
      <>
        <Header />
        <MyBooks />
      </>
    ),
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
