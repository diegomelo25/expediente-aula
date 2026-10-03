import { mostrarAviso } from '../componentes/avisos.js';

const pantallas = {};
const historial = [];
let pantallaActual = null;

export function registrarPantalla(nombre, funcion) {
    pantallas[nombre] = funcion;
}

export function irA(nombre, datos = {}) {
    if (!pantallas[nombre]) {
        mostrarAviso('Esta parte del juego está en construcción.');
        return;
    }

    if (pantallaActual) {
        historial.push(pantallaActual);
    }
    pantallaActual = { nombre: nombre, datos: datos };

    const app = document.querySelector('#app');
    app.innerHTML = '';
    pantallas[nombre](app, datos);

    app.firstElementChild.classList.add('entrar');
    window.scrollTo(0, 0);
}

export function volver() {
    const anterior = historial.pop();
    pantallaActual = null;

    if (anterior) {
        irA(anterior.nombre, anterior.datos);
    } else {
        irA('titulo');
    }
}

export function irAlInicio() {
    historial.length = 0;
    pantallaActual = null;
    irA('titulo');
}