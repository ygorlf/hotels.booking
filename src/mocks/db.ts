// Libs
import { factory, primaryKey } from '@mswjs/data'

import { Hotel } from '../types/';

export const db = factory({
  hotels: {
    id: primaryKey(String),
    name: String,
    address: String,
    city: String,
    state: String,
    photo: String,
    classification: Number,
    breakfast: Boolean,
    tour: Boolean,
    price: Number,
  },
  bookings: {
    id: primaryKey(String),
    hotelId: String,
    startDate: String,
    endDate: String,
    totalPrice: Number,
  }
})

export const seedDatabase = (data: Hotel[]) => {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    
    db.hotels.create(element);
  }
}
