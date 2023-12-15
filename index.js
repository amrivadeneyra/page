import { zapatillas } from "./zapatillasModelo.js";

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

        const cartIcon = nuevoProducto.querySelector('.cart');
        cartIcon.addEventListener('click', () => agregarAlCarrito(index));
        productosContainer.appendChild(nuevoProducto);
    });
});

function agregarAlCarrito(index) {
    console.log(`Producto agregado al carrito: ${index}`);

    const producto = zapatillas[index];

    const productoExistente = carrito.find(item => item._id === producto._id);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

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
