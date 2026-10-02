export function crearCarpeta(nombre, textoNota = '', claseExtra = '') {
  return `
    <button class="carpeta ${claseExtra}" data-nombre="${nombre}">
      <span class="nota">
        <span class="clip">📎</span>
        ${textoNota}
      </span>
      <span class="carpeta-nombre">${nombre}</span>
    </button>
  `;
}

export function crearCarpetaCaso(numero, titulo, periodo, estado) {
  let clases = 'carpeta carpeta-caso';
  let extra = '';

  if (estado === 'bloqueado') {
    clases = clases + ' bloqueada';
    extra = '<span class="candado">🔒</span>';
    periodo = '';
  }

  if (estado === 'resuelto') {
    extra = '<span class="sello">Resuelto</span>';
  }

  return `
    <button class="${clases}" data-numero="${numero}" data-estado="${estado}">
      <span class="nota">
        <span class="clip">📎</span>
        Caso<br>#${numero}
      </span>
      ${extra}
      <span class="carpeta-caso-titulo">
        ${titulo}
        <small>${periodo}</small>
      </span>
    </button>
  `;
}