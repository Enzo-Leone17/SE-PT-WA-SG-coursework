//fs to edit files
const fs = require('node:fs');

//Main class for tradeable items
class TradeableItems {
  constructor(name, url_name, id) {
    this.name = name;
    this.url_name = url_name;
    this.id = id;
  }
  
}

//warframe market api
const warframeMarketAPI = "https://api.warframe.market/v1";
const tradeableItemsAPI = `${warframeMarketAPI}/items`;

/**
 * get all the tradeable items from market api then updates into local json
 * @returns tradeableItems as json
 */
const getAllTradeableItems = async () => {
  try {
    const response = await fetch(tradeableItemsAPI);
    if (response && response.status === 200) {
      const data = await response.json();

      //upon fetching/getting data from api, convert it to json and parse
      //as local defined class for storing --> access data without repeatedly
      //calling the api
      let tradeableItems = [];
      let itemData =data.payload.items;
      itemData.forEach(item => {
        tradeableItems.push(new TradeableItems(item.item_name, item.url_name, item.id));
      });
      //write to json file
      try{
        fs.writeFileSync('./json_data/tradeableItems.json', JSON.stringify(tradeableItems));
      } catch (err) {
        console.error(err);
      }
      return data;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
};



module.exports = { TradeableItems, getAllTradeableItems };