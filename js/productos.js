
function guardarProductos() {
    localStorage.setItem("productos", JSON.stringify(inventario));
}


let set_id = 1;

class Producto {
    constructor(nombre, precio, rubro = '') {
        this.nombre = nombre;
        this.precio = precio;
        this.rubro = rubro;
        this.id = set_id++;
        this.stock = Math.ceil((Math.random() * (20 - 5)) + 5);
    }
}

function cargarProductos() {
    const productosGuardados = localStorage.getItem("productos");
    if (productosGuardados) {
        const productosArray = JSON.parse(productosGuardados);
        return productosArray.map(producto => new Producto(producto.nombre, producto.precio, producto.rubro));
    }
    return [];
}
