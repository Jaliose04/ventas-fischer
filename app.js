let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let total = parseFloat(localStorage.getItem('total')) || 0;

document.addEventListener('DOMContentLoaded', actualizarCarrito);

function agregarAlCarrito(nombre, precio, imagen, descripcion) {
  carrito.push({ nombre, precio, imagen, descripcion });
  total += precio;
  guardarEstado();
  actualizarCarrito();
}

function eliminarDelCarrito(indice) {
  total -= carrito[indice].precio;
  carrito.splice(indice, 1);
  guardarEstado();
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById('lista-carrito');
  const totalElemento = document.getElementById('total');
  lista.innerHTML = '';

  carrito.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}" />
      <div class="info">
        <strong>${item.nombre}</strong>
        <p>${item.descripcion}</p>
        <span>$${item.precio.toFixed(2)}</span>
      </div>
      <button onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;
    lista.appendChild(li);
  });

  totalElemento.textContent = total.toFixed(2);
}

function irAFinalizarCompra() {
  if (carrito.length === 0) {
    alert('El carrito está vacío.');
    return;
  }
  document.getElementById('formulario').classList.remove('hidden');
}

function realizarPedido(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const direccion = document.getElementById('direccion').value.trim();
  const email = document.getElementById('email').value.trim();
  const pago = document.getElementById('pago').value;

  if (!nombre || !direccion || !email || !pago) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  const resumen = `
Pedido realizado por: ${nombre}
Dirección: ${direccion}
Email: ${email}
Pago: ${pago}
Total: $${total.toFixed(2)}
Productos: ${carrito.map(item => item.nombre).join(', ')}
`;

  alert(resumen);

  // Aquí puedes enviar los datos a un servidor

  carrito = [];
  total = 0;
  guardarEstado();
  actualizarCarrito();
  document.querySelector('form').reset();
  document.getElementById('formulario').classList.add('hidden');
}

function guardarEstado() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
  localStorage.setItem('total', total);
}