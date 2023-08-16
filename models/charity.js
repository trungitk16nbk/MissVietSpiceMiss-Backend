'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Charity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Charity.init({
    price: DataTypes.DECIMAL,
    total: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Charity',
  });
  return Charity;
};