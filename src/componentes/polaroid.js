export function crearPolaroid(imagen, descripcion, textoAbajo = '') {
    let htmlTexto = '';
    if (textoAbajo !== '') {
        htmlTexto = `<p>${textoAbajo}</p>`;
    }

    return `
    <div class="polaroid">
      <img src="${imagen}" alt="${descripcion}">
      ${htmlTexto}
    </div>
  `;
}