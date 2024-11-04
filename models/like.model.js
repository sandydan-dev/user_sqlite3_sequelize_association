const { DataTypes, sequelize } = require("../lib/index");

// create association
const track = require("./track.model");
const user = require("./user.models");

const like = sequelize.define("like", {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: user,
      key: "id",
    },
  },
  trackId: {
    type: DataTypes.INTEGER,
    references: {
      model: track,
      key: "id",
    },
  },
});

//  join table to connect both user & track tables with many-to-many relationship  (belongsToMany)
user.belongsToMany(track, { through: like });
track.belongsToMany(user, { through: like });

module.exports = like;
