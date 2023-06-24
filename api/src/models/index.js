const { Sequelize } = require("sequelize");
const Dog = require("./Dog");
const Temperament = require("./Temperament");

const db = new Sequelize(
  "Dogs",
  "postgres",
  "JhonatanDzG117",
  {
    host: "localhost",
    dialect: "postgres",
  },
  { timestamps: false }
);

db.sync({ force: false })
  .then(() => {
    console.log("Models-DataBase Synchronized Successfully");
  })
  .catch((error) => {
    console.log("Error: Models-DataBase NO Synchronized 🚫");
  });

  module.exports = db