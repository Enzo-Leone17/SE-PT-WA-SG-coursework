//Import base class
import TradeableItems from "./tradeableItems.js";
//fs to edit files
import fs from "node:fs/promises";

export default class Weapons extends TradeableItems {
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
    this.is_set_master = is_set_master;
    this.average_platinum_price = average_platinum_price;
    this.ducat_value = ducat_value;
    this.thumbnailURL = thumbnailURL;
    this.date_updated = date_updated;
  }

  //update local json file with new values from this object for existing data or append new data
  updateJson = async () => {
    //check if json file exists
    const data = await fs
      .readFile("./json_data/weapons.json", "utf8", (err, data) => {
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
          data.forEach((weapons) => {
            if (weapons.name === this.name) {
              //only price data may vary, other data is static
              weapons.average_platinum_price = this.average_platinum_price;
              weapons.ducat_value = this.ducat_value;
              weapons.date_updated = this.date_updated;
              hasUpdated = true;
            }
            newData.push(weapons);
          });
          if (!hasUpdated) {
            //if data not updated, append new data
            newData.push(this);
          }
          fs.writeFile(
            "./json_data/weapons.json",
            JSON.stringify(newData, null, "\t")
          );
        } else {
          fs.writeFile(
            "./json_data/weapons.json",
            JSON.stringify([this], null, "\t")
          );
        }
      });
  };
}
