document.addEventListener("DOMContentLoaded", function () {
    const productCards = document.querySelectorAll(".product-card");

    const overlayContent = `
        <div class="product-overlay">
            <button class="btn btn-primary buy-button">Mua</button>
            <button class="btn btn-secondary add-to-cart-button">Thêm vào giỏ hàng</button>
        </div>`;

    // Thêm overlay vào từng .product-card và gắn sự kiện click
    productCards.forEach(card => {
        card.insertAdjacentHTML("beforeend", overlayContent);

        const addToCartButton = card.querySelector(".add-to-cart-button");
        addToCartButton.addEventListener("click", function () {
            const productId = card.parentElement.getAttribute("data-product");
            const productName = card.querySelector(".card-title").textContent;
            const productPrice = card.querySelector(".card-text").textContent;
            const productImage = card.querySelector("img").src;

            let cart = JSON.parse(localStorage.getItem("cart")) || [];

            const existingProductIndex = cart.findIndex(item => item.id === productId);

            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                const newProduct = {
                    id: productId,
                    name: productName,
                    price: parseInt(productPrice.replace(/[^0-9]/g, '')),
                    image: productImage,
                    quantity: 1
                };
                cart.push(newProduct);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert("Sản phẩm đã được thêm vào giỏ hàng!");

            displayCart();
        });
    });

    function displayCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartItems = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");

        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;

            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="50">
                ${item.name} - ${item.price.toLocaleString()} đ x <span class="quantity">${item.quantity}</span> =
                ${itemTotal.toLocaleString()} đ
                <button class="decrease" onclick="updateQuantity('decrease', '${item.id}')">-</button>
                <button class="increase" onclick="updateQuantity('increase', '${item.id}')">+</button>
                <span class="remove" onclick="removeFromCart('${item.id}')">Xóa</span>
            `;
            cartItems.appendChild(listItem);
        });

        cartTotal.textContent = `Tổng: ${total.toLocaleString()} đ`;
    }

    window.updateQuantity = function (action, productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productIndex = cart.findIndex(item => item.id === productId);

        if (productIndex > -1) {
            if (action === 'increase') {
                cart[productIndex].quantity += 1;
            } else if (action === 'decrease') {
                if (cart[productIndex].quantity > 1) {
                    cart[productIndex].quantity -= 1;
                } else {
                    // Nếu số lượng bằng 1, có thể xóa sản phẩm khỏi giỏ hàng
                    cart.splice(productIndex, 1);
                }
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
        }
    };

    window.removeFromCart = function (productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        alert("Sản phẩm đã được xóa khỏi giỏ hàng!");
    };

    document.getElementById("clear-cart").addEventListener("click", function () {
        localStorage.removeItem("cart");
        displayCart();
        alert("Giỏ hàng đã được xóa!");
    });

    // Hiển thị giỏ hàng khi tải trang
    displayCart();
});

function toggleCart() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.style.display = cartModal.style.display === "flex" ? "none" : "flex";
}

// Đóng giỏ hàng khi nhấp bên ngoài
window.onclick = function (event) {
    const cartModal = document.getElementById("cart-modal");
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
};
