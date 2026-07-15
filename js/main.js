/* ============================================
   PROYECTO PAMELA — main.js
   Catálogo, filtros, carrito y checkout por WhatsApp
   ============================================ */

// ---- CONFIG ----
const WHATSAPP_NUMBER = "5491153030690";

// ---- CATÁLOGO DE PRODUCTOS ----
// Para agregar un producto nuevo: copiá un objeto, cambiá los datos y sumá la foto en img/productos/
const PRODUCTS = [
  { id: "ar-01", nombre: "Aretes Flor Granate",          categoria: "aretes",   precio: 11000, img: "img/productos/aretes-flor-granate.jpg" },
  { id: "ar-02", nombre: "Aretes Filigrana Plateada",    categoria: "aretes",   precio: 12500, img: "img/productos/aretes-filigrana-plateada.jpg" },

  { id: "pu-01", nombre: "Pulsera Bosque",               categoria: "pulseras", precio: 9000,  img: "img/productos/pulsera-bosque.jpg" },

  { id: "co-01", nombre: "Collar Racimo Dorado",         categoria: "collares", precio: 16000, img: "img/productos/collar-racimo-dorado.jpg" },
  { id: "co-02", nombre: "Collar Lariat Verde",          categoria: "collares", precio: 17500, img: "img/productos/collar-lariat-verde.jpg" },
  { id: "co-03", nombre: "Collar Perlas Otoño",          categoria: "collares", precio: 15000, img: "img/productos/collar-perlas-otono.jpg" },
  { id: "co-04", nombre: "Collar Cadena Granate",        categoria: "collares", precio: 14000, img: "img/productos/collar-cadena-granate.jpg" },
];

const CATEGORY_LABELS = {
  collares: "Collares",
  aretes: "Aretes",
  pulseras: "Pulseras",
  rosarios: "Rosarios",
};

// ---- HELPERS ----
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function formatARS(num) {
  return "$" + num.toLocaleString("es-AR");
}

// ---- RENDER PRODUCTOS ----
const grid = $("#productosGrid");

function renderProducts(filter = "todos") {
  const list = filter === "todos" ? PRODUCTS : PRODUCTS.filter(p => p.categoria === filter);

  if (list.length === 0) {
    grid.innerHTML = `<p class="sin-resultados">No hay productos en esta categoría todavía.</p>`;
    return;
  }

  grid.innerHTML = list.map(p => `
    <article class="producto-card">
      <div class="producto-img">
        <img src="${p.img}" alt="${p.nombre}" loading="lazy">
        <button class="producto-add" data-id="${p.id}">Agregar al carrito</button>
      </div>
      <p class="producto-cat">${CATEGORY_LABELS[p.categoria]}</p>
      <h3 class="producto-nombre">${p.nombre}</h3>
      <p class="producto-precio">${formatARS(p.precio)}</p>
    </article>
  `).join("");
}

renderProducts();

// ---- FILTROS (grilla + categorías + nav + footer) ----
function setActiveFilterButton(filter) {
  $$(".filtro-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === filter);
  });
}

function applyFilter(filter) {
  renderProducts(filter);
  setActiveFilterButton(filter);
}

$$(".filtro-btn").forEach(btn => {
  btn.addEventListener("click", () => applyFilter(btn.dataset.filter));
});

$$(".cat-card").forEach(btn => {
  btn.addEventListener("click", () => {
    applyFilter(btn.dataset.filter);
    document.getElementById("tienda").scrollIntoView({ behavior: "smooth" });
  });
});

// Links de nav / menú móvil / footer que llevan a una categoría (data-filter)
$$('a[data-filter]').forEach(link => {
  link.addEventListener("click", (e) => {
    const filter = link.dataset.filter;
    applyFilter(filter);
    // el <a href="#tienda"> ya hace el scroll nativo
  });
});

// ---- CARRITO ----
const CART_KEY = "pp_cart";

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCart();
}

function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.cantidad += 1;
  } else {
    cart.push({ id: product.id, cantidad: 1 });
  }
  saveCart(cart);
  showToast(`${product.nombre} agregado al carrito`);
  openCart();
}

function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.cantidad += delta;
  const filtered = item.cantidad <= 0 ? cart.filter(i => i.id !== id) : cart;
  saveCart(filtered);
}

function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
}

function cartWithDetails() {
  return getCart()
    .map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return product ? { ...product, cantidad: item.cantidad } : null;
    })
    .filter(Boolean);
}

function renderCart() {
  const items = cartWithDetails();
  const cartItemsEl = $("#cartItems");
  const cartCount = $("#cartCount");
  const cartTotal = $("#cartTotal");
  const checkoutBtn = $("#checkoutBtn");

  const totalUnidades = items.reduce((sum, i) => sum + i.cantidad, 0);
  cartCount.textContent = totalUnidades;
  cartCount.style.display = totalUnidades > 0 ? "flex" : "none";

  if (items.length === 0) {
    cartItemsEl.innerHTML = `<p class="cart-empty">Todavía no agregaste ninguna pieza.</p>`;
    cartTotal.textContent = formatARS(0);
    checkoutBtn.setAttribute("aria-disabled", "true");
    checkoutBtn.href = "#";
    return;
  }

  cartItemsEl.innerHTML = items.map(item => `
    <div class="cart-item">
      <img src="${item.img}" alt="${item.nombre}">
      <div class="cart-item-info">
        <p class="cart-item-name">${item.nombre}</p>
        <p class="cart-item-price">${formatARS(item.precio)}</p>
        <div class="cart-item-qty">
          <button data-action="dec" data-id="${item.id}" aria-label="Restar">−</button>
          <span>${item.cantidad}</span>
          <button data-action="inc" data-id="${item.id}" aria-label="Sumar">+</button>
        </div>
      </div>
      <button class="cart-item-remove" data-action="remove" data-id="${item.id}">Quitar</button>
    </div>
  `).join("");

  const total = items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);
  cartTotal.textContent = formatARS(total);

  // Armar mensaje de WhatsApp
  const lineas = items.map(i => `• ${i.nombre} x${i.cantidad} — ${formatARS(i.precio * i.cantidad)}`);
  const mensaje = [
    "¡Hola Pamela! Quiero hacer este pedido:",
    "",
    ...lineas,
    "",
    `Total: ${formatARS(total)}`,
  ].join("\n");

  checkoutBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`;
  checkoutBtn.removeAttribute("aria-disabled");
}

// Delegación de eventos: agregar producto desde la grilla
grid.addEventListener("click", (e) => {
  const btn = e.target.closest(".producto-add");
  if (btn) addToCart(btn.dataset.id);
});

// Delegación de eventos: cantidad / quitar dentro del carrito
$("#cartItems").addEventListener("click", (e) => {
  const btn = e.target.closest("button[data-action]");
  if (!btn) return;
  const { action, id } = btn.dataset;
  if (action === "inc") updateQty(id, 1);
  if (action === "dec") updateQty(id, -1);
  if (action === "remove") removeFromCart(id);
});

// ---- ABRIR / CERRAR CARRITO ----
const cartDrawer = $("#cartDrawer");
const cartOverlay = $("#cartOverlay");

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("open");
  document.body.style.overflow = "";
}

$("#cartToggle").addEventListener("click", openCart);
$("#cartClose").addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });

// ---- MENÚ MÓVIL ----
const menuToggle = $("#menuToggle");
const mobileNav = $("#mobileNav");

menuToggle.addEventListener("click", () => {
  const isOpen = mobileNav.classList.toggle("open");
  menuToggle.classList.toggle("open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.style.overflow = isOpen ? "hidden" : "";
});

$$("#mobileNav a").forEach(link => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("open");
    menuToggle.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  });
});

// ---- TOAST ----
let toastTimer;
function showToast(msg) {
  const toast = $("#toast");
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}

// ---- NEWSLETTER (solo front, guarda localmente) ----
$("#newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = $("#newsletterEmail");
  const msg = $("#newsletterMsg");
  const email = emailInput.value.trim();
  if (!email) return;

  const subs = JSON.parse(localStorage.getItem("pp_newsletter") || "[]");
  if (!subs.includes(email)) subs.push(email);
  localStorage.setItem("pp_newsletter", JSON.stringify(subs));

  msg.textContent = "¡Gracias por sumarte! Te vamos a escribir con las novedades.";
  emailInput.value = "";
});

// ---- FOOTER: año actual ----
$("#year").textContent = new Date().getFullYear();

// ---- INICIALIZAR CARRITO AL CARGAR ----
renderCart();