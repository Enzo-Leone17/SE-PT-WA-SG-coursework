//express
const express = require("express");
const app = express();
const app2 = express();
const port1 = 8000;
const port2 = 8080;


//#region app1
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/welcome", (req, res) => {
    res.send("Welcome to the world!");
})

app.listen(port1, () => {
    console.log(`Server running on port ${port1}`);
});
//#endregion


//#region app2
app2.get("/", (req, res) => {
    res.send("Hello Sir/Madam!");
})

app2.get("/welcome", (req, res) => {
    res.send("Welcome to my world!");
})

app2.listen(port2, () => {
    console.log(`Server running on port ${port2}`);
});
//#endregion