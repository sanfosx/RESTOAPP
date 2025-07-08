
  /* ----- MESAS ----- */
    function listarMesas() {
      postAPI("mesas", "listar").then(res => {
        if (!res.success) return mostrarResultado(res);
        renderTabla("mesas", res.data);
      });
    }

    function abrirModalMesa(mesa = null) {
      document.getElementById("modalMesaID").value = mesa?.ID || "";
      document.getElementById("modalMesaNumero").value = mesa?.Número || "";
      document.getElementById("modalMesaCapacidad").value = mesa?.Capacidad || "";
      document.getElementById("modalMesaEstado").value = mesa?.Estado || "libre";
      document.getElementById("modalMesaUbicacion").value = mesa?.Ubicación || "";
      document.getElementById("modalMesa").classList.remove("hidden");
    }

    function guardarMesa() {
      const data = {
        ID: document.getElementById("modalMesaID").value.trim(),
        Número: document.getElementById("modalMesaNumero").value.trim(),
        Capacidad: document.getElementById("modalMesaCapacidad").value.trim(),
        Estado: document.getElementById("modalMesaEstado").value,
        Ubicación: document.getElementById("modalMesaUbicacion").value.trim(),
      };
      const action = data.ID ? "actualizar" : "crear";
      postAPI("mesas", action, data).then((res) => {
        mostrarResultado(res);
        cerrarModal("modalMesa");
        listarMesas();
      });
    }

    function eliminarMesaPorID(id) {
      if (!confirm("¿Estás seguro que deseas eliminar esta mesa?")) return;
      postAPI("mesas", "eliminar", { ID: id }).then((res) => {
        mostrarResultado(res);
        listarMesas();
      });
    }