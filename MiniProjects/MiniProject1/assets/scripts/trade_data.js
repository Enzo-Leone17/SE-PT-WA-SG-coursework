//page & display control
const maxDisplayItems = 12;
let pageNumber = 1;
const backButton = document.getElementById("back-button");
const nextButton = document.getElementById("next-button");
let hasloaded = false;
document.addEventListener("DOMContentLoaded", function () {
  hasloaded = true;
  console.log("true");
});

//storage for current category data
let dataStorage = [];
let currentCategory = "";

//pin storage
const maxPinItems = 3;
let pinnedItems = [];

//DOM
const tableToDisplayData = document.getElementById("table-content");
const itemCardTemplate = document.getElementById("item-template");
const modalContentMaster = document.getElementById("modal-content-master");
const modalContentComponent = document.getElementById(
  "modal-content-component"
);

async function loadItemsByCatergory(category) {
  try {
    const response = await fetch(`http://localhost:8000/api/items/${category}`);
    if (response && response.status === 200) {
      dataStorage = await response.json();
      loadDataToDisplay(category, dataStorage);
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}

const loadDataToDisplay = (category, data) => {
  if (hasloaded) {
    currentCategory = category;
    tableToDisplayData.innerHTML = "";
    if(category === "warframe" || category === "weapon"){
      data = data.filter(item => item.is_set_master);
    }
    for (
      let i = (pageNumber * maxDisplayItems) - maxDisplayItems;
      i < pageNumber * maxDisplayItems;
      i++
    ) {
      if (pageNumber * maxDisplayItems > data.length) {
        break;
      }
      const newCard = itemCardTemplate.cloneNode(true);
      newCard.classList.remove("hidden");
      newCard.removeAttribute("id");
      newCard.querySelector(".item-image").src = data[i].thumbnailURL;
      newCard.querySelector(".item-image").alt = data[i].name;
      newCard.querySelector(".item-name").innerText = data[i].name;
      console.log(newCard);
      console.log(data[i].name);
      data[i]?.type.forEach((type) => {
        let tag = document.createElement("li");
        tag.innerText = type;
        newCard.querySelector(".item-tags").appendChild(tag);
      });
      if(data[i]?.ducats)
      {
        newCard.querySelector(".item-ducats").innerText = "Ducats: " +  data[i].ducats;
      }
      else{
        newCard.querySelector(".item-ducats").innerText = "";
      }
      newCard.querySelector(".item-plat").innerText = "Average Platinum price: " +
        data[i].average_platinum_price;
        newCard.querySelector("#pin-button").onclick = getItemFetch(data[i].name);
      //newCard.querySelector("#pin-button").setattribute("onclick", `pinItem('${data[i].name}')`);
      tableToDisplayData.appendChild(newCard);
    }
  }
};

const pinItem = (itemName) => {
  if (pinnedItems.length < maxPinItems) {
    pinnedItems.push(itemName);
    return `${itemName} has been pinned`;
  } else {
    return "Max amount of items pinned, please remove some first";
  }
};

//const loadDataToModal = (itemName) => {};

const turnPage = (direction) => {
  if (direction === "next" && pageNumber * maxDisplayItems < dataStorage.length) {
    pageNumber += 1;
    tableToDisplayData.innerHTML = "";
    loadDataToDisplay(currentCategory, dataStorage);
  } else if (direction === "back" && pageNumber > 1) {
    pageNumber -= 1;
    tableToDisplayData.innerHTML = "";
    loadDataToDisplay(currentCategory, dataStorage);
  }
};

//load items func
async function loadItems() {
  try {
    const response = await fetch("http://localhost:8000/api/items");
    if (response && response.status === 200) {
      console.log(response.json());
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}

async function getItemFetch(itemName) {
  try {
    const response = await fetch(
      `http://localhost:8000/api/items/warframe/search/${itemName}`
    );
    if (response && response.status === 200) {
      result = await response.json();
      let newData = [];
      result.forEach(fetchItem => {       
        dataStorage.filter(item => 
        {
          if(item.name === fetchItem.name)
          {
            newData.push(fetchItem);
          }
        });     
      });
      dataStorage.forEach(item => {
        if(newData.includes(item.name) === false)
        {
          newData.push(item);
        }
      });
      return newData;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}

loadItemsByCatergory("warframe");