'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('auditLogs', {
      tableName: {
        type: Sequelize.STRING
      },
      Task: {
        type: Sequelize.STRING(100)
      },
      Description: {
        type: Sequelize.STRING
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('auditLogs');

  }
};
