 // Productos
 
    function listarProductos () {
      postAPI("productos", "listar").then(res => {
        if (!res.success) return mostrarResultado(res);
        renderTabla("productos", res.data);
      });
    }

    function abrirModalProducto(producto = null) {
      document.getElementById("modalProductoID").value = producto?.ID || "";
      document.getElementById("modalProductoNombre").value = producto?.Nombre || "";
      document.getElementById("modalProductoPrecio").value = producto?.Precio || "";
      document.getElementById("modalProductoCategoria").value = producto?.Categoría || "";
      document.getElementById("modalProductoDescripcion").value = producto?.Descripción || "";
      document.getElementById("modalProductoStock").value = producto?.Stock || "";
      document.getElementById("modalProducto").classList.remove("hidden");
    }

    function guardarProducto() {
      const data = {
        ID: document.getElementById("modalProductoID").value.trim(),
        Nombre: document.getElementById("modalProductoNombre").value.trim(),
        Precio: parseFloat(document.getElementById("modalProductoPrecio").value.trim()),
        Categoría: document.getElementById("modalProductoCategoria").value.trim(),
        Descripción: document.getElementById("modalProductoDescripcion").value.trim(),
        Stock: parseInt(document.getElementById("modalProductoStock").value.trim()),
      };
      const action = data.ID ? "actualizar" : "crear";
      postAPI("productos", action, data).then((res) => {
        mostrarResultado(res);
        cerrarModal("modalProducto");
        listarProductos();
      });
    }

    function eliminarProductoPorID(id) {
      if (!confirm("¿Estás seguro que deseas eliminar este producto?")) return;
      postAPI("productos", "eliminar", { ID: id }).then((res) => {
        mostrarResultado(res);
        listarProductos();
      });
    }