export interface Flight {
  id: string;
  iataCarrierCode: string;
  number: number;
  date: string;
  origin: string;
  destination: string;
  contingents: string[];
}
