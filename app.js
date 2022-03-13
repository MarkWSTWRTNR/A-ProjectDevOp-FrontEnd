const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb://localhost:27017/login-app-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs');

app.use(bodyParser.json())

app.post('/api/register', async (req,res) =>{
    // get password
    // const { username, password: plainTextPassword} = req.body
    const { username, password: plainTextPassword } = req.body

    if(!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username' })
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
		return res.json({ status: 'error', error: 'Invalid password' })
	}

    if (plainTextPassword.length < 5) {
		return res.json({
			status: 'error',
			error: 'Password too small. Should be atleast 6 characters'
		})
	}
    
    // encrypt password
    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await User.create({
            username,
            password
        })
        console.log('User created successfully: ', response)
    } catch (error) {
        if (error.code === 11000){
            // duplicate key
            return res.json({ status: 'error', error: 'Username already in use'})
        }
        throw error
    }
    
    // console.log(await bcrypt.hash(password, 10))
    res.json({ status: 'ok' })
})

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