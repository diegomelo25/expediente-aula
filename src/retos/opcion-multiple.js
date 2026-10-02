import { sonar } from '../herramientas/sonido.js';
import { irA } from '../herramientas/navegacion.js';
import { marcarReto, siguienteReto, sumarError, sumarPista } from '../herramientas/progreso.js';

function pistasPermitidas() {
    const nivel = localStorage.getItem('nivel') || 'basico';
    if (nivel === 'basico') return Infinity;
    if (nivel === 'intermedio') return 1;
    return 0;
}

export function activarOpcionMultiple(app, reto, idCaso, numeroReto) {
    const opciones = app.querySelectorAll('.opcion');
    const botonConfirmar = app.querySelector('#confirmar');
    const botonPista = app.querySelector('#pista');
    const mensaje = app.querySelector('#mensaje');

    const maxPistas = pistasPermitidas();
    let pistasUsadas = 0;
    let seleccion = null;
    let resuelto = false;

    if (maxPistas === 0) {
        botonPista.disabled = true;
        botonPista.textContent = 'Sin pistas';
    }

    function mostrarMensaje(tipo, titulo, texto) {
        mensaje.innerHTML = `
      <div class="mensaje ${tipo}">
        <strong>${titulo}</strong>
        ${texto}
      </div>
    `;
    }

    opciones.forEach(function (opcion) {
        opcion.addEventListener('click', function () {
            sonar('clic');
            opciones.forEach(function (o) {
                o.classList.remove('seleccionada');
            });
            opcion.classList.add('seleccionada');
            seleccion = Number(opcion.dataset.indice);
            botonConfirmar.disabled = false;
        });
    });

    botonPista.addEventListener('click', function () {
        if (pistasUsadas >= maxPistas) return;
        pistasUsadas++;
        sumarPista(idCaso);
        sonar('papel');
        mostrarMensaje('', 'Tomás te da una pista', reto.pista);
        if (pistasUsadas >= maxPistas) {
            botonPista.disabled = true;
        }
    });

    botonConfirmar.addEventListener('click', function () {
        if (resuelto) {
            sonar('papel');
            const siguiente = siguienteReto(idCaso);
            if (siguiente === null) {
                irA('resultados', { caso: idCaso });
            } else {
                irA('reto' + siguiente, { caso: idCaso });
            }
            return;
        }

        const elegida = opciones[seleccion];
        const explicacion = reto.opciones[seleccion].explicacion;

        if (seleccion === reto.correcta) {
            resuelto = true;
            marcarReto(idCaso, numeroReto);
            sonar('correcto');
            elegida.classList.remove('seleccionada');
            elegida.classList.add('correcta');
            mostrarMensaje('bien', '¡Correcto!', explicacion);
            opciones.forEach(function (o) {
                o.disabled = true;
            });
            botonPista.disabled = true;
            botonConfirmar.textContent = 'Siguiente evidencia';
        } else {
            sumarError(idCaso);
            sonar('error');
            elegida.classList.remove('seleccionada');
            elegida.classList.add('incorrecta', 'temblar');
            elegida.disabled = true;
            mostrarMensaje('mal', 'No es esa…', explicacion);
            seleccion = null;
            botonConfirmar.disabled = true;
        }
    });
}