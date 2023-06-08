'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'users',
          key: 'id'
        }
      },
      categoryId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'categorys',
          key: 'id'
        }
      },
      brandId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'brands',
          key: 'id'
        }
      },
      unitId: {
        type: Sequelize.INTEGER,
        reference: {
          model: 'units',
          key: 'id'
        }
      },
      productName: {
        type: Sequelize.STRING
      },
      productPrice: {
        type: Sequelize.INTEGER
      },
      productStock: {
        type: Sequelize.INTEGER
      },
      expiredDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};