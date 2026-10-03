import { casos } from '../contenido/casos/lista.js';
import { crearBarra } from '../componentes/barra.js';
import { crearPapel } from '../componentes/papel.js';
import { retosHechos, siguienteReto, estaResuelto } from '../herramientas/progreso.js';
import { sonar, iniciarMusica } from '../herramientas/sonido.js';
import { irA, volver } from '../herramientas/navegacion.js';

function imagenDelReto(caso, numero) {
    if (numero === 1) return caso.reto1.imagen;
    if (numero === 2) return caso.reto2.ficha.imagen;
    if (numero === 3) return caso.reto3.piezas[0].imagen;
    return caso.resultado.imagen;
}

export function pantallaProgreso(app) {
    const idCaso = localStorage.getItem('casoActual');
    const caso = idCaso ? casos[idCaso] : null;

    let htmlDonde = '<p class="vacio">Aún no has abierto ningún expediente.</p>';
    let htmlAvance = '<p class="vacio">Abre un caso para ver tu avance.</p>';
    let htmlObjetivos = '<p class="vacio">Abre un caso para ver tus objetivos.</p>';
    let textoBoton = 'Empezar';

    if (caso) {
        const hechos = retosHechos(caso.id);
        const siguiente = siguienteReto(caso.id);
        const resuelto = estaResuelto(caso.id);
        const porcentaje = Math.round(hechos.length / 3 * 100);

        let detalle = 'Evidencia ' + siguiente + ' de 3';
        textoBoton = 'Continuar aquí';
        if (siguiente === null) {
            detalle = 'Caso resuelto';
            textoBoton = 'Ver casos';
        }

        htmlDonde = `
      <div class="fila-tarjeta">
        <img class="miniatura" src="${imagenDelReto(caso, siguiente)}" alt="">
        <div>
          <strong>Último expediente:</strong><br>
          <strong>${caso.titulo}</strong><br>
          ${detalle}
        </div>
      </div>
    `;

        let htmlPuntos = '';
        for (let i = 1; i <= 4; i++) {
            const lleno = (i <= hechos.length || (i === 4 && resuelto)) ? 'lleno' : '';
            htmlPuntos += `<span class="punto-p ${lleno}"></span>`;
        }

        htmlAvance = `
      <div class="fila-tarjeta">
        <div>
          <div class="puntos-progreso">${htmlPuntos}</div>
          <p>Archivo reconstruido<br>${hechos.length} / 3 evidencias</p>
        </div>
        <div class="carpeta-mini"><span class="porcentaje">${porcentaje}%</span></div>
      </div>
    `;

        const objetivos = [
            ['Revisa la evidencia histórica', true],
            ['Identifica qué impulsó la producción', hechos.includes(1)],
            ['Reconoce el cambio social', hechos.includes(2)],
            ['Reconstruye la cadena de cambios', hechos.includes(3)]
        ];

        let htmlLista = '';
        objetivos.forEach(function (objetivo) {
            htmlLista += `<li class="${objetivo[1] ? 'hecho' : ''}">${objetivo[0]}</li>`;
        });
        htmlObjetivos = `<ul class="lista-objetivos">${htmlLista}</ul>`;
    }

    app.innerHTML = `
    <div class="kraft pantalla">
      ${crearBarra('Progreso')}

      <div class="progreso-grid">
        ${crearPapel(`
          <h2>¿Dónde quedé?</h2>
          ${htmlDonde}
          <div><button class="btn btn-pequeno" id="continuar">${textoBoton}</button></div>
        `, 'tarjeta')}

        ${crearPapel(`
          <h2>Tu progreso</h2>
          ${htmlAvance}
        `, 'tarjeta')}

        ${crearPapel(`
          <h2>¿Necesitas un respiro?</h2>
          <div class="fila-tarjeta">
            <div>
              <p style="margin-top:0">Tómate unos minutos y vuelve cuando estés listo.</p>
              <button class="btn btn-pequeno" id="pausa">Iniciar pausa</button>
            </div>
            <span class="taza">☕</span>
          </div>
        `, 'tarjeta')}

        ${crearPapel(`
          <h2>Objetivo actual</h2>
          ${htmlObjetivos}
        `, 'tarjeta')}
      </div>
    </div>
  `;

    app.querySelector('#continuar').addEventListener('click', function () {
        sonar('clic');
        iniciarMusica();

        if (!caso) {
            irA('materias');
            return;
        }

        const hechos = retosHechos(caso.id);
        const siguiente = siguienteReto(caso.id);

        if (siguiente === null) {
            irA('casos', { materia: caso.materia });
        } else if (hechos.length === 0) {
            irA('archivo', { caso: caso.id });
        } else {
            irA('reto' + siguiente, { caso: caso.id });
        }
    });

    app.querySelector('#pausa').addEventListener('click', function () {
        sonar('clic');
        irA('pausa');
    });

    app.querySelector('#volver').addEventListener('click', function () {
        sonar('clic');
        volver();
    });
}