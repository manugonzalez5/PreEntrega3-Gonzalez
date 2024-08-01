

function guardarProductos() {
    localStorage.setItem('productos', JSON.stringify(productos));
}

let listProductos = document.querySelector("#listar-productos");
let agregarProducto = document.querySelector("#agregar-producto");
let buscarProducto = document.querySelector("#buscar-producto");
let incrementarPrecioss = document.querySelector("#incrementar-producto");
let editarProductoss  = document.querySelector("#editar-producto");





listProductos.addEventListener("click", () => {
    let formulario = document.querySelector("#form");
    formulario.innerHTML = '';
mostrarTabla(productos);
});

let alerta = document.querySelector("#alert");


agregarProducto.addEventListener("click", () => {
    
let formulario = document.querySelector("#form");

formulario.innerHTML = `<input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1 md:col-span-2" placeholder="Nombre de producto" type="text" id="nombre" />
    <input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1" placeholder="Rubro de producto" type="text" id="rubro" />
    <input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1" placeholder="Precio de producto" type="number" id="precio" />
    <button type="submit" class="p-2 text-center bg-cyan-600 text-white col-start-1 md:col-start-2 hover:bg-cyan-900 self-end" id="submitProducto">Agregar Producto</button>`;

document.querySelector("#submitProducto").addEventListener("click", (event) => {
    event.preventDefault();

    let nombre = document.querySelector("#nombre").value;
    let precio = document.querySelector("#precio").value;
    let rubro = document.querySelector("#rubro").value;
    console.log(nombre, precio, rubro);
    if (nombre && rubro && precio) {
        let productoExiste = productos.some(
        (producto) => producto.nombre === nombre);
        if (!productoExiste) {
        let nuevoProducto = new Producto(nombre, parseFloat(precio), rubro);
        productos.push(nuevoProducto);
        guardarProductos();
        mostrarTabla(productos);
        formulario.reset();
        alerta.innerHTML = `<p class="w-full h-full bg-green-300 p-4">${nombre} agregado con exito!</p>`;
        } else {
        alerta.innerHTML = `<p class="w-full h-full bg-red-300 p-4">${nombre} ya existe!</p>`;
        }
    } else {
        alerta.innerHTML = `<p class="w-full h-full bg-red-300 p-4">Por favor completa los campos</p>`;
    }
    setTimeout(() => {
        alerta.innerHTML = '';
    }, 3000);
    });
mostrarTabla(productos);
});


buscarProducto.addEventListener("click", () => {
    
let formulario = document.querySelector("#form");

formulario.innerHTML = `<input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1" placeholder="Nombre de producto" type="text" id="nombre" />
    <button type="submit" class="p-2 text-center bg-cyan-600 text-white col-start-1 md:col-start-2 hover:bg-cyan-900 self-end" id="submitProducto">Buscar Producto</button>`;

document.querySelector("#submitProducto").addEventListener("click", (event) => {
    event.preventDefault(); 

    let nombre = document.querySelector("#nombre").value;
    console.log(nombre);
    if (nombre) {
        let productoExiste = productos.some(
            (producto) => producto.nombre === nombre);
        if (!productoExiste) {
            alerta.innerHTML = `<p class="w-full h-full bg-red-300 p-4">${nombre} no existe!</p>`;
        } else {
            alerta.innerHTML = `<p class="w-full h-full bg-green-300 p-4">${nombre} existe!</p>`;
        }
    } else {
        alerta.innerHTML = `<p class="w-full h-full bg-red-300 p-4">Por favor completa el campo "Nombre de producto"</p>`;
    }
    setTimeout(() => {
        alerta.innerHTML = '';
    }, 3000);
    });
    mostrarTabla(productos);
});


incrementarPrecioss.addEventListener("click", () => {
    let formulario = document.querySelector("#form");

    formulario.innerHTML = `
        <input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1" placeholder="Porcentaje de aumento" type="number" id="porcentaje" />
        <button type="submit" class="p-2 text-center bg-cyan-600 text-white col-start-1 md:col-start-2 hover:bg-cyan-900 self-end" id="submitIncremento">Incrementar Precios</button>`;

    document.querySelector("#submitIncremento").addEventListener("click", (event) => {
        event.preventDefault();

        let porcentaje = parseFloat(document.querySelector("#porcentaje").value);
        if (!isNaN(porcentaje)) {
            productos.forEach((producto) => {
                producto.precio += (producto.precio * porcentaje) / 100;
            });
            guardarProductos();
            mostrarTabla(productos);
        } else {
            alerta.innerHTML = `<p class="w-full h-full bg-red-300 p-4">Por favor ingresa un porcentaje válido</p>`;
        }
        setTimeout(() => {
            alerta.innerHTML = '';
        }, 3000);
    });
    mostrarTabla(productos);
});


editarProductoss.addEventListener("click", () => {
    let formulario = document.querySelector("#form");
    formulario.innerHTML = `<input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1 md:col-span-2" placeholder="Nombre de producto" type="text" id="nombre" />
    <input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1" placeholder="Rubro de producto" type="text" id="rubro" />
    <input class="p-2 border border-cyan-600 outline-none focus:ring-cyan-600 col-span-1" placeholder="Precio de producto" type="number" id="precio" />
    <button type="submit" class="p-2 text-center bg-cyan-600 text-white col-start-1 md:col-start-2 hover:bg-cyan-900 self-end" id="submitProducto">Editar Producto</button>`;

    document.querySelector("#submitProducto").addEventListener("click", (event) => {
        event.preventDefault();

        let nombre = document.querySelector("#nombre").value;
        let rubro = document.querySelector("#rubro").value;
        let precio = document.querySelector("#precio").value;
        if (nombre && rubro && precio) {
            let productoExiste = productos.some(
            (producto) => producto.nombre === nombre);
            if (!productoExiste) { 
                alerta.innerHTML = `<p class="w-full h-full bg-red-300 p-4">${nombre} no existe!</p>`;
            } else {
                let index = productos.findIndex((producto) => producto.nombre === nombre);
                productos[index].rubro = rubro;
                productos[index].precio = parseFloat(precio);
                guardarProductos();
                mostrarTabla(productos);
                alerta.innerHTML = `<p class="w-full h-full bg-green-300 p-4">${nombre} editado con exito!</p>`;
            }
        } else {
            alerta.innerHTML = `<p class="w-full h-full bg-red-300 p-4">Por favor completa los campos</p>`;
        }
        setTimeout(() => {
            alerta.innerHTML = '';
        }, 3000);
        });
        mostrarTabla(productos);
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




