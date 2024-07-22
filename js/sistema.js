class Sistema {
    constructor(productos) {
        this.productos = productos;
    }

    nuevoProducto() {
        const nombre = solicitarDato('cadena', 'Ingrese el nombre del producto');
        const rubro = solicitarDato('cadena', 'Ingrese el rubro del producto');
        const precio = solicitarDato('numeroEntero', 'Ingrese el precio del producto');
        this.productos.push(new Producto(nombre, precio, rubro));
    }
}

function buscarId(productos) {
    const id = solicitarDato('cadena', 'Ingrese el ID del producto');
    return productos.find((producto) => producto.id == id);
}

function textoMenu(opciones) {
    return opciones.join('');
}

function mostrarTabla(datos) {
    console.clear();
    console.table(datos);
}

function incrementarPrecios(productos) {
    let porcentaje = solicitarDato('numero', 'Ingrese el porcentaje de aumento a aplicar o 0 para cancelar');
    productos.forEach((producto) => {
        producto.precio = ((producto.precio * porcentaje) / 100) + producto.precio;
    });
    mostrarTabla(productos);
}

function filtrarProductos(productos) {
    let busqueda = solicitarDato('cadena', 'Ingrese la palabra o frase, se buscará en nombre');
    const result = productos.filter((producto) =>
        producto.nombre.toLowerCase().indexOf(busqueda.toLowerCase()) != -1 || 
        (producto.rubro && producto.rubro.toLowerCase().indexOf(busqueda.toLowerCase()) != -1)
    );
    mostrarTabla(result);
    if (result.length == 0) {
        alert(`Su búsqueda ${busqueda} arrojó 0 resultados`);
    }
    console.log(`Se encontraron ${result.length} resultados para su búsqueda ${busqueda}`);
}

function editarProducto(producto) {
    producto = buscarId(productos);
    if (!producto) {
        alert("Producto no encontrado");
        return;
    }
    producto.nombre = solicitarDato('cadena', 'Ingrese el nombre del producto', producto.nombre);
    producto.precio = solicitarDato('numeroEntero', 'Ingrese el precio del producto', producto.precio);
    producto.stock = solicitarDato('numeroEntero', 'Ingrese el stock disponible del producto', producto.stock);
}
