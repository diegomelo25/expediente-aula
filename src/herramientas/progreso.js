function leerProgreso() {
    const guardado = localStorage.getItem('progreso');
    let progreso = { resueltos: [], retos: {}, conteo: {} };
    if (guardado) {
        progreso = JSON.parse(guardado);
    }
    if (!progreso.retos) progreso.retos = {};
    if (!progreso.conteo) progreso.conteo = {};
    return progreso;
}

function guardarProgreso(progreso) {
    localStorage.setItem('progreso', JSON.stringify(progreso));
}

export function estaResuelto(idCaso) {
    return leerProgreso().resueltos.includes(idCaso);
}

export function marcarResuelto(idCaso) {
    const progreso = leerProgreso();
    if (!progreso.resueltos.includes(idCaso)) {
        progreso.resueltos.push(idCaso);
    }
    guardarProgreso(progreso);
}

export function retosHechos(idCaso) {
    return leerProgreso().retos[idCaso] || [];
}

export function marcarReto(idCaso, numeroReto) {
    const progreso = leerProgreso();
    if (!progreso.retos[idCaso]) {
        progreso.retos[idCaso] = [];
    }
    if (!progreso.retos[idCaso].includes(numeroReto)) {
        progreso.retos[idCaso].push(numeroReto);
    }
    guardarProgreso(progreso);
}

export function siguienteReto(idCaso) {
    const hechos = retosHechos(idCaso);
    for (let numero = 1; numero <= 3; numero++) {
        if (!hechos.includes(numero)) {
            return numero;
        }
    }
    return null;
}

export function obtenerConteo(idCaso) {
    return leerProgreso().conteo[idCaso] || { errores: 0, pistas: 0 };
}

export function sumarError(idCaso) {
    const progreso = leerProgreso();
    const conteo = progreso.conteo[idCaso] || { errores: 0, pistas: 0 };
    conteo.errores++;
    progreso.conteo[idCaso] = conteo;
    guardarProgreso(progreso);
}

export function sumarPista(idCaso) {
    const progreso = leerProgreso();
    const conteo = progreso.conteo[idCaso] || { errores: 0, pistas: 0 };
    conteo.pistas++;
    progreso.conteo[idCaso] = conteo;
    guardarProgreso(progreso);
}

export function calcularEstrellas(idCaso) {
    const conteo = obtenerConteo(idCaso);
    const total = conteo.errores + conteo.pistas;
    if (total === 0) return 3;
    if (total <= 2) return 2;
    return 1;
}

export function iniciarCronometro(idCaso) {
    const clave = 'inicio-' + idCaso;
    if (!localStorage.getItem(clave)) {
        localStorage.setItem(clave, Date.now());
    }
}

export function tiempoFinal(idCaso) {
    const claveTiempo = 'tiempo-' + idCaso;
    const guardado = localStorage.getItem(claveTiempo);
    if (guardado !== null) {
        return Number(guardado);
    }

    const inicio = Number(localStorage.getItem('inicio-' + idCaso));
    let segundos = 0;
    if (inicio) {
        segundos = Math.floor((Date.now() - inicio) / 1000);
    }
    localStorage.setItem(claveTiempo, segundos);
    return segundos;
}