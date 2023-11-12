export type Hotel = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  photo: string;
  classification: number;
  type: string;
  room: number;
  breakfast: boolean;
  tour: boolean;
  reserve: number;
  prices: {
    week: number;
    weekend: number;
  },
}