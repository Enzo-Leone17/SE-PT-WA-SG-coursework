//controller to facilitate the requests

//initialize dependencies
const allItems = require("../models/tradeableItems");

//export functions

exports.getAllItems = async (req, res) => {
  try {
    const allTradeableItems = await allItems.getAllTradeableItems();
    if (!allTradeableItems) {
      return res.status(404).json({ message: "No available items" });
    }
    res.json(allTradeableItems);
  } catch (e) {
    console.error(e);
  }
};
