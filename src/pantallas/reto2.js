import { casos } from '../contenido/casos/lista.js';
import { crearBarra } from '../componentes/barra.js';
import { crearPregunta } from '../componentes/pregunta.js';
import { crearFicha } from '../componentes/ficha.js';
import { activarOpcionMultiple } from '../retos/opcion-multiple.js';
import { sonar } from '../herramientas/sonido.js';
import { volver } from '../herramientas/navegacion.js';

export function pantallaReto2(app, datos) {
    const caso = casos[datos.caso];
    const reto = caso.reto2;

    app.innerHTML = `
    <div class="madera pantalla">
      ${crearBarra('Reto 2', true)}
      <div class="reto-contenido ficha-primero">
        ${crearFicha(reto.ficha)}
        ${crearPregunta(reto)}
      </div>
    </div>
  `;

    activarOpcionMultiple(app, reto, caso.id, 2);

    app.querySelector('#volver').addEventListener('click', function () {
        sonar('clic');
        volver();
    });
}