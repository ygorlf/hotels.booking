import { useEffect } from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'

// Components
import Stars from './stars'

// Types
import { Book } from '../types'

type Removing = {
  id: string;
  active: boolean;
}

type Props = {
  book: Book;
  removing: Removing;
  removeBook: (id: string) => void;
}

const Container = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 12rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  background-color: var(--app-white);
  box-shadow: 0 0 12px #0000000D;
  overflow: hidden;
  transition: all .2s;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 1rem var(--app-white);

    button {
      display: initial;
    }
  }

  @media (max-width: 667px) {
    width: 100%;
    min-width: auto;
    flex-direction: column;
    height: 25rem;
  }
`;

const PhotoBox = styled.div`
  display: flex;
  justify-content: center;
  width: 30%;
  height: 100%;
  overflow: hidden;

  @media (max-width: 667px) {
    flex-direction: column;
    width: 100%;
    height: 25rem;
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
`;

const DetailsBox = styled.div`
  width: 70%;
  height: 100%;
  padding: 1rem;

  @media (max-width: 667px) {
    width: 100%;
    height: 55%;
  }
`;

const BoxName = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h2`
  margin: 0;
  font: 500 1.125rem 'Roboto', sans-serif;
  color: var(--app-text);
`;

const City = styled.span`
  margin-top: 0;
  font: 300 .875rem 'Roboto', sans-serif;
  color: var(--app-text);
`;

const Box = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`;

const Label = styled.label`
  font: 400 .675rem 'Roboto', sans-serif;
  color: var(--app-text);
`;

const Field = styled.span`
  margin-left: .5rem;
  font: 400 1rem 'Roboto', sans-serif;
  color: var(--app-text);
`;

const BookingButton = styled.button`
  position: absolute;
  bottom: 1.25rem;
  right: 1.25rem;
  display: none;
  padding: .25rem .75rem;
  border: 2px solid var(--app-dark);
  border-radius: 8px;
  background-color: transparent;
  font: 400 1rem 'Roboto', sans-serif;
  color: var(--app-dark);
  cursor: pointer;
  outline: none;
  transition: all .2s;

  &:hover {
    background-color: var(--app-dark);
    color: var(--app-white);
    box-shadow: 2px 2px 8px var(--app-dark-transparent);
  }

  @media (max-width: 480px) {
    display: initial;
  }
`;


const BookCard = (props: Props) => {
  const { book, removing, removeBook } = props;

  const isRemoving = removing.active && removing.id === book.id;

  const formatPrice = (value: number) => (
    Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(value)
  );

  const getPrice = () => {
    const { totalPrice } = book;

    return formatPrice(totalPrice);
  }

  return (
    <Container>
      <PhotoBox>
        <Photo src={book.photo} alt={`imagem do hotel ${book.name}`} />
      </PhotoBox>
      <DetailsBox>
        <BoxName>
          <Name>{book.name}</Name>
          <Stars
            classification={book.classification}
            width='1.25rem'
          />
        </BoxName>
        <City>{book.city} - {book.state}</City>
        <Box>
          <Label>Check in:</Label>
          <Field>{format(new Date(book.startDate), 'MM/dd/YYY')}</Field>
        </Box>
        <Box>
          <Label>Check out:</Label>
          <Field>{format(new Date(book.endDate), 'MM/dd/YYY')}</Field>
        </Box>
        <Box>
          <Label>Price: </Label>
          <Field>{getPrice()}</Field>
        </Box>
      </DetailsBox>
      <BookingButton
        disabled={isRemoving}
        onClick={() => removeBook(book.id)}
      >
        {isRemoving ? 'removing' : 'remove'}
      </BookingButton>
    </Container>
  )
}

export default BookCard;