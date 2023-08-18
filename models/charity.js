"use strict";
const { Model } = require("sequelize");
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
  Charity.init(
    {
      ShopifyOrderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      OrderTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      TotalAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      ShopifyOrderData: {
        type: DataTypes.JSONB,
        allowNull: true,
      },
      CharityAmount: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Charity",
    }
  );
  return Charity;
};
