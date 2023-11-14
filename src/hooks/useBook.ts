import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type ValueDate = Date;
type Value = ValueDate[];

export const useBook = () => {
  const [isBooking, setBooking] = useState(false);
  const [value, onChange] = useState<Value>([new Date()]);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const getDays = (startDate: Date, endDate: Date) => {
    return Math.abs(
      Math.floor((startDate.getTime() - endDate.getTime()) / 86400000)
    );
  }

  const getCurrentPrice = (price: number) => {
    if (value.length < 2) return 0;
 
    const days = getDays(value[0], value[1]);

    return price * days;
  }

  const createBook = async (id: string, price: number) => {
    try {
      setBooking(true);
      setError(false);

      await fetch(`${import.meta.env.VITE_API_URL}/booking`, {
        method: 'POST',
        body: JSON.stringify({
          hotelId: id,
          totalPrice: getCurrentPrice(price),
          startDate: value[0],
          endDate: value[1],
        })
      });

      setBooking(false);
      navigate('/books');
    } catch (err) {
      setBooking(false);
      setError(true);
    }
  }

  return {
    isBooking,
    value,
    error,
    setBooking,
    onChange,
    setError,
    getCurrentPrice,
    getDays,
    createBook
  }
}