"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Users
    const users = Array.from({ length: 20 }, (_, i) => ({
      username: (i + 1) % 4 === 0 ? `Manager${i + 1}` : `Staff${i + 1}`,
      password: (i + 1) % 4 === 0 ? `Manager123` : `Staff123`,
      email: (i + 1) % 4 === 0 ? `Manager${i + 1}@warehouse.com` : `Staff${i + 1}@warehouse.com`,
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));
    await queryInterface.bulkInsert("users", users);

    // Staffs
    const staffs = Array.from({ length: 15 }, (_, i) => ({
      user_id: (i + 1) % 4 === 0 ? i + 2 : i + 1,
      full_name: `Staff ${i + 1}`,
      phone: `+65 815${Math.abs(i - 10)}` + (i * i).toString().padStart(4, "0"),
      has_forklift_license: (i + 1) % 3 === 0 ? true : false,
      has_punched_in: (i + 1) % 2 === 0 ? true : false,
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));
    await queryInterface.bulkInsert("staffs", staffs);

    // Managers
    const managers = Array.from({ length: 5 }, (_, i) => ({
      user_id: i + 1,
      full_name: `Manager ${i + 1}`,
      phone: `+65 816${Math.abs(i - 10)}` + (i * i).toString().padStart(4, "0"),
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));
    await queryInterface.bulkInsert("managers", managers);

    // items
    const items = Array.from({ length: 20 }, (_, i) => ({
      description: `Item description ${i + 1}`,
      quantity: (i + 1) * 2,
      storage_type: (i + 1) % 3 === 0 ? "small" : (i + 1) % 3 === 1 ? "medium" : "big",
      movement_type: (i + 1) % 2 === 0 ? "slow" : "fast",
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));
    await queryInterface.bulkInsert("items", items);

    // bin_locations
    const bin_locations = Array.from({ length: 20 }, (_, i) => ({
      item_id: (i + 1) % 5 === 0 ? null : i + 1,
      storage_type: (i + 1) % 3 === 0 ? "small" : (i + 1) % 3 === 1 ? "medium" : "big",
      movement_type: (i + 1) % 2 === 0 ? "slow" : "fast",
      max_quantity: (i + 1) * 2,
      is_full: (i + 1) % 5 === 0 ? false : true,
      is_blocked: (i + 1) % 5 === 0 ? false : true,
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));
    await queryInterface.bulkInsert("bin_locations", bin_locations);

    // tasks
    const tasks = Array.from({ length: 5 }, (_, i) => ({
      manager_id: (i + 1) % 4 * 1 + 1,
      item_id: (i * 5) === 0 ? 1 : i * 5,
      destination_bin_id: (i * 5) === 0 ? 1 : i * 5,
      status: "opened",
      description: `Task description ${i + 1}`,
      require_forklift: i === 0 ? true : (i * 5) % 2 === 0 ? true : false,
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));
    await queryInterface.bulkInsert("tasks", tasks);

    //assignment
    const assignments = Array.from({ length: 5 }, (_, i) => ({
      staff_id: i + 1,
      task_id: i + 1,
      status: "assigned",
      notes: `Assignment notes ${i + 1}`,
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));
    await queryInterface.bulkInsert("assignments", assignments);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("assignments", null, {});
    await queryInterface.bulkDelete("tasks", null, {});
    await queryInterface.bulkDelete("bin_locations", null, {});
    await queryInterface.bulkDelete("items", null, {});
    await queryInterface.bulkDelete("managers", null, {});
    await queryInterface.bulkDelete("staffs", null, {});
    await queryInterface.bulkDelete("users", null, {});
  },
};