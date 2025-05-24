//Import base class
import TradeableItems from "./tradeableItems.js";
//fs to edit files
import fs from "node:fs/promises";

export default class Mods extends TradeableItems {
  constructor(
    name,
    url_name,
    id,
    type,
    average_platinum_price,
    thumbnailURL,
    date_updated
  ) {
    super(name, url_name, id);
    this.type = type;
    this.thumbnailURL = thumbnailURL;
    this.average_platinum_price = average_platinum_price;
    this.date_updated = date_updated;
  }
  //update local json file with new values from this object for existing data or append new data
  updateJson = async () => {
    //check if json file exists
    const data = await fs
      .readFile("./json_data/mods.json", "utf8", (err, data) => {
        if (err) {
          console.log("Error reading file", err);
          return null;
        }
        return data;
      })
      .then((data) => {
        //if json file exists, replace old data with new data
        if (data !== "") {
          data = JSON.parse(data);
          let newData = [];
          let hasUpdated = false;
          data.forEach((mods) => {
            if (mods.name === this.name) {
              //only price data may vary, other data is static
              mods.thumbnailURL = this.thumbnailURL;
              mods.average_platinum_price = this.average_platinum_price;
              mods.date_updated = this.date_updated;
              hasUpdated = true;
            }
            newData.push(mods);
          });
          if (!hasUpdated) {
            //if data not updated, append new data
            newData.push(this);
          }
          fs.writeFile(
            "./json_data/mods.json",
            JSON.stringify(newData, null, "\t")
          );
        } else {
          fs.writeFile(
            "./json_data/mods.json",
            JSON.stringify([this], null, "\t")
          );
        }
      });
  };
}


export const getSpecificMod = async (name) => {
  let result = [];
  const data = await fsa.readFile(
    "./json_data/mods.json",
    "utf8",
    (err, data) => {
      if (err) {
        console.log("Error reading file", err);
        return null;
      }
      return data;
    }
  );
  if (data !== null && data !== undefined) {
    const mods = JSON.parse(data);
    for await (const mod of mods) {
      if (mod.name.toLowerCase().includes(name.toLowerCase())) {
        result.push(mod);
      }
    }
  }
  return result;
};


export const getAllMods = async () => {
  let result = [];
  const data = await fs.readFile(
    "./json_data/mods.json",
    "utf8",
    (err, data) => {
      if (err) {
        console.log("Error reading file", err);
        return null;
      }
      return data;
    }
  );
  result = JSON.parse(data);
  return result;
};