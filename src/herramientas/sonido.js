let volumenEfectos = 0.8;
let volumenMusica = 0.4;

const musica = new Audio('/sonidos/musica.mp3');
musica.loop = true;

export function sonar(nombre) {
    const audio = new Audio('/sonidos/' + nombre + '.mp3');
    audio.volume = volumenEfectos;
    audio.play();
}

export function iniciarMusica() {
    musica.volume = volumenMusica;
    musica.play();
}

export function detenerMusica() {
    musica.pause();
}