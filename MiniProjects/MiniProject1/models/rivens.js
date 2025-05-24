//Import base class
import TradeableItems from "./tradeableItems.js";
//fs to edit files
import fs from "node:fs";

export default class Rivens extends TradeableItems {
  constructor(name, url_name, id, average_platinum_price, thumbnailURL, date_updated, type = "riven") {
    super(name, url_name, id, type);
    this.type = type;
    this.average_platinum_price = average_platinum_price;
    this.thumbnailURL = thumbnailURL;
    this.date_updated = date_updated; 
  }
}
