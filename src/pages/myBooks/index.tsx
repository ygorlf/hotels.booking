import { useEffect } from 'react';
import styled from 'styled-components';

// Components
import BookCard from '../../components/bookCard';

// Hooks
import { useBook } from '../../hooks/useBook';

const Page = styled.div`
  width: 100%;
  min-height: calc(100vh - 4rem);
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
  const { books, removing, fetchBooks, removeBook } = useBook();

  useEffect(() => {
    fetchBooks();
  }, []);

  const renderHotels = () => {
    return books.map((book) => (
      <BookCard book={book} removing={removing} removeBook={removeBook} />
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