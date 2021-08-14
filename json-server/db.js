/* eslint-disable @typescript-eslint/no-var-requires */
const faker = require("faker");

module.exports = () => {
  let flights = [];
  let contingents = [];

  for (let index = 0; index < 100; index++) {
    let currentFlightContingents = [];
    const airplaneMaxCapacity = 800;
    let airplaneRemainingCapacity = airplaneMaxCapacity;
    while (airplaneRemainingCapacity) {
      const bookedSeatsCount = faker.datatype.number(airplaneRemainingCapacity);
      airplaneRemainingCapacity -= bookedSeatsCount;

      currentFlightContingents = [
        ...currentFlightContingents,
        {
          id: faker.datatype.uuid(),
          clientCode: faker.random.alphaNumeric(5),
          bookedSeatsCount,
          totalSeatsCount: faker.datatype.number({ min: bookedSeatsCount }),
        },
      ];
    }

    flights = [
      ...flights,
      {
        id: faker.datatype.uuid(),
        iataCarrierCode: faker.random.alpha({ count: 2 }),
        number: faker.datatype.number(9999),
        date: faker.date.future(),
        origin: faker.random.alpha({ count: 3 }),
        destination: faker.random.alpha({ count: 3 }),
        contingents: currentFlightContingents.map(
          (contingent) => contingent.id
        ),
      },
    ];
    contingents = [...contingents, ...currentFlightContingents];
  }

  return {
    flights,
    contingents,
  };
};
