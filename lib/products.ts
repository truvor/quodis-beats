export interface Product {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
}

export const PRODUCTS: Product[] = [
  {
    id: "beat_1",
    name: "Dust",
    description: "Chill lofi beat.",
    priceInCents: 19999, // $199.99
  },
];
