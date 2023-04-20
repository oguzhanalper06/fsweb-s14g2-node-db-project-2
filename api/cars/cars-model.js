const db = require("../../data/db-config");

const getAll = () => {
  //select * from cars
  return db("cars");
};

const getById = (id) => {
  //select * from cars where id=id
  return db("cars").where("id", id).first(); //array in ilk elemanını al
};

const create = (car) => {
  //inset into cars values (...)
  const insertedCars = db("cars")
    .insert(car) // oluşan kaydın id'sini döndürüyor
    .then((id) => {
      return getById(id[0]); //id'yi yakalıyoruz ve kaydı return ediyoruz
    });
  return insertedCars;
};

module.exports = {
  getAll,
  getById,
  create,
};
