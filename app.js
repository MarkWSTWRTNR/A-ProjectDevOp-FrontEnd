const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.get("/", function(req, res) {
    res.render('index');
})



app.get("/indexCustomer.ejs", function(req, res) {
    res.render('indexCustomer');
})
app.get("/indexKitchen.ejs", function(req, res) {
    res.render('indexKitchen');
})
app.get("/register.ejs", function(req, res) {
    res.render('register');
})
app.listen("3000", () => {
    console.log("Server is running on Port 3000.");
});