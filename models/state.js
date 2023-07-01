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
      State.belongsTo(models.User, { foreignKey: "UserId", as: "userState" });
    }
  }
  State.init(
    {
      UserId: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
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
