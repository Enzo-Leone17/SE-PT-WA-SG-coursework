const express = require("express");
const app = express();
const port = 8000;
const path = require('path');
const { fileURLToPath } = require('url');





//import route
const calculatorRouter = require('./routes/calculatorRoutes.js');

//serve static files
app.use('/', express.static('public'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/calculator.html');
})

//define routes
app.use('/calculator', calculatorRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});