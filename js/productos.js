
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

// function cargarProductos(datos) {
//     console.log("Cargar productos desde datos");
//     if (datos) {
//         inventarioStock = datos.map(producto => new Producto(producto.nombre, producto.precio, producto.rubro, producto.id));
//         mostrarTabla(inventarioStock); 
//     } else {
//         console.error("No hay datos para cargar.");
//     }
// }

// function cargarProductosDesdeDB() {
//     console.log("Cargar productos desde db.json");
//     fetch('./js/db.json')
//         .then(response => response.json())
//         .then(datos => {
//             console.log('Datos recibidos desde db.json:', datos); 
//             cargarProductos(datos); 
//             guardarProductos(); 
//         })
//         .catch(error => {
//             console.error('Error al cargar los productos:', error); 
//         });
// }

// function cargarProductosDesdeDB() {
//     console.log("Cargar productos desde db.json");
//     fetch('./js/db.json')
//         .then(response => response.json())
//         .then(datos => {
//             console.log('Datos recibidos desde db.json:', datos);

//             // Cargar productos desde DB solo si no hay productos en el localStorage
//             const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];
//             const productosNuevos = datos.filter(producto => 
//                 productosGuardados.some(p => p.id === producto.id)
//             );
            
//             // Guardar productos nuevos en el localStorage
//             const productosActualizados = [...productosGuardados, ...productosNuevos];
//             localStorage.setItem("productos", JSON.stringify(productosActualizados));
//             console.log('Productos guardados en el LocalStorage');

//             // Cargar y mostrar productos
//             cargarProductos(productosActualizados);
//         })
//         .catch(error => {
//             console.error('Error al cargar los productos:', error);
//         });
// }

function cargarProductosDesdeDB() {
    console.log("Cargar productos desde db.json");
    fetch('./js/db.json')
        .then(response => response.json())
        .then(datos => {
            console.log('Datos recibidos desde db.json:', datos);

            // Recuperar productos guardados en localStorage
            const productosGuardados = JSON.parse(localStorage.getItem("productos")) || [];

            // Crear un conjunto de IDs de productos existentes
            const idsGuardados = new Set(productosGuardados.map(p => p.id));

            // Filtrar productos nuevos que no están en localStorage
            const productosNuevos = datos.filter(producto => !idsGuardados.has(producto.id));

            // Combinar productos guardados y nuevos
            const productosActualizados = [...productosGuardados, ...productosNuevos];
            
            // Actualizar localStorage
            localStorage.setItem("productos", JSON.stringify(productosActualizados));
            console.log('Productos guardados en el LocalStorage');

            // Mostrar productos en la tabla
            // mostrarTabla(productosActualizados);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
}

function cargarProductos(datos) {
    console.log("Cargar productos desde datos");
    if (datos) {
        inventarioStock = datos.map(producto => new Producto(producto.nombre, producto.precio, producto.rubro, producto.id));
        // mostrarTabla(inventarioStock);
    } else {
        console.error("No hay datos para cargar.");
    }
}


// function guardarProductos() {
//     localStorage.setItem("productos", JSON.stringify(inventarioStock));
//     console.log('Guarde los productos en el LocalStorage')
// }

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




