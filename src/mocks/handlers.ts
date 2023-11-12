// Libs
import { http, HttpResponse } from 'msw';
import { db } from './db';
import { nanoid } from 'nanoid';

// Data
import { hotelsData } from './data/hotels';

export const handlers = [
  http.get('/hotels', (req, res, ctx) => {
    return HttpResponse.json({
      hotels: [...hotelsData],
    })
  }),
  http.post('/reserve', (req, res, ctx) => {
    db.reserve.create({
      ...req.body,
      id: nanoid()
    });

    return res(
      ctx.status(200),
    )
  }),
  http.get('/reserves', (req, res, ctx) => {
    const data = db.reserve.getAll();

    return res(
      ctx.status(200),
      ctx.json(data),
    )
  }),
  http.delete('/reserves', (req, res, ctx) => {
    db.reserve.delete({
      where: {
        id: {
          equals: req.body.id,
        },
      },
    })

    return res(
      ctx.delay(1500),
      ctx.status(200),
    )
  }),
]