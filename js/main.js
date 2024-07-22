let sistema_stock = new Sistema(productos);

let menu_str = `
    Ingrese 1 para listar todos los productos.
    Ingrese 2 para agregar producto nuevo.
    Ingrese 3 para buscar productos.
    Ingrese 4 para incrementar todos los precios.
    Ingrese 5 para editar un producto.
    Ingrese 0 para VOLVER o SALIR.
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

let salir = false;
while (!salir) {
let opcion = parseInt(prompt(menu_str));
switch (opcion) {
    case 0:
    alert(
        "Hasta luego, muchas gracias. Para volver a ejecutar aprete la tecla F5"
    );
    salir = true;
    break;
    case 1:
    mostrarTabla(productos);
    break;
    case 2:
    sistema_stock.nuevoProducto();
    mostrarTabla(productos);
    break;
    case 3:
    filtrarProductos(productos);
    break;
    case 4:
    incrementarPrecios(productos);
    mostrarTabla(productos);
    break;
    case 5:
    producto = buscarId(productos);
    editarProducto(producto);
    mostrarTabla(productos);
    break;
    default:
    alert("Opción inexistente. Intente nuevamente.");
    break;
}
}
