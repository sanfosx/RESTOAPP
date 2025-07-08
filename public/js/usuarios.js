
/* ----- USUARIOS ----- */
function listarUsuarios() {
    postAPI("usuarios", "listar").then((res) => {
        if (!res.success) return mostrarResultado(res);
        renderTabla("usuarios", res.data);
    });
}

function abrirModalUsuario(usuario = null) {
    document.getElementById("modalUsuarioID").value = usuario?.ID || "";
    document.getElementById("modalUsuarioNombre").value = usuario?.Nombre || "";
    document.getElementById("modalUsuarioRol").value = usuario?.Rol || "user";
    document.getElementById("modalUsuarioEmail").value = usuario?.Email || "";
    document.getElementById("modalUsuarioPassword").value = "";
    document.getElementById("modalUsuarioActivo").checked = usuario?.Activo !== false;
    document.getElementById("modalUsuario").classList.remove("hidden");
}

function guardarUsuario() {
    const id = document.getElementById("modalUsuarioID").value.trim();
    const nombre = document.getElementById("modalUsuarioNombre").value.trim();
    const rol = document.getElementById("modalUsuarioRol").value;
    const email = document.getElementById("modalUsuarioEmail").value.trim();
    const password = document.getElementById("modalUsuarioPassword").value.trim();
    const activo = document.getElementById("modalUsuarioActivo").checked;

    if (!nombre || !email) {
        alert("Nombre y Email son obligatorios.");
        return;
    }

    // Nota: El hash de contraseña lo debería hacer backend (Apps Script)
    // Aquí enviamos la contraseña en texto plano (solo demo)
    const data = {
        ID: id,
        Nombre: nombre,
        Rol: rol,
        Email: email,
        ContraseñaHash: password ? password : undefined,
        Activo: activo,
    };

    const action = id ? "actualizar" : "crear";
    postAPI("usuarios", action, data).then((res) => {
        mostrarResultado(res);
        cerrarModal("modalUsuario");
        listarUsuarios();
    });
}

function eliminarUsuarioPorID(id) {
    if (!confirm("¿Estás seguro que deseas eliminar este usuario?")) return;
    postAPI("usuarios", "eliminar", { ID: id }).then((res) => {
        mostrarResultado(res);
        listarUsuarios();
    });
}