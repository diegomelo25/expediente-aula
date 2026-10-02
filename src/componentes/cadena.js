export function crearCarta(pieza, giro = 0) {
    return `
    <div class="carta" data-id="${pieza.id}" style="--giro: ${giro}deg">
      <img src="${pieza.imagen}" alt="${pieza.texto}">
      <span>${pieza.texto}</span>
    </div>
  `;
}

export function crearEspacio(numero, etiqueta) {
    return `
    <div class="espacio" data-numero="${numero}">
      <span class="etiqueta">${numero} · ${etiqueta}</span>
    </div>
  `;
}