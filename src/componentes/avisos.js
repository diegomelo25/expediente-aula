import { sonar } from '../herramientas/sonido.js';

export function mostrarAviso(texto) {
    const anterior = document.querySelector('.aviso');
    if (anterior) {
        anterior.remove();
    }

    const aviso = document.createElement('div');
    aviso.className = 'aviso';
    aviso.textContent = texto;
    document.body.appendChild(aviso);

    setTimeout(function () {
        aviso.remove();
    }, 3000);
}

export function pedirNombre(alTerminar) {
    const fondo = document.createElement('div');
    fondo.className = 'fondo-oscuro';
    fondo.innerHTML = `
    <form class="papel ventana">
      <h2>¿Cómo te llamas, investigador?</h2>
      <p>Tomás te llamará así durante el caso.</p>
      <input id="campoNombre" maxlength="20" placeholder="Escribe tu nombre">
      <div class="ventana-botones">
        <button type="button" class="btn btn-gris btn-pequeno" id="omitir">Omitir</button>
        <button type="submit" class="btn btn-pequeno">Empezar</button>
      </div>
    </form>
  `;
    document.body.appendChild(fondo);

    const campo = fondo.querySelector('#campoNombre');
    campo.focus();

    function cerrar(nombre) {
        localStorage.setItem('nombre', nombre);
        fondo.remove();
        alTerminar(nombre);
    }

    fondo.querySelector('form').addEventListener('submit', function (evento) {
        evento.preventDefault();
        sonar('sello');
        const nombre = campo.value.trim() || 'detective';
        cerrar(nombre);
    });

    fondo.querySelector('#omitir').addEventListener('click', function () {
        sonar('clic');
        cerrar('detective');
    });
}