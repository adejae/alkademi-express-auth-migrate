'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('userRoles', 'createdAt', {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn('userRoles', 'updatedAt', {
      type: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('userRoles', 'createdAt');
    await queryInterface.removeColumn('userRoles', 'updatedAt');
  }
};
