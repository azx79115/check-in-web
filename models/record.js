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
      Record.belongsTo(models.User, { foreignKey: "UserId", as: "userRecord" });
    }
  }
  Record.init(
    {
      UserId: DataTypes.INTEGER,
      date: DataTypes.DATEONLY,
      checkIn: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Record",
      tableName: "Records",
    }
  );
  return Record;
};
