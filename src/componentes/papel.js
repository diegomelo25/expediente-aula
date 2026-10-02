export function crearPapel(contenido, claseExtra = '') {
    return `<div class="papel ${claseExtra}">${contenido}</div>`;
}