import { useState, useEffect } from 'react';
import styled from 'styled-components';

// Components
import BookingCard from '../../components/bookingCard';

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  padding: 4rem 0;
  background: linear-gradient(0deg, var(--app-dark) -10%, var(--app-light) 100%);
`;

const HotelsList = styled.ul`
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

const Booking = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      const data = await (await fetch(`${import.meta.env.VITE_API_URL}/hotels`)).json();
      setHotels(data.hotels);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const renderHotels = () => {
    return hotels.map((hotel) => (
      <BookingCard hotel={hotel} />
    ))
  }

  return (
    <Page>
      <HotelsList>
        {renderHotels()}
      </HotelsList>
    </Page>
  )
};

export default Booking;