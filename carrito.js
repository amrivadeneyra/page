
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

actualizarCarrito();

function actualizarCarrito() {
    let productosCarrito = document.querySelector('.productos-carrito');
    productosCarrito.innerHTML = ''; 

    carrito.forEach((producto, index) => {
        let fila = document.createElement('div');
        fila.classList.add('fila');

        fila.innerHTML = `
            <div class="col descripcion">
                <img src="img/shoes${index + 1}.png" alt="">
                <span>${producto.descripcion}</span>
            </div>
            <div class="col talle">
                <span>${producto.talla}</span>
            </div>
            <div class="col color ${producto.color}">
                <span> </span>
            </div>
            <div class="col cantidad">
                <button onclick="aumentarCantidad(${index})"> + </button>
                <span class="total-cantidad" id="cantidad-${index}">${producto.cantidad}</span>
                <button onclick="disminuirCantidad(${index})"> - </button>
            </div>
            <div class="col eliminar" onclick="eliminarProducto(${index})">
                <span> <i class="fa-solid fa-xmark"></i> </span>
            </div>
            <div class="col precio">
                <span id="precio-${index}">S/${producto.precio.toFixed(2)}</span>
            </div>
        `;

        productosCarrito.appendChild(fila);
    });

    actualizarTotalCompra();
}

function actualizarTotalCompra() {
    let totalCompra = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    let monto = document.querySelector('.monto');
    monto.textContent = `S/${totalCompra.toFixed(2)}`;
}

function actualizarPrecio(index) {
    let precioUnitario = carrito[index].precio;
    let cantidad = carrito[index].cantidad;
    let precioTotal = precioUnitario * cantidad;

    let precioElemento = document.getElementById(`precio-${index}`);
    precioElemento.textContent = `S/${precioTotal.toFixed(2)}`;

    actualizarTotalCompra();

    guardarCarrito();
}

function aumentarCantidad(index) {
    carrito[index].cantidad++;
    actualizarPrecio(index);
}

function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        actualizarPrecio(index);
    }
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();

    guardarCarrito();
}

function realizarPago() {
    let totalCompra = calcularTotalCompra();

    if (totalCompra > 0) {
        alert(`Pago exitoso. Total: S/${totalCompra.toFixed(2)}`);
        
        carrito = [];
        actualizarCarrito();

        guardarCarrito();
    } else {
        alert("No hay productos en el carrito para procesar el pago.");
    }
}

function calcularTotalCompra() {
    let totalCompra = carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
    return totalCompra;
}

function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}
