/* ----- CLIENTES ----- */

function listarClientes() {
    postAPI("clientes", "listar").then((res) => {
        if (!res.success) return mostrarResultado(res);
        renderTabla("clientes", res.data);
    });
}

function abrirModalCliente(cliente = null) {
    document.getElementById("modalClienteID").value = cliente?.ID || "";
    document.getElementById("modalClienteNombre").value = cliente?.Nombre || "";
    document.getElementById("modalClienteTelefono").value = cliente?.Teléfono || "";
    document.getElementById("modalClienteEmail").value = cliente?.Email || "";
    document.getElementById("modalClienteDireccion").value = cliente?.Dirección || "";
    document.getElementById("modalCliente").classList.remove("hidden");
}

function cerrarModal(id) {
    document.getElementById(id).classList.add("hidden");
}

function guardarCliente() {
    const data = {
        ID: document.getElementById("modalClienteID").value.trim(),
        Nombre: document.getElementById("modalClienteNombre").value.trim(),
        Teléfono: document.getElementById("modalClienteTelefono").value.trim(),
        Email: document.getElementById("modalClienteEmail").value.trim(),
        Dirección: document.getElementById("modalClienteDireccion").value.trim(),
    };
    const action = data.ID ? "actualizar" : "crear";
    postAPI("clientes", action, data).then((res) => {
        mostrarResultado(res);
        cerrarModal("modalCliente");
        listarClientes();
    });
}

function eliminarClientePorID(id) {
    if (!confirm("¿Estás seguro que deseas eliminar este cliente?")) return;
    postAPI("clientes", "eliminar", { ID: id }).then((res) => {
        mostrarResultado(res);
        listarClientes();
    });
}