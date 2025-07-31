"use strict";
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();
    const managerPassword = await bcrypt.hash("Manager123", 10);
    const staffPassword = await bcrypt.hash("Staff123", 10);
    // Users
    const users = Array.from({ length: 20 }, (_, i) => ({
      username:
        (i + 1) % 4 === 0
          ? `Manager${(i + 1) / 4}`
          : `Staff${i + 1 - Math.floor(i / 4)}`,
      password: (i + 1) % 4 === 0 ? managerPassword : staffPassword,
      email:
        (i + 1) % 4 === 0
          ? `Manager${(i + 1) / 4}@warehouse.com`
          : `Staff${i + 1 - Math.floor(i / 4)}@warehouse.com`,
      role: (i + 1) % 4 === 0 ? "manager" : "staff",
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));

    // Staffs
    const staffs = Array.from({ length: 15 }, (_, i) => ({
      user_id: i + 1 + Math.floor(i / 3),
      full_name: `Staff ${i + 1}`,
      phone: `+65815${Math.abs(i - 9)}` + (i * i).toString().padStart(4, "0"),
      has_forklift_license: (i + 1) % 3 === 0 ? true : false,
      has_punched_in: (i + 1) % 2 === 0 ? true : false,
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));

    // Managers
    const managers = Array.from({ length: 5 }, (_, i) => ({
      user_id: (i + 1) * 4,
      full_name: `Manager ${i + 1}`,
      phone: `+65816${Math.abs(i - 9)}` + (i * i).toString().padStart(4, "0"),
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));

    // items
    const items = Array.from({ length: 20 }, (_, i) => ({
      description: `Item description ${i + 1}`,
      quantity: (i + 1) * 2,
      storage_type:
        (i + 1) % 3 === 0 ? "small" : (i + 1) % 3 === 1 ? "medium" : "big",
      movement_type: (i + 1) % 2 === 0 ? "slow" : "fast",
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));

    // bin_locations
    const bin_locations = Array.from({ length: 20 }, (_, i) => ({
      item_id: (i + 1) % 5 === 0 ? null : i + 1,
      storage_type:
        (i + 1) % 3 === 0 ? "small" : (i + 1) % 3 === 1 ? "medium" : "big",
      movement_type: (i + 1) % 2 === 0 ? "slow" : "fast",
      max_quantity: (i + 1) * 2,
      is_full: (i + 1) % 5 === 0 ? false : true,
      is_blocked: (i + 1) % 5 === 0 ? false : true,
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));

    // tasks
    const tasks = Array.from({ length: 5 }, (_, i) => ({
      manager_id: ((i + 1) % 4) * 1 + 1,
      item_id: i * 5 === 0 ? 1 : i * 5,
      destination_bin_id: i * 5 === 0 ? 1 : i * 5,
      status: "opened",
      description: `Task description ${i + 1}`,
      notes: "Important notes: ",
      require_forklift: i === 0 ? true : (i * 5) % 2 === 0 ? true : false,
      created_at: now,
      updated_at: now,
      is_deleted: false,
    }));

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

    await new Promise((r) => setTimeout(r, 3000)); // let calculations flow
    await queryInterface.bulkInsert("users", users);
    await queryInterface.bulkInsert("staffs", staffs);
    await queryInterface.bulkInsert("managers", managers);
    await queryInterface.bulkInsert("items", items);
    await queryInterface.bulkInsert("bin_locations", bin_locations);
    await queryInterface.bulkInsert("tasks", tasks);
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
