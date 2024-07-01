function pesosABitcoin(pesos, tasaCambioBtc) {
    return pesos / tasaCambioBtc;
}

function bitcoinAPesos(bitcoin, tasaCambioBtc) {
    return bitcoin * tasaCambioBtc;
}

function pesosAEthereum(pesos, tasaCambioEth) {
    return pesos / tasaCambioEth;
}

function ethereumAPesos(ethereum, tasaCambioEth) {
    return ethereum * tasaCambioEth;
}

const formatearDecimal = numero => { return numero.toLocaleString('es-AR', { minimunFractionDigits: 10, maximumFractionDigits: 10 }); }

function convertir() {
    let tasaCambioBtc = 62000000.00;

    let tasaCambioEth = 340000.00;

    let opcion = prompt('¿Que operación desea simular? \n 1) Convertir AR$ a BTC \n 2) Convertir BTC a AR$ \n 3) Convertir AR$ a ETH \n 4) Convertir ETH a AR$ \n 5) Salir \n Ingrese 1, 2, 3 o 4 para avanzar.');

    if (opcion === '1') {
        let pesos = parseFloat(prompt('Ingrese la cantidad de AR$ que desea convertir en BTC (ingrese el valor sin puntos ni comas):'))
        if (isNaN(pesos) || pesos <= 0) {
            alert('Por favor ingrese un valor númerico válido.');
        } else {
            let bitcoin = pesosABitcoin(pesos, tasaCambioBtc);
            alert(`El equivalente en bitcoin de AR$${formatearDecimal(pesos)} es ₿${formatearDecimal(bitcoin)}`);
        }
    } else if (opcion === '2') {
        let bitcoin = parseFloat(prompt('Ingrese la cantidad de BTC que desea convertir en AR$ (ingrese el valor sin puntos ni comas):'))
        if (isNaN(bitcoin) || bitcoin <= 0) {
            alert('Por favor ingrese un valor númerico válido.');
        } else {
            let pesos = bitcoinAPesos(bitcoin, tasaCambioBtc);
            alert(`El equivalente en pesos argentinos de ₿${formatearDecimal(bitcoin)} es AR$${formatearDecimal(pesos)}`);
        }
    } else if (opcion === '3') {
        let pesos = parseFloat(prompt('Ingrese la cantidad de AR$ que desea convertir en ETH (ingrese el valor sin puntos ni comas):'))
        if (isNaN(pesos) || pesos <= 0) {
            alert('Por favor ingrese un valor númerico válido.');
        } else {
            let ethereum = pesosAEthereum(pesos, tasaCambioEth);
            alert(`El equivalente en ethereum de AR$${formatearDecimal(pesos)} es ETH ${formatearDecimal(ethereum)}`);
        }
    } else if (opcion === '4') {
        let ethereum = parseFloat(prompt('Ingrese la cantidad de ETH que desea convertir en AR$ (ingrese el valor sin puntos ni comas):'))
        if (isNaN(ethereum) || ethereum <= 0) {
            alert('Por favor ingrese un valor númerico válido.');
        } else {
            let pesos = ethereumAPesos(ethereum, tasaCambioEth);
            alert(`El equivalente en pesos argentinos de ETH ${formatearDecimal(ethereum)} es AR$${formatearDecimal(pesos)}`);
        }
    } if (opcion === '5') {
    alert('Muchas gracias por usar nuestro simulador!');
    } 
    else if (opcion !== '1' && opcion !== '2' && opcion !== '3' && opcion !== '4' && opcion !== '5') {
    alert('Por favor ingrese una opción correcta.');
    }
    while (true) {
        repetir = prompt("¿Desea hacer otra simulación? Elija por 'si' o 'no'.").toLowerCase();
        if (repetir === "si" || repetir === "no") {
            break;
        } else {
            alert("Por favor, responde con 'si' o 'no'.");
        }
    }
    while (repetir === "si") {
        convertir();
    }
    while (repetir === "no") {
        alert("Muchas gracias por usar nuestro simulador!");
        break;
    }
} 

convertir();