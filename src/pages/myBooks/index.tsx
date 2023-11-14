import { useState, useEffect } from 'react';
import styled from 'styled-components';

// Components
import BookCard from '../../components/bookCard';

import { Book } from '../../types/'

const Page = styled.div`
  width: 100vw;
  min-height: 100vh;
  padding: 4rem 0;
  background: linear-gradient(0deg, var(--app-dark) -10%, var(--app-light) 100%);
`;

const BooksList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
  width: 85%;
  margin: 0 auto;
  padding: 0;
  list-style: none;

  @media (max-width: 1010px) {
    width: 95%;
    grid-template-columns: 1fr;
  }
`;

const MyBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [removing, setRemoving] = useState({ id: '', active: false });

  const fetchBooks = async () => {
    try {
      const data = await (await fetch(`${import.meta.env.VITE_API_URL}/books`)).json();
      setBooks(data.books);
    } catch (err) {
      console.log(err);
    }
  };

  const removeBook = async (id: string) => {
    try {
      setRemoving({ id, active: true });
  
      await fetch(`${import.meta.env.VITE_API_URL}/book`, {
        method: 'DELETE',
        body: JSON.stringify({
          id,
        })
      });
      
      setRemoving({ id: '', active: false });
      setBooks(books.filter(book => book.id !== id))
    } catch (err) {
      setRemoving({ id: '', active: false });
    }
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderHotels = () => {
    return books.map((hotel) => (
      <BookCard book={hotel} removing={removing} removeBook={removeBook} />
    ))
  }

  return (
    <Page>
      <BooksList>
        {renderHotels()}
      </BooksList>
    </Page>
  )
};

export default MyBooks;