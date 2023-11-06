"use strict";

const controller = {};
const models = require("../models");

// create new Charity when have a order
controller.create = async (req, res) => {
  try {
    const ShopifyOrderData = req.body;  // Dữ liệu từ request POST gửi từ Shopify
    // const ShopifyOrderId = ShopifyOrderData.id;
    // const OrderTime = ShopifyOrderData.created_at; 
    // const TotalAmount = ShopifyOrderData.total_price;
    //let CharityAmount = TotalAmount * parseFloat(process.env.charityPercent);  // Tính tiền charity (0.5% của tổng giá trị đơn hàng)
    const ShopifyOrderId = null;
    const OrderTime = null;
    const TotalAmount = 0;
    let CharityAmount = TotalAmount * parseFloat(process.env.charityPercent);  // Tính tiền charity (0.5% của tổng giá trị đơn hàng)

    const Charity = await models.Charity.create({ ShopifyOrderId, OrderTime, TotalAmount, CharityAmount, ShopifyOrderData });
    res.status(201).json(Charity);
  } catch (error) {
    res.status(400).json({ error: "Error creating Charity." });
  }
};

controller.get = async (req, res) => {
  try {
    const result = await models.Charity.findOne({
      attributes: [
        [models.sequelize.fn('SUM', models.sequelize.col('CharityAmount')), 'totalCharityAmount']
      ]
    });

    const totalCharityAmount = result.get('totalCharityAmount');
    if (totalCharityAmount !== null) {
      res.status(200).json(parseFloat(totalCharityAmount).toFixed(2));
    } else {
      res.status(200).json(0);
    }
  } catch (error) {
    console.error('Error getting Charity:', error);
    res.status(500).json({ error: "Error getting Charity" });
  }
};

module.exports = controller;
