let products = {
    data: [{
            productName: "Sticky Baked Chicken Wings",
            category: "appetizer",
            price: "3.33",
            image: "/foodImg/Appetizer/Sticky Baked Chicken Wings.png"
        },
        {
            productName: "Caesar Salad Spears",
            category: "appetizer",
            price: "2.70",
            image: "/foodImg/Appetizer/Caesar Salad Spears.png"
        },
        {
            productName: "Pickled Shrimp with Creamy Spinach Dip",
            category: "appetizer",
            price: "4.00",
            image: "/foodImg/Appetizer/Pickled Shrimp with Creamy Spinach Dip.png"
        },
        {
            productName: "Pigs in a Blanket with Black Pepper Pastry",
            category: "appetizer",
            price: "4.50",
            image: "/foodImg/Appetizer/Pigs in a Blanket with Black Pepper Pastry.png"
        },
        {
            productName: "LAMB BOLOGNESE WITH FETA & MINT",
            category: "Main Dish",
            price: "8.99",
            image: "/foodImg/Main dish/LAMB BOLOGNESE WITH FETA & MINT.png"
        },
        {
            productName: "ROASTED PORTOBELLO TOPPED WITH SPICY SHRIMP BRUSCHETTA (PALEO/WHOLE30)",
            category: "Main Dish",
            price: "11.99",
            image: "/foodImg/Main dish/ROASTED PORTOBELLO TOPPED WITH SPICY SHRIMP BRUSCHETTA.png"
        },
        {
            productName: "GRILLED CHICKEN WITH FRESH CHERRY SALSA",
            category: "Main Dish",
            price: "9.00",
            image: "/foodImg/Main dish/GRILLED CHICKEN WITH FRESH CHERRY SALSA.png"
        },
        {
            productName: "Braised Chicken Legs With Grapes and Fennel",
            category: "Main Dish",
            price: "7.60",
            image: "/foodImg/Main dish/Braised Chicken Legs With Grapes and Fennel.png"
        },
        {
            productName: "Seared Scallops With Brown Butter and Lemon Pan Sauce",
            category: "Main Dish",
            price: "10.00",
            image: "/foodImg/Main dish/Seared Scallops With Brown Butter and Lemon Pan Sauce.png"
        },
        {
            productName: "Mille crepe",
            category: "dessert",
            price: "3.00",
            image: "/foodImg/Dessert/Mille crepe.png"
        },
        {
            productName: "Cashew nut brownie",
            category: "dessert",
            price: "2.50",
            image: "/foodImg/Dessert/Cashew nut brownie.png"
        },
        {
            productName: "Tiramisu",
            category: "dessert",
            price: "4.00",
            image: "/foodImg/Dessert/Tiramisu.png"
        },
        {
            productName: "Orange Juice",
            category: "Beverage",
            price: "2.00",
            image: "/foodImg/Beverage/Orange Juice.png"
        },
        {
            productName: "Watermelon Smoothie",
            category: "Beverage",
            price: "2.00",
            image: "/foodImg/Beverage/Watermelon Smoothie.png"
        },
        {
            productName: "Red Lime Soda",
            category: "Beverage",
            price: "2.00",
            image: "/foodImg/Beverage/Red Lime Soda.png"
        }
    ]
}
for (let i of products.data) {
    let card = document.createElement("div");
    card.classList.add("card", "i.category");
    let imgContainer = document.createElement("div")
    imgContainer.classList.add("image-container");
    let imge = document.createElement("img");
    image.setAttribute("src", i.image);
    imgContainer.appendChild(image);
    car.appendChild(imgContainer);

    document.getElementById("products")
}
document.getElementById("search").addEventListener("click", () => {
    let searchInput = document.getElementById("search-input").value;
    let elements = document.querySelectorAll("product-name");
    let cards = document.querySelectorAll(".card");

    elements.forEach((element, index) => {
        if (element.innerText.includes(searchInput.toUpperCase())) {
            cards[index].classList.remove("hide");
        } else {
            cards[index].classList.add("hide");
        }
    })
})