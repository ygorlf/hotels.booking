import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';

// Images
import loading from '../../assets/loading.svg';
import back from '../../assets/back.svg';

// Types
import { Hotel } from '../../types';
import Stars from '../../components/stars';

type HotelType = Hotel;
type ValueDate = Date;
type Value = ValueDate[];

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

const Footer = styled.header`
  position: relative;
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100%;
  height: 3rem;
  margin-top: 2rem;
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

const Book = () => {
  const [hotel, setHotel] = useState<HotelType>({} as HotelType);
  const [isLoading, setLoading] = useState(false);
  const [isBooking, setBooking] = useState(false);
  const [value, onChange] = useState<Value>([new Date()]);

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchHotel = async () => {
    try {
      setLoading(true);

      const data = await (await fetch(`${import.meta.env.VITE_API_URL}/hotels/${id}`)).json();

      setHotel(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  const formatPrice = (value: number) => (
    Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' }).format(value)
  )

  const getDays = (startDate: Date, endDate: Date) => {
    return Math.abs(
      Math.floor((startDate.getTime() - endDate.getTime()) / 86400000)
    );
  }

  const getCurrentPrice = () => {
    if (value.length < 2) return 0;
 
    const days = getDays(value[0], value[1]);

    return hotel.price * days;
  }

  const createBooking = async () => {
    try {
      setBooking(true);

      await fetch(`${import.meta.env.VITE_API_URL}/booking/`, {
        method: 'POST',
        body: JSON.stringify({
          hotelId: id,
          totalPrice: getCurrentPrice(),
          startDate: value[0],
          endDate: value[1],
        })
      });

      setBooking(false);
      navigate('/books');
    } catch (err) {
      setBooking(false);
    }
  }

  const handleDayClick = () => {
    if (value.length === 2) onChange([]);
  }

  useEffect(() => {
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
              {value.length === 2 && (
                <Span>{getDays(value[0], value[1])}</Span>
              )}
            </Row>
            <Row>
              <Label>Total Price:</Label>
              <Span>{formatPrice(getCurrentPrice())}</Span>
            </Row>
          </Box>
        </Content>
        <Calendar
          onChange={onChange}
          onClickDay={handleDayClick}
          minDate={new Date()}
          selectRange={true}
        />
        <Footer>
          {isBooking && (
              <Loading src={loading} />
            )}
            {!isBooking && (
              <BookingButton
                disabled={value.length < 2}
                isDisabled={value.length < 2}
                onClick={createBooking}
              >
                Reserve now
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