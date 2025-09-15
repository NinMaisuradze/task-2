const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsList = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total-price');
const cartItemCountElement = document.getElementById('cart-item-count');

let cart = [];

function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    let totalPrice = 0;
    let itemCount = 0;

    cart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-from-cart" data-index="${index}">X</button>
        `;
        cartItemsList.appendChild(listItem);
        totalPrice += item.price * item.quantity;
        itemCount += item.quantity;
    });

    cartTotalElement.textContent = `$${totalPrice.toFixed(2)}`;
    cartItemCountElement.textContent = itemCount;

    attachRemoveEventListeners();
}

function addToCart(name, price) {
    if (isNaN(price)) {
        console.error(`Invalid price for item "${name}":`, price);
        return;
    }

    const existingItem = cart.find(item => item.name === name);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }

    updateCartDisplay();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

function attachRemoveEventListeners() {
    const removeButtons = document.querySelectorAll('.remove-from-cart');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const indexToRemove = parseInt(this.dataset.index);
            removeFromCart(indexToRemove);
        });
    });
}

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        const itemName = this.dataset.name;
        const itemPrice = parseFloat(this.dataset.price);

        console.log(`Adding item: ${itemName}, Price: ${this.dataset.price}, Parsed Price: ${itemPrice}`);

        if (isNaN(itemPrice)) {
            console.error(`Invalid price detected: "${this.dataset.price}"`);
            return;
        }

        addToCart(itemName, itemPrice);
    });
});
