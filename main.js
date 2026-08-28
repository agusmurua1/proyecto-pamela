/* ============================================
   PROYECTO PAMELA — main.js
   Catálogo, filtros, carrito y checkout por WhatsApp
   ============================================ */

// ---- CONFIG ----
const WHATSAPP_NUMBER = "5491153030690";

// ---- CATÁLOGO DE PRODUCTOS ----
// Para agregar un producto nuevo: copiá un objeto, cambiá los datos y sumá la foto en img/productos/
const PRODUCTS = [
  { id: "ar-01", nombre: "Aros Escarcha",            categoria: "aretes",   precio: 8000,  img: "img/productos/aros-escarcha.jpg",
    galeria: ["img/productos/aros-escarcha-negro.jpg"],
    descripcion: "Colgante, con detalle en cristal de roca facetado. Opcional ganchito de acero inoxidable." },
  { id: "ar-02", nombre: "Aros Pensamiento Cortos",  categoria: "aretes",   precio: 10000, img: "img/productos/aros-pensamiento-cortos.jpg", video: "video/aros-pensamiento-cortos.mp4",
    descripcion: "Colgantes, con detalle en cristal de roca facetado, otorgando un movimiento y brillo únicos. Consultar colores disponibles. Opcional ganchito de acero inoxidable." },
  { id: "ar-03", nombre: "Aros Pensamiento Largos",  categoria: "aretes",   precio: 10000, img: "img/productos/aros-pensamiento-largo.jpg", video: "video/aros-pensamiento-largo.mp4",
    galeria: ["img/productos/aros-pensamiento-largo-negro.jpg"],
    descripcion: "Colgantes largos, con detalle en cristal de roca facetado, otorgando un movimiento y brillo únicos. Consultar colores disponibles. Opcional ganchito de acero inoxidable." },
  { id: "ar-04", nombre: "Aros Madera",              categoria: "aretes",   precio: 10000, img: "img/productos/aros-madera.jpg",
    galeria: ["img/productos/aros-madera-alt.jpg"],
    descripcion: "Argollas colgantes con detalles de piedras naturales. Opcional ganchito de acero quirúrgico." },

  { id: "pu-01", nombre: "Pulsera Margarita",        categoria: "pulseras", precio: 5000,  img: "img/productos/pulsera-margarita.jpg",
    descripcion: "Consultar por colores disponibles. Elastizadas." },

  { id: "co-01", nombre: "Collar Abeto",             categoria: "collares", precio: 25000, img: "img/productos/collar-abeto.jpg",
    galeria: ["img/productos/collar-abeto-2.jpg", "img/productos/collar-abeto-3.jpg"],
    descripcion: "Realizado con piedras naturales. Semi-rígido, regulable." },
  { id: "co-02", nombre: "Collar Dalia",             categoria: "collares", precio: 20000, img: "img/productos/collar-dalia.jpg",
    descripcion: "Realizado con cuentas engarzadas y detalles en cristal de roca facetado. Regulable." },
  { id: "co-03", nombre: "Collar Jazmín",            categoria: "collares", precio: 25000, img: "img/productos/collar-jazmin.jpg",
    galeria: ["img/productos/collar-jazmin-2.jpg", "img/productos/collar-jazmin-3.jpg"],
    descripcion: "Semi-rígido, regulable. Realizado con piedras naturales." },
  { id: "co-04", nombre: "Collar Mosaico",           categoria: "collares", precio: 20000, img: "img/productos/collar-mosaico.jpg",
    descripcion: "Realizado con materiales combinados y técnicas mixtas. Largo 80cm." },
  { id: "co-05", nombre: "Collar Rústico",           categoria: "collares", precio: 15000, img: "img/productos/collar-rustico.jpg",
    galeria: ["img/productos/collar-rustico-2.jpg"],
    descripcion: "Realizado con materiales combinados y técnicas mixtas. Largo 50cm. Regulable." },
  { id: "co-06", nombre: "Corbatero Dije Irregular", categoria: "collares", precio: 15000, img: "img/productos/corbatero-irregular.jpg",
    galeria: ["img/productos/corbatero-irregular-2.jpg", "img/productos/corbatero-irregular-3.jpg"],
    descripcion: "Corbatero de cordón gamuzado con dije de acero. Largo aprox. 90cm, se le pueden dar varias vueltas." },
  { id: "co-07", nombre: "Gargantilla Alerce",       categoria: "collares", precio: 15000, img: "img/productos/gargantilla-alerce.jpg",
    descripcion: "Realizada en cordón de acero con cuentas de cristal de roca facetado. Rígido. Regulable." },
  { id: "co-08", nombre: "Gargantilla Margarita",    categoria: "collares", precio: 15000, img: "img/productos/gargantilla-margarita.jpg",
    galeria: ["img/productos/gargantilla-margarita-2.jpg"],
    descripcion: "Consultar por colores disponibles. Elastizado, cierre regulable." },

  // ---- COLECCIÓN WOODSTOCK ----
  { id: "ar-05", nombre: "Aros Bold",                categoria: "aretes",   precio: 15000, img: "img/productos/aros-bold.jpg",
    galeria: ["img/productos/aros-bold-violeta-turquesa.jpg"],
    videos: ["video/aros-bold-beige.mp4", "video/aros-bold-violeta.mp4"],
    descripcion: "Argollas tejidas a mano en crochet. Disponibles en varios colores." },
  { id: "co-09", nombre: "Collar Gypsy",             categoria: "collares", precio: 20000, img: "img/productos/collar-gypsy.jpg",
    galeria: ["img/productos/collar-gypsy-2.jpg", "img/productos/collar-gypsy-3.jpg", "img/productos/collar-gypsy-4.jpg"],
    descripcion: "Tejido a mano a crochet. Material: hilo encerado. Con cierre con cadena regulable. Largo aproximado 50cm." },
  { id: "co-10", nombre: "Collar Kozmic",            categoria: "collares", precio: 30000, img: "img/productos/collar-kozmic.jpg",
    galeria: ["img/productos/collar-kozmic-2.jpg"],
    descripcion: "Combina cadenas con argollas de acero y argollas tejidas a mano con técnica crochet en hilo encerado. Cierre con cadena regulable. Largo aproximado 1m." },
  { id: "co-11", nombre: "Collar Rhiannon",          categoria: "collares", precio: 30000, img: "img/productos/collar-rhiannon.jpg",
    galeria: ["img/productos/collar-rhiannon-2.jpg"],
    descripcion: "Combina cadenas con argollas tejidas a mano con técnica crochet en hilo encerado. Cierre con cadena regulable. Largo aproximado 50cm." },
  { id: "co-12", nombre: "Collar Castles Made of Sand", categoria: "collares", precio: 30000, img: "img/productos/collar-castles-made-of-sand.jpg",
    galeria: ["img/productos/collar-castles-made-of-sand-2.jpg"],
    descripcion: "Realizado con piedras naturales y cinta de raso. Largo aproximado 50cm." },
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

// Arma la lista de medios (fotos + videos) de un producto, en orden:
// foto principal, videos, fotos de la galería.
function getMedia(p) {
  const media = [{ tipo: "imagen", src: p.img }];
  if (p.videos) p.videos.forEach(v => media.push({ tipo: "video", src: v }));
  else if (p.video) media.push({ tipo: "video", src: p.video });
  if (p.galeria) p.galeria.forEach(g => media.push({ tipo: "imagen", src: g }));
  return media;
}

function mediaSlideHTML(m, nombre) {
  return m.tipo === "video"
    ? `<video src="${m.src}" autoplay muted loop playsinline></video>`
    : `<img src="${m.src}" alt="${nombre}" loading="lazy">`;
}

function renderProducts(filter = "todos") {
  const list = filter === "todos" ? PRODUCTS : PRODUCTS.filter(p => p.categoria === filter);

  if (list.length === 0) {
    grid.innerHTML = `<p class="sin-resultados">No hay productos en esta categoría todavía.</p>`;
    return;
  }

  grid.innerHTML = list.map(p => {
    const media = getMedia(p);
    const isCarousel = media.length > 1;

    const imgBlock = isCarousel
      ? `
        <div class="producto-carousel" data-index="0">
          <div class="carousel-track">
            ${media.map(m => `<div class="carousel-slide">${mediaSlideHTML(m, p.nombre)}</div>`).join("")}
          </div>
          <button class="carousel-arrow carousel-prev" data-dir="-1" aria-label="Foto anterior">‹</button>
          <button class="carousel-arrow carousel-next" data-dir="1" aria-label="Foto siguiente">›</button>
          <div class="carousel-dots">
            ${media.map((_, i) => `<span class="carousel-dot${i === 0 ? " active" : ""}" data-index="${i}"></span>`).join("")}
          </div>
        </div>`
      : mediaSlideHTML(media[0], p.nombre);

    return `
    <article class="producto-card">
      <div class="producto-img">
        ${imgBlock}
        <button class="producto-add" data-id="${p.id}">Agregar al carrito</button>
      </div>
      <p class="producto-cat">${CATEGORY_LABELS[p.categoria]}</p>
      <h3 class="producto-nombre">${p.nombre}</h3>
      <p class="producto-desc">${p.descripcion || ""}</p>
      <p class="producto-precio">${formatARS(p.precio)}</p>
    </article>
  `;
  }).join("");
}

renderProducts();

// ---- CARRUSEL DE FOTOS/VIDEOS POR PRODUCTO ----
function goToSlide(carousel, index) {
  const track = carousel.querySelector(".carousel-track");
  const slides = carousel.querySelectorAll(".carousel-slide");
  const dots = carousel.querySelectorAll(".carousel-dot");
  const total = slides.length;
  const newIndex = (index + total) % total;

  track.style.transform = `translateX(-${newIndex * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle("active", i === newIndex));
  carousel.dataset.index = newIndex;
}

grid.addEventListener("click", (e) => {
  const arrow = e.target.closest(".carousel-arrow");
  const dot = e.target.closest(".carousel-dot");
  const carousel = e.target.closest(".producto-carousel");
  if (!carousel) return;

  if (arrow) {
    e.preventDefault();
    e.stopPropagation();
    goToSlide(carousel, Number(carousel.dataset.index) + Number(arrow.dataset.dir));
  } else if (dot) {
    e.preventDefault();
    e.stopPropagation();
    goToSlide(carousel, Number(dot.dataset.index));
  }
});

// Swipe táctil (celular) para pasar de foto
grid.addEventListener("touchstart", (e) => {
  const carousel = e.target.closest(".producto-carousel");
  if (!carousel) return;
  carousel.dataset.touchStartX = e.changedTouches[0].clientX;
}, { passive: true });

grid.addEventListener("touchend", (e) => {
  const carousel = e.target.closest(".producto-carousel");
  if (!carousel || carousel.dataset.touchStartX === undefined) return;
  const deltaX = e.changedTouches[0].clientX - Number(carousel.dataset.touchStartX);
  if (Math.abs(deltaX) > 40) {
    goToSlide(carousel, Number(carousel.dataset.index) + (deltaX < 0 ? 1 : -1));
  }
}, { passive: true });

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

// ---- NEWSLETTER (envía a Mailchimp; se abre en una pestaña nueva) ----
$("#newsletterForm").addEventListener("submit", () => {
  const msg = $("#newsletterMsg");
  msg.textContent = "¡Gracias por sumarte! Revisá tu correo (y spam) para confirmar la suscripción.";
});

// ---- FOOTER: año actual ----
$("#year").textContent = new Date().getFullYear();

// ---- INICIALIZAR CARRITO AL CARGAR ----
renderCart();