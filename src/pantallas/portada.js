import { casos } from '../contenido/casos/lista.js';
import { crearPapel } from '../componentes/papel.js';
import { crearPolaroid } from '../componentes/polaroid.js';
import { crearTira } from '../componentes/tira.js';
import { escribirTexto } from '../herramientas/escribir.js';
import { iniciarCronometro, siguienteReto, reiniciarCaso } from '../herramientas/progreso.js';
import { sonar } from '../herramientas/sonido.js';
import { irA, volver } from '../herramientas/navegacion.js';

const niveles = [
  { id: 'basico', nombre: 'Básico', descripcion: 'Pistas ilimitadas' },
  { id: 'intermedio', nombre: 'Intermedio', descripcion: '1 pista por reto' },
  { id: 'dificil', nombre: 'Difícil', descripcion: 'Sin pistas' }
];

export function pantallaPortada(app, datos) {
  const caso = casos[datos.caso];
  let nivelElegido = localStorage.getItem('nivel') || 'basico';

  let htmlNiveles = '';
  niveles.forEach(function (nivel) {
    const elegido = (nivel.id === nivelElegido) ? 'elegido' : '';
    htmlNiveles += `
      <button class="nivel nivel-${nivel.id} ${elegido}" data-nivel="${nivel.id}">
        <b>Nivel:</b>${nivel.nombre}
        <small>${nivel.descripcion}</small>
      </button>
    `;
  });

  app.innerHTML = `
    <div class="madera pantalla portada">
      <button class="btn-volver btn-flotante" id="volver">←</button>

      <div class="portada-contenido">
        <div class="carpeta-contenedor">
          <div class="carpeta-interior"></div>
          <div class="carpeta-grande" id="carpeta">
            <span class="nota"><span class="clip">📎</span></span>
            <h1 class="carpeta-grande-titulo">
              ${caso.titulo}
              <small>${caso.periodo}</small>
            </h1>
          </div>
        </div>

        <div class="portada-lado">
          <div class="nota-gabriel">
            ${crearPapel(caso.notaGabriel + ' — Gabriel', 'papel-mano')}
            ${crearPolaroid('/img/personajes/gabriel.png', 'Gabriel Salazar')}
          </div>

          <div class="niveles">${htmlNiveles}</div>

          <button class="btn" id="abrir">Abrir</button>
        </div>
      </div>

      ${crearTira()}
    </div>
  `;

  setTimeout(function () {
    escribirTexto(app.querySelector('#dialogo'), caso.tomas.portada);
  }, 600);

  const botonesNivel = app.querySelectorAll('.nivel');
  botonesNivel.forEach(function (boton) {
    boton.addEventListener('click', function () {
      sonar('clic');
      botonesNivel.forEach(function (b) {
        b.classList.remove('elegido');
      });
      boton.classList.add('elegido');
      nivelElegido = boton.dataset.nivel;
      localStorage.setItem('nivel', nivelElegido);
    });
  });

  app.querySelector('#abrir').addEventListener('click', function () {
    const nivelAnterior = localStorage.getItem('nivel-' + caso.id);
    const yaTermino = siguienteReto(caso.id) === null;
    const cambioNivel = nivelAnterior !== null && nivelAnterior !== nivelElegido;

    if (yaTermino || cambioNivel) {
      reiniciarCaso(caso.id);
    }

    localStorage.setItem('nivel-' + caso.id, nivelElegido);
    localStorage.setItem('casoActual', caso.id);
    iniciarCronometro(caso.id);
    sonar('papel');
    app.querySelector('#carpeta').classList.add('abrir');
    setTimeout(function () {
      irA('microleccion', { caso: caso.id });
    }, 850);
  });

  app.querySelector('#volver').addEventListener('click', function () {
    sonar('clic');
    volver();
  });
}