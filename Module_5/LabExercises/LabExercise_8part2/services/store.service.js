//products and cache
const { Product, ProductsCache } = require("../models/product.js");
let storeProducts = new ProductsCache();

const fetchProductsAPIAndStoreCache = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    data.map((product) =>
      storeProducts.add(
        new Product(
          product.id,
          product.title,
          product.price,
          product.description,
          product.image,
          product.category
        )
      )
    );
    // console.log(storeProducts.products);
    return storeProducts.products;
  } catch (error) {
    console.log(error);
  }
};

const populateStorePage = async (req, res) => {
  let filter = req.query.filter !== undefined ? req.query.filter : "all";
  let sort = req.query.sort !== undefined ? req.query.sort : "none";
  let products = storeProducts.products;
  try {
    if (storeProducts.products.length === 0) {
      products = await fetchProductsAPIAndStoreCache();
    }

    if (filter !== "all") {
      let filteredProducts = products.filter(
        (product) => product.category === filter
      );
      filteredProducts = sortProducts(filteredProducts, sort);
      return filteredProducts;
    }
    products = sortProducts(products, sort);
    return products;
  } catch (error) {
    return "Error: " + error;
  }
};

//sort page
const filterAndSortProducts = async (req, res) => {
  try {
    const response = await populateStorePage(req, res);
    return response;
  } catch (error) {
    return res.status(500).send("Error: " + error);
  }
};

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
};

//search item, display items with name including search parameter
const searchProducts = async (req, res) => {
  const search = req.query.search.toLowerCase();
  if (!search || search === "") return res.status(400).send("Error: No search parameter");
  try {
    const filteredProducts = storeProducts.products.filter((product) =>
      product.title.toLowerCase().includes(search)
    );
    if(!filteredProducts) return res.status(404).send("Error: Product not found");
    let result = [];
    for (let products of filteredProducts) {
      result.push(products);
    }
    return result;
  } catch (error) {
    return res.status(500).send("Error: " + error);
  }
};

module.exports = {
  populateStorePage,
  filterAndSortProducts,
  searchProducts,
};
