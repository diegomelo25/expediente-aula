import { casos } from '../contenido/casos/lista.js';
import { crearTira } from '../componentes/tira.js';
import { escribirTexto } from '../herramientas/escribir.js';
import { retosHechos, siguienteReto } from '../herramientas/progreso.js';
import { sonar } from '../herramientas/sonido.js';
import { irA, volver } from '../herramientas/navegacion.js';

export function pantallaArchivo(app, datos) {
    const caso = casos[datos.caso];
    const hechos = retosHechos(caso.id);
    const siguiente = siguienteReto(caso.id);

    let htmlEvidencias = '';
    caso.evidencias.forEach(function (evidencia, i) {
        htmlEvidencias += `
      <div class="evidencia evidencia-${i + 1}">
        <img src="${evidencia.imagen}" alt="${evidencia.descripcion}">
      </div>
    `;
    });

    let htmlMision = '';
    caso.mision.forEach(function (pregunta, i) {
        const reto = caso.misionRetos[i];
        const clase = hechos.includes(reto) ? 'hecha' : '';
        htmlMision += `<li class="${clase}">${pregunta}</li>`;
    });

    let textoBoton = 'Examinar evidencia';
    if (hechos.length > 0) textoBoton = 'Seguir investigando';
    if (siguiente === null) textoBoton = 'Ver resultado';

    app.innerHTML = `
    <div class="madera pantalla archivo">
      <button class="btn-volver btn-flotante" id="volver">←</button>

      <div class="archivo-carpeta">
        <div class="mitad mitad-izq">
          <span class="nota"><span class="clip">📎</span></span>
          ${htmlEvidencias}
        </div>

        <div class="mitad mitad-der">
          <div class="papel mision">
            <h2>Reconstruye el archivo de Gabriel</h2>
            <p>Para descubrir el mensaje oculto necesitas identificar:</p>
            <ol>${htmlMision}</ol>
          </div>
          <button class="btn" id="examinar">${textoBoton}</button>
        </div>
      </div>

      ${crearTira()}
    </div>
  `;

    setTimeout(function () {
        escribirTexto(app.querySelector('#dialogo'), caso.tomas.archivo);
    }, 1000);

    app.querySelector('#examinar').addEventListener('click', function () {
        sonar('papel');
        if (siguiente === null) {
            irA('resultados', { caso: caso.id });
        } else {
            irA('reto' + siguiente, { caso: caso.id });
        }
    });

    app.querySelector('#volver').addEventListener('click', function () {
        sonar('clic');
        volver();
    });
}