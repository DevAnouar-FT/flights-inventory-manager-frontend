export interface Flight {
  id: string;
  iataCarrierCode: string;
  number: number;
  date: string;
  origin: string;
  destination: string;
}

export interface FlightDTO extends Flight {
  contingents: string[];
}
