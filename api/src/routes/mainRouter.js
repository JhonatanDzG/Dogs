const { Router } = require("express");
const {
  getDogs,
  getDetailByRace,
  getCoincidencesByQuery,
  createPostDog,
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
  .get("/temperaments", getTemperaments)
  .post("/dog", createPostDog)
  .get("/@a", )
  .get("/db", getDataBase)

module.exports = router;
