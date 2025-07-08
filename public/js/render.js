function renderTabla(seccion, data) {
  const table = document.getElementById(`tabla${capitalize(seccion)}`);
  const thead = table.querySelector("thead");
  const tbody = table.querySelector("tbody");

  if (!data || data.length === 0) {
    table.classList.add("hidden");
    return;
  }

  let columnas = Object.keys(data[0]);
  columnas.push("Acciones");

  thead.innerHTML = "<tr>" + columnas.map(k =>
    `<th class='px-4 py-2 text-left'>${k}</th>`).join("") + "</tr>";

  tbody.innerHTML = data.map(row => {
    let acciones = generarAccionesPorSeccion(seccion, row);
    return "<tr class='border-b'>" +
      Object.values(row).map(v => `<td class='px-4 py-2'>${v}</td>`).join("") +
      `<td class='px-4 py-2'>${acciones}</td></tr>`;
  }).join("");

  table.classList.remove("hidden");
}

function generarAccionesPorSeccion(seccion, row) {
  const id = row.ID;
  const json = JSON.stringify(row);
  switch (seccion) {
    case "clientes":
      return `
        <button onclick='abrirModalCliente(${json})' class='text-blue-600 hover:underline mr-2'>Editar</button>
        <button onclick='eliminarClientePorID("${id}")' class='text-red-600 hover:underline'>Eliminar</button>`;
    case "usuarios":
      return `
        <button onclick='abrirModalUsuario(${json})' class='text-blue-600 hover:underline mr-2'>Editar</button>
        <button onclick='eliminarUsuarioPorID("${id}")' class='text-red-600 hover:underline'>Eliminar</button>`;
    case "mesas":
      return `
        <button onclick='abrirModalMesa(${json})' class='text-blue-600 hover:underline mr-2'>Editar</button>
        <button onclick='eliminarMesaPorID("${id}")' class='text-red-600 hover:underline'>Eliminar</button>`;
    case "productos":
      return `
        <button onclick='abrirModalProducto(${json})' class='text-blue-600 hover:underline mr-2'>Editar</button>
        <button onclick='eliminarProductoPorID("${id}")' class='text-red-600 hover:underline'>Eliminar</button>`;
    default:
      return "";
  }
}
