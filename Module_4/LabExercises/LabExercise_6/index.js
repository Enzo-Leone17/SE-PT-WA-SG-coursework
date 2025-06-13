//DOM references
const postList = document.getElementById("post-list");
const postTemplate = document.getElementById("post-card-template");

//variables

//API link
const jsonAPI = "https://jsonplaceholder.typicode.com/posts";


//fetch from api with limit set (default 10)
const fetchPosts = async (limit = 10) => {
  try {
    const response = await fetch(jsonAPI + `?_limit=${limit}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};


//fill div with posts from api (limit default 10)
const fillDisplay = async (limit = 10) => {
  postList.innerHTML = "";
  try {
    const posts = await fetchPosts(limit);
    posts.forEach((post) => {
      const clone = postTemplate.content.cloneNode(true);
      clone.querySelector(".card-title").textContent = post.title;
      clone.querySelector(".content").textContent = post.body;
      postList.appendChild(clone);
    });
  } catch (error) {
    console.error(error);
  }
};

//Extension: User is able to set limit and update display
const updateDisplay = () => {
  let limit = document.getElementById("post-limiter").value;
  parseInt(limit) ? (limit = parseInt(limit)) : (limit = 10);
  fillDisplay(limit);
};

fillDisplay();
