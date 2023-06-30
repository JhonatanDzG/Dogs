const axios = require("axios");
const { API_KEY } = process.env;
const { Dog, Temperament } = require('../db.js');
const URL = "https://api.thedogapi.com/v1/breeds?api_key=";

const getDogsHandler = async () => {
  const apiDogs = await axios(`${URL}${API_KEY}`);

  const dogs = apiDogs.data.map((dog) => ({
    id: dog.id,
    name: dog.name,
    breed_group: dog.breed_group,
    image: dog.image.url,
    temperaments: dog.temperament,
    weight: dog.weight.metric,
    height: dog.height.metric,
    life_span: dog.life_span,
  }));

  return dogs;
};

const breed_groupHandler = async (res) => {
  const apiDogs = await axios(`${URL}${API_KEY}`);
  const dogs = apiDogs.data.map((dog) => ({
    breed_group: dog.breed_group
  }));
  try {
    const breedGroupList = dogs.filter(
      (dog) =>
        Object.keys(dog).length !== 0 &&
        Object.values(dog).every((value) => value !== "" && value !== undefined)
    );
    res.status(202).json(breedGroupList);
  } catch (error) {
    res.status(405).send(error);
  }
};

const getTemps = async () => {
  let dogs = await getDogsHandler();
  let temps = dogs
    .filter((dog) => dog.temps)
    .map((dog) => dog.temps.split(", "));

  temps = new Set(temps.flat());

  return temps;
};
const _getFullCans = async () => {
  try {
      const Cans = await getDogsHandler();
      return [...Cans];
  } catch (error) {
      console.log(error)
  }
}

const getDatabaseDogs = async () => {
  try {
      return await Dog.findAll({
          include: Temperament
      })
  } catch (error) {
      console.log(error)
  }
}

module.exports = {
  getDogsHandler,
  getTemps,
  breed_groupHandler,
  _getFullCans,
  getDatabaseDogs,
};
