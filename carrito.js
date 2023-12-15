
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

actualizarCarrito();

function actualizarCarrito() {
    let productosCarrito = document.querySelector('.productos-carrito');
    productosCarrito.innerHTML = '';


    if (carrito.length === 0) {
        document.querySelector('.contenedor-seccion').style.display = 'none';
        document.querySelector('.contenedor-seccion-car-void').style.display = 'block';
    } else {
        document.querySelector('.contenedor-seccion').style.display = 'block';
        document.querySelector('.contenedor-seccion-car-void').style.display = 'none';

        let encabezado = document.createElement('div');
        encabezado.classList.add('fila', 'encabezado');
        encabezado.innerHTML = `
            <div class="col descripcion">Producto</div>
            <div class="col talle">Talla</div>
            <div class="col color">Color</div>
            <div class="col cantidad">Cantidad</div>
            <div class="col eliminar"></div>
            <div class="col precio">Precio</div>
        `;
        productosCarrito.appendChild(encabezado);

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
    }

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

    let cantidadElemento = document.getElementById(`cantidad-${index}`);
    cantidadElemento.textContent = carrito[index].cantidad;

    actualizarTotalCompra();
}

function aumentarCantidad(index) {
    carrito[index].cantidad++;
    actualizarPrecio(index);
    guardarCarrito();
}

function disminuirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        actualizarPrecio(index);
        guardarCarrito();
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
        generarBoleta(); // Llamada para generar la boleta

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


function generarBoleta() {
    const informacionBoleta = obtenerInformacionBoleta();

    const contenidoBoleta = generarContenidoBoleta(informacionBoleta);

    mostrarBoleta(contenidoBoleta);
}

function obtenerInformacionBoleta() {
    const detallesPago = {
        metodoPago: "Mediante código QR",
    };

    return {
        carrito: carrito,
        detallesPago: detallesPago,
    };
}

function generarContenidoBoleta(informacionBoleta) {
    const contenidoHTML = `
        <html>
        <head>
            <style>
                /* Estilos CSS para la boleta */
                body {
                    font-family: 'Arial', sans-serif;
                    background-color: #f0f0f0;
                }

                #boleta {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    text-align: center; /* Alinea el contenido al centro */
                }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }

                th {
                    background-color: #f2f2f2;
                }

                h1, h2, h3 {
                    color: #333;
                }

                p {
                    margin-bottom: 10px;
                }

                #metodo-pago {
                    font-weight: bold;
                }

                img {
                    width: 300px; /* Ajusta el ancho de la imagen según tus necesidades */
                    height: auto; /* Mantiene la proporción original de la imagen */
                }

                #codigo-qr {
                    margin-top: 20px;
                }

            </style>
        </head>
        <body>
            <div id="boleta">
                <h1>Boleta de Compra</h1>
                <h2>Detalles del Carrito:</h2>
                <ul>
                    ${generarItemsBoleta(informacionBoleta.carrito)}
                </ul>
                <h2>Detalles de Pago:</h2>
                <p id="metodo-pago">Método de Pago: ${informacionBoleta.detallesPago.metodoPago}</p>

                <!-- Imagen -->
                <img src="/img/SportShoes.png" alt="SportShoes">

                <!-- Código QR -->
                <div id="codigo-qr"></div>

                <h2>Resumen de Compra:</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio Unitario</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${generarFilasTabla(informacionBoleta.carrito)}
                    </tbody>
                </table>
                
            </div>
        </body>
        </html>
    `;

    return contenidoHTML;
}

function generarFilasTabla(carrito) {
    return carrito.map(producto => `
        <tr>
            <td>${producto.descripcion}</td>
            <td>${producto.cantidad}</td>
            <td>S/${producto.precio.toFixed(2)}</td>
            <td>S/${(producto.precio * producto.cantidad).toFixed(2)}</td>
        </tr>
    `).join('');
}

function generarItemsBoleta(carrito) {
    const itemsHTML = carrito.map((producto) => {
        return `<li>${producto.descripcion} - Cantidad: ${producto.cantidad} - Precio: S/${producto.precio.toFixed(2)}</li>`;
    }).join('');

    return itemsHTML;
}

function mostrarBoleta(contenidoBoleta) {
    const ventanaEmergente = window.open('', 'boleta.pdf');
    ventanaEmergente.document.write(contenidoBoleta);
    ventanaEmergente.document.close();
}
