function show_greetings() {
  let clientUsername = document.getElementById("username").value;
  if (clientUsername !== "") {
    document.getElementById("greetings").innerHTML =
      "Hello " + clientUsername + ", nice to meet you!";
  } else {
    document.getElementById("greetings").innerHTML = "";
    alert("Please enter a valid name!");
  }
}
