import { materias } from '../contenido/materias.js';
import { crearBarra } from '../componentes/barra.js';
import { crearCarpeta } from '../componentes/carpeta.js';
import { mostrarAviso } from '../componentes/avisos.js';
import { sonar } from '../herramientas/sonido.js';
import { irA, irAlInicio } from '../herramientas/navegacion.js';

const porPagina = 4;

export function pantallaMaterias(app) {
    const totalPaginas = Math.ceil(materias.length / porPagina);
    let pagina = 0;

    app.innerHTML = `
    <div class="kraft">
      ${crearBarra('Selecciona tu materia')}

      <div class="materias-contenido">
        <button class="flecha" id="anterior">←</button>
        <div class="grid-materias" id="grid"></div>
        <button class="flecha" id="siguiente">→</button>
      </div>

      <div class="puntos" id="puntos"></div>
    </div>
  `;

    const grid = app.querySelector('#grid');
    const anterior = app.querySelector('#anterior');
    const siguiente = app.querySelector('#siguiente');
    const puntos = app.querySelector('#puntos');

    function dibujarPagina() {
        const inicio = pagina * porPagina;
        const deEstaPagina = materias.slice(inicio, inicio + porPagina);

        let html = '';
        deEstaPagina.forEach(function (materia) {
            if (materia.casos > 0) {
                html += crearCarpeta(materia.nombre, materia.casos + ' casos');
            } else {
                html += crearCarpeta(materia.nombre, 'pronto', 'bloqueada');
            }
        });
        grid.innerHTML = html;

        grid.classList.remove('deslizar');
        void grid.offsetWidth;
        grid.classList.add('deslizar');

        let htmlPuntos = '';
        for (let i = 0; i < totalPaginas; i++) {
            htmlPuntos += `<span class="punto ${i === pagina ? 'activo' : ''}"></span>`;
        }
        puntos.innerHTML = htmlPuntos;

        anterior.disabled = (pagina === 0);
        siguiente.disabled = (pagina === totalPaginas - 1);

        conectarCarpetas(deEstaPagina);
    }

    function conectarCarpetas(deEstaPagina) {
        const carpetas = grid.querySelectorAll('.carpeta');
        carpetas.forEach(function (carpeta, i) {
            const materia = deEstaPagina[i];
            carpeta.addEventListener('click', function () {
                if (materia.casos === 0) {
                    sonar('error');
                    carpeta.classList.remove('temblar');
                    void carpeta.offsetWidth;
                    carpeta.classList.add('temblar');
                    mostrarAviso(materia.nombre + ': expedientes en preparación. Empieza por Ciencias Humanas.');
                    return;
                }
                sonar('papel');
                irA('casos', { materia: materia.id });
            });
        });
    }

    anterior.addEventListener('click', function () {
        sonar('papel');
        pagina--;
        dibujarPagina();
    });

    siguiente.addEventListener('click', function () {
        sonar('papel');
        pagina++;
        dibujarPagina();
    });

    app.querySelector('#volver').addEventListener('click', function () {
        sonar('clic');
        irAlInicio();
    });

    dibujarPagina();
}