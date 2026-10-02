import { casosPorMateria } from '../contenido/casos/lista.js';
import { crearBarra } from '../componentes/barra.js';
import { crearCarpetaCaso } from '../componentes/carpeta.js';
import { mostrarAviso } from '../componentes/avisos.js';
import { estaResuelto } from '../herramientas/progreso.js';
import { sonar } from '../herramientas/sonido.js';
import { irA, volver } from '../herramientas/navegacion.js';

function calcularEstado(casos, i) {
    const caso = casos[i];

    if (estaResuelto(caso.id)) return 'resuelto';
    if (!caso.disponible) return 'bloqueado';
    if (i > 0 && !estaResuelto(casos[i - 1].id)) return 'bloqueado';
    return 'abierto';
}

export function pantallaCasos(app, datos) {
    const casos = casosPorMateria[datos.materia];

    let htmlCarpetas = '';
    for (let i = 0; i < casos.length; i++) {
        const caso = casos[i];
        htmlCarpetas += crearCarpetaCaso(i + 1, caso.titulo, caso.periodo, calcularEstado(casos, i));
    }

    app.innerHTML = `
    <div class="madera">
      ${crearBarra('Selecciona tu caso', true)}
      <div class="grid-casos" style="padding:50px 30px; margin:0 auto">
        ${htmlCarpetas}
      </div>
    </div>
  `;

    const carpetas = app.querySelectorAll('.carpeta-caso');

    carpetas.forEach(function (carpeta, i) {
        carpeta.addEventListener('click', function () {
            const caso = casos[i];
            const estado = calcularEstado(casos, i);

            if (estado === 'bloqueado') {
                sonar('error');
                carpeta.classList.remove('temblar');
                void carpeta.offsetWidth;
                carpeta.classList.add('temblar');

                if (!caso.disponible) {
                    mostrarAviso('Este expediente llega pronto. Gabriel dejó más pistas en la caja…');
                } else {
                    mostrarAviso('Resuelve el caso anterior para abrir este expediente.');
                }
                return;
            }

            sonar('papel');
            irA('portada', { caso: caso.id });
        });
    });

    app.querySelector('#volver').addEventListener('click', function () {
        sonar('clic');
        volver();
    });
}