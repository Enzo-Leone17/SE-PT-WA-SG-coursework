//Import base class
import TradeableItems from "./tradeableItems.js";
//fs to edit files
import fs from "node:fs/promises";

export default class Relics extends TradeableItems {
  constructor(
    name,
    url_name,
    id,
    average_platinum_price,
    thumbnailURL,
    date_updated,
    type = "relic"
  ) {
    super(name, url_name, id);
    this.type = type;
    this.date_updated = date_updated;
    this.average_platinum_price = average_platinum_price;
    this.thumbnailURL = thumbnailURL;
  }
  //update local json file with new values from this object for existing data or append new data
  updateJson = async () => {
    //check if json file exists
    const data = await fs
      .readFile("./json_data/relics.json", "utf8", (err, data) => {
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
          data.forEach((relics) => {
            if (relics.name === this.name) {
              //only price data may vary, other data is static
              relics.average_platinum_price = this.average_platinum_price;
              relics.date_updated = this.date_updated;
              hasUpdated = true;
            }
            newData.push(relics);
          });
          if (!hasUpdated) {
            //if data not updated, append new data
            newData.push(this);
          }
          fs.writeFile(
            "./json_data/relics.json",
            JSON.stringify(newData, null, "\t")
          );
        } else {
          fs.writeFile(
            "./json_data/relics.json",
            JSON.stringify([this], null, "\t")
          );
        }
      });
  };
}
