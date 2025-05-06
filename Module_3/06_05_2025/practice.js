const urls = [
  "https://jsonplaceholder.typicode.com/posts/1",
  "https://jsonplaceholder.typicode.com/users/1",
  "https://jsonplaceholder.typicode.com/comments/1",
];

const fetchAllData = async () => {
  //asynchronous function: waits for response using await
  try {
    const responses = await Promise.all(
      urls.map((url) =>
        fetch(url).then((response) => {
          if (!response.ok) {
            // Check the status is 200
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
      )
    );
    console.log(responses);
    1;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const fetchSongs = async () => {
  try {
    const response = await fetch(
      "https://taylor-swift-api.sarbo.workers.dev/songs"
    );
    if (!response.status === 200) {
      // Check the status is 200
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response.status); // Log the status code
    // The response is a stream, so we need to read it as JSON
    let result = await response.json();
    //console.log(result);
  } catch (error) {
    console.error("Error fetching song:", error);
  }
};

// Call the method to run the code
//fetchAllData();

/*Giving API: https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YYRTmuGHrdxW9AaXsNhXhNhApOa05QAG
Print out the response*/
//Task 1: print out response result

const fetchBookAPI = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.status === 200) {
      // Check the status is 200
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let result = await response.json(); //convert stream to json
    console.log("1: Response result:", result);

    //Task 2: From the current bestseller list, show a list of unique publishers.
    //Step 1: Get the list of books from "results" in json data
    const books = result?.results?.books;

    //Step 2: create a set of unique publishers from each book in the list
    /*From the list of books, get their publisher names as an array, then remove duplicates by passing
      the data to a set("Accepts unique values only"), then convert it back to an array to log*/
    const uniquePublishers = [...new Set(books.map((book) => book.publisher))];
    console.log("\n2: The unique publishers are: ",uniquePublishers);

    //Task 3: Filter books with descriptions containing the word investigations.
    //Step 1: Filter the list of books for books with descriptions containing the word "investigations"
    const specifiedBooks = books.filter((book) =>
      book.description.includes("investigations")
    );
    console.log("\n3: Books with the keyword 'investigations' is: ", specifiedBooks);

    //Task 4: how many books each publisher has on the list
    //step 1: create a map with publisher as key and number of books as value
    const publisherBookCount = new Map();
    //step 2: set unique publishers as key
    uniquePublishers.forEach((publisher) => {
      publisherBookCount.set(publisher, 0);
    });
    //step 3: add book count as value to each unique publisher
    books.forEach((book) => {
      publisherBookCount.set(
        book.publisher,
        publisherBookCount.get(book.publisher) + 1
      );
    });
    console.log("\n4: Amount of books each publisher has: \n");
    for(const [publisher, bookCount] of publisherBookCount){
      console.log(`Publisher ${publisher} has ${bookCount} books.`);
    }

    //Task 5: From the list of books, find and print the book with the longest title.
    //step 1: create a variable to compare title length
    let longestTitle = "";
    let resultBooks = []; //may have more than one book with longest title
    //step 2: find book with longest title by comparing and saving the higher title length
    books.forEach((book) => {
      if (book.title.length > longestTitle.length) {
        longestTitle = book.title;
        resultBooks.push(book);
      }
    });
    console.log("\n5: Book with longest title is: ", resultBooks);

    //Task 6: Find the books whose current rank is higher than rank_last_week (i.e., they have dropped in ranking).
    //step 1: filter the books whose current rank is higher than rank_last_week
    const droppedBooks = books.filter(
      (book) => book.rank > book.rank_last_week
    );
    console.log("\n6: Books that have dropped in rankings are: ", droppedBooks);

    /*Task 7.  Create a grouped list of books based on weeks_on_list.
    {
        "1 week": ["Book A", "Book B"],
        "2–5 weeks": ["Book C"],
        "More than 5 weeks": ["Book D", "Book E"]
    }*/
   //step 1: create a map with weeks_on_list as key and an array of books as value
   const groupedBooks = new Map();
   //step 2: set weeks on list categories as key
   groupedBooks.set("1 week", []);
   groupedBooks.set("2–5 weeks", []);
   groupedBooks.set("More than 5 weeks", []);
   //step 3: add books as value to each weeks on list category
   books.forEach((book) => {
     if (book.weeks_on_list <= 1) { 
       groupedBooks.get("1 week").push(book.title);   //push title as entire book object has too many properties
     } else if (book.weeks_on_list >= 2 && book.weeks_on_list <= 5) {
       groupedBooks.get("2–5 weeks").push(book.title);
     } else {
       groupedBooks.get("More than 5 weeks").push(book.title);
     }
   })
   console.log("\n7: Books grouped by weeks on list are: ", groupedBooks);

    //return result;
  } catch (error) {
    console.error("Error fetching book:", error);
  }
};

fetchBookAPI(
  "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YYRTmuGHrdxW9AaXsNhXhNhApOa05QAG"
);
