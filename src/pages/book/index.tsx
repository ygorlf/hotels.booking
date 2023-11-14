import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';

import 'react-calendar/dist/Calendar.css';

// Images
import loading from '../../assets/loading.svg';

// Types
import { Hotel } from '../../types';

// Components
import Stars from '../../components/stars';
import BookCalendar from '../../components/calendar';

// Hooks
import { useBook } from '../../hooks/useBook';

type HotelType = Hotel;

type ButtonProps = {
  isDisabled: boolean;
}

const Page = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(0deg, var(--app-dark) -10%, var(--app-light) 100%);
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 80%;
  margin: 0 auto;
  padding: 2rem;
  
  .react-calendar {
    width: calc(100% - 22rem);
    border: none;
    border-radius: 8px;
    background-color: #ffffffdd;
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    color: var(--app-text);
    box-shadow: 0 0 12px #00000033;
    overflow: hidden;
  }

  .react-calendar__navigation {
    height: 4rem;
  }

  .react-calendar__navigation__arrow {
    width: 5rem;
    font-size: 1.25rem;
  }

  .react-calendar__navigation__label__labelText {
    font-size: 1.25rem;
    font-family: 'Roboto', sans-serif;
    color: var(--app-text);
  }

  .react-calendar__month-view__weekdays__weekday {
    text-transform: lowercase;

    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__month-view__days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    height: calc(100vh - 24rem);
  }

  .react-calendar__tile--now {
    background-color: var(--app-light);
  }

  .react-calendar__tile--active {
    background-color: var(--app-dark);
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: var(--app-medium);
  }
`;

const Loading = styled.img`
  width: 3rem;
`;

const Content = styled.div`
  position: relative;
  width: 20rem;
  margin-right: 2rem;
  padding-bottom: 2rem;
  border-radius: 8px;
  background-color: var(--app-white);
  box-shadow: 0 0 12px #00000033;
  overflow: hidden;
`;

const CoverImage = styled.div`
  width: 100%;
  height: 12rem;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin-right: 2rem;
  box-shadow: 2px 2px 4px #00000022;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const HotelName = styled.h2`
  margin: .5rem 1rem 1.25rem 0;
  font: 500 1.75rem 'Roboto', sans-serif;
  color: var(--app-text);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin: .5rem 0;
`;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  margin-right: .5rem;
  font: 300 .75rem 'Roboto', sans-serif;
  color: var(--app-text);
`;

const Span = styled.span`
  margin-top: 0;
  font: 300 1rem 'Roboto', sans-serif;
  color: var(--app-text);
`;

const Footer = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 22rem);
  height: 3rem;
  margin-top: 2rem;
  margin-left: auto;
`;

const BookingButton = styled.button<ButtonProps>`
  padding: .75rem 1rem;
  border: 2px solid var(--app-dark);
  border-radius: 8px;
  font: 400 1rem 'Roboto', sans-serif;
  cursor: pointer;
  outline: none;
  color: var(--app-dark);
  transition: all .2s;
  box-shadow: 2px 2px 8px var(--app-dark-transparent);
  background-color: var(--app-white);

  ${({ isDisabled }) => isDisabled && `
    cursor: initial;
    opacity: 0.5;
  `}
`;

const Error = styled.span`
  color: #505050;
  font: 400 1.5rem 'Roboto', sans-serif;
`;

const Book = () => {
  const [hotel, setHotel] = useState<HotelType>({} as HotelType);
  const [isLoading, setLoading] = useState(false);

  const {
    isBooking,
    value,
    error,
    onChange,
    getDays,
    getCurrentPrice,
    getCalendarRange,
    createBook,
    patchBook,
  } = useBook();

  const { id } = useParams();
  const { pathname, state } = useLocation();

  const isEdit = pathname.includes('edit');
  const pathId = isEdit ? state.book.hotelId : id;

  const range = getCalendarRange();

  const fetchHotel = async () => {
    try {
      setLoading(true);

      const data = await (await fetch(`${import.meta.env.VITE_API_URL}/hotels/${pathId}`)).json();

      setHotel(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const formatPrice = (value: number) => (
    Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(value)
  )

  const handleDayClick = () => {
    if (range.length === 2) onChange([]);
  }

  useEffect(() => {
    if (isEdit) {
      const startDate = new Date(state.book.startDate);
      const endDate = new Date(state.book.endDate);
      onChange([startDate, endDate]);
    }

    fetchHotel();
  }, []);

  const renderContent = () => {
    return (
      <Container>
        <Content onClick={ev => ev.stopPropagation()}>
          <CoverImage>
            <Image src={hotel.photo} alt='imagem do hotel' />
          </CoverImage>
          <Box>
            <Stars
              classification={hotel.classification}
              width='1.5rem'
            />
            <HotelName>{hotel.name}</HotelName>
            <Label>{hotel.city} - {hotel.state}</Label>
            <Row>
              <Span>{hotel.address}</Span>
            </Row>
            <Row>
              <Label>Daily rate:</Label>
              <Span>{formatPrice(hotel.price)}</Span>
            </Row>
            <Row>
              <Label>Days:</Label>
              {range.length === 2 && (
                <Span>{getDays(range[0], range[1])}</Span>
              )}
            </Row>
            <Row>
              <Label>Total Price:</Label>
              <Span>{formatPrice(getCurrentPrice(hotel.price))}</Span>
            </Row>
          </Box>
        </Content>
        <BookCalendar
          value={value}
          onChange={onChange}
          onClickDay={handleDayClick}Í
        />
        <Footer>
          <div />
          {error && (
            <Error>You already booked a hotel for this date!</Error>
          )}
          {isBooking && (
              <Loading src={loading} />
            )}
            {!isBooking && (
              <BookingButton
                disabled={range.length < 2}
                isDisabled={range.length < 2}
                onClick={() => {
                  if (isEdit) {
                    patchBook(state.book.id);
                  } else {
                    createBook(hotel.id, hotel.price);
                  }
                }}
              >
                {isEdit ? 'Update book' : 'Reserve now'}
              </BookingButton>
            )}
        </Footer>
      </Container>
    )
  }

  return (
    <Page>
      {isLoading && 'Loading'}
      {!isLoading && renderContent()}
    </Page>
  )
};

export default Book;