"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Record, { foreignKey: "UserId", as: "userRecord" });
      User.hasMany(models.State, { foreignKey: "UserId", as: "userState" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      account: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users",
    }
  );
  return User;
};
