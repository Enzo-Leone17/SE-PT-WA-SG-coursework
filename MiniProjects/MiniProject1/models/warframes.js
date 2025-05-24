//Import base class
import TradeableItems from "./tradeableItems.js";
//fs to edit files
import fs from "node:fs/promises";

export default class Warframes extends TradeableItems {
  constructor(
    name,
    url_name,
    id,
    is_set_master,
    type,
    average_platinum_price,
    thumbnailURL,
    date_updated,
    ducat_value
  ) {
    super(name, url_name, id);
    this.type = type;
    this.is_set_master = is_set_master; //Boolean to check if data is a set (true) or component of a set (false)
    this.average_platinum_price = average_platinum_price;
    this.ducat_value = ducat_value;
    this.thumbnailURL = thumbnailURL;
    this.date_updated = date_updated; //keep track of update datetime
  }
  //update local json file with new values from this object for existing data or append new data
  updateJson = async () => {
    //check if json file exists
    const data = await fs
      .readFile("./json_data/warframes.json", "utf8", (err, data) => {
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
          data.forEach((warframe) => {
            if (warframe.name === this.name) {
              //only price data may vary, other data is static
              warframe.thumbnailURL = this.thumbnailURL;
              warframe.average_platinum_price = this.average_platinum_price;
              warframe.ducat_value = this.ducat_value;
              warframe.date_updated = this.date_updated;
              hasUpdated = true;
            }
            newData.push(warframe);
          });
          if (!hasUpdated) {
            //if data not updated, append new data
            newData.push(this);
            console.log(this.name);
          }
          fs.writeFile(
            "./json_data/warframes.json",
            JSON.stringify(newData, null, "\t")
          );
        } else {
          fs.writeFile(
            "./json_data/warframes.json",
            JSON.stringify([this], null, "\t")
          );
        }
      });
  };
}


export const getSpecificWarframe = async (name) => {
  let result = [];
  const data = await fs.readFile(
    "./json_data/warframes.json",
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
    const warframes = JSON.parse(data);
    for await (const warframe of warframes) {
      if (warframe.name.toLowerCase().includes(name.toLowerCase())) {
        result.push(warframe);
      }
    }
  }
  return result;
};


export const getAllWarframes = async () => {
  let result = [];
  const data = await fs.readFile(
    "./json_data/warframes.json",
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