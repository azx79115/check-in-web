"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Record.belongsTo(models.User, { foreignKey: "UserId" });
      Record.belongsTo(models.State, { foreignKey: "StateId" });
    }
  }
  Record.init(
    {
      UserId: DataTypes.INTEGER,
      StateId: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      checkIn: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "Record",
      tableName: "Records",
    }
  );
  return Record;
};
