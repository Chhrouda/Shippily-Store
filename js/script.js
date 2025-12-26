document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".add-to-cart");
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartBox = document.querySelector(".cart");

    if (!cartItems || !cartTotal || !cartBox) {
        if (buttons.length) {
            buttons.forEach(button => {
                button.addEventListener("click", () => {
                    const original = button.textContent;
                    button.textContent = "Added";
                    setTimeout(() => button.textContent = original, 700);
                });
            });
        }
        return;
    }

    let cart = [];
    let total = 0;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = Number(button.dataset.price) || 0;

            cart.push({ name, price });
            total += price;

            renderCart();
            pulseCart();
        });
    });

    function renderCart() {
        cartItems.innerHTML = "";
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <span data-index="${index}" style="cursor:pointer;color:#f87171;">✕</span>`;
            cartItems.appendChild(li);
        });
        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
        addRemoveEvents();
    }

    function addRemoveEvents() {
        const removeButtons = cartItems.querySelectorAll("span");
        removeButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const index = Number(btn.dataset.index);
                if (Number.isFinite(index) && cart[index]) {
                    total -= cart[index].price;
                    cart.splice(index, 1);
                    renderCart();
                }
            });
        });
    }

    function pulseCart() {
        if (!cartBox) return;
        cartBox.classList.add("pulse");
        setTimeout(() => cartBox.classList.remove("pulse"), 400);
    }
});



