import { sonar } from '../herramientas/sonido.js';

export function crearEstrellas(ganadas) {
    let html = '';
    for (let i = 0; i < 3; i++) {
        let clase = 'estrella';
        if (i < ganadas) {
            clase += ' ganada';
        }
        const retraso = 0.3 + i * 0.35;
        html += `<span class="${clase}" style="animation-delay: ${retraso}s">★</span>`;
    }
    return `<div class="estrellas">${html}</div>`;
}

export function sonarEstrellas(ganadas) {
    for (let i = 0; i < ganadas; i++) {
        const retraso = (0.3 + i * 0.35) * 1000;
        setTimeout(function () {
            sonar('estrella');
        }, retraso);
    }
}