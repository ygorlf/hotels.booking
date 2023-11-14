// Libs
import { http, HttpResponse, delay } from 'msw';
import { db, seedDatabase } from './db';
import { nanoid } from 'nanoid';

// Data
import { hotelsData } from './data/hotels';

type BookRange = {
  startDate: number;
  endDate: number;
}

const isTimestampInRange = (startTime: number, endTime: number, list: BookRange[]) => {
  const startTimestamp = new Date(startTime).getTime();
  const endTimestamp = new Date(endTime).getTime();

  for (const obj of list) {
    const startDate = obj.startDate;
    const endDate = obj.endDate;

    if (startTimestamp <= endDate && endTimestamp >= startDate) {
      return true;
    }
  }

  // No matching timestamp found
  return false;
}

const getBookingsTimestamp = (bookings) => {
  return bookings.map((book) => ({
    startDate: new Date(book.startDate).getTime(),
    endDate: new  Date(book.endDate).getTime()
  }))
}

seedDatabase(hotelsData);

export const handlers = [
  http.get('/hotels', (req, res, ctx) => {
    return HttpResponse.json({
      hotels: db.hotels.getAll(),
    })
  }),
  http.get('/hotels/:id', (req, res, ctx) => {
    const selectHotel = db.hotels.findFirst({
      where: {
        id: {
          equals: req.params.id,
        },
      },
    });

    return HttpResponse.json({
      ...selectHotel,
    })
  }),
  http.get('/books', (req, res, ctx) => {
    const allBooks = [];
    const books = db.bookings.getAll();

    books.map((book) => {
      const hotel = db.hotels.findFirst({
        where: {
          id: {
            equals: book.hotelId,
          },
        },
      });

      allBooks.push({
        ...book,
        ...hotel
      });
    })


    return HttpResponse.json({
      books: [...allBooks]
    })
  }),
  http.post('/booking', async (req, res, ctx) => {
    await delay(1000);
    try {
      const body = await req.request.json();
  
      const allBookings = db.bookings.getAll();
      const allTimestamps = getBookingsTimestamp(allBookings);
  
      const isAllowed = !isTimestampInRange(body.startDate, body.endDate, allTimestamps);

      if (isAllowed) {
        db.bookings.create({
          id: nanoid(),
          ...body,
        });
    
        return HttpResponse.json({
          message: 'Book created!'
        });
      } else {
        return HttpResponse.error();
      }
      
    } catch (err) {
      console.log(err);
    }
  }),
  http.delete('/book', async (req, res, ctx) => {
    await delay(1000);
    const body = await req.request.json();

    db.bookings.delete({
      where: {
        id: {
          equals: body.id,
        },
      },
    });

    return HttpResponse.json({
      message: 'Book deleted!'
    });
  }),
]