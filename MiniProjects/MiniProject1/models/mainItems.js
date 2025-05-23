//Main script for data updating from api fetching
//fs to edit files
import fs from "node:fs";
import fsa from "node:fs/promises";

//axios for http requests
import axios from "axios";

//import classes and subclasses and their functions
import TradeableItems from "./tradeableItems.js";

import Warframes from "./warframes.js";
import { getSpecificWarframe, getAllWarframes } from "./warframes.js";

import Mods from "./mods.js";
import { getSpecificMod, getAllMods } from "./mods.js";

import Relics from "./relics.js";
import { getSpecificRelic, getAllRelics } from "./relics.js";

import Weapons from "./weapons.js";
import { getSpecificWeapon, getAllWeapons } from "./weapons.js";

//create instance
const wfMarket = axios.create({
  baseURL: "https://api.warframe.market/v1",
  timeout: 1000,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
    platform: "pc",
    language: "en",
  },
});

//direct link to warframe market asset images
const warframeMarketAssetURLPrepend = "https://warframe.market/static/assets/";

/**
 * get all the tradeable items (short data format) from market api then updates into local json
 * @returns tradeableItems as json
 */
const getAllTradeableItems = async () => {
  try {
    //upon fetching/getting data using axios instance, store data
    //as local defined class objects --> access data without repeatedly
    //calling the api
    const response = await wfMarket.get("/items");
    let tradeableItems = [];
    let tradeableItemsURLName = [];
    if (response && response.status === 200) {
      const data = await response.data;
      let itemData = data?.payload?.items; //access the item data from api json
      itemData?.forEach((item) => {
        tradeableItems.push(
          new TradeableItems(
            item?.item_name,
            item?.url_name,
            item?.id,
            item?.thumb
          )
        );
        tradeableItemsURLName.push(item?.url_name);
      });
      //write to local json file
      try {
        fs.writeFileSync(
          "./json_data/tradeableItems.json",
          JSON.stringify(tradeableItemsURLName, null, "\t")
        );
      } catch (err) {
        console.error(err);
      }
      await fillOrUpdateSubclassJson(tradeableItems, 0);
      return data;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};

/**
 * private func to fill or update the subclass json >> load detailed data for each class
 * @param {*} item_arr array of items to fetch api for
 * @param {*} tempindex temporal fix to when fetching fails midway, tempindex is the index to restart from
 */
const fillOrUpdateSubclassJson = async (item_arr, tempindex) => {
  //if restarting api fetching, skip till tempindex
  let index = 0;
  for await (const item of item_arr) {
    if (index < tempindex) {
      index++;
      continue;
    }
    try {
      //parse item url name and call api endpoint to get specific information
      await new Promise((next) => {
        asyncItemAPIDetailedFetch(item).then(() => {
          index++;
          console.log("Item loaded: " + index + ": " + item.name);
          next();
        });
      });
    } catch (err) {
      console.log("Something went wrong,", err);
    }
    await new Promise((resolve) => setTimeout(resolve, 1500)); // delay to prevent flooding req to server
    continue;
  }
};


//fetch data from api (both basic details and statistics) then sort and return
const asyncItemAPIDetailedFetch = async (item, getSetItems = false) => {
  let resultData = [];
  //first fetch detailed data from api endpoint (item url name parsed)
  await wfMarket
    .get("/items/" + item.url_name)
    .then((response) => {
      response.data.payload.item.items_in_set.forEach((component) => {
        if (component.id === item.id || getSetItems) {
          //Additional check if the item is part of set, get itself from id
          //get average platinum price from another endpoint, logic to be improved
          //currently gets the latest live(i.e order not closed) avg price >> can be from buy or sell orders
          wfMarket
            .get("/items/" + item.url_name + "/statistics")
            .then((stats) => {
              let arrLength =
                stats.data.payload.statistics_live["48hours"].length;
              return stats.data.payload.statistics_live["48hours"][
                arrLength - 1
              ];
            })
            .then((avgPlatObj) => {
              resultData.push(sortItemData(component, avgPlatObj));
            })
            .catch((err) => {
              console.log("error fetching statistics data " + err.status);
            });
        }
      });
    })
    .catch((err) => {
      console.log("error fetching detailed item data " + err.status);
    });
  return resultData;
};


//sort item by their tags >> catergory
const sortItemData = (component, avgPlatObj) => {
  if (component.tags.includes("mod")) {
    let mod = new Mods(
      component.en.item_name,
      component.url_name,
      component.id,
      component.tags,
      avgPlatObj.avg_price,
      warframeMarketAssetURLPrepend + component.thumb,
      avgPlatObj.datetime
    );
    mod.updateJson();
    return mod;
  } else if (component.tags.includes("relic")) {
    let relic = new Relics(
      component.en.item_name,
      component.url_name,
      component.id,
      component.tags,
      avgPlatObj.avg_price,
      warframeMarketAssetURLPrepend + component.thumb,
      avgPlatObj.datetime
    );
    relic.updateJson();
    return relic;
  } else if (component.tags.includes("weapon")) {
    let weapon = new Weapons(
      component.en.item_name,
      component.url_name,
      component.id,
      //if it belongs to a set, use existing data, else set as master
      component?.set_root !== null ? component.set_root : true,
      component.tags,
      avgPlatObj.avg_price,
      warframeMarketAssetURLPrepend + component.thumb,
      avgPlatObj.datetime,
      component?.ducats
    );
    weapon.updateJson();
    return weapon;
  } else if (component.tags.includes("warframe")) {
    let warframe = new Warframes(
      component.en.item_name,
      component.url_name,
      component.id,
      //if it belongs to a set, use existing data, else set as master
      component?.set_root !== null ? component.set_root : true,
      component.tags,
      avgPlatObj.avg_price,
      warframeMarketAssetURLPrepend + component.thumb,
      avgPlatObj.datetime,
      component.ducats
    );
    warframe.updateJson();
    return warframe;
  }
};


const getWarframes = async () => {
  try {
    const result = await getAllWarframes();
    return result
  } catch (e) {
    console.error(e);
  }
};
const getWeapons = async () => {
  try {
    const result = await getAllWeapons();
    return result
  } catch (e) {
    console.error(e);
  }
};
const getRelics = async () => {
  try {
    const result = await getAllRelics();
    return result
  } catch (e) {
    console.error(e);
  }
};const getMods = async () => {
  try {
    const result = await getAllMods();
    return result
  } catch (e) {
    console.error(e);
  }
};

//search by name functions

const getWarframeByName = async (name) => {
  try {
    const result = await getSpecificWarframe(name);
    const updatedResult = await asyncItemAPIDetailedFetch(result[0]);
    return updatedResult;
  } catch (err) {
    console.log("error fetching update ", err);
  }
};

const getWeaponByName = async (name) => {
  try {
    const result = await getSpecificWeapon(name);
    const updatedResult = await asyncItemAPIDetailedFetch(result[0]);
    return updatedResult;
  } catch (err) {
    console.log("error fetching update ", err);
  }
};

const getRelicByName = async (name) => {
  try {
    const result = await getSpecificRelic(name);
    const updatedResult = await asyncItemAPIDetailedFetch(result[0]);
    return updatedResult;
  } catch (err) {
    console.log("error fetching update ", err);
  }
};

const getModByName = async (name) => {
  try {
    const result = await getSpecificMod(name);
    const updatedResult = await asyncItemAPIDetailedFetch(result[0]);
    return updatedResult;
  } catch (err) {
    console.log("error fetching update ", err);
  }
};

export default {
  getAllTradeableItems,
  getWarframeByName,
  getWeaponByName,
  getRelicByName,
  getModByName,
  getWarframes,
  getWeapons,
  getRelics,
  getMods
};
