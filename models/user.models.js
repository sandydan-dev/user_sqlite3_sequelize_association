const { DataTypes, sequelize } = require("../lib/index");

const user = sequelize.define("user", {
  username: DataTypes.TEXT,
  email: DataTypes.TEXT,
  password: DataTypes.TEXT,
});

module.exports = user;
