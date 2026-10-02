import { lineasIntro } from '../contenido/intro.js';
import { escribirTexto, estaEscribiendo, terminarTexto } from '../herramientas/escribir.js';
import { sonar } from '../herramientas/sonido.js';
import { irA } from '../herramientas/navegacion.js';

export function pantallaIntro(app) {
    const nombre = localStorage.getItem('nombre') || 'detective';

    app.innerHTML = `
    <div class="escena">
      <img class="escena-caja" id="caja" src="/img/fondos/caja-documentos.png" alt="Caja con documentos de Gabriel">
      <img class="escena-tomas" id="tomas" src="/img/personajes/tomas-brazos-cruzados.png" alt="Tomás Gonzales">

      <button class="btn-saltar" id="saltar">Saltar</button>

      <div class="papel dialogo" id="dialogo">
        <span class="dialogo-nombre">Tomás Gonzales</span>
        <p class="dialogo-texto" id="texto"></p>
        <div class="dialogo-abajo" id="abajo">
          <span class="toca-seguir">Toca para seguir ▶</span>
        </div>
      </div>
    </div>
  `;

    const tomas = app.querySelector('#tomas');
    const caja = app.querySelector('#caja');
    const texto = app.querySelector('#texto');
    const abajo = app.querySelector('#abajo');
    const dialogo = app.querySelector('#dialogo');

    let linea = 0;

    function mostrarLinea() {
        const actual = lineasIntro[linea];

        tomas.src = '/img/personajes/tomas-' + actual.tomas + '.png';
        caja.style.display = actual.caja ? 'block' : 'none';
        abajo.style.visibility = 'hidden';

        const frase = actual.texto.replace('{nombre}', nombre);

        escribirTexto(texto, frase, 30, function () {
            abajo.style.visibility = 'visible';

            if (linea === lineasIntro.length - 1) {
                abajo.innerHTML = '<button class="btn" id="mirarCasos">Mirar casos</button>';
                app.querySelector('#mirarCasos').addEventListener('click', function (evento) {
                    evento.stopPropagation();
                    sonar('clic');
                    irA('materias');
                });
            }
        });
    }

    dialogo.addEventListener('click', function () {
        if (estaEscribiendo()) {
            terminarTexto();
            return;
        }
        if (linea < lineasIntro.length - 1) {
            linea++;
            sonar('papel');
            mostrarLinea();
        }
    });

    app.querySelector('#saltar').addEventListener('click', function () {
        terminarTexto();
        sonar('clic');
        irA('materias');
    });

    mostrarLinea();
}