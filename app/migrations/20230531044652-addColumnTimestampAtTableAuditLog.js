'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('auditLogs', 'createdAt', {
      type: Sequelize.DATE,
    });

    await queryInterface.addColumn('auditLogs', 'updatedAt', {
      type: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('auditLogs', 'createdAt')
    await queryInterface.removeColumn('auditLogs', 'updatedAt')
  }
};
