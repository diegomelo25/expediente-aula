import { crearBarra } from '../componentes/barra.js';
import { crearPapel } from '../componentes/papel.js';
import { descontarPausa } from '../herramientas/progreso.js';
import { sonar, detenerMusica, iniciarMusica } from '../herramientas/sonido.js';
import { volver } from '../herramientas/navegacion.js';

export function pantallaPausa(app) {
    const inicio = Date.now();

    app.innerHTML = `
    <div class="kraft pantalla">
      ${crearBarra('Progreso')}

      <div class="pausa">
        <h2>PAUSA</h2>
        ${crearPapel('<span id="relojPausa">00:00</span>', 'reloj-pausa')}
        <div class="taza-grande">☕</div>
        <p>El reloj del caso está detenido. Respira, estira las piernas y vuelve cuando quieras.</p>
      </div>
    </div>
  `;

    detenerMusica();

    const reloj = app.querySelector('#relojPausa');

    const intervalo = setInterval(function () {
        const segundos = Math.floor((Date.now() - inicio) / 1000);
        const minutos = String(Math.floor(segundos / 60)).padStart(2, '0');
        const resto = String(segundos % 60).padStart(2, '0');
        reloj.textContent = minutos + ':' + resto;
    }, 1000);

    app.querySelector('#volver').addEventListener('click', function () {
        clearInterval(intervalo);

        const segundosPausa = Math.floor((Date.now() - inicio) / 1000);
        const idCaso = localStorage.getItem('casoActual');
        if (idCaso) {
            descontarPausa(idCaso, segundosPausa);
        }

        sonar('clic');
        iniciarMusica();
        volver();
    });
}