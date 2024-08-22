
let inventarioStock = [];
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

function cargarProductosDesdeDB() {
    console.log("Cargar productos desde db.json");
    fetch('./js/db.json')
        .then(response => response.json())
        .then(datos => {
            console.log('Datos recibidos desde db.json:', datos);

            const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

            const idsGuardados = new Set(productosGuardados.map(p => p.id));

            const productosNuevos = datos.filter(producto => !idsGuardados.has(producto.id));

            const productosActualizados = [...productosGuardados, ...productosNuevos];

            localStorage.setItem("productos", JSON.stringify(productosActualizados));
            console.log('Productos guardados en el LocalStorage');
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

function cargarProductos(datos) {
    console.log("Cargar productos desde datos");
    if (datos) {
        inventarioStock = datos.map(producto => new Producto(producto.nombre, producto.precio, producto.rubro, producto.id));
    } else {
        console.error("No hay datos para cargar.");
    }
}

function guardarProductos() {
    const productosSerializados = inventarioStock.map(p => ({
        nombre: p.nombre,
        precio: p.precio,
        rubro: p.rubro,
        id: p.id
    }));
    
    localStorage.setItem("productos", JSON.stringify(productosSerializados));
    console.log('Guardé los productos en el LocalStorage');
}

function iniciarCargaProductos() {
    console.log("Iniciando carga de productos...");
    const productosGuardados = JSON.parse(localStorage.getItem("productos"));
    
    if (productosGuardados && productosGuardados.length > 0) {
        cargarProductos(productosGuardados);
    } else {
        cargarProductosDesdeDB();
    }
}

iniciarCargaProductos();