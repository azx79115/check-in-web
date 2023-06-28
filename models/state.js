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
      State.belongsTo(models.Record, { foreignKey: "RecordId", as: "record" });
    }
  }
  State.init(
    {
      UserId: DataTypes.INTEGER,
      RecordId: DataTypes.INTEGER,
      state: DataTypes.STRING,
      durations: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "State",
      tableName: "States",
    }
  );
  return State;
};
