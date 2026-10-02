import { sonar } from './sonido.js';

let intervaloActual = null;
let elementoActual = null;
let textoActual = '';
let alTerminarActual = null;

export function escribirTexto(elemento, texto, velocidad = 30, alTerminar = null) {
    clearInterval(intervaloActual);

    elementoActual = elemento;
    textoActual = texto;
    alTerminarActual = alTerminar;

    let posicion = 0;
    elemento.textContent = '';

    intervaloActual = setInterval(function () {
        elemento.textContent += texto[posicion];

        if (posicion % 3 === 0) {
            sonar('tecla');
        }

        posicion++;

        if (posicion >= texto.length) {
            finalizar();
        }
    }, velocidad);
}

export function estaEscribiendo() {
    return intervaloActual !== null;
}

export function terminarTexto() {
    if (intervaloActual === null) return;
    elementoActual.textContent = textoActual;
    finalizar();
}

function finalizar() {
    clearInterval(intervaloActual);
    intervaloActual = null;

    if (alTerminarActual) {
        const funcion = alTerminarActual;
        alTerminarActual = null;
        funcion();
    }
}