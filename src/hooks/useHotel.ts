import { useState } from 'react';

export const useHotel = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      const data = await (await fetch(`${import.meta.env.VITE_API_URL}/hotels`)).json();
      setHotels(data.hotels);
    } catch (err) {
      console.log(err);
    }
  }

  return {
    hotels,
    fetchHotels
  }
}