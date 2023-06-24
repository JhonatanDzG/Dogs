const Dog = require('./Dog');
const Temperament = require('./Temperament');
const sequelize = require('sequelize')



const DogXTemperament = sequelize.define('DogXTemperament', {
// 
});

Dog.belongsToMany(Temperament, { through: DogXTemperament });
Temperament.belongsToMany(Dog, { through: DogXTemperament });

    module.exports = DogXTemperament;
