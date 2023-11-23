import { zapatillas } from "./zapatillasModelo.js";

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

function agregarAlCarrito(index) {
    const producto = zapatillas[index];
    carrito.push({ ...producto, cantidad: 1 });
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
