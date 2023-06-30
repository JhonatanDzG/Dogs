const { Router } = require("express");
const {
  getDogs,
  getDetailByRace,
  getCoincidencesByQuery,
  postDog,
  getTemperaments,
  getDataBase,
} = require("../controllers/index");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router
  .get("/dogs", getDogs)
  .get("/dogs/:idRaza", getDetailByRace)
  .get("/dogs/name?='...'", getCoincidencesByQuery)
  .post("/dog", postDog)
  .get("/temperament", getTemperaments)
  .get("/dogs/data/db", getDataBase)

module.exports = router;
