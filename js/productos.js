
let set_id = 1

class Producto {
    constructor(nombre, precio, rubro = ''){
        this.nombre = nombre;
        this.precio = precio;
        this.rubro = rubro;
        this.id = set_id++;
        this.stock = Math.ceil((Math.random() * (20 - 5)) + 5);
    }
}

let productos = [
    new Producto('Logitech G PRO X Superlight', 250000, 'Periferico'),
    new Producto('Zowie EC2-A White Edition', 100000, 'Periferico'),
    new Producto('Steelseries QCK Heavy', 50000, 'Accesorio'),
]