'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class units extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      units.belongsTo(models.users, {
        foreignKey: 'userId'
      });
    }
  }
  units.init({
    userId: DataTypes.INTEGER,
    unitName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'units',
  });
  return units;
};