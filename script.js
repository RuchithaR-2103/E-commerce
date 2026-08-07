var cart = [];

var saved = localStorage.getItem("cart");
if (saved != null && saved != "") {
    cart = eval(saved);
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price, button) {

    var found = false;

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            cart[i].qty++;
            found = true;
            break;
        }
    }

    if (!found) {
        cart.push({
            name: name,
            price: price,
            qty: 1
        });
    }

    saveCart();

    if (button) {
        var oldText = button.innerHTML;
        button.innerHTML = "Added ✓";

        setTimeout(function () {
            button.innerHTML = oldText;
        }, 600);
    }
}

function displayCart() {

    var container = document.getElementById("cartItems");
    var totalAmount = 0;

    if (!container) return;

    container.innerHTML = "";

    for (var i = 0; i < cart.length; i++) {

        totalAmount += cart[i].price * cart[i].qty;

        container.innerHTML += `
            <div class="cart-item">
                <div>
                    <h3>${cart[i].name}</h3>
                    <p>₹${cart[i].price} × ${cart[i].qty}</p>
                </div>

                <div class="cart-buttons">
                    <button class="plus" onclick="changeQty(${i}, 1)">+</button>
                    <button class="minus" onclick="changeQty(${i}, -1)">-</button>
                    <button class="remove" onclick="removeItem(${i})">Remove</button>
                </div>
            </div>
        `;
    }

    var totalBox = document.getElementById("totalAmount");
    if (totalBox) {
        totalBox.innerText = "Total Amount: ₹" + totalAmount;
    }
}

function changeQty(index, value) {

    cart[index].qty += value;

    if (cart[index].qty <= 0) {
        cart.splice(index, 1);
    }

    saveCart();
    displayCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

function searchBooks() {

    var input = document.getElementById("searchBox");
    if (!input) return;

    var filter = input.value.toLowerCase();
    var books = document.getElementsByClassName("book-item");

    for (var i = 0; i < books.length; i++) {

        var title = books[i].getElementsByTagName("h3")[0].innerText.toLowerCase();

        if (title.includes(filter)) {
            books[i].style.display = "block";
        } else {
            books[i].style.display = "none";
        }
    }
}

function placeOrder() {

    if (cart.length === 0) {
        return;
    }

    cart = [];
    localStorage.setItem("cart", "");

    var container = document.getElementById("cartItems");
    var totalBox = document.getElementById("totalAmount");
    var msg = document.getElementById("orderMessage");
    var btn = document.querySelector(".checkout-btn");

    if (container) container.innerHTML = "";
    if (totalBox) totalBox.innerText = "";

    if (msg) {
    msg.style.display = "block";
    msg.innerHTML = "🎉 Order Placed Successfully! Thank you for shopping 📚";
}

    if (btn) btn.style.display = "none";
}