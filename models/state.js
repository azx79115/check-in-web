"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      State.belongsTo(models.User, { foreignKey: "UserId" });
      State.hasMany(models.Record, { foreignKey: "StateId" });
    }
  }
  State.init(
    {
      UserId: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      durations: DataTypes.TIME,
      state: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "State",
      tableName: "States",
    }
  );
  return State;
};
