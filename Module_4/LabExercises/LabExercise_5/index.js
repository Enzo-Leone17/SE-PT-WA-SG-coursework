let news = [
  { id: 1, title: "Election Results", content: "Newly elected minister..." },
  { id: 2, title: "Sporting Success", content: "World Cup winners..." },
  { id: 3, title: "Tornado Warning", content: "Residents should prepare..." },
];

//DOM references
const newsList = document.getElementById("news-list");
const newsTemplate = document.getElementById("news-template");
const newsEditList = document.getElementById("news-edit-list");
const newsEditTemplate = document.getElementById("news-edit-template");

//variables
let updatedNewsId = news.length;

//display news
const displayNews = () => {
  newsList.innerHTML = "";
  news.forEach((item) => {
    const template = newsTemplate.content.cloneNode(true);
    template.querySelector(".news-title").innerText = item.title;
    template.querySelector(".news-content").innerText = item.content;
    newsList.appendChild(template);
  });
};

//edit news
const editNews = () => {;
  newsEditList.innerHTML = "";
  updatedNewsId = news.length;
  news.forEach((item) => {
    const template = newsEditTemplate.content.cloneNode(true);
    template.querySelector(".news-title").innerText =
      item.id + ": " + item.title;
    template.querySelector(".news-title").htmlFor = "message" + item.id;
    template.querySelector(
      ".news-content"
    ).value = `title:${item.title}\ncontent:${item.content}`;
    template.querySelector(".news-content").id = "message" + item.id;
    newsEditList.appendChild(template);
  });
};

//create element for user to edit values for a new "news"
const createNews = () => {
  updatedNewsId += 1;
  const template = newsEditTemplate.content.cloneNode(true);
  template.querySelector(".news-title").innerText = `${updatedNewsId}: Title`;
  template.querySelector(".news-title").htmlFor = "message" + updatedNewsId;
  template.querySelector(".news-content").innerText = "";
  template.querySelector(".news-content").id = "message" + updatedNewsId;
  newsEditList.appendChild(template);
};


//validates all values to check for edits, if successful (format correct: title:Sample...\ncontent:Sample...)
//confirm and update news list
const confirmEdit = () => {
  news.forEach((item) => {
    let title = document
      .getElementById("message" + item.id)
      ?.value.split("\n")[0]
      ?.split("title:")[1];
    let content = document
      .getElementById("message" + item.id)
      ?.value.split("\n")[1]
      ?.split("content:")[1];
    if (title !== undefined && content !== undefined) {
      item.title = title;
      item.content = content;
    }
  });
  if (updatedNewsId > news.length) {
    let successID = news.length;
    for (let i = news.length; i <= updatedNewsId; i++) {
      let title = document
        .getElementById("message" + (i + 1))
        ?.value.split("\n")[0]
        ?.split("title:")[1];
      let content = document
        .getElementById("message" + (i + 1))
        ?.value.split("\n")[1]
        ?.split("content:")[1];
      if (title !== undefined && content !== undefined) {
        successID += 1;
        news.push({ id: successID, title: title, content: content });
      }
    }
  }
  updatedNewsId = news.length;
};



//Display news, refresh every 5s
displayNews();
let refreshNews = setInterval(() => {
  displayNews();
}, 5000);

//toggle the auto refresher
const toggleNewsRefresh = () => {
  if (refreshNews !== '') {
    clearInterval(refreshNews);
    refreshNews = '';
  } else {
    refreshNews = setInterval(() => {
      displayNews();
    }, 5000);
  }
};