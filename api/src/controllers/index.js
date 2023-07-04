const { Dog, Temperament } = require("../db");
const {
  getDogsHandler,
  getTempsHandler,
  _getFullCans,
  getDataBaseDogsHandler,
  getDBDogs,
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

//* Revisar Consigna
const getDetailByRace = async (req, res) => {
  const { idRaza } = req.params;
  const allCans = await _getFullCans();

  try {
    // if (isNaN(idRaza)) {
    //   const dogs = allCans.filter((dog) => dog.breed_group === idRaza);
    //   res.status(212).send(dogs);
    // } else {
      const dogs = allCans.filter((dog) => dog.id == idRaza);
      res.status(222).send(dogs);
    // }
  } catch (error) {
    res.status(444).send("getDetailByRace " + error);
  }
};

//* INCOMPLETE
const getCoincidencesByQuery = async (req, res) => {
  const { name } = req.query;
  const allDogs = await _getFullCans();

 console.log( name);

  // try {
  //   const dogs = allDogs.filter((dog) =>
  //     dog.name.toLowerCase().includes(name.toLowerCase())
  //   );
  //   if (!dogs.length) {
  //     throw new Error("Esta raza no existe");
  //   }else{

  //     console.log(dogs);
  //   }
  //   return dogs;
  // } catch (error) {
  //   res.status(412).send(console.log(error));
  // }
};

//*COMPLETE
const createPostDog = async (req, res) => {
  let {
    name,
    image,
    breed_group,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    life_span,
    temperaments,
  } = req.body;
  let height = `${minHeight} - ${maxHeight}`;
  let weight = `${minWeight} - ${maxWeight}`;

  try {
    const dogsDB = await _getFullCans();
    let existDog = dogsDB.filter(
      (dog) => dog.name.toLowerCase() === name.toLowerCase()
    );
    if (!existDog.length) {
      const newPost = await Dog.create({
        name,
        breed_group,
        image,
        height,
        weight,
        life_span,
        temperaments,
      });

      for (let temp of temperaments) {
        newPost.addTemperament(
          await Temperament.findOne({ where: { name: temp } })
        );
      }
      res
        .status(222)
        .json({ dog: newPost, message: "El perro es de los nuestros" });
    } else {
      res.status(212).json({ message: "Ya esta con nosotros" });
    }
  } catch (error) {
    res.status(444).send(console.log(error));
  }
};

const getTemperaments = async (req, res) => {

  const temps = await getTempsHandler();

  try {
    for (let temp of temps) {
      await Temperament.findOrCreate({ where: { name: temp } });
    }

    const _temps = await Temperament.findAll();

    res.status(201).json(_temps);
  } catch (error) {
    res.status(402).send(console.log("getTemperaments: " + error));
  }
};

//*COMPLETE
const getDataBase = async (req, res) => {
  try {
    const temps = await getDBDogs();
    res.status(201).send(temps);
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};

module.exports = {
  getDogs,
  getDetailByRace,
  getCoincidencesByQuery,
  createPostDog,
  getTemperaments,
  getDataBase,
};
