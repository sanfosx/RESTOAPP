function capitalize(txt) {
  return txt.charAt(0).toUpperCase() + txt.slice(1);
}

function mostrarResultado(msg) {
  const r = document.getElementById("resultado");
  r.textContent = JSON.stringify(msg, null, 2);
}

function clearResultado() {
  const r = document.getElementById("resultado");
  if (r) r.innerHTML = "";
}

function cerrarModal(id) {
  document.getElementById(id).classList.add("hidden");
}

function mostrarSeccion(seccion) {
  document.querySelectorAll(".seccion").forEach(s => s.classList.add("hidden"));
  document.getElementById(seccion).classList.remove("hidden");
  document.querySelectorAll(".btn-tab").forEach(b => b.classList.remove("active"));
  const btn = document.getElementById("tab" + capitalize(seccion) + "Btn");
  if (btn) btn.classList.add("active");

  clearResultado();

  if (typeof window["listar" + capitalize(seccion)] === "function") {
    window["listar" + capitalize(seccion)]();
  }
}
