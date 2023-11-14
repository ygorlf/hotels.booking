export type Hotel = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  photo: string;
  classification: number;
  breakfast: boolean;
  tour: boolean;
  price: number;
}

export type Book = {
  id: string;
  hotelId: string;
  price: number;
  startDate: string;
  endDate: string;
  totalPrice: number;

  // Aditional hotel properties used on book card
  name: string;
  photo: string;
  state: string;
  address: string;
  city: string;
  classification: number;
}