import { zapatillas } from "./zapatillasModelo.js";

// Mueve la declaración de carrito fuera del evento DOMContentLoaded
const carrito = obtenerCarrito() || [];

document.addEventListener("DOMContentLoaded", function () {
    const productosContainer = document.getElementById("productos-container");

    zapatillas.forEach((producto, index) => {
        const nuevoProducto = document.createElement("div");
        nuevoProducto.classList.add("fondo-dots", "col");

        nuevoProducto.innerHTML = `
            <header>
                <span class="like"><i class="fa-solid fa-heart"></i></span>
                <span class="cart"><i class="fa-solid fa-bag-shopping"></i></span>
            </header>
            <a href="#">
                <div class="contenido">
                    <div class="fondo orange">
                        <div class="circulo"></div>
                    </div>
                    <img src="${producto.img}" alt="${producto.descripcion}">
                    <h2>${producto.descripcion}</h2>
                    <h2>S/${producto.precio.toFixed(2)}</h2>
                </div>
            </a>
        `;

        // Agregar evento de clic al ícono del carrito
        const cartIcon = nuevoProducto.querySelector('.cart');
        cartIcon.addEventListener('click', () => agregarAlCarrito(index));
        productosContainer.appendChild(nuevoProducto);
    });
});

// Mueve la declaración de agregarAlCarrito fuera del evento DOMContentLoaded
function agregarAlCarrito(index) {
    console.log(`Producto agregado al carrito: ${index}`);

    const producto = zapatillas[index];
    carrito.push({ ...producto });
    guardarCarrito(carrito);
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log("Carrito guardado");
}

function obtenerCarrito() {
    const carritoString = localStorage.getItem("carrito");
    return carritoString ? JSON.parse(carritoString) : null;
}
