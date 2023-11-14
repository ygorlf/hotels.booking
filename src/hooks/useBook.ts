import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Types
import { Book } from '../types/'

type ValueDate = Date;
type Value = ValueDate | [ValueDate, ValueDate];

export const useBook = () => {
  const [isBooking, setBooking] = useState(false);
  const [value, onChange] = useState<Value>();
  const [error, setError] = useState(false);

  const [books, setBooks] = useState<Book[]>([]);
  const [removing, setRemoving] = useState({ id: '', active: false });

  const navigate = useNavigate();

  const getDays = (startDate: Date, endDate: Date) => {
    return Math.abs(
      Math.floor((startDate.getTime() - endDate.getTime()) / 86400000)
    );
  }

  const getCurrentPrice = (price: number) => {
    const range = getCalendarRange();

    if (range.length < 2) return 0;
    if (range.length === 0) return 0;

    const days = getDays(range[0], range[1]);

    return price * days;
  }

  const getCalendarRange = () => {
    if (!Array.isArray(value) && value) return [value];
    if (!Array.isArray(value) && !value) return [];

    return value;
  }

  const fetchBooks = async () => {
    try {
      const data = await (await fetch(`${import.meta.env.VITE_API_URL}/books`)).json();
      setBooks(data.books);
    } catch (err) {
      console.log(err);
    }
  }

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

  const createBook = async (id: string, price: number) => {
    try {
      const range = getCalendarRange();

      setBooking(true);
      setError(false);

      await fetch(`${import.meta.env.VITE_API_URL}/booking`, {
        method: 'POST',
        body: JSON.stringify({
          hotelId: id,
          totalPrice: getCurrentPrice(price),
          startDate: range[0],
          endDate: range[1],
        })
      });

      setBooking(false);
      navigate('/books');
    } catch (err) {
      setBooking(false);
      setError(true);
    }
  }

  const patchBook = async (id: string) => {
    try {
      const range = getCalendarRange();

      setBooking(true);
      setError(false);

      await fetch(`${import.meta.env.VITE_API_URL}/book/:id`, {
        method: 'PATCH',
        body: JSON.stringify({
          id: id,
          startDate: range[0],
          endDate: range[1],
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
    removing,
    books,
    setBooking,
    onChange,
    setError,
    getCurrentPrice,
    getDays,
    getCalendarRange,
    fetchBooks,
    createBook,
    removeBook,
    patchBook
  }
}