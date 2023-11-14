// Libs
import { http, HttpResponse, delay } from 'msw';
import { db, seedDatabase } from './db';
import { nanoid } from 'nanoid';

// Data
import { hotelsData } from './data/hotels';

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
    const body = await req.request.json();

    db.bookings.create({
      id: nanoid(),
      ...body,
    });

    return HttpResponse.json({
      message: 'Book created!'
    });
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