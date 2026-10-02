export function crearFicha(ficha) {
    let htmlDatos = '';
    ficha.datos.forEach(function (dato) {
        htmlDatos += `<dt>${dato[0]}:</dt><dd>${dato[1]}</dd>`;
    });

    return `
    <article class="papel ficha">
      <h3>${ficha.nombre}</h3>
      <img src="${ficha.imagen}" alt="Retrato de ${ficha.nombre}">
      <dl>${htmlDatos}</dl>
    </article>
  `;
}