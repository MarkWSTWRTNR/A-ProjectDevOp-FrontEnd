const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require('mongoose')
const User = require('./model/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'asdjawejsgserg04u2mxpvqejd#@dfsdhpsdfkwasd'

mongoose.connect('mongodb://localhost:27017/login-app-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.set('view engine', 'ejs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.post('/api/login', async(req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).lean()

    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username/password' })
    }

    if (await bcrypt.compare(password, user.password)) {
        // the username, password combination is successful

        const token = jwt.sign({
                id: user._id,
                username: user.username
            },
            JWT_SECRET
        )

        return res.json({ status: 'ok', data: token })
    }

    res.json({ status: 'error', error: 'Invalid username/password' })
})

app.post('/api/register', async(req, res) => {
    // get password
    // const { username, password: plainTextPassword} = req.body
    const { username, password: plainTextPassword } = req.body

    if (!username || typeof username !== 'string') {
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
        if (error.code === 11000) {
            // duplicate key
            return res.json({ status: 'error', error: 'Username already in use' })
        }
        throw error
    }

    // console.log(await bcrypt.hash(password, 10))
    res.json({ status: 'ok' })
})


app.get("/", function(req, res) {
    res.render('index');

})



app.get("/indexCustomer.ejs", function(req, res) {
    res.render('indexCustomer');
})
app.get("/indexKitchen.ejs", function(req, res) {
    res.render('indexKitchen');
})
app.post('/api/order.ejs', async(req, res) => {

})


app.get("/register.ejs", function(req, res) {
    res.render('register');
})

app.get("/menu.ejs", function(req, res) {
    res.render('menu')
})
app.get("/order.ejs", function(req, res) {
    res.render('order')
})



// remove cart item buttons
// var removeCartItemButtons = document.getElementsByClassName('btn-danger')
// console.log(removeCartItemButtons)
// for (var i = 0; i < removeCartItemButtons.length; i++) {
//     var button = removeCartItemButtons[i]
//     button.addEventListener('click', function(event) {
//         var buttonClicked = event.target
//         buttonClicked.parentElement.parentElement.remove()
//         updateCartTotal()
//     })
// }

// function updateCartTotal() {
//     var cartItemContainer = document.getElementsByClassName('cart-items')[0]
//     var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//     for (var i = 0; i < cartRows.length; i++) {
//         var cartRow = cartRows[i]
//         var priceElement = cartRow.getElementsByClassName('cart-price')[0]
//         var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//         var price = parseFloat(priceElement.innerText.replace('$', ''))
//         var quantity = quantityElement.value
//         console.log(price * quantity)
//     }
// }



app.listen("3000", () => {
    console.log("Server is running on Port 3000.");
});