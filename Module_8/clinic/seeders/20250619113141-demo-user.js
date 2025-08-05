"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("password123", 10);

    const users = [
      {
        username: "admin1",
        email: "admin1@example.com",
        password: hashedPassword,
        role: "admin",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "doctor1",
        email: "doctor1@example.com",
        password: hashedPassword,
        role: "doctor",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "staff1",
        email: "staff1@example.com",
        password: hashedPassword,
        role: "staff",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "staff2",
        email: "staff2@example.com",
        password: hashedPassword,
        role: "staff",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "doctor2",
        email: "doctor2@example.com",
        password: hashedPassword,
        role: "doctor",
        is_deleted: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Users", users);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};