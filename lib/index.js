// require sequelize and create sequelize instance
const sq = require("sequelize");

const sequelize = new sq.Sequelize({
  dialect: "sqlite",
  storage: "./db/association_database.sqlite",
});

module.exports = { DataTypes: sq.DataTypes, sequelize };
