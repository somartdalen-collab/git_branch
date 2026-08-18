// ================= CART =================

const cartBtn = document.getElementById("cartBtn");
const closeCart = document.getElementById("closeCart");
const cartPanel = document.getElementById("cartPanel");
const overlay = document.getElementById("overlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = [];


// ================= OPEN CART =================

cartBtn.addEventListener("click", () => {

    cartPanel.classList.add("active");
    overlay.classList.add("active");

});


// ================= CLOSE CART =================

closeCart.addEventListener("click", closeCartPanel);

overlay.addEventListener("click", closeCartPanel);


function closeCartPanel() {

    cartPanel.classList.remove("active");
    overlay.classList.remove("active");

}


// ================= ADD PRODUCT =================

const addButtons = document.querySelectorAll(".add-cart");


addButtons.forEach(button => {

    button.addEventListener("click", () => {

        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        addToCart(name, price);

    });

});


// ================= SPECIAL PRODUCT =================

const specialCart = document.getElementById("specialCart");


if (specialCart) {

    specialCart.addEventListener("click", () => {

        const name = specialCart.dataset.name;
        const price = Number(specialCart.dataset.price);

        addToCart(name, price);

    });

}


// ================= ADD TO CART FUNCTION =================

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }


    updateCart();


    cartPanel.classList.add("active");
    overlay.classList.add("active");

}


// ================= UPDATE CART =================

function updateCart() {

    cartItems.innerHTML = "";


    // EMPTY CART

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

    }


    // CART PRODUCTS

    cart.forEach((item, index) => {

        const cartItem = document.createElement("div");

        cartItem.classList.add("cart-item");


        const itemTotal =
            item.price * item.quantity;


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <h4>${item.name}</h4>

                <p>
                    $${item.price.toFixed(2)}
                    x
                    ${item.quantity}
                </p>

                <p>
                    Total:
                    $${itemTotal.toFixed(2)}
                </p>

            </div>


            <button
                class="remove-item"
                onclick="removeFromCart(${index})"
            >

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    // ================= TOTAL =================

    let total = 0;
    let count = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;

    });


    cartCount.textContent = count;

    cartTotal.textContent =
        `$${total.toFixed(2)}`;

}


// ================= REMOVE =================

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();

}


// ================= SEARCH =================

const searchBtn =
    document.getElementById("searchBtn");

const searchBox =
    document.getElementById("searchBox");

const searchInput =
    document.getElementById("searchInput");


// OPEN SEARCH

if (searchBtn && searchBox && searchInput) {

    searchBtn.addEventListener("click", () => {

        searchBox.classList.toggle("active");


        if (
            searchBox.classList.contains("active")
        ) {

            searchInput.focus();

        }

    });


    // SEARCH PRODUCT

    searchInput.addEventListener("input", () => {

        const keyword =
            searchInput.value.toLowerCase().trim();


        const products =
            document.querySelectorAll(".product-card");


        products.forEach(product => {

            const name =
                product.dataset.name
                    ? product.dataset.name.toLowerCase()
                    : "";


            if (name.includes(keyword)) {

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

}


// ================= INITIAL CART =================

updateCart();