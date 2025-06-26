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

    await queryInterface.createTable("tasks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      manager_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "managers", key: "id" },
      },
      item_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "items", key: "id" },
      },
      destination_bin_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "bin_locations", key: "id" },
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM("opened", "cancelled", "closed"),
        defaultValue: "opened",
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT,
        defaultValue: "No Description provided",
      },
      require_forklift: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable("tasks");
  },
};
