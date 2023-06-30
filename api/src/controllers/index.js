const { Dog, Temperament } = require("../db.js");
const {
  getDogsHandler,
  getTemps,
  getDatabaseDogs,
  _getFullCans,
} = require("../handlers/index.js");

const getDogs = async (req, res) => {
  const { name: breed_group } = req.query;
  try {
    const allDogs = await getDogsHandler();
    if (breed_group) {
      const dogs = allDogs.filter(
        (dog) => dog.breed_group.toUpperCase() === breed_group.toUpperCase()
      );
      if (dogs.length > 0) return res.json(dogs);
      res.status(404).send({ message: "breed_group Not Found" });
    } else {
      res.status(200).json(allDogs);
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
  const { idRaza } = req.params;
  try {
    if (isNaN(idRaza)) {
      const allCans = await _getFullCans();
      const cans = allCans.filter((can) => can.breed_group == idRaza);
      if (cans.length) {
        res.status(222).send(cans);
      } else {
        res.stats(404).send("Dog is lost 😼");
      }
    } else {
      res.status(201).send(`Buscar en DB id: ${idRaza}`);
    }
  } catch (error) {
    res.status(405).send(error);
  }
};

const getCoincidencesByQuery = async (req, res) => {
  // >Esta ruta debe obtener todas aquellas razas de perros
  //  que coinciden con el nombre recibido por query.
  // (No es necesario que sea una coincidencia exacta).
  // >Debe poder buscarlo independientemente de mayúsculas o minúsculas.
  // >Si no existe la raza, debe mostrar un mensaje adecuado.
  // >Debe buscar tanto los de la API como los de la base de datos
  const { name } = req.query;

  try {
    if (name) {
      const allDogs = await _getFullCans();
      const cans = allDogs.filter((can) => can.name == name);

      if (cans) return res.json(cans);
      res.stats(404).send("Can is lost");
    }
  } catch (error) {
    console.log(error);
  }
};
const postDog = async (req, res) => {
  let {
    name,
    picture,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    yearsOfLife: life_span,
    temps,
  } = req.body;
  let height = `${minHeight} - ${maxHeight}`;
  let weight = `${minWeight} - ${maxWeight}`;
  console.log(req.body);
  try {
    const dogsDB = await getDatabaseDogs();
    let existDog = dogsDB.filter(
      (dog) => dog.name.toLowerCase() === name.toLowerCase()
    );
    if (existDog.length === 0) {
      const dog = await Dog.create({
        name,
        picture,
        height,
        weight,
        life_span,
      });
      for (let temp of temps) {
        dog.addTemps(await Temperament.findOne({ where: { name: temp } }));
      }
      res.json({ can: dog, message: "El perro es de los nuestros" });
    } else {
      res.json({ message: "Ya esta con nosotros" });
    }
  } catch (error) {
    res.send(error);
  }
};

const getTemperaments = async (res) => {
  // >Obtiene todos los temperamentos existentes.
  // >Estos deben ser obtenidos de la API
  // (se evaluará que no haya hardcodeo).
  // Luego de obtenerlos de la API,
  //  deben ser guardados en la base de datos
  // para su posterior consumo desde allí.
  try {
    const temps = await getTemps();

    for (let temperament of temps) {
      await Temperament.findOrCreate({ where: { name: temperament } });
    }

    const _temps = await Temperament.findAll();
    console.log(_temps);
    res.json(_temps);
  } catch (error) {
    res.send(error);
  }
};

const getDataBase = async (res) => {
  try {
    const temps = await getDatabaseDogs();
    res.send(temps);
  } catch (error) {
    res.send(error);
  }
};
module.exports = {
  getDogs,
  getDetailByRace,
  getCoincidencesByQuery,
  postDog,
  getTemperaments,
  getDataBase,
};
