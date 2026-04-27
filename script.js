// script.js

// Cargar carrito desde el almacenamiento local o iniciar vacío
let carrito = JSON.parse(localStorage.getItem('techfix_cart')) || [];

function mostrarPopup(titulo, mensaje) {
    document.getElementById('popup-title').innerText = titulo;
    document.getElementById('popup-text').innerText = mensaje;
    document.getElementById('popup').classList.remove('hidden');
}

function cerrarPopup() {
    document.getElementById('popup').classList.add('hidden');
}

// Función para añadir productos al carrito
function agregarAlCarrito(nombre, precio) {
    carrito.push({ nombre, precio });
    localStorage.setItem('techfix_cart', JSON.stringify(carrito));
    mostrarPopup("Producto añadido", `${nombre} ha sido añadido al carrito.`);
    actualizarContador();
}

// Actualizar el número en el icono del carrito (opcional)
function actualizarContador() {
    const contador = document.getElementById('cart-count');
    if(contador) contador.innerText = carrito.length;
}

// Función para renderizar el carrito en la página de checkout
function renderizarCarrito() {
    const listaHtml = document.getElementById('lista-carrito');
    const totalHtml = document.getElementById('total-precio');
    if (!listaHtml) return;

    listaHtml.innerHTML = '';
    let total = 0;

    if (carrito.length === 0) {
        listaHtml.innerHTML = '<p style="text-align:center; color: #64748b;">El carrito está vacío</p>';
    } else {
        carrito.forEach((prod, index) => {
            total += prod.precio;
            listaHtml.innerHTML += `
                <div class="item-carrito">
                    <span>${prod.nombre}</span>
                    <span class="precio-item">Q${prod.precio}</span>
                </div>
            `;
        });
    }
    totalHtml.innerText = `Q${total}`;
}

// Manejar el proceso de pago
function procesarPago(event) {
    event.preventDefault(); // Evitar que el formulario recargue la página

    if (carrito.length === 0) {
        mostrarPopup("Producto añadido", `${nombre} ha sido añadido al carrito.`);
        return;
    }

    const metodo = document.querySelector('input[name="pago"]:checked').value;
    
    // Simulación de carga
    const btn = document.getElementById('btn-finalizar');
    btn.innerText = "Procesando...";
    btn.disabled = true;

    setTimeout(() => {
        mostrarPopup(
            "Compra exitosa",
            `Su pedido pagado con ${metodo.toUpperCase()} ha sido procesado.`
        );

        carrito = [];
        localStorage.removeItem('techfix_cart');

        setTimeout(() => {
            window.location.href = 'productos.html';
        }, 2500);

    }, 2000);
}

// Inicializar funciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    renderizarCarrito();
});