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
  // http.get('/bookings', (req, res, ctx) => {
  //   const data = db.reserve.getAll();

  //   return res(
  //     ctx.status(200),
  //     ctx.json(data),
  //   )
  // }),
  http.post('/booking', async (req, res, ctx) => {
    await delay(1000);
    db.bookings.create({
      ...req.body,
      id: nanoid()
    });

    return HttpResponse.json({
      message: 'Booking created!'
    });
  }),
]