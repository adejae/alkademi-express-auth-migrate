'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('auditLogs', 'id', {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('auditLogs', 'id')
  }
};
