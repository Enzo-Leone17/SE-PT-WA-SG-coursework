"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable("items", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,      
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,      
      },
      storage_type: {
        allowNull: false,
        type: Sequelize.ENUM("small", "medium", "big"),
        defaultValue: "small",
      },
      movement_type: {
        allowNull: false,
        type: Sequelize.ENUM("slow", "fast"),
        defaultValue: "fast",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
      is_deleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("items");
  },
};
 