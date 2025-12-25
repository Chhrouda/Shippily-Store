// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", () => {

    const heightInput = document.getElementById("height");
    const weightInput = document.getElementById("weight");
    const button = document.getElementById("calculate");
    const result = document.getElementById("result");

    button.addEventListener("click", () => {

        const height = Number(heightInput.value);
        const weight = Number(weightInput.value);

        if (!height || !weight) {
            result.textContent = "Please enter valid values.";
            result.style.color = "orange";
            return;
        }

        const bmi = (weight / ((height / 100) ** 2)).toFixed(2);

        let message = "";
        let color = "";

        if (bmi < 18.5) {
            message = "Underweight";
            color = "#fbbf24";
        } else if (bmi < 25) {
            message = "Normal weight";
            color = "#4ade80";
        } else {
            message = "Overweight";
            color = "#f87171";
        }

        result.textContent = `BMI: ${bmi} — ${message}`;
        result.style.color = color;
    });

});
document.addEventListener("DOMContentLoaded", () => {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    
    // Load cart from localStorage or start empty
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const buttons = document.querySelectorAll(".add-to-cart");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.dataset.name;
            const price = Number(button.dataset.price);

            cart.push({name, price});

            updateCart();
            saveCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = `Total: $${total.toFixed(2)}`;
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Initialize cart on page load
    updateCart();
});
