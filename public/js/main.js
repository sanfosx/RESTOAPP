
function mostrarSeccion(seccion) {

  document.querySelectorAll(".seccion").forEach(s => s.classList.add("hidden"));
  document.getElementById(seccion).classList.remove("hidden");
  document.querySelectorAll(".btn-tab").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById("tab" + capitalize(seccion) + "Btn");

  if (btn) btn.classList.add("active");
  clearResultado();

  if (seccion === "clientes") listarClientes?.();
  else if (seccion === "usuarios") listarUsuarios?.();
  else if (seccion === "productos") listarProductos?.();
  else if (seccion === "mesas") listarMesas?.();
  else if (seccion === "pedidos") listarPedidos?.();
}

async function cargarModales() {
  const modales = ['cliente', 'usuario', 'mesa', 'producto', 'pedido', 'detalle-pedido'];
  for (const nombre of modales) {
    const html = await fetch(`modals/modal-${nombre}.html`).then(r => r.text());
    document.body.insertAdjacentHTML('beforeend', html);
  }
}

window.onload = async () => {
  await cargarModales();
  mostrarSeccion("clientes");
}
