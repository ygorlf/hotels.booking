import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';

// Types
import { Hotel } from '../../types';
import Stars from '../../components/stars';

type HotelType = Hotel;

const Page = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  min-height: 100vh;
  padding: 4rem 0;
  background: linear-gradient(0deg, var(--app-dark) -10%, var(--app-light) 100%);
`;

const Content = styled.div`
  position: relative;
  width:70%;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--app-white);
  box-shadow: 0 0 12px #00000033;
`;

const BoxDetails = styled.div`
  display: flex;
`;

const CoverImage = styled.img`
  width: 35%;
  margin-right: 2rem;
  border-radius: 5px;
  box-shadow: 2px 2px 4px #00000022;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
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

const Line = styled.hr`
  width: 100%;
  margin: 1rem 0;
  border-top: 1px solid var(--app-dark);
`;

const Booking = () => {
  const [hotel, setHotel] = useState<HotelType>({} as HotelType);
  const [isLoading, setLoading] = useState<boolean>(false);

  const { id } = useParams();

  const fetchHotel = async () => {
    try {
      setLoading(true);

      const data = await (await fetch(`${import.meta.env.VITE_API_URL}/hotels/${id}`)).json();

      setHotel(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHotel();
  }, []);

  const renderHotel = () => {
    return (
      <>
        <Link to={'/'}>Back</Link>
        <Content onClick={ev => ev.stopPropagation()}>
          <BoxDetails>
            <CoverImage src={hotel.photo} alt='imagem do hotel' />
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
            </Box>
          </BoxDetails>
          <Line />
        </Content>
      </>
    )
  }

  return (
    <Page>
      {isLoading && 'Loading'}
      {!isLoading && renderHotel()}
    </Page>
  )
};

export default Booking;