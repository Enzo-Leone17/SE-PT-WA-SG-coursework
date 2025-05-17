//fs to edit files
const fs = require('node:fs');

//Main class for tradeable items
class TradeableItems {
  constructor(name, url_name, thumbnail, id) {
    this.name = name;
    this.url_name = url_name;
    this.thumbnail = thumbnail;
    this.id = id;
  }
}

//warframe market api
const warframeMarketAPI = "https://api.warframe.market/v1";
const tradeableItemsAPI = `${warframeMarketAPI}/items`;

const getAllTradeableItems = async () => {
  try {
    const response = await fetch(tradeableItemsAPI);
    if (response && response.status === 200) {
      const data = await response.json();
      /*try{
        fs.writeFileSync('tradeableItems.json', JSON.stringify(data));
      } catch (err) {
        console.error(err);
      }*/
      return data;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};



module.exports = { TradeableItems, getAllTradeableItems };