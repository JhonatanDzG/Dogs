const { Dog, Temperament } = require("../../db.js");
const { getDgs, getTemps } = require("../functions");

const getDogs = async (req, res) => {
  // >Obtiene un arreglo de objetos, donde cada objeto es la raza de un perro.

  const { name } = req.query;
  try {
    const allCans = await getDgs();
    if (name) {
      const cans = allCans.filter(
        (can) => can.name.toUpperCase() === name.toUpperCase()
      );
      if (cans.length > 0) return res.json(cans);
      res.status(404).send({ message: "Can Not Found" });
    } else {
      res.status(200).json(allCans);
    }
  } catch (error) {
    res.send(error);
  }
};
const getDetailByRace = async (req, res) => {
  // >Esta ruta Obtiene el detalle de una raza específica.
  // Es decir que devuelve un objeto con la información
  // pedida en el detalle de un perro.
  // >La raza es recibida por parámetro (ID).
  // >Tiene que incluir los datos de los temperamentos asociadas a esta raza.
  // >Debe funcionar tanto para los perros de la API como para los de la base de datos.
  const { idRace } = req.params;

  try {
    if (idRace) {
      const allDogs = await getDogs();
      const filteredDogsByRace = allDogs.filter((can) => can.id == idRace);
      if (filteredDogsByRace.length) return res.json(filteredDogsByRace);

      res.stats(400).send("Dog/Race NOT Found");
    }
  } catch (error) {
    res.send(error);
  }
};

const getCoincidencesByQuery = () => {
  // >Esta ruta debe obtener todas aquellas razas de perros
  //  que coinciden con el nombre recibido por query.
  // (No es necesario que sea una coincidencia exacta).
  // >Debe poder buscarlo independientemente de mayúsculas o minúsculas.
  // >Si no existe la raza, debe mostrar un mensaje adecuado.
  // >Debe buscar tanto los de la API como los de la base de datos
};
const postDog = () => {
  // >Esta ruta recibirá todos los datos necesarios para crear
  //   un nuevo perro y relacionarlo con los temperamentos asociados.
  // >Toda la información debe ser recibida por body.
  // >Debe crear la raza de perro en la base de datos,
  //   y esta debe estar relacionada con los temperamentos indicados
  //  (al menos uno).
};
const getTemperaments = () => {
  // >Obtiene todos los temperamentos existentes.
  // >Estos deben ser obtenidos de la API
  // (se evaluará que no haya hardcodeo).
  // Luego de obtenerlos de la API,
  //  deben ser guardados en la base de datos
  // para su posterior consumo desde allí.
};

module.exports = {
  getDogs,
  getDetailByRace,
  getCoincidencesByQuery,
  postDog,
  getTemperaments,
};
