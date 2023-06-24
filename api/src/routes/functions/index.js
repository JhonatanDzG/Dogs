const axios = require("axios");
const { API_KEY } = process.env;
const URL = "https://thedogapi.com/";

const getDgs = async () => {
  const apiDogs = await axios(`${URL}${API_KEY}`);

  const dogs = apiDogs.data.map((dog) => ({
    id: dog.id,
    name: dog.name,
    picture: dog.image.url,
    temps: dog.temperament,
    weight: dog.weight.metric,
    height: dog.height.metric,
    yearsOfLife: dog.life_span,
  }));

  return dogs;
};
const getTemps = async () => {
  let dogs = await _getCans();
  let temps = dogs
    .filter((dog) => dog.temps)
    .map((dog) => dog.temps.split(", "));
  temperaments = new Set(temps.flat());
  return temperaments;
};


module.exports = {
  getDgs,
  getTemps,
};
