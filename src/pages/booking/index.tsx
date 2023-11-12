import { useEffect } from 'react';

const Booking = () => {
  const [hotels, setHotels] = useState([]);

  const fetchHotels = async () => {
    try {
      const data = await (await fetch(`${import.meta.env.VITE_API_URL}/hotels`)).json();
      setHotels(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  return (
    <div>
      Booking Page!

      
    </div>
  )
};

export default Booking;