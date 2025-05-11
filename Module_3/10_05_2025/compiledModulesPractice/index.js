/*Build a dynamic dashboard that displays the New York Times Hardcover Fiction bestsellers, 
updating every 10 seconds. The app should fetch data from an external API
1. Fetch data from API (NYT Books API) - 
https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YYRTmuGHrdxW9AaXsNhXhNhApOa05QAG
Fetch data using fetch() and async/await
Handle failures gracefully using try/catch
2. Data Processing
select only books that have been on the list for more than 3 weeks
sort the books by rank in ascending order
  3. Create a base class BookItem with common properties and methods
Create a base class BookItem with common properties and methods
Create a subclass LongTermBook that extends BookItem and overrides methods as needed
  4.  Use setInterval() to fetch and re-render book data every 10 seconds. Use setTimeout() or clearInterval() if additional control is needed (e.g. auto-stop)
  5.  Rendering
Use an HTML <template> element to define the layout of each book
Use getElementById and cloneNode() to inject data into the DOM
Highlight books that have been on the list for more than 10 weeks using CSS*/


//import
import { BookItem } from "./Models/bookItem.js";
import { LongTermBook } from "./Models/longTermBook.js";


//fetch data from API
async function fetchBookAPI(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return processBookData(data);
    } catch (error) {
        console.error("error fetching data", error);
    }
}

//data processing 
const processBookData = (data) => {
    const books = data.results.books;
    //filter books that have been on the list for more than 3 weeks
    const longTermBooks = books.filter(book => book.weeks_on_list > 3);
    //sort the books by rank in ascending order
    const sortedBooks = longTermBooks.sort((a, b) => a.rank - b.rank);
    return sortedBooks;
}

