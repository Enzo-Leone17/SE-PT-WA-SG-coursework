//DOM references
const productListing = document.getElementById("product-list");
const productTemplate = document.getElementById("product-template");
const dropdownFilter = document.getElementById("dropdown-filter");
const dropdownSorter = document.getElementById("dropdown-sorter");
const searchInput = document.getElementById("search");

//Extension icons urls by category
const extensionIcons = {
    "men's clothing": "https://img.icons8.com/?size=100&id=16596&format=png&color=000000",
    "jewelery": "https://img.icons8.com/?size=100&id=dwIsy84qku9q&format=png&color=000000",
    "electronics": "https://img.icons8.com/?size=100&id=12923&format=png&color=000000",
    "women's clothing": "https://img.icons8.com/?size=100&id=WR2WB7xFk5yT&format=png&color=000000",
};

//variables
let storeProducts = []; //storage for API data, faster to access than repeat fetching(No query supported)

const getFakeStoreAPIData = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    storeProducts = data;
    return data;
  } catch (error) {
    console.log(error);
  }
};


const populateStorePage = async (filter = "all", sort = "none") => {
  let products = storeProducts;
    if(storeProducts.length === 0) {
      products = await getFakeStoreAPIData();
    }

    if (filter !== "all") {
      let filteredProducts = products.filter((product) => product.category === filter);
      filteredProducts = sortProducts(filteredProducts, sort);
      filteredProducts.map((product) => {
        const clone = productTemplate.content.cloneNode(true);
        clone.querySelector(".product-title").textContent = product.title;
        clone.querySelector(".product-price").textContent = "Price: $" + product.price;
        clone.querySelector(".product-description").textContent = product.description;
        clone.querySelector(".product-image").src = product.image;
        clone.querySelector(".category-icon").src = extensionIcons[product.category];
        productListing.appendChild(clone);
      })
      return;
    }
    products = sortProducts(products, sort);
    products.map((product) => {
        const clone = productTemplate.content.cloneNode(true);
        clone.querySelector(".product-title").textContent = product.title;
        clone.querySelector(".product-price").textContent = "Price: $" + product.price;
        clone.querySelector(".product-description").textContent = product.description;
        clone.querySelector(".product-image").src = product.image;
        clone.querySelector(".category-icon").src = extensionIcons[product.category];
        productListing.appendChild(clone);
    });
};

populateStorePage();  //initial load of store page

//change filters category
dropdownFilter.addEventListener("change", () => {
    productListing.innerHTML = "";
    populateStorePage(dropdownFilter.value);
});

//sort page
dropdownSorter.addEventListener("change", () => {
    productListing.innerHTML = "";
    populateStorePage(dropdownFilter.value, dropdownSorter.value);
})

//function to handle sorting parameters 
const sortProducts = (products, sort) => {
  switch (sort) {
    case "a-z":
      products = products.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "z-a":
      products = products.sort((a, b) => b.title.localeCompare(a.title));
      break;
    case "price-ascending":
      products = products.sort((a, b) => a.price - b.price);
      break;
    case "price-descending":
      products = products.sort((a, b) => b.price - a.price);
      break;
    default:
      products = products;
      break;
  }
  return products;
}

//search item, display items with name including search parameter
const searchProducts = () => {
  productListing.innerHTML = "";
  const search = searchInput.value.toLowerCase();
  const filteredProducts = storeProducts.filter((product) => product.title.toLowerCase().includes(search));
  filteredProducts.map((product) => {
    const clone = productTemplate.content.cloneNode(true);
    clone.querySelector(".product-title").textContent = product.title;
    clone.querySelector(".product-price").textContent = "Price: $" + product.price;
    clone.querySelector(".product-description").textContent = product.description;
    clone.querySelector(".product-image").src = product.image;
    clone.querySelector(".category-icon").src = extensionIcons[product.category];
    productListing.appendChild(clone);
  });
}