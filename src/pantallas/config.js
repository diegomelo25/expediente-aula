import { mostrarAviso, confirmar } from '../componentes/avisos.js';
import { sonar, obtenerVolumenes, cambiarVolumenMusica, cambiarVolumenEfectos } from '../herramientas/sonido.js';
import { irA, volver } from '../herramientas/navegacion.js';

const velocidades = [
    { nombre: 'Lenta', valor: 50 },
    { nombre: 'Normal', valor: 30 },
    { nombre: 'Rápida', valor: 12 }
];

export function pantallaConfig(app) {
    const volumenes = obtenerVolumenes();
    const velocidadGuardada = Number(localStorage.getItem('velocidadTexto') ?? 30);
    let indiceVelocidad = velocidades.findIndex(function (v) {
        return v.valor === velocidadGuardada;
    });
    if (indiceVelocidad === -1) indiceVelocidad = 1;

    app.innerHTML = `
    <div class="madera pantalla">
      <button class="btn-volver btn-flotante" id="volver">←</button>

      <div class="papel config">
        <h2>Configuración</h2>

        <h3>Sonido</h3>
        <label class="opcion-config">
          Música
          <input type="range" id="volMusica" min="0" max="100" value="${volumenes.musica * 100}">
        </label>
        <label class="opcion-config">
          Efectos de sonido
          <input type="range" id="volEfectos" min="0" max="100" value="${volumenes.efectos * 100}">
        </label>

        <h3>Idioma</h3>
        <div class="opcion-config">
          <span>Idioma</span>
          <div class="selector" id="idioma">
            <button>←</button><output>Español</output><button>→</button>
          </div>
        </div>

        <h3>Gráficos</h3>
        <div class="opcion-config">
          <span>Modo ventana</span>
          <div class="selector" id="pantallaCompleta">
            <button>←</button><output id="textoPantalla">Ventana</output><button>→</button>
          </div>
        </div>
        <div class="opcion-config">
          <span>Velocidad del texto</span>
          <div class="selector" id="velocidad">
            <button data-paso="-1">←</button>
            <output id="textoVelocidad">${velocidades[indiceVelocidad].nombre}</output>
            <button data-paso="1">→</button>
          </div>
        </div>

        <button class="borrar" id="borrar">Borrar progreso</button>
      </div>
    </div>
  `;

    app.querySelector('#volMusica').addEventListener('input', function (evento) {
        cambiarVolumenMusica(Number(evento.target.value) / 100);
    });

    const deslizadorEfectos = app.querySelector('#volEfectos');
    deslizadorEfectos.addEventListener('input', function () {
        cambiarVolumenEfectos(Number(deslizadorEfectos.value) / 100);
    });
    deslizadorEfectos.addEventListener('change', function () {
        sonar('clic');
    });

    app.querySelectorAll('#idioma button').forEach(function (boton) {
        boton.addEventListener('click', function () {
            sonar('error');
            mostrarAviso('Por ahora el juego está disponible solo en español.');
        });
    });

    const textoPantalla = app.querySelector('#textoPantalla');
    function actualizarTextoPantalla() {
        textoPantalla.textContent = document.fullscreenElement ? 'Pantalla completa' : 'Ventana';
    }
    actualizarTextoPantalla();

    app.querySelectorAll('#pantallaCompleta button').forEach(function (boton) {
        boton.addEventListener('click', function () {
            sonar('clic');
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen();
            }
        });
    });
    document.addEventListener('fullscreenchange', actualizarTextoPantalla);

    const textoVelocidad = app.querySelector('#textoVelocidad');
    app.querySelectorAll('#velocidad button').forEach(function (boton) {
        boton.addEventListener('click', function () {
            sonar('clic');
            const paso = Number(boton.dataset.paso);
            indiceVelocidad = (indiceVelocidad + paso + velocidades.length) % velocidades.length;
            textoVelocidad.textContent = velocidades[indiceVelocidad].nombre;
            localStorage.setItem('velocidadTexto', velocidades[indiceVelocidad].valor);
        });
    });

    app.querySelector('#borrar').addEventListener('click', function () {
        sonar('clic');
        confirmar(
            '¿Borrar todo el progreso?',
            'Se perderán tu nombre, los casos resueltos, las estrellas y tus tiempos. Los ajustes de sonido se mantienen.',
            'Borrar',
            function () {
                const claves = Object.keys(localStorage);
                claves.forEach(function (clave) {
                    const esAjuste = clave.startsWith('volumen') || clave === 'velocidadTexto';
                    if (!esAjuste) {
                        localStorage.removeItem(clave);
                    }
                });
                sonar('sello');
                mostrarAviso('Progreso borrado. ¡A empezar de nuevo!');
                irA('titulo');
            }
        );
    });

    app.querySelector('#volver').addEventListener('click', function () {
        sonar('clic');
        volver();
    });
}