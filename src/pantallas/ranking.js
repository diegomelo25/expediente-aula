import { jugadoresEjemplo } from '../contenido/ranking.js';
import { crearBarra } from '../componentes/barra.js';
import { crearEstrellas } from '../componentes/estrellas.js';
import { leerRanking } from '../herramientas/progreso.js';
import { sonar } from '../herramientas/sonido.js';
import { volver } from '../herramientas/navegacion.js';

function formatearTiempo(segundos) {
    const minutos = Math.floor(segundos / 60);
    const resto = segundos % 60;
    return minutos + ':' + String(resto).padStart(2, '0');
}

export function pantallaRanking(app, datos) {
    const idCaso = datos.caso || 'fabrica-detenida';
    const miNombre = localStorage.getItem('nombre') || 'detective';

    const reales = leerRanking(idCaso);
    const todos = [...jugadoresEjemplo, ...reales];

    todos.sort(function (a, b) {
        return a.segundos - b.segundos;
    });

    let htmlFilas = '';
    todos.forEach(function (jugador, i) {
        const esTu = (jugador.nombre === miNombre);
        htmlFilas += `
      <li class="ranking-fila ${esTu ? 'tu' : ''}" style="animation-delay: ${i * 0.06}s">
        <span>#${i + 1} ${jugador.nombre}${esTu ? '<small>(tú)</small>' : ''}</span>
        <span>${formatearTiempo(jugador.segundos)}</span>
      </li>
    `;
    });

    app.innerHTML = `
    <div class="pantalla oficina-borrosa">
      ${crearBarra('LeaderBoard', true)}

      <div class="papel ranking-hoja">
        ${crearEstrellas(3)}
        <ol class="ranking-lista">${htmlFilas}</ol>
      </div>
    </div>
  `;

    app.querySelector('#volver').addEventListener('click', function () {
        sonar('clic');
        volver();
    });
}