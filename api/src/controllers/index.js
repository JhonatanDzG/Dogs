const { Dog, Temperament } = require("../db");
const {
  getDogsHandler,
  getTempsHandler,
  _getFullCans,
  getDataBaseDogsHandler,
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

//* COMPLETED
const getDetailByRace = async (req, res) => {
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

//* INCOMPLETE
const getCoincidencesByQuery = async (req, res) => {
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

//* CODING...
const postDog = async (req, res) => {
  let {
    name,
    breed_group,
    image,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    life_span,
  } = req.body;
  let height = `${minHeight} - ${maxHeight}`;
  let weight = `${minWeight} - ${maxWeight}`;

  try {
    const dogsDB = await getDataBaseDogsHandler();
    let existDog = dogsDB.filter(
      (dog) => dog.name.toLowerCase() === name.toLowerCase()
    );
    if (existDog.length === 0) {
      const dog = await Dog.create({
        name,
        breed_group,
        image,
        height,
        weight,
        life_span,
      });
      for (let temp of temperament) {
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

//*INCOMPLETE
const getTemperaments = async (req, res) => {
  const temps = await getTempsHandler();
  try {
 
    for (let temp of temps) {
      await Temperament.findOrCreate({ where: { name: temp } });
    }

    const _temps = await Temperament.findAll();

    res.status(201).json(_temps);

  } catch (error) {
    res.status(404).send(error);
  }
};

//*COMPLETE
const getDataBase = async (req, res) => {
  try {
    const temps = await getDataBaseDogsHandler();
    res.status(201).send(temps);
  } catch (error) {
    res.status(401).send(error);
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
