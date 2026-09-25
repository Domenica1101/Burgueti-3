// Menú oficial con tus fotos reales y en el orden solicitado
const burgers = [
    {
        id: 1,
        name: "HAWAIANA",
        description: "Pan de orégano con mozzarella, 150g de carne, salsa de piña con tocino, lechuga, queso cheddar y salsa de la casa[cite: 15].",
        priceBurger: 4.50,
        priceCombo: 5.75,
        image: burguetiImages.hawaiana
    },
    {
        id: 2,
        name: "CLÁSICA",
        description: "Pan de papa, 150g de carne, queso cheddar, tomate, lechuga, pepinillos y salsa de la casa[cite: 15].",
        priceBurger: 3.50,
        priceCombo: 4.75,
        image: burguetiImages.clasica
    },
    {
        id: 3,
        name: "BACON HOUSE",
        description: "Pan de papa, 150g de carne, doble bacon ahumado, queso cheddar, pepinillos y salsas de la casa[cite: 15].",
        priceBurger: 4.50,
        priceCombo: 5.75,
        image: burguetiImages.bacon
    },
    {
        id: 4,
        name: "CRISPY RANCH",
        description: "Pan de papa, 150g de carne en salsa bbq ahumada, cebolla crispy, queso cheddar, lechuga finamente picada y aderezo ranch[cite: 15].",
        priceBurger: 4.50,
        priceCombo: 5.75,
        image: burguetiImages.crispy
    },
    {
        id: 5,
        name: "BURGUETI",
        description: "Pan de papa, 150g de carne, mermelada de tocino, doble queso cheddar y aderezo especial[cite: 15].",
        priceBurger: 4.00,
        priceCombo: 5.25,
        image: burguetiImages.burgueti,
        badge: "MÁS VENDIDA"
    }
];

// Adicionales y Extras Interactivos
const extrasList = [
    { name: "Cola", price: 0.50, category: "Bebidas" },
    { name: "Agua", price: 0.50, category: "Bebidas" },
    { name: "Papas Fritas", price: 1.00, category: "Acompañamientos" },
    { name: "Carne adicional", price: 1.25, category: "Extras" },
    { name: "Queso extra", price: 0.50, category: "Extras" },
    { name: "Tocino extra", price: 0.50, category: "Extras" },
    { name: "Doble carne", price: 2.00, category: "Extras" }
];

let cart = [];

// Renderizar Menú de Hamburguesas
const burgersGrid = document.getElementById("burgers-grid");
function renderMenu() {
    burgersGrid.innerHTML = burgers.map(burger => `
        <div class="menu-card">
            <div class="card-img-container">
                <img src="${burger.image}" alt="${burger.name}" onerror="this.src='https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'">
            </div>
            <div class="card-body">
                <h3>${burger.name}</h3>
                <p>${burger.description}</p>
                <div class="card-footer">
                    <div class="prices-row">
                        <span>Burger: <strong>$${burger.priceBurger.toFixed(2)}</strong></span>
                        <span>Combo: <strong>$${burger.priceCombo.toFixed(2)}</strong></span>
                    </div>
                    <div class="card-buttons">
                        <button class="btn-add" onclick="addToCart('${burger.name} (Burger)', ${burger.priceBurger})">Agregar Burger</button>
                        <button class="btn-add" onclick="addToCart('${burger.name} (Combo)', ${burger.priceCombo})">Agregar Combo</button>
                    </div>
                </div>
            </div>
        </div>
    `).join("");
}

// Renderizar Sección de Adicionales
const extrasGrid = document.getElementById("extras-grid");
function renderExtras() {
    extrasGrid.innerHTML = `
        <div class="extra-card">
            <h3>Bebidas y Acompañamientos</h3>
            ${extrasList.filter(e => e.category === 'Bebidas' || e.category === 'Acompañamientos').map(extra => `
                <div class="extra-item">
                    <div class="extra-info">
                        <span>${extra.name}</span>                         <strong>$${extra.price.toFixed(2)}</strong>
                    </div>
                    <button class="btn-add-extra" onclick="addToCart('${extra.name}',${extra.price})"><i class="fa-solid fa-plus"></i> Agregar</button>
                </div>
            `).join("")}
        </div>
        <div class="extra-card">
            <h3>Salsas de la Casa</h3>
            <div class="extra-item"><div class="extra-info"><span>BBQ Ahumada</span><strong>Incluida</strong></div></div>
            <div class="extra-item"><div class="extra-info"><span>Garlic Ranch</span><strong>Incluida</strong></div></div>
            <div class="extra-item"><div class="extra-info"><span>Bacon Sauce</span><strong>Incluida</strong></div></div>
            <div class="extra-item"><div class="extra-info"><span>Picante Especial</span><strong>Incluida</strong></div></div>
        </div>
        <div class="extra-card">
            <h3>Extras para tu Burger</h3>
            ${extrasList.filter(e => e.category === 'Extras').map(extra => `
                <div class="extra-item">
                    <div class="extra-info">
                        <span>${extra.name}</span>                         <strong>$${extra.price.toFixed(2)}</strong>
                    </div>
                    <button class="btn-add-extra" onclick="addToCart('${extra.name}',${extra.price})"><i class="fa-solid fa-plus"></i> Agregar</button>
                </div>
            `).join("")}
        </div>
    `;
}

// Lógica del Carrito
const cartModal = document.getElementById("cart-modal");
const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotalPrice = document.getElementById("cart-total-price");
const checkoutWhatsapp = document.getElementById("checkout-whatsapp");

cartBtn.addEventListener("click", () => cartModal.classList.add("open"));
closeCart.addEventListener("click", () => cartModal.classList.remove("open"));

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name: name, price: price, quantity: 1 });
    }
    updateCartUI();
    cartModal.classList.add("open");
}

function updateCartUI() {
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p style='color: var(--text-muted); text-align: center;'>Tu carrito está vacío.</p>";
        cartTotalPrice.textContent = "$0.00";
        return;
    }

    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
            </div>
            <div class="cart-item-actions">
                <button onclick="changeQuantity(${index}, -1)">-</button>
                <span>${item.quantity}</span>
                <button onclick="changeQuantity(${index}, 1)">+</button>
            </div>
        </div>
    `).join("");

    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    cartTotalPrice.textContent = `$${total.toFixed(2)}`;
}

function changeQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartUI();
}

checkoutWhatsapp.addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Agrega productos a tu carrito antes de pedir.");
        return;
    }

    let message = "Hola *Burgueti*, quiero hacer el siguiente pedido:\n\n";
    cart.forEach(item => {
        message += `- ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toFixed(2)})\n`;
    });
    
    const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    message += `\n*Total a pagar: $${total.toFixed(2)}*\n\n¡Gracias!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/593962710324?text=${encodedMessage}`, '_blank');
});

// Inicializar la página
renderMenu();
renderExtras();