function showGreetingMessage(){
    let clientUsername = document.getElementById("username").value;
    document.getElementById("welcomeText").innerHTML = "Hello " + clientUsername + ", nice to meet you!";
}