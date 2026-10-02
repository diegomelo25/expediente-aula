import { casos } from '../contenido/casos/lista.js';
import { crearBarra } from '../componentes/barra.js';
import { crearPregunta } from '../componentes/pregunta.js';
import { activarOpcionMultiple } from '../retos/opcion-multiple.js';
import { sonar } from '../herramientas/sonido.js';
import { volver } from '../herramientas/navegacion.js';

export function pantallaReto1(app, datos) {
    const caso = casos[datos.caso];
    const reto = caso.reto1;

    app.innerHTML = `
    <div class="madera pantalla">
      ${crearBarra('Reto 1', true)}
      <div class="reto-contenido">
        ${crearPregunta(reto)}
        <div class="foto-evidencia">
          <img src="${reto.imagen}" alt="Evidencia del reto">
        </div>
      </div>
    </div>
  `;

    activarOpcionMultiple(app, reto, caso.id, 1);

    app.querySelector('#volver').addEventListener('click', function () {
        sonar('clic');
        volver();
    });
}