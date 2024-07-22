let sistema_stock = new Sistema(productos);

let menu_str = `
    Ingrese 1 para listar todos los productos.
    Ingrese 2 para agregar producto nuevo.
    Ingrese 3 para buscar productos.
    Ingrese 4 para incrementar todos los precios.
    Ingrese 5 para editar un producto.
    Ingrese 0 para SALIR.
`;

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

while (true) {
    let opcion = Number(prompt(menu_str));
    
    if (opcion === 0) {
        alert("Hasta luego, muchas gracias. Para volver a ejecutar recarga la pagina");
        break; 
    } else if (opcion === 1) {
        mostrarTabla(productos);
    } else if (opcion === 2) {
        sistema_stock.nuevoProducto();
        mostrarTabla(productos);
    } else if (opcion === 3) {
        filtrarProductos(productos);
    } else if (opcion === 4) {
        incrementarPrecios(productos);
        mostrarTabla(productos);
    } else if (opcion === 5) {
        const producto = buscarId(productos);
        editarProducto(producto);
        mostrarTabla(productos);
    } else {
        alert("Opción inexistente. Intente nuevamente.");
    }
}
