import { casos } from '../contenido/casos/lista.js';
import { crearBarra } from '../componentes/barra.js';
import { crearCarta, crearEspacio } from '../componentes/cadena.js';
import { activarCadena } from '../retos/cadena.js';
import { sonar } from '../herramientas/sonido.js';
import { volver } from '../herramientas/navegacion.js';

export function pantallaReto3(app, datos) {
    const caso = casos[datos.caso];
    const reto = caso.reto3;

    const mezcladas = [...reto.piezas].sort(function () {
        return Math.random() - 0.5;
    });

    let htmlEspacios = '';
    reto.piezas.forEach(function (pieza, i) {
        htmlEspacios += crearEspacio(i + 1, pieza.espacio);
    });

    const giros = [-6, 4, -3, 7, -5];
    let htmlCartas = '';
    mezcladas.forEach(function (pieza, i) {
        htmlCartas += crearCarta(pieza, giros[i]);
    });

    app.innerHTML = `
    <div class="madera pantalla">
      ${crearBarra('Reto 3', true)}
      <div style="padding:30px">
        <div class="papel" style="max-width:760px; margin:0 auto 20px; display:flex; gap:20px; align-items:center; flex-wrap:wrap">
          <p style="margin:0; flex:1; min-width:240px">
            <strong>Ordena la cadena de cambios.</strong>
            Toca una fotografía y luego el espacio donde va.
          </p>
          <button class="btn btn-gris btn-pequeno" id="pista">Ver pista</button>
        </div>

        <div id="mensaje" style="max-width:760px; margin:0 auto 20px"></div>

        <div class="cadena">${htmlEspacios}</div>
        <div class="mesa">${htmlCartas}</div>

        <div style="text-align:center; margin-top:30px">
          <button class="btn" id="confirmar" disabled>Confirmar</button>
        </div>
      </div>
    </div>
  `;

    activarCadena(app, reto, caso.id);

    app.querySelector('#volver').addEventListener('click', function () {
        sonar('clic');
        volver();
    });
}