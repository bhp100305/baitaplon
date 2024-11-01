document.addEventListener("DOMContentLoaded", function () {
    const productCards = document.querySelectorAll(".product-card");

    const overlayContent = `
        <div class="product-overlay">
            <button class="btn btn-primary buy-button">Mua sản phẩm</button>
            <button class="btn btn-secondary add-to-cart-button">Thêm vào giỏ hàng</button>
        </div>`;

    // Thêm overlay và nút cho từng sản phẩm
    productCards.forEach((card, index) => {
        card.insertAdjacentHTML("beforeend", overlayContent);

        const addToCartButton = card.querySelector(".add-to-cart-button");
        const buyButton = card.querySelector(".buy-button");

        // Thêm sự kiện cho nút Thêm vào giỏ hàng
        addToCartButton.addEventListener("click", function () {
            const productId = index; // Sử dụng chỉ số làm ID sản phẩm
            const productName = card.querySelector(".card-title").textContent;
            const productPrice = card.querySelector(".card-text").textContent;
            const productImage = card.querySelector("img").src;

            // Lấy giỏ hàng từ localStorage hoặc tạo giỏ hàng mới
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingProductIndex = cart.findIndex(item => item.id === productId.toString());

            // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng chưa
            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                const newProduct = {
                    id: productId.toString(),
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

        // Thêm sự kiện cho nút Mua sản phẩm
        buyButton.addEventListener("click", function () {
            alert("Cảm ơn bạn đã mua sản phẩm!");
        });
    });

    // Hiển thị giỏ hàng
    function displayCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const cartItems = document.getElementById("cart-items");
        const cartTotal = document.getElementById("cart-total");

        cartItems.innerHTML = '';
        let total = 0;

        // Hiển thị từng sản phẩm trong giỏ hàng
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

    // Cập nhật số lượng sản phẩm trong giỏ hàng
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
                    cart.splice(productIndex, 1);
                }
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
        }
    };

    // Xóa sản phẩm khỏi giỏ hàng
    window.removeFromCart = function (productId) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
        alert("Sản phẩm đã được xóa khỏi giỏ hàng!");
    };

    // Xóa toàn bộ giỏ hàng
    document.getElementById("clear-cart").addEventListener("click", function () {
        localStorage.removeItem("cart");
        displayCart();
        alert("Giỏ hàng đã được xóa!");
    });

    // Mua hàng - hiện thông báo cảm ơn và xóa giỏ hàng
    document.getElementById("checkout-cart").addEventListener("click", function () {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length > 0) {
            alert("Cảm ơn bạn đã mua hàng!");
            localStorage.removeItem("cart");
            displayCart();
        } else {
            alert("Giỏ hàng của bạn đang trống.");
        }
    });

    displayCart();
});

// Hiển thị hoặc ẩn giỏ hàng
function toggleCart() {
    const cartModal = document.getElementById("cart-modal");
    cartModal.style.display = cartModal.style.display === "block" ? "none" : "block";
}

// Đóng giỏ hàng khi nhấn bên ngoài
window.onclick = function (event) {
    const cartModal = document.getElementById("cart-modal");
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
};
document.addEventListener("DOMContentLoaded", function () {
    const pageUrl = window.location.pathname.split("/").pop(); // Lấy tên file hiện tại

    // Tạo danh sách liên kết và file tương ứng
    const navLinks = {
        "sanpham.html": "sanpham-link",
        "phukien.html": "phukien-link",
        "linhkien.html": "linhkien-link",
        "Baiviet.html": "baiviet-link",
        "gioithieu.html": "gioithieu-link",
        "lienhe.html": "lienhe-link"
    };

    // Xác định liên kết hiện tại và thêm lớp "active"
    if (navLinks[pageUrl]) {
        document.getElementById(navLinks[pageUrl]).classList.add("active");
    }
});