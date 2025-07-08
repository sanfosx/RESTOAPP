function listarPedidos() {
  postAPI("pedidos", "listar").then(res => {
    if (!res.success) return mostrarResultado(res);
    renderTabla("pedidos", res.data);
  });
}

function abrirModalPedido(pedido = null) {
  document.getElementById("modalPedidoID").value = pedido?.ID || "";
  document.getElementById("modalPedidoCliente").value = pedido?.ClienteID || "";
  document.getElementById("modalPedidoEntrega").value = pedido?.Entrega || "retiro";
  document.getElementById("modalPedido").classList.remove("hidden");
}

function guardarPedido() {
  const data = {
    ID: document.getElementById("modalPedidoID").value.trim(),
    ClienteID: document.getElementById("modalPedidoCliente").value.trim(),
    Entrega: document.getElementById("modalPedidoEntrega").value
  };
  const action = data.ID ? "actualizar" : "crear";
  postAPI("pedidos", action, data).then(res => {
    mostrarResultado(res);
    cerrarModal("modalPedido");
    listarPedidos();
  });
}

function eliminarPedidoPorID(id) {
  if (!confirm("¿Eliminar este pedido?")) return;
  postAPI("pedidos", "eliminar", { ID: id }).then(res => {
    mostrarResultado(res);
    listarPedidos();
  });
}

function verDetallePedido(id) {
  postAPI("pedidos", "detalle", { PedidoID: id }).then(res => {
    if (!res.success) return mostrarResultado(res);
    const contenedor = document.getElementById("detallePedidoBody");
    contenedor.innerHTML = res.data.map(item => `
      <tr>
        <td class="px-4 py-2">${item.ProductoID}</td>
        <td class="px-4 py-2">${item.NombreProducto}</td>
        <td class="px-4 py-2">${item.Cantidad}</td>
        <td class="px-4 py-2">${item.PrecioUnitario}</td>
        <td class="px-4 py-2">${item.Subtotal}</td>
      </tr>`).join("");
    document.getElementById("modalDetallePedido").classList.remove("hidden");
  });
}