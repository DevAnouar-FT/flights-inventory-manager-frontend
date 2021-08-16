import type { Contingent } from "@features/contingents-management/types";
import type { FlightDTO } from "@features/flights-management/types";

export const flights: FlightDTO[] = [
  {
    id: "4e86921f-2eee-4c79-9aaa-55ae6baac78f",
    iataCarrierCode: "gg",
    number: 4189,
    date: "2022-03-18T22:03:58.763Z",
    origin: "ywu",
    destination: "hfr",
    contingents: [
      "dba8945f-3fb2-42cd-96f0-1ac26438014f",
      "3b9b33d6-45d0-4e3d-9d3b-574e68b3d1dc",
      "3134d3ef-fd98-4297-9bca-3c867ec9233c",
    ],
  },
  {
    id: "29e33fbf-9d1d-4d6c-ac98-12c5157f3125",
    iataCarrierCode: "un",
    number: 3180,
    date: "2022-01-29T17:17:13.665Z",
    origin: "qtq",
    destination: "wad",
    contingents: [
      "e50523b2-9621-41b7-9b3f-5885efb4e5c0",
      "8b72c853-f774-4190-acbd-45b0d505bdb9",
    ],
  },
  {
    id: "aef8a0dc-f1b5-439d-a5f8-a36888db2a79",
    iataCarrierCode: "sh",
    number: 5621,
    date: "2021-09-26T12:24:57.628Z",
    origin: "byl",
    destination: "esf",
    contingents: [
      "ad4fdb11-22e5-4f86-a1a6-34c5491d00b9",
      "cffdfd69-b832-4d86-bcc3-e1d065a97123",
    ],
  },
];

export const contingents: Contingent[] = [
  {
    id: flights[0].contingents[0],
    clientCode: "l9d1z",
    bookedSeatsCount: 783,
    totalSeatsCount: 69240,
  },
  {
    id: flights[0].contingents[1],
    clientCode: "lhbkh",
    bookedSeatsCount: 13,
    totalSeatsCount: 41296,
  },
  {
    id: flights[0].contingents[2],
    clientCode: "s8lw4",
    bookedSeatsCount: 3,
    totalSeatsCount: 62615,
  },
  {
    id: flights[1].contingents[0],
    clientCode: "bnern",
    bookedSeatsCount: 0,
    totalSeatsCount: 97353,
  },
  {
    id: flights[1].contingents[1],
    clientCode: "qux30",
    bookedSeatsCount: 1,
    totalSeatsCount: 6630,
  },
  {
    id: flights[2].contingents[0],
    clientCode: "8jkq1",
    bookedSeatsCount: 494,
    totalSeatsCount: 69647,
  },
  {
    id: flights[2].contingents[1],
    clientCode: "df7y6",
    bookedSeatsCount: 85,
    totalSeatsCount: 79082,
  },
];
