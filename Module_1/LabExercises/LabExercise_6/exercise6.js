const storyBooks = {
  //sample fake data with AI generated content
  bookDetails: [
    {
      title: "The Mysterious Island",
      description:
        "A thrilling adventure novel about a group of castaways who discover a mysterious island filled with wonders and dangers.",
      author: "Jules Verne",
      pages: 352,
    },
    {
      title: "The Great Gatsby",
      description:
        "A classic novel that explores themes of wealth, love, and the American Dream in the 1920s.",
      author: "F. Scott Fitzgerald",
      pages: 180,
    },
    {
      title: "The Story of My Teenage Life",
      description:
        "Dive into the mysteries and complex relationships of a group of friends as they navigate the challenges of adulthood.",
      author: "John Doe",
      pages: 250,
    },
    {
      title: "The Art of War",
      description:
        "An ancient Chinese military treatise attributed to Sun Tzu, offering insights into strategy and tactics.",
      author: "Sun Tzu",
      pages: 200,
    },
    {
      title: "Pride and Prejudice",
      description:
        "A romantic novel that critiques the British landed gentry at the end of the 18th century.",
      author: "Jane Austen",
      pages: 432,
    },
  ],
};

function getBookDetails(specificDetail = "") {
  let bookDetails;
  // Check if bookDetails is available in localStorage
  storyBooks.bookDetails
    ? (bookDetails = storyBooks.bookDetails)
    : (bookDetails = []);

  let result = [];
  for (let i = 0; i < bookDetails.length; i++) {
    if (specificDetail != "" && bookDetails[i].hasOwnProperty(specificDetail)) {
      result.push(bookDetails[i][specificDetail]);
    } else if (
      specificDetail != "" &&
      !bookDetails[i].hasOwnProperty(specificDetail)
    ) {
      result = `The property "${specificDetail}" does not exist in the book details.`;
      break;
    } else {
      result.push(bookDetails[i]);
    }
  }
  return result;
}

function editBookProperty(bookTitle, property, newValue) {
    let bookDetails;
  // Check if bookDetails is available in localStorage
  storyBooks.bookDetails
    ? (bookDetails = storyBooks.bookDetails)
    : (bookDetails = []);
  for (let i = 0; i < bookDetails.length; i++) {
    if (bookDetails[i]?.title === bookTitle) {
      if (bookDetails[i].hasOwnProperty(property)) {
        bookDetails[i][property] = newValue;
        let updatedBookDetails = "";
        for(let j = 0; j < Object.keys(bookDetails[i]).length; j++) {
          updatedBookDetails += "\n " + bookDetails[i][Object.keys(bookDetails[i])[j]];
        }
        return `The property "${property}" of the book "${bookTitle}" has been updated to "${newValue}".` + updatedBookDetails;
      } else {
        return `The property "${property}" does not exist in the book "${bookTitle}".`;
      }
    }
  }
  return `The book "${bookTitle}" does not exist.`;
}

console.log(getBookDetails("pokemon"));
console.log(getBookDetails("title"));
console.log(getBookDetails());

console.log(editBookProperty("The Great Gatsby", "author", "Leone"));
console.log(editBookProperty("The Great Gatsby", "publishedYear", 1925));
