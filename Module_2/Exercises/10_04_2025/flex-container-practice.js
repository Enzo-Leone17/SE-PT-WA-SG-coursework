const products = [
    {
      name: "Nike Running Shoes",
      price: "$99.99",
      description:
        "Comfortable and stylish running shoes suitable for everyday use.",
      image: "https://via.placeholder.com/400x300",
    },
    {
      name: "Adidas Hoodie",
      price: "$59.99",
      description: "Warm, soft and perfect for cool weather.",
      image: "https://via.placeholder.com/400x300",
    },
    {
      name: "Puma Backpack",
      price: "$39.99",
      description: "Lightweight and durable backpack for daily use.",
      image: "https://via.placeholder.com/400x300",
    },
    {
      name: "Reebok Fitness Tracker",
      price: "$79.99",
      description: "Track your fitness goals with this advanced tracker.",
      image: "https://via.placeholder.com/400x300",
    },
    {
      name: "Under Armour Sports Watch",
      price: "$129.99",
      description: "Stylish watch with multiple sports modes.",
      image: "https://via.placeholder.com/400x300",
    },
    {
      name: "New Balance Sneakers",
      price: "$89.99",
      description:
        "Perfect blend of comfort and style for your daily runs.",
      image: "https://via.placeholder.com/400x300",
    },
  ];

  const productList = document.getElementById("product-list");
  const template = document.getElementById("product-card-template");

  products.forEach((product) => {
    const newCard = template.cloneNode(true);
    newCard.classList.remove("d-none");
    newCard.removeAttribute("id");

    newCard.querySelector("img").src = product.image;
    newCard.querySelector("img").alt = product.name;
    newCard.querySelector(".card-title").innerText = product.name;
    newCard.querySelector(".price").innerText = product.price;
    newCard.querySelector(".description").innerText = product.description;

    productList.appendChild(newCard);
  });