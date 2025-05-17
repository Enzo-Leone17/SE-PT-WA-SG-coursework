//practice with promises

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())   //wait for response, then convert to json
  .then((data) => { // Then => it will return the result of the previous promise
    console.log("✅ User data:", data);
  })
  .catch((err) => console.error("❌ Error:", err));