import { casos } from '../contenido/casos/lista.js';
import { crearPapel } from '../componentes/papel.js';
import { crearTira } from '../componentes/tira.js';
import { crearEstrellas, sonarEstrellas } from '../componentes/estrellas.js';
import { escribirTexto } from '../herramientas/escribir.js';
import { calcularEstrellas, tiempoFinal, obtenerConteo, marcarResuelto, guardarEnRanking } from '../herramientas/progreso.js';
import { sonar } from '../herramientas/sonido.js';
import { irA } from '../herramientas/navegacion.js';

function formatearTiempo(segundos) {
  const minutos = Math.floor(segundos / 60);
  const resto = segundos % 60;
  return minutos + ':' + String(resto).padStart(2, '0');
}

export function pantallaResultados(app, datos) {
  const caso = casos[datos.caso];
  const nombre = localStorage.getItem('nombre') || 'detective';

  marcarResuelto(caso.id);

  const estrellas = calcularEstrellas(caso.id);
  const segundos = tiempoFinal(caso.id);
  const conteo = obtenerConteo(caso.id);

  guardarEnRanking(caso.id, nombre, segundos);

  app.innerHTML = `
    <div class="pantalla resultados">
      <div class="resultados-fondo"></div>
      <button class="btn-volver btn-flotante" id="volver">←</button>

      <div class="resultados-contenido">
        <div class="tarjeta-resultado">
          ${crearPapel(`
            ${crearEstrellas(estrellas)}
            <h2>¡Has descubierto la pista!</h2>
            <p>${caso.resultado.texto}</p>

            <div class="resultado-pie">
              <div>
                <span class="etiqueta-pie">Pista descubierta</span>
                <span class="pista-descubierta">${caso.resultado.pista}</span>
                <span class="detalle-resultado">${conteo.errores} errores · ${conteo.pistas} pistas</span>
              </div>
              <div>
                <span class="etiqueta-pie" style="text-align:right">Tiempo</span>
                <span class="tiempo">${formatearTiempo(segundos)}</span>
              </div>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:14px; flex-wrap:wrap; margin-top:24px">
              <button class="btn btn-gris" id="verRanking">Ver ranking</button>
              <button class="btn" id="seguir">Seguir</button>
            </div>
          `)}
        </div>

        <img class="resultados-tomas" src="/img/personajes/tomas-pensativo.png" alt="Tomás pensativo">
      </div>

      ${crearTira()}
    </div>
  `;

  sonarEstrellas(estrellas);

  setTimeout(function () {
    const frase = caso.tomas.resultados.replace('{nombre}', nombre);
    escribirTexto(app.querySelector('#dialogo'), frase);
  }, 1500);

  app.querySelector('#verRanking').addEventListener('click', function () {
    sonar('papel');
    irA('ranking', { caso: caso.id });
  });

  app.querySelector('#seguir').addEventListener('click', function () {
    sonar('papel');
    irA('casos', { materia: caso.materia });
  });

  app.querySelector('#volver').addEventListener('click', function () {
    sonar('clic');
    irA('casos', { materia: caso.materia });
  });
}