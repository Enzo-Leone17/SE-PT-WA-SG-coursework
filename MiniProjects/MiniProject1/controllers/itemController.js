//controller to facilitate the requests

//initialize dependencies
import { get } from "node:http";
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

//load catergory
const getWarframes = async (req, res) => {
  try {
    const allWarframes = await allItems.getWarframes();
    if (!allWarframes) {
      return res.status(404).json({ message: "No warframe loaded" });
    }
    res.json(allWarframes);
  } catch (e) {
    console.error(e);
  }
};

const getWeapons = async (req, res) => {
  try {
    const allWeapons = await allItems.getWeapons();
    if (!allWeapons) {
      return res.status(404).json({ message: "No weapon loaded" });
    }
    res.json(allWeapons);
  } catch (e) {
    console.error(e);
  }
};

const getRelics = async (req, res) => {
  try {
    const allRelics = await allItems.getRelics();
    if (!allRelics) {
      return res.status(404).json({ message: "No relic loaded" });
    }
    res.json(allRelics);
  } catch (e) {
    console.error(e);
  }
};

const getMods = async (req, res) => {
  try {
    const allMods = await allItems.getMods();
    if (!allMods) {
      return res.status(404).json({ message: "No mod loaded" });
    }
    res.json(allMods);
  } catch (e) {
    console.error(e);
  }
};




//Search by name
const getWarframeByName = async (req, res) => {
  try {
    const item = await allItems.getWarframeByName(req.params.name);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (e) {
    console.error(e);
  }
};

const getWeaponByName = async (req, res) => {
  try {
    const item = await allItems.getWeaponByName(req.params.name);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (e) {
    console.error(e);
  }
};

const getRelicByName = async (req, res) => {
  try {
    const item = await allItems.getRelicByName(req.params.name);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (e) {
    console.error(e);
  }
};

const getModByName = async (req, res) => {
  try {
    const item = await allItems.getModByName(req.params.name);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (e) {
    console.error(e);
  }
};

export default { getAllItems, getWarframeByName, getWeaponByName, getRelicByName, getModByName, getWarframes, getWeapons, getRelics, getMods };