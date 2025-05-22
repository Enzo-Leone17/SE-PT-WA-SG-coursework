
# Warframe Trading Assistant

An app designed towards providing assistance to Warframe players who want to keep track of in-game tradeable items for the best "profit". The aim of this app is to provide an easier view on the current trending items and an estimate on how much an item is "worth" in the trading aspect of the game.
***
Platinum is a premium currency in Warframe where the only ways of getting them is through buying the currency or premium bundles with real life cash, or trading items in game with other players who own the currency.
***
Trading in game is very similar to how auctions are held; in the Trade tab of the chat system, players can type: 

- What to Sell (WTS) to sell an item and list how much platinum they want in return.

- What to Buy (WTB) to buy an item and list how much platinum they are offering in return.
***
 How much an item is "worth" generally depends on the Supply and Demand of the item, the popularity of the item and its in game performance (game breaking, overpowered, ease of usage; meta)
## Run Locally on localhost
- Make sure to have [Node.js](https://nodejs.org/en/download) and [Git](https://git-scm.com/downloads) installed, use any terminal to run the following:
Clone the project

```bash
  git clone https://github.com/Enzo-Leone17/SE-PT-WA-SG-coursework.git
```

Go to the project directory

```bash
  cd ./MiniProjects/MiniProject1
```

Install dependencies

```bash
  npm install
```

Start the server via node.js

```bash
  node server.js
```

On any browser, go to the following url:

```http
  http://localhost:8000   
```
## Features

- Filter and sort tradeable items by category, price etc
- Fetch latest data straight from Warframe Market API
- Account system, login as guest or Registered account

#### - - - Registered User Features - - -
- Pin/favourite items to the top of the list 
- Track inventory items 


## API Reference

#### Warframe Market Api: 

```http
  https://warframe.market/api_docs
```




## About Warframe

Warframe is a free-to-play action role-playing third-person shooter multiplayer online game that can be played on Microsoft Windows, PlayStation 4, Xbox One, Nintendo Switch, PlayStation 5, Xbox Series X/S and iOS. Available to download on PC as a standalone client or from Epic Games Store and Steam.

[Warframe Official Webpage](https://www.warframe.com)



## Acknowledgements

Readme file made with the help of [readme.so](https://readme.so)