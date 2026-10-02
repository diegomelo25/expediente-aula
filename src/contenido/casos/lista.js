import { fabricaDetenida } from './fabrica-detenida.js';

export const casosPorMateria = {
    'ciencias-humanas': [
        { id: 'fabrica-detenida', titulo: 'La fábrica detenida', periodo: '1760 — 1840', disponible: true },
        { id: 'revolucion-francesa', titulo: 'Revolución Francesa', periodo: '1789 — 1799', disponible: false },
        { id: 'bogotazo', titulo: 'El Bogotazo', periodo: '1948', disponible: false }
    ]
};

export const casos = {
    'fabrica-detenida': fabricaDetenida
};