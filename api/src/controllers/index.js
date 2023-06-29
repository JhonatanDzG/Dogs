const { Temperament } = require("../db.js");
const {
  getDgs,
  getTemps,
  _getMyCans,
  breed_groupHandler,
  _getFullCans,
} = require("../handlers/index.js");

const getDogs = async (req, res) => {
  const { name: breed_group } = req.query;
  try {
    const allDogs = await breed_groupHandler();
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
    if (idRaza) {
      const allCans = await _getFullCans();
      const cans = allCans.filter((can) => can.breed_group === idRaza);
      if (cans.length) return res.json(cans);
      res.stats(404).send("Can is lost");
    }
  } catch (error) {
    res.send(error);
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
const postDog = async(req, res) => {
  // >Esta ruta recibirá todos los datos necesarios para crear
  //   un nuevo perro y relacionarlo con los temperamentos asociados.
  // >Toda la información debe ser recibida por body.
  // >Debe crear la raza de perro en la base de datos,
  //   y esta debe estar relacionada con los temperamentos indicados
  //  (al menos uno).

    let {name, image, minHeight, maxHeight, minWeight, maxWeight, life_span, temperaments} = req.body
    let height = `${minHeight} - ${maxHeight}`
    let weight = `${minWeight} - ${maxWeight}`
    console.log(req.body)
    try {
        const myCans = await _getMyCans();
        existCan = myCans.filter(can => can.name.toLowerCase() === name.toLowerCase())
        if(existCan.length===0){
            const can =  await Dog.create({name,image, height, weight, life_span})
            for(let temp of temperaments){
                can.addTemps(await Temperament.findOne({where: {name: temp}}) )
            }
            res.json({can, message: 'El perro es de los nuestros'})
        }else{
            res.json({message: 'Ya esta con nosotros'})
        }
    } catch (error) {
        res.send(error);
    }
};

const getTemperaments = async (req, res) => {
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

module.exports = {
  getDogs: getDogs,
  getDetailByRace: getDetailByRace,
  getCoincidencesByQuery: getCoincidencesByQuery,
  postDog: postDog,
  getTemperaments: getTemperaments,
};
