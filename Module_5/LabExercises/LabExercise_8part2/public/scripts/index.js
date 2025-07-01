//DOM references
const productListing = document.getElementById("product-list");
const productTemplate = document.getElementById("product-template");
const dropdownFilter = document.getElementById("dropdown-filter");
const dropdownSorter = document.getElementById("dropdown-sorter");
const searchInput = document.getElementById("search");

//Extension icons urls by category
const extensionIcons = {
  "men's clothing":
    "https://img.icons8.com/?size=100&id=16596&format=png&color=000000",
  jewelery:
    "https://img.icons8.com/?size=100&id=dwIsy84qku9q&format=png&color=000000",
  electronics:
    "https://img.icons8.com/?size=100&id=12923&format=png&color=000000",
  "women's clothing":
    "https://img.icons8.com/?size=100&id=WR2WB7xFk5yT&format=png&color=000000",
};

//variable
hasloaded = false;

const initialLoad = async () => {
  try {
    console.log("initial load");
    const response = await fetch("http://localhost:8000/storeAPI/allProducts");
    const data = await response.json().then((products) => {
      products.map((product) => {
        const clone = productTemplate.content.cloneNode(true);
        clone.querySelector(".product-title").textContent = product.title;
        clone.querySelector(".product-price").textContent =
          "Price: $" + product.price;
        clone.querySelector(".product-description").textContent =
          product.description;
        clone.querySelector(".product-image").src = product.image;
        clone.querySelector(".category-icon").src =
          extensionIcons[product.category];
        productListing.appendChild(clone);
      });
    });
  } catch (error) {
    console.log(error);
  }
};

if (!hasloaded) {
  initialLoad();
  hasloaded = true;
}

const populateStorePage = async (filter = "all", sort = "none") => {
  productListing.innerHTML = "";
  try {
    const result = await fetch(
      "http://localhost:8000/storeAPI/filter?filter=" + filter + "&sort=" + sort
    );
    const data = await result.json().then((products) => {
      products.map((product) => {
        const clone = productTemplate.content.cloneNode(true);
        clone.querySelector(".product-title").textContent = product.title;
        clone.querySelector(".product-price").textContent =
          "Price: $" + product.price;
        clone.querySelector(".product-description").textContent =
          product.description;
        clone.querySelector(".product-image").src = product.image;
        clone.querySelector(".category-icon").src =
          extensionIcons[product.category];
        productListing.appendChild(clone);
      });
    });
  } catch (error) {
    productListing.innerHTML = "error, failed to get products";
    console.log(error);
  }
};

//change filters category
dropdownFilter.addEventListener("change", () => {
  productListing.innerHTML = "";
  populateStorePage(dropdownFilter.value);
});

//sort page
dropdownSorter.addEventListener("change", () => {
  productListing.innerHTML = "";
  populateStorePage(dropdownFilter.value, dropdownSorter.value);
});

//search item, display items with name including search parameter
const searchProducts = async () => {
  productListing.innerHTML = "";
  try {
    if (searchInput.value === "") throw new Error("No search parameter");
    console.log(searchInput.value);
    const result = await fetch(
      "http://localhost:8000/storeAPI/search?search=" + searchInput.value
    );
    await result.json().then((filteredProducts) => {
      filteredProducts.map((product) => {
        const clone = productTemplate.content.cloneNode(true);
        clone.querySelector(".product-title").textContent = product.title;
        clone.querySelector(".product-price").textContent =
          "Price: $" + product.price;
        clone.querySelector(".product-description").textContent =
          product.description;
        clone.querySelector(".product-image").src = product.image;
        clone.querySelector(".category-icon").src =
          extensionIcons[product.category];
        productListing.appendChild(clone);
      });
    });
  } catch (error) {
    productListing.innerHTML = "error, failed to find product/s\n" + error;
    console.log(error);
  }
};
