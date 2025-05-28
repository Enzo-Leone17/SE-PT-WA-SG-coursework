/*10.Fetch is a browser-based function to send a request and receive a response from a server,
which uses promises to handle the asynchronous response.
The below fetchURLData uses fetch to check the response for a successful status
code, and returns a promise containing the JSON sent by the remote server if successful
or an error if it failed. (To run this code in a node.js environment, follow the instructions in the
comments before the function.)
a) Write a new version of this function using async/await
b) Test both functions with valid and invalid URLs
c) (Extension) Extend your new function to accept an array of URLs and fetch all of them,
using Promise.all to combine the results.*/
// run 'npm init' and accept all the defaults
// run 'npm install node-fetch'
// run 'npm pkg set type=module'
import { error } from "console";
import fetch from "node-fetch";
globalThis.fetch = fetch;
function fetchURLData(url) {
  let fetchPromise = fetch(url).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      throw new Error(`Request failed with status ${response.status}`);
    }
  });
  return fetchPromise;
}

/*
//valid
fetchURLData('https://jsonplaceholder.typicode.com/todos/1')
.then(data => console.log(data))
.catch(error => console.error(error.message));

//invalid
fetchURLData('https://jsonplaceholder.typicode.com/todos/abc')
.then(data => console.log(data))
.catch(error => console.error(error.message));
*/

//async await

const asyncFetchUrlData = async (...url) => {
  try {
    let res = await Promise.all(url.map((url) => fetch(url)));
    let result = await Promise.all(
      res.map((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error(`Request failed with status ${res.status}`);
        }
      })
    );
    return result;
  } catch (error) {
    return error.message;
  }
};

//valid
asyncFetchUrlData(
  "https://jsonplaceholder.typicode.com/todos/1",
  "https://jsonplaceholder.typicode.com/todos/2",
  "https://jsonplaceholder.typicode.com/todos/3"
).then((data) => console.log(data));

//invalid
asyncFetchUrlData("https://jsonplaceholder.typicode.com/todos/abc")
  .then((data) => console.log(data))
  .catch((error) => console.error(error.message));
