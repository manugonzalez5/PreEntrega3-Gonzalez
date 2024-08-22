document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM completamente cargado");
    cargarProductosDesdeDB();
});

let listProductos = document.querySelector("#listar-productos");
let agregarProducto = document.querySelector("#agregar-producto");
let buscarProducto = document.querySelector("#buscar-producto");
let incrementarPrecioss = document.querySelector("#incrementar-producto");
let editarProductoss = document.querySelector("#editar-producto");
let filtrarRubro = document.querySelector("#filtrar-rubro");


listProductos.addEventListener("click", () => {
    let formulario = document.querySelector("#form");
    formulario.innerHTML = "";
    mostrarTabla(inventarioStock);
});


agregarProducto.addEventListener("click", () => {
    let formulario = document.querySelector("#form");

    formulario.innerHTML = `<input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1 md:col-span-2" placeholder="Nombre de producto" type="text" id="nombre" />
<input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1" placeholder="Rubro de producto" type="text" id="rubro" />
<input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1" placeholder="Precio de producto" type="number" id="precio" />
<button type="submit" class="p-2 text-center bg-cyan-600 text-white col-start-1 md:col-start-2 hover:bg-cyan-900 self-end" id="submitProducto">➕ Agregar Producto</button>`;

    document.querySelector("#submitProducto").addEventListener("click", (event) => {
        event.preventDefault();

        let nombre = document.querySelector("#nombre").value;
        let precio = document.querySelector("#precio").value;
        let rubro = document.querySelector("#rubro").value;
        if (nombre && rubro && precio) {
            let productoExiste = inventarioStock.some(
                (producto) => producto.nombre === nombre
            );
            if (!productoExiste) {
                let nuevoProducto = new Producto(nombre, parseFloat(precio), rubro);
                inventarioStock.push(nuevoProducto);
                guardarProductos();
                mostrarTabla(inventarioStock);
                formulario.reset();
                Toastify({
                    text: "✅ Producto agregado con exito.",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            } else {
                Toastify({
                    text: "❌ Producto existente",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
                    }
                }).showToast();
            }
        } else {
            Toastify({
                text: "⚠️ Completa los campos porfavor.",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #f1c40f, rgb(255, 195, 113))",
                }
            }).showToast();
        }
    });
    mostrarTabla(inventarioStock);

});


buscarProducto.addEventListener("click", () => {
    let formulario = document.querySelector("#form");

    formulario.innerHTML = `
        <input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1" placeholder="Nombre de producto (Respeta las mayúsculas)" type="text" id="nombre" />
        <button type="submit" class="p-2 text-center bg-cyan-600 text-white col-start-1 md:col-start-2 hover:bg-cyan-900 self-end" id="submitProducto">🔍 Buscar Producto</button>
        <button type="button" class="p-2 text-center bg-gray-600 text-white col-start-1 md:col-start-2 hover:bg-gray-900 self-end" id="limpiarFiltrosProducto">🔄️ Limpiar Filtros</button>`;

    document.querySelector("#submitProducto").addEventListener("click", (event) => {
        event.preventDefault();

        let nombre = document.querySelector("#nombre").value.trim();
        if (nombre) {

            let productosFiltrados = inventarioStock.filter(
                (producto) => producto.nombre.includes(nombre)
            );

            if (productosFiltrados.length > 0) {
                mostrarTabla(productosFiltrados);
                Toastify({
                    text: "✅ Productos encontrados.",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            } else {
                Toastify({
                    text: "❌ No se encontraron productos con el nombre ingresado.",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
                    }
                }).showToast();
            }
        } else {
            Toastify({
                text: "⚠️ Completa el campo por favor.",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #f1c40f, rgb(255, 195, 113))",
                }
            }).showToast();
        }
    });


    document.querySelector("#limpiarFiltrosProducto").addEventListener("click", () => {

        document.querySelector("#nombre").value = "";
        mostrarTabla(inventarioStock);
        Toastify({
            text: "✅ Filtros limpiados.",
            className: "info",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    });
    mostrarTabla(inventarioStock);
});


incrementarPrecioss.addEventListener("click", () => {
    let formulario = document.querySelector("#form");

    formulario.innerHTML = `
        <input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1" placeholder="Porcentaje de modificación de precio" type="number" id="porcentaje" />
        <button type="submit" class="p-2 text-center bg-cyan-600 text-white col-start-1 md:col-start-2 hover:bg-cyan-900 self-end" id="submitIncremento">💲 Modificar % Precios</button>`;

    document.querySelector("#submitIncremento").addEventListener("click", (event) => {
        event.preventDefault();

        let porcentaje = parseFloat(document.querySelector("#porcentaje").value);
        if (!isNaN(porcentaje)) {
            inventarioStock.forEach((producto) => {
                producto.precio += (producto.precio * porcentaje) / 100;
            });
            guardarProductos();
            mostrarTabla(inventarioStock);
            Toastify({
                text: "✅ El precio fue modificado",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        } else {
            Toastify({
                text: "⚠️ Ingresa un porcentaje valido porfavor.",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #f1c40f, rgb(255, 195, 113))",
                }
            }).showToast();
        }
    });
    mostrarTabla(inventarioStock);
});


editarProductoss.addEventListener("click", () => {
    let formulario = document.querySelector("#form");
    formulario.innerHTML = `<input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1 md:col-span-2" placeholder="Nombre de producto (Respeta las mayúsculas)" type="text" id="nombre" />
    <input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1" placeholder="Rubro de producto (Respeta las mayúsculas)" type="text" id="rubro" />
    <input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1" placeholder="Precio de producto" type="number" id="precio" />
    <button type="submit" class="p-2 text-center bg-cyan-600 text-white col-start-1 md:col-start-2 hover:bg-cyan-900 self-end" id="submitProducto">📝 Editar Producto</button>`;

    document.querySelector("#submitProducto").addEventListener("click", (event) => {
        event.preventDefault();

        let nombre = document.querySelector("#nombre").value;
        let rubro = document.querySelector("#rubro").value;
        let precio = document.querySelector("#precio").value;
        if (nombre && rubro && precio) {
            let productoExiste = inventarioStock.some(
                (producto) => producto.nombre === nombre
            );
            if (!productoExiste) {
                Toastify({
                    text: "❌ Producto no existente.",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
                    }
                }).showToast();
            } else {
                let index = inventarioStock.findIndex(
                    (producto) => producto.nombre === nombre
                );
                inventarioStock[index].rubro = rubro;
                inventarioStock[index].precio = parseFloat(precio);
                guardarProductos();
                mostrarTabla(inventarioStock);
                Toastify({
                    text: "✅ Producto editado con exito.",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #00b09b, #96c93d)",
                    }
                }).showToast();
            }
        } else {
            Toastify({
                text: "⚠️ Completa los campos porfavor.",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #f1c40f, rgb(255, 195, 113))",
                }
            }).showToast();
        }
        mostrarTabla(inventarioStock);
    });


    filtrarRubro.addEventListener("click", () => {
        let formulario = document.querySelector("#form");
        formulario.innerHTML = `
        <input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1" placeholder="Nombre del rubro (Respeta las mayúsculas)" type="text" id="rubro" />
        <button type="submit" class="p-2 text-center bg-cyan-600 text-white col-start-1 md:col-start-2 hover:bg-cyan-900 self-end" id="submitFiltro">🔍 Filtrar por Rubro</button>
        <button type="button" class="p-2 text-center bg-gray-600 text-white col-start-1 md:col-start-2 hover:bg-gray-900 self-end" id="limpiarFiltros">🔄️ Limpiar Filtros</button>`;

        document.querySelector("#submitFiltro").addEventListener("click", (event) => {
            event.preventDefault();

            let rubro = document.querySelector("#rubro").value;
            if (rubro) {
                let productosFiltrados = inventarioStock.filter(
                    (producto) => producto.rubro.includes(rubro)
                );
                if (productosFiltrados.length > 0) {
                    mostrarTabla(productosFiltrados);
                    Toastify({
                        text: "✅ Productos filtrados.",
                        className: "info",
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                        }
                    }).showToast();
                } else {
                    Toastify({
                        text: `❌ No se encontraron productos en el rubro mencionado.`,
                        className: "info",
                        style: {
                            background: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
                        }
                    }).showToast();
                }
            } else {
                Toastify({
                    text: "⚠️ Completa el campo por favor.",
                    className: "info",
                    style: {
                        background: "linear-gradient(to right, #f1c40f, rgb(255, 195, 113))",
                    }
                }).showToast();
            }
        });
        mostrarTabla(inventarioStock);
        document.querySelector("#limpiarFiltros").addEventListener("click", () => {
            document.querySelector("#rubro").value = "";
            mostrarTabla(inventarioStock);
            Toastify({
                text: "✅ Filtros limpiados.",
                className: "info",
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                }
            }).showToast();
        });
    });
});

function solicitarDato(tipo, mensaje, sugerencia = "") {
    let dato;
    if (tipo == "numero") {
        do {
            dato = parseFloat(prompt(mensaje, sugerencia));
        } while (isNaN(dato) || dato < 0);
    } else if (tipo == "numeroEntero") {
        do {
            dato = parseInt(prompt(mensaje, sugerencia));
        } while (isNaN(dato) || dato < 0);
    } else if (tipo == "cadena") {
        do {
            dato = prompt(mensaje, sugerencia);
        } while (dato == "");
    }
    return dato;
}

function eliminarProducto(id) {
    id = parseInt(id, 10);
    let index = inventarioStock.findIndex((producto) => producto.id === id);

    if (index !== -1) {
        inventarioStock.splice(index, 1);
        guardarProductos();
        mostrarTabla(inventarioStock);
        Toastify({
            text: "✅ Producto eliminado con éxito.",
            className: "info",
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            }
        }).showToast();
    } else {
        Toastify({
            text: "❌ Producto no encontrado.",
            className: "info",
            style: {
                background: "linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113))",
            }
        }).showToast();
    }
}
