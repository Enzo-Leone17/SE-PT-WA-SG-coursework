//base class for tradeable items
export default class TradeableItems {
  constructor(name, url_name, id, thumbnailURL, type = "tradeable") {
    this.name = name;
    this.url_name = url_name;
    this.id = id;
    this.thumbnailURL = thumbnailURL;
    this.type = type;
  }
}



