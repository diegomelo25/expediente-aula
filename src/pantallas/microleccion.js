import { casos } from '../contenido/casos/lista.js';
import { crearBarra } from '../componentes/barra.js';
import { sonar } from '../herramientas/sonido.js';
import { irA, volver } from '../herramientas/navegacion.js';

export function pantallaMicroleccion(app, datos) {
    const caso = casos[datos.caso];
    const micro = caso.microleccion;
    let actual = 0;

    let htmlPestanas = '';
    micro.secciones.forEach(function (seccion, i) {
        htmlPestanas += `
      <button class="pestana" data-indice="${i}">
        <span class="pestana-numero">${i + 1}</span>
        ${seccion.nombre}
      </button>
    `;
    });

    app.innerHTML = `
    <div class="pantalla oficina-borrosa">
      ${crearBarra('Microlección', true)}

      <div class="micro">
        <div class="pestanas">${htmlPestanas}</div>
        <div class="papel micro-hoja" id="hoja"></div>
      </div>
    </div>
  `;

    const hoja = app.querySelector('#hoja');
    const pestanas = app.querySelectorAll('.pestana');

    function mostrarSeccion(indice) {
        actual = indice;
        const seccion = micro.secciones[indice];
        const esUltima = (indice === micro.secciones.length - 1);

        pestanas.forEach(function (pestana, i) {
            pestana.classList.toggle('activa', i === indice);
        });

        let boton = '<button class="btn btn-pequeno" id="siguiente">Siguiente →</button>';
        if (esUltima) {
            boton = '<button class="btn" id="listo">Listo</button>';
        }

        hoja.innerHTML = `
      <h2>${micro.titulo}</h2>
      <p>${seccion.texto}</p>
      <img src="${seccion.imagen}" alt="${seccion.nombre}">
      <div class="micro-acciones">${boton}</div>
    `;

        hoja.classList.remove('aparecer');
        void hoja.offsetWidth;
        hoja.classList.add('aparecer');

        if (esUltima) {
            hoja.querySelector('#listo').addEventListener('click', function () {
                sonar('papel');
                irA('archivo', { caso: caso.id });
            });
        } else {
            hoja.querySelector('#siguiente').addEventListener('click', function () {
                sonar('papel');
                mostrarSeccion(actual + 1);
            });
        }
    }

    pestanas.forEach(function (pestana) {
        pestana.addEventListener('click', function () {
            sonar('papel');
            mostrarSeccion(Number(pestana.dataset.indice));
        });
    });

    app.querySelector('#volver').addEventListener('click', function () {
        sonar('clic');
        volver();
    });

    mostrarSeccion(0);
}