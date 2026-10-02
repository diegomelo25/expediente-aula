import { sonar } from '../herramientas/sonido.js';
import { irA } from '../herramientas/navegacion.js';
import { marcarReto, sumarError, sumarPista } from '../herramientas/progreso.js';

function pistasPermitidas() {
    const nivel = localStorage.getItem('nivel') || 'basico';
    if (nivel === 'basico') return Infinity;
    if (nivel === 'intermedio') return 1;
    return 0;
}

export function activarCadena(app, reto, idCaso) {
    const mesa = app.querySelector('.mesa');
    const espacios = app.querySelectorAll('.espacio');
    const cartas = app.querySelectorAll('.carta');
    const botonConfirmar = app.querySelector('#confirmar');
    const botonPista = app.querySelector('#pista');
    const mensaje = app.querySelector('#mensaje');

    const maxPistas = pistasPermitidas();
    let pistasUsadas = 0;
    let cartaElegida = null;
    let resuelto = false;

    if (maxPistas === 0) {
        botonPista.disabled = true;
        botonPista.textContent = 'Sin pistas';
    }

    function mostrarMensaje(tipo, titulo, texto) {
        mensaje.innerHTML = `
      <div class="mensaje ${tipo}" style="background-color: var(--papel)">
        <strong>${titulo}</strong>
        ${texto}
      </div>
    `;
    }

    function revisarCompleto() {
        let llenos = 0;
        espacios.forEach(function (espacio) {
            const tieneCarta = espacio.querySelector('.carta') !== null;
            espacio.classList.toggle('lleno', tieneCarta);
            if (tieneCarta) {
                llenos++;
            }
        });
        botonConfirmar.disabled = (llenos < reto.piezas.length);
    }

    function iluminarEspacios(encender) {
        espacios.forEach(function (espacio) {
            espacio.classList.toggle('disponible', encender);
        });
    }

    cartas.forEach(function (carta) {
        carta.addEventListener('click', function (evento) {
            evento.stopPropagation();
            if (resuelto) return;
            sonar('clic');

            if (carta.parentElement.classList.contains('espacio')) {
                mesa.appendChild(carta);
                revisarCompleto();
                return;
            }

            if (cartaElegida === carta) {
                carta.classList.remove('elegida');
                cartaElegida = null;
                iluminarEspacios(false);
            } else {
                if (cartaElegida) {
                    cartaElegida.classList.remove('elegida');
                }
                cartaElegida = carta;
                carta.classList.add('elegida');
                iluminarEspacios(true);
            }
        });
    });

    espacios.forEach(function (espacio) {
        espacio.addEventListener('click', function () {
            if (!cartaElegida || resuelto) return;

            const anterior = espacio.querySelector('.carta');
            if (anterior) {
                mesa.appendChild(anterior);
            }

            cartaElegida.classList.remove('elegida');
            espacio.classList.remove('error');
            espacio.appendChild(cartaElegida);
            sonar('soltar');

            cartaElegida = null;
            iluminarEspacios(false);
            revisarCompleto();
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
            irA('resultados', { caso: idCaso });
            return;
        }

        let errores = 0;
        espacios.forEach(function (espacio, i) {
            const carta = espacio.querySelector('.carta');
            if (carta.dataset.id !== reto.piezas[i].id) {
                errores++;
                espacio.classList.remove('error');
                void espacio.offsetWidth;
                espacio.classList.add('error');
                mesa.appendChild(carta);
            }
        });

        if (errores === 0) {
            resuelto = true;
            marcarReto(idCaso, 3);
            sonar('correcto');
            espacios.forEach(function (espacio) {
                espacio.classList.add('bien');
            });
            mostrarMensaje('bien', '¡Eso es!', 'Carbón → vapor → más producción → fábricas → ciudades que crecen sin control. Todo apunta a un lugar…');
            botonPista.disabled = true;
            botonConfirmar.textContent = 'Ver resultado';
        } else {
            sumarError(idCaso);
            sonar('error');
            const palabra = (errores === 1) ? 'pieza no encaja' : 'piezas no encajan';
            mostrarMensaje('mal', errores + ' ' + palabra, 'Las regresé a la mesa. Pregúntate qué causó qué: cada eslabón debe hacer posible el siguiente.');
            revisarCompleto();
        }
    });
}