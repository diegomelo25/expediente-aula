export function crearBoton(texto, claseExtra = '') {
    return `<button class="btn ${claseExtra}">${texto}</button>`;
}