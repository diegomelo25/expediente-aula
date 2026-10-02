export function crearBarra(titulo, oscura = false, reloj = '') {
    let clases = 'barra';
    if (oscura) {
        clases = clases + ' barra-oscura';
    }

    let htmlReloj = '';
    if (reloj !== '') {
        htmlReloj = `<span class="reloj" id="reloj">${reloj}</span>`;
    }

    return `
    <header class="${clases}">
      <button class="btn-volver" id="volver">←</button>
      <h1>${titulo}</h1>
      ${htmlReloj}
    </header>
  `;
}