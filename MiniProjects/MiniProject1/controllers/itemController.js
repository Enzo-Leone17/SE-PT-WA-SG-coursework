//controller to facilitate the requests

//initialize dependencies
import allItems from "../models/mainItems.js";

//export functions

const getAllItems = async (req, res) => {
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

const getItemByName = async (req, res) => {
  try {
    const item = await allItems.asyncItemAPIDetailedFetch(req.params.name, true);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (e) {
    console.error(e);
  }
};

export default { getAllItems, };