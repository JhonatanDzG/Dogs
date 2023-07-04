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
.get("/dogs/name?='...'", getCoincidencesByQuery)
.get("/dogs/:idRaza", getDetailByRace)
.post("/dog", createPostDog)
.get("/temperaments", getTemperaments)
.get("/db", getDataBase)
// .get("/dogs/name?='...'", getCoincidencesByQuery)

module.exports = router;
