"use strict";

const controller = {};
const models = require("../models");

// create new Charity when have a order
controller.create = async (req, res) => {
  try {
    let price = parseFloat(req.body.price);
    let total = (price * parseFloat(process.env.charityPercent));
    const oldCharity = await models.Charity.findOne({
      order: [["createdAt", "DESC"]],
    });
    if (oldCharity) {
      total += parseFloat(oldCharity.total);
    }
    const Charity = await models.Charity.create({total});
    res.status(201).json(Charity);
  } catch (error) {
    res.status(400).json({ error: "Error creating Charity." });
  }
};

// get total charities
controller.get = async (req, res) => {
  try {
    const Charity = await models.Charity.findOne({
      order: [["createdAt", "DESC"]],
    });

    if (Charity) {
      res.status(201).json(Charity.total);
    } else {
      res.status(404).json({ message: "No Charity found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error getting Charity" });
  }
};

module.exports = controller;
