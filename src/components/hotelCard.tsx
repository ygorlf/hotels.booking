import { useEffect } from 'react'
import styled from 'styled-components'

// Images
import breakfastIcon from '../assets/breakfast.png'
import tourIcon from '../assets/tour.png'

// Components
import Stars from './stars'

// Types
import { Hotel } from '../types'

type Props = {
  hotel: Hotel;
}

type BoxProps = {
  hasOpacity?: boolean;
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

const Box = styled.div<BoxProps>`
  display: flex;
  align-items: center;
  margin: 1rem 0;

  ${({ hasOpacity }) => hasOpacity && `
    opacity: .3;
    text-decoration: line-through;
  `}
`;

const Label = styled.label`
  font: 400 .675rem 'Roboto', sans-serif;
  color: var(--app-text);
`;

const Price = styled.span`
  margin-left: .5rem;
  font: 400 1rem 'Roboto', sans-serif;
  color: var(--app-text);
`;

const Icon = styled.img`
  width: 1.25rem;
  margin-right: .25rem;
`;

const Field = styled.span`
  font: 400 1rem 'Roboto', sans-serif;
  color: var(--app-text);
`;


const HotelCard = (props: Props) => {
  const { hotel } = props;

  const formatPrice = (value: number) => (
    Intl.NumberFormat('pt-br', { style: 'currency', currency: 'USD' }).format(value)
  );

  const getPrice = () => {
    const { weekend } = hotel.prices;

    return formatPrice(weekend);
  }

  return (
    <Container>
      <PhotoBox>
        <Photo src={hotel.photo} alt={`imagem do hotel ${hotel.name}`} />
      </PhotoBox>
      <DetailsBox>
        <BoxName>
          <Name>{hotel.name}</Name>
          <Stars
            classification={hotel.classification}
            width='1.25rem'
          />
        </BoxName>
        <City>{hotel.city} - {hotel.state}</City>
        <Box>
          <Label>Price: </Label>
          <Price>{getPrice()}</Price>
        </Box>
        <Box hasOpacity={!hotel.breakfast}>
          <Icon src={breakfastIcon} alt="ícone de café da manhã" />
          <Field>Breakfast included</Field>
        </Box>
        <Box hasOpacity={!hotel.tour}>
          <Icon src={tourIcon} alt="ícone de passeio" />
          <Field>Tour included</Field>
        </Box>
      </DetailsBox>
    </Container>
  )
}

export default HotelCard;