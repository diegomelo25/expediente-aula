import { crearBoton } from '../componentes/boton.js';
import { crearPolaroid } from '../componentes/polaroid.js';
import { pedirNombre } from '../componentes/avisos.js';
import { escribirTexto } from '../herramientas/escribir.js';
import { sonar, iniciarMusica } from '../herramientas/sonido.js';
import { irA } from '../herramientas/navegacion.js';

export function pantallaTitulo(app) {
  app.innerHTML = `
    <div class="madera">
      <div class="titulo-pantalla">

        <div class="hojas">
          <div class="hoja"></div>
          <div class="hoja"></div>
          <div class="hoja">
            <h1 class="nombre-juego" id="nombreJuego"></h1>
          </div>
          ${crearPolaroid('/img/personajes/gabriel.png', 'Gabriel Salazar')}
        </div>

        <nav class="menu-titulo">
          ${crearBoton('Iniciar')}
          ${crearBoton('Progreso')}
          ${crearBoton('Configuración')}
        </nav>

      </div>
    </div>
  `;

  setTimeout(function () {
    escribirTexto(document.querySelector('#nombreJuego'), 'EXPEDIENTE:\nAULA', 90);
  }, 500);

  const botones = app.querySelectorAll('.menu-titulo .btn');

  botones[0].addEventListener('click', function () {
    sonar('clic');
    iniciarMusica();
    if (localStorage.getItem('nombre')) {
      irA('intro');
    } else {
      pedirNombre(function () {
        irA('intro');
      });
    }
  });

  botones[1].addEventListener('click', function () {
    sonar('clic');
    irA('progreso');
  });

  botones[2].addEventListener('click', function () {
    sonar('clic');
    irA('configuracion');
  });
}