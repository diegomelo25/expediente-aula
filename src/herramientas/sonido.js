let volumenEfectos = Number(localStorage.getItem('volumenEfectos') ?? 0.8);
let volumenMusica = Number(localStorage.getItem('volumenMusica') ?? 0.4);

const musica = new Audio('/sonidos/musica.mp3');
musica.loop = true;

export function sonar(nombre) {
    if (volumenEfectos === 0) return;
    const audio = new Audio('/sonidos/' + nombre + '.mp3');
    audio.volume = volumenEfectos;
    audio.play();
}

export function iniciarMusica() {
    musica.volume = volumenMusica;
    if (volumenMusica > 0) {
        musica.play();
    }
}

export function detenerMusica() {
    musica.pause();
}

export function cambiarVolumenMusica(valor) {
    volumenMusica = valor;
    musica.volume = valor;
    localStorage.setItem('volumenMusica', valor);
    if (valor === 0) {
        musica.pause();
    } else if (musica.paused) {
        musica.play();
    }
}

export function cambiarVolumenEfectos(valor) {
    volumenEfectos = valor;
    localStorage.setItem('volumenEfectos', valor);
}

export function obtenerVolumenes() {
    return { musica: volumenMusica, efectos: volumenEfectos };
}