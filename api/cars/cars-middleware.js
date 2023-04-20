const Cars = require("./cars-model");
const vinValidator = require("vin-validator");
const db = require("../../data/db-config");

const checkCarId = async (req, res, next) => {
  try {
    const isExist = await Cars.getById(req.params.id);
    if (!isExist) {
      res
        .status(404)
        .json({ message: `${req.params.id} kimliğine sahip araba bulunamadı` });
    } else {
      req.car = isExist;
    }
    next();
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = async (req, res, next) => {
  try {
    const fields = ["vin", "make", "model", "mileage"]; //doldurulması zorunlu olan alanları array e aldık.
    const missedFields = []; //doldurulmayan alanların pushlanması için boş bir array oluşturduk.
    fields.forEach((field) => {
      if (!req.body[field]) {
        //tek tek req.body.vin ve diğerline bakıyor
        missedFields.push(field); //boş olanları array'e pushluyor.
      }
    });
    if (missedFields.length > 0) {
      let missedFieldsStr = missedFields.join();
      res.status(400).json({ message: `${missedFieldsStr} is missing` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

const checkVinNumberValid = (req, res, next) => {
  let isValidVin = vinValidator.validate(req.body.vin);
  if (!isValidVin) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid` });
  } else {
    next();
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  try {
    let isExist = await db("cars").where("vin", req.body.vin).first(); //Veritabanına sorgu atarak kontrol ettik, tüm datayı for ile dönüp kontrol edebilirdik.
    if (isExist) {
      res.status(400).json({ message: `vin ${req.body.vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
