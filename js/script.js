// ===== Floating cart scroll movement =====
const floatingCart = document.querySelector('.floating-cart');
window.addEventListener('scroll', () => {
    const offset = Math.min(window.scrollY / 2, 200); // max offset
    floatingCart.style.top = `${100 + offset}px`;
});

// ===== Cart logic =====
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

let total = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const product = e.currentTarget.closest('.product');
        const name = button.dataset.name;
        const price = Number(button.dataset.price);

        // ----- 1️⃣ Flying product animation -----
        const img = product.querySelector('img').cloneNode(true);
        img.classList.add('flying-img');
        document.body.appendChild(img);

        const rect = product.querySelector('img').getBoundingClientRect();
        img.style.top = `${rect.top}px`;
        img.style.left = `${rect.left}px`;

        const cartRect = floatingCart.getBoundingClientRect();

        requestAnimationFrame(() => {
            img.style.top = `${cartRect.top + 20}px`;
            img.style.left = `${cartRect.left + 20}px`;
            img.style.width = '40px';
            img.style.height = '40px';
            img.style.opacity = 0;
        });

        img.addEventListener('transitionend', () => img.remove());

        // ----- 2️⃣ Add item to cart list -----
        const li = document.createElement('li');
        li.textContent = `${name} - $${price.toFixed(2)}`;

        // Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            total -= price;
            updateTotal();
            li.remove();
        });
        li.appendChild(removeBtn);

        cartItems.appendChild(li);

        // ----- 3️⃣ Update total -----
        total += price;
        updateTotal();
    });
});

// ===== Function to update total =====
function updateTotal() {
    cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

