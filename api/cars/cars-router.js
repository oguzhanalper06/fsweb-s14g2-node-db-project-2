const router = require("express").Router();
const Cars = require("./cars-model");
const mw = require("./cars-middleware");

router.get("/", async (req, res, next) => {
  try {
    const cars = await Cars.getAll();
    res.json(cars);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkCarId, async (req, res, next) => {
  try {
    res.json(req.car);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  mw.checkCarPayload,
  mw.checkVinNumberValid,
  mw.checkVinNumberUnique,
  async (req, res, next) => {
    try {
      let insertedData = await Cars.create(req.body);
      res.json(insertedData);
    } catch (error) {
      next(error);
    }
  }
);
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: "Bir hata oluştu",
    message: err.message,
  });
});
module.exports = router;
