// ESNEK
const cars = [
  {
    vin: "1234",
    make: "abc",
    model: "2021",
    mileage: 1000,
    title: "az kullanılmış",
    transmission: "manuel",
  },
  {
    vin: "4321",
    make: "def",
    model: "2013",
    mileage: 25000,
    title: "hasarsız",
    transmission: "auto",
  },
];

exports.cars = cars;

exports.seed = function (knex, Promise) {
  return knex("cars")
    .truncate()
    .then(function () {
      return knex("cars").insert(cars);
    });
};
