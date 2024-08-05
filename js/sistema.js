class Sistema {
    constructor(productos) {
        this.productos = productos;
    }

    nuevoProducto() {
        const nombre = solicitarDato("cadena", "Ingrese el nombre del producto");
        const rubro = solicitarDato("cadena", "Ingrese el rubro del producto");
        const precio = solicitarDato(
            "numeroEntero",
            "Ingrese el precio del producto"
        );
        this.productos.push(new Producto(nombre, precio, rubro));
    }
}
function mostrarTabla(datos) {
    let tablita = document.querySelector('#tabla-productos')

    tablita.innerHTML = `
<div class="relative overflow-x-auto w-full md:w-[600px] lg:w-[900px]">
    <table class="w-full text-sm text-left rtl:text-right text-white">
        <thead class="text-xs  uppercase bg-cyan-900 ">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Nombre
                </th>
                <th scope="col" class="px-6 py-3">
                    Precio
                </th>
                <th scope="col" class="px-6 py-3">
                    Rubro
                </th>
                <th scope="col" class="px-6 py-3">
                    Stock
                </th>
                <th scope="col" class="px-6 py-3">
                    Accion
                </th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    </table>
</div>
    `
    let tbody = tablita.querySelector('tbody');

    datos.forEach((producto => {
        tbody.innerHTML += `
        <tr class="bg-cyan-700 border-b even:bg-cyan-950" id='${producto.nombre}-${producto.id}'>
                <th scope="row" class="px-6 py-4 font-medium whitespace-nowrap text-white">
                    ${producto.nombre}	
                </th>
                <td class="px-6 py-4">
                    ${producto.precio}
                </td>
                <td class="px-6 py-4">
                    ${producto.rubro}
                </td>
                <td class="px-6 py-4">
                    ${producto.stock}
                </td>
                <td><button class="bg-red-500 text-white p-1 rounded" onclick="eliminarProducto(${producto.id})">Eliminar</button></td>
            </tr>
        `
    }))
    console.clear();
    console.table(datos);
}