export const fabricaDetenida = {
    id: 'fabrica-detenida',
    materia: 'ciencias-humanas',
    titulo: 'La fábrica detenida',
    periodo: '1760 — 1840',
    notaGabriel: '“No busques solamente qué cambió. Descubre qué hizo que todo lo demás cambiara.”',

    tomas: {
        portada: '“Esta vez tú vas a investigar. Yo te voy a ayudar solo si me lo pides.”',
        archivo: '“Hmm… Gabriel nunca dejaba información porque sí. Si puso estas imágenes aquí, seguramente esperaba que alguien encontrara la relación entre ellas.”',
        resultados: '“Buen trabajo, {nombre}. Ahora sabemos que Gabriel estaba siguiendo algo más que máquinas… también estaba siguiendo sus huellas en la sociedad.”'
    },

    evidencias: [
        { imagen: '/img/caso-1/hiladora.png', descripcion: 'Hiladora con cientos de bobinas' },
        { imagen: '/img/caso-1/obreros-fabrica.png', descripcion: 'Obreros trabajando en mesas largas' },
        { imagen: '/img/caso-1/motor-vapor.png', descripcion: 'Motor de vapor con engranajes' }
    ],

    mision: [
        'Qué cambió en la producción.',
        'Qué hizo posible ese cambio.',
        'Cómo cambió la forma de trabajar.',
        'Qué consecuencias produjo en la sociedad.'
    ],

    misionRetos: [1, 1, 2, 3],

    reto1: {
        imagen: '/img/caso-1/motor-vapor.png',
        pregunta: 'A partir de la imagen y de lo aprendido, ¿qué explica mejor por qué la producción industrial aumentó durante la Revolución Industrial?',
        opciones: [
            {
                texto: 'Porque las ciudades reemplazaron totalmente el campo.',
                explicacion: 'Las ciudades crecieron, pero el campo nunca desapareció. Eso fue una consecuencia, no la causa.'
            },
            {
                texto: 'Porque el carbón y la máquina de vapor permitieron mover maquinaria capaz de producir más en menos tiempo.',
                explicacion: 'Exacto. El carbón alimentaba la máquina de vapor, y esa energía movía máquinas mucho más rápido que las personas.'
            },
            {
                texto: 'Porque todos los trabajadores dejaron de participar en la producción.',
                explicacion: 'Si nadie trabajara no habría producción. De hecho, cada vez más personas entraron a las fábricas.'
            },
            {
                texto: 'Porque la producción volvió a hacerse principalmente en las viviendas.',
                explicacion: 'Fue al revés: la producción salió de las casas y se concentró en las fábricas.'
            },
            {
                texto: 'Porque desaparecieron por completo los talleres y los mercados.',
                explicacion: 'Los mercados no desaparecieron; crecieron para vender todo lo que se producía.'
            }
        ],
        correcta: 1,
        pista: 'Mira la imagen: ¿qué movía esas ruedas y engranajes? Piensa en la energía, no en las personas.'
    },

    reto2: {
        ficha: {
            nombre: 'William, 1838',
            imagen: '/img/caso-1/william.png',
            datos: [
                ['Edad', '14 años'],
                ['Ocupación', 'obrero textil'],
                ['Lugar', 'Manchester'],
                ['Jornada', '14 horas diarias'],
                ['Condiciones', 'trabaja rodeado de ruido, calor y maquinaria peligrosa'],
                ['Pago', 'recibe un salario semanal']
            ]
        },
        pregunta: 'Según la evidencia, ¿qué cambio social representa mejor la situación de William?',
        opciones: [
            {
                texto: 'El fortalecimiento de la aristocracia rural.',
                explicacion: 'La aristocracia rural perdió peso frente a los dueños de fábricas. Además, William no es aristócrata: es un obrero.'
            },
            {
                texto: 'La aparición del proletariado industrial y las duras condiciones laborales.',
                explicacion: 'Así es. William pertenece al proletariado: personas que solo tienen su trabajo para vender, con jornadas larguísimas y máquinas peligrosas, incluso siendo niños.'
            },
            {
                texto: 'El regreso del trabajo doméstico como forma principal de producción.',
                explicacion: 'William trabaja en una fábrica textil de Manchester, no en su casa.'
            },
            {
                texto: 'La desaparición del salario como forma de pago.',
                explicacion: 'Su ficha dice que recibe un salario semanal. El salario se volvió la forma normal de pago.'
            },
            {
                texto: 'La mejora inmediata de la calidad de vida de todos los trabajadores.',
                explicacion: '14 horas diarias, a los 14 años, rodeado de maquinaria peligrosa: su calidad de vida no mejoró.'
            }
        ],
        correcta: 1,
        pista: 'Lee su ficha con calma: edad, jornada, condiciones y pago. ¿Qué grupo social nuevo describe?'
    },

    reto3: {
        piezas: [
            { id: 'carbon', texto: 'Carbón mineral', espacio: 'Energía', imagen: '/img/caso-1/carbon.png' },
            { id: 'vapor', texto: 'Máquina de vapor', espacio: 'Tecnología', imagen: '/img/caso-1/maquina-vapor.png' },
            { id: 'produccion', texto: 'Mayor producción', espacio: 'Producción', imagen: '/img/caso-1/hiladora.png' },
            { id: 'fabril', texto: 'Sistema fabril', espacio: 'Trabajo', imagen: '/img/caso-1/sistema-fabril.png' },
            { id: 'urbanizacion', texto: 'Urbanización acelerada', espacio: 'Sociedad', imagen: '/img/caso-1/urbanizacion.png' }
        ],
        pista: 'Empieza por lo que daba energía a todo. Luego piensa: ¿qué máquina usó esa energía? ¿Qué pasó con la producción, con el trabajo y, al final, con las ciudades?'
    },

    resultado: {
        texto: 'Al reconstruir el archivo, descubriste que la Revolución Industrial fue una cadena de transformaciones: nuevas fuentes de energía impulsaron la maquinaria, la producción se concentró en fábricas y esto cambió profundamente la forma de trabajar y vivir. Gabriel no dejó estas imágenes al azar. La nueva pista recuperada apunta a un lugar clave del caso.',
        pista: 'MANCHESTER, 1838',
        imagen: '/img/caso-1/manchester-1838.png'
    }
};