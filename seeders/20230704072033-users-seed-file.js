"use strict";
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "root",
          account: "root",
          password: await bcrypt.hash("acuser", 10),
          isAdmin: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "user1",
          account: "user1",
          password: await bcrypt.hash("acuser", 10),
          isAdmin: "user",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", {});
    await queryInterface.sequelize.query(
      "ALTER TABLE Users AUTO_INCREMENT = 1"
    );
  },
};
