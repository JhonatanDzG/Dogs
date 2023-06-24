const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Image: {
      type: DataTypes.STRING,
      allowNull: false

    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    yearsOld: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { timestamps: false });
};
