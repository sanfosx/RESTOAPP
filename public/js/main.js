
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
}

window.onload = () => mostrarSeccion("clientes");
