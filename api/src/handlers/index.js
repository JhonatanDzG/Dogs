const axios = require("axios");
const { API_KEY } = process.env;
const URL = "https://api.thedogapi.com/v1/breeds?api_key=";

const getDgs = async () => {
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

const breed_groupHandler = async () => {
  const apiDogs = await axios(`${URL}${API_KEY}`);
  const dogs = apiDogs.data.map((dog) => ({
    breed_group: dog.breed_group,
  }));
  try {
    const breedGroupList = dogs.filter(
      (dog) =>
        Object.keys(dog).length !== 0 &&
        Object.values(dog).every((value) => value !== "" && value !== undefined)
    );
    return breedGroupList;
  } catch (error) {
    console.log("falló");
  }
  console.log(dogs);
};

const getTemps = async () => {
  let dogs = await getDgs();
  let temps = dogs
    .filter((dog) => dog.temps)
    .map((dog) => dog.temps.split(", "));

  temps = new Set(temps.flat());

  return temps;
};
const _getFullCans = async () => {
  try {
      const Cans = await getDgs();
      return [...Cans];
  } catch (error) {
      console.log(error)
  }
}

const _getMyCans = async () => {
  try {
      return await Dog.findAll({
          include: Temperament
      })
  } catch (error) {
      console.log(error)
  }
}

module.exports = {
  getDgs,
  getTemps,
  breed_groupHandler,
  _getFullCans,
  _getMyCans
};
