export function crearPregunta(reto) {
    const letras = ['A', 'B', 'C', 'D', 'E'];

    let htmlOpciones = '';
    for (let i = 0; i < reto.opciones.length; i++) {
        htmlOpciones += `
      <button class="opcion" data-indice="${i}">
        <b>${letras[i]}.</b>
        <span>${reto.opciones[i].texto}</span>
      </button>
    `;
    }

    return `
    <div class="papel pregunta">
      <h2>${reto.pregunta}</h2>
      ${htmlOpciones}
      <div id="mensaje"></div>
      <div class="acciones">
        <button class="btn btn-gris btn-pequeno" id="pista">Ver pista</button>
        <button class="btn" id="confirmar" disabled>Confirmar</button>
      </div>
    </div>
  `;
}