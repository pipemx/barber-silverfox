// Contenido para el SILO de SEO local: /servicios/[slug] y /ubicaciones/[slug].
// Cada landing referencia un id real de `services` en config.ts para precio/duración/reserva.

export type ServiceLanding = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  bodyParagraphs: string[];
  faqs: { q: string; a: string }[];
  serviceId: string;
  relatedSlugs: string[];
};

export const serviceLandings: ServiceLanding[] = [
  {
    slug: "corte-adulto",
    name: "Corte Adulto",
    metaTitle: "Corte de Cabello para Hombre en Conkal, Mérida | Silver Fox",
    metaDescription:
      "Corte de precisión para caballero en Conkal, Yucatán: máquina, tijera y acabado con detalle. Trato VIP a precio justo. Agenda por WhatsApp.",
    h1: "Corte de cabello para hombre en Conkal",
    intro:
      "El corte adulto es la base de todo el trabajo en Silver Fox: una consulta personalizada, precisión con máquina y tijera, y un acabado que se nota. Es el punto de partida para cualquier estilo, desde un fade marcado hasta un corte clásico de oficina.",
    bodyParagraphs: [
      "Antes de tomar la máquina, cada corte empieza con una consulta breve: forma de rostro, tipo de cabello, rutina de mantenimiento y el estilo que busca el cliente. Esa conversación es la que separa un corte genérico de uno que realmente favorece a la persona.",
      "En Silver Fox trabajamos con máquina, tijera y navaja según lo que pida el corte, no un solo método para todo. El resultado es un acabado limpio en el contorno, en las patillas y en la nuca, que es justo donde se nota si un corte está bien hecho o no.",
      "El corte adulto es también la base para explorar variantes de fade — desde un low fade discreto para ambientes formales hasta un skin fade de máximo contraste. Puedes ver el detalle de cada variante en las páginas de fade enlazadas abajo.",
    ],
    faqs: [
      {
        q: "¿Cuánto dura un corte adulto en Silver Fox?",
        a: "30 minutos por cita, sin prisas. Todos nuestros servicios usan el mismo bloque de tiempo para que la agenda sea predecible.",
      },
      {
        q: "¿Necesito decir exactamente qué corte quiero?",
        a: "No es obligatorio. Si no tienes claro el estilo, la consulta inicial con tu barbero sirve justo para eso: te recomendamos según la forma de tu rostro y tu tipo de cabello.",
      },
      {
        q: "¿Puedo pedir un fade específico dentro del corte adulto?",
        a: "Sí. Low fade, mid fade, high fade, skin fade, taper fade y burst fade son variantes del mismo servicio de corte adulto — solo dinos cuál prefieres al reservar o coméntalo con tu barbero.",
      },
    ],
    serviceId: "corte-adulto",
    relatedSlugs: ["low-fade", "mid-fade", "high-fade", "skin-fade", "taper-fade", "burst-fade", "barba"],
  },
  {
    slug: "low-fade",
    name: "Low Fade",
    metaTitle: "Low Fade en Conkal, Mérida — Corte Discreto para Caballero | Silver Fox",
    metaDescription:
      "Low fade en Silver Fox, Conkal: degradado que arranca cerca de la nuca y la oreja, ideal para ambientes formales. Agenda tu cita por WhatsApp.",
    h1: "Low Fade en Conkal",
    intro:
      "El low fade es el degradado más discreto: la transición empieza muy abajo, cerca de la línea del cabello y la oreja, dejando la mayor parte de la cabeza con largo natural.",
    bodyParagraphs: [
      "Es la opción más recomendada para quien necesita un corte que se vea impecable en la oficina, en una entrevista o en cualquier ambiente formal, sin perder el detalle de un buen degradado.",
      "En Silver Fox el low fade se trabaja con transiciones suaves, sin líneas duras, para que el crecimiento entre cita y cita se vea parejo — no como un corte que 'se nota crecido' a la semana.",
      "Combina bien con casi cualquier largo arriba: desde un corte clásico peinado hacia atrás hasta un texturizado más moderno. Si buscas más contraste, el mid fade o el high fade son el siguiente paso.",
    ],
    faqs: [
      {
        q: "¿El low fade es buena opción para el trabajo?",
        a: "Sí, es de las variantes más conservadoras y profesionales — la razón número uno por la que lo piden nuestros clientes con trabajo de oficina.",
      },
      {
        q: "¿Cada cuánto hay que retocar un low fade?",
        a: "Al ser un degradado bajo y suave, aguanta más tiempo sin verse desalineado: 3 a 4 semanas es un rango normal, según qué tan rápido crezca tu cabello.",
      },
    ],
    serviceId: "corte-adulto",
    relatedSlugs: ["mid-fade", "high-fade", "corte-adulto", "barba"],
  },
  {
    slug: "mid-fade",
    name: "Mid Fade",
    metaTitle: "Mid Fade en Conkal, Mérida — El Fade Más Pedido | Silver Fox",
    metaDescription:
      "Mid fade en Silver Fox, Conkal: el balance perfecto entre discreto y marcado. El corte más pedido por nuestros clientes. Agenda por WhatsApp.",
    h1: "Mid Fade en Conkal",
    intro:
      "El mid fade arranca a la altura media de la sien, un punto intermedio entre el low fade y el high fade. Es, sin duda, el corte que más pedimos en Silver Fox.",
    bodyParagraphs: [
      "Su fuerza está en el balance: tiene suficiente contraste para notarse y verse moderno, pero no es tan dramático como un high fade, así que funciona tanto en ambientes casuales como semi-formales.",
      "Es la base ideal para peinados con volumen arriba — pompadour, quiff o un texturizado desordenado — porque el degradado a media altura hace que el volumen de la parte superior resalte sin verse desproporcionado.",
      "Si nunca te has hecho un fade y no sabes por dónde empezar, el mid fade es el punto de partida más seguro: es fácil de mantener y prácticamente siempre queda bien.",
    ],
    faqs: [
      {
        q: "¿Por qué el mid fade es el más popular?",
        a: "Porque funciona con casi cualquier forma de rostro y con casi cualquier estilo arriba — es el equilibrio entre un corte discreto y uno llamativo.",
      },
      {
        q: "¿Se puede combinar con barba?",
        a: "Sí, es de las combinaciones más pedidas en Silver Fox: mid fade con perfilado de barba a navaja.",
      },
    ],
    serviceId: "corte-adulto",
    relatedSlugs: ["low-fade", "high-fade", "taper-fade", "barba"],
  },
  {
    slug: "high-fade",
    name: "High Fade",
    metaTitle: "High Fade en Conkal, Mérida — Corte Urbano de Alto Contraste | Silver Fox",
    metaDescription:
      "High fade en Silver Fox, Conkal: degradado alto y contraste marcado para un look urbano y de bajo mantenimiento arriba. Agenda por WhatsApp.",
    h1: "High Fade en Conkal",
    intro:
      "El high fade lleva el degradado hasta muy arriba, cerca de la parte superior de la cabeza, dejando un contraste marcado entre el lateral rapado y el volumen de arriba.",
    bodyParagraphs: [
      "Es el fade con más presencia visual: el salto entre el rapado y el largo superior es notorio, lo que le da un aire urbano y moderno. Es el favorito de quienes quieren un corte que se note desde lejos.",
      "Al dejar tan poco cabello en los laterales, requiere menos mantenimiento diario en esa zona — aunque, como todo fade marcado, conviene retocarlo con más frecuencia que un low fade para que la línea no se pierda con el crecimiento.",
      "Combina muy bien con buzz cut, textured crop o cualquier estilo corto arriba. Si te gusta el contraste del high fade pero quieres el máximo posible, el skin fade lleva la idea un paso más allá.",
    ],
    faqs: [
      {
        q: "¿El high fade es de bajo mantenimiento?",
        a: "En el largo de arriba sí, pero el degradado en sí necesita retoque cada 2-3 semanas para no perder la línea limpia.",
      },
      {
        q: "¿Con qué tipo de cabello se ve mejor?",
        a: "Funciona con cualquier tipo, pero luce especialmente bien con cabello grueso o con textura, porque el contraste con el rapado se nota más.",
      },
    ],
    serviceId: "corte-adulto",
    relatedSlugs: ["skin-fade", "mid-fade", "burst-fade", "barba"],
  },
  {
    slug: "skin-fade",
    name: "Skin Fade",
    metaTitle: "Skin Fade en Conkal, Mérida — Máximo Contraste | Silver Fox",
    metaDescription:
      "Skin fade en Silver Fox, Conkal: degradado hasta piel para el contraste más marcado. El corte más pedido por quienes buscan un look definitivo.",
    h1: "Skin Fade en Conkal",
    intro:
      "El skin fade lleva el degradado hasta piel — sin guía, a cero — logrando el contraste más marcado de todos los fades. Es el corte para quien no quiere puntos medios.",
    bodyParagraphs: [
      "A diferencia de un fade normal, que termina en un largo mínimo pero visible, el skin fade desaparece completamente hasta la piel en los laterales y la nuca, dejando una línea nítida contra el largo de arriba.",
      "Precisamente por ese contraste tan marcado es el corte que más rápido se nota desalineado: recomendamos retocarlo cada 2 semanas para mantener la línea limpia.",
      "Se puede combinar con cualquier largo arriba, desde un buzz cut hasta cabello más largo y texturizado — el efecto del skin fade resalta igual en ambos casos.",
    ],
    faqs: [
      {
        q: "¿El skin fade duele o irrita la piel?",
        a: "No, se trabaja con máquina profesional y las mismas precauciones que cualquier corte a piel. Si tienes piel sensible, coméntalo con tu barbero antes de empezar.",
      },
      {
        q: "¿Cada cuánto hay que retocarlo?",
        a: "Cada 2 semanas aproximadamente, ya que al ser degradado a piel es el que más rápido se nota cuando el cabello empieza a crecer.",
      },
    ],
    serviceId: "corte-adulto",
    relatedSlugs: ["high-fade", "burst-fade", "taper-fade", "barba"],
  },
  {
    slug: "taper-fade",
    name: "Taper Fade",
    metaTitle: "Taper Fade en Conkal, Mérida — Corte Clásico y Atemporal | Silver Fox",
    metaDescription:
      "Taper fade en Silver Fox, Conkal: transición gradual sin línea dura, el corte clásico que nunca pasa de moda. Agenda por WhatsApp.",
    h1: "Taper Fade en Conkal",
    intro:
      "El taper fade es el corte clásico por excelencia: una transición gradual y sutil, sin la línea dura de un fade marcado, que nunca pasa de moda.",
    bodyParagraphs: [
      "A diferencia de un skin fade o un high fade, el taper no busca contraste dramático — busca que el cabello se vea naturalmente más corto hacia abajo, sin que se note dónde 'empieza' el degradado.",
      "Es la opción más segura para ambientes conservadores: negocios, eventos formales, entrevistas. Envejece bien entre citas porque no depende de una línea perfecta para verse bien.",
      "Es también la base de cortes tradicionales como el pompadour clásico o el corte de peine y tijera — si buscas un estilo con más presencia arriba, revisa nuestro corte adulto para ver cómo lo personalizamos.",
    ],
    faqs: [
      {
        q: "¿Cuál es la diferencia entre taper y fade normal?",
        a: "El fade tiene una transición más marcada y puede llegar hasta piel; el taper es más gradual y sutil, sin línea dura — por eso se ve bien más tiempo entre cortes.",
      },
      {
        q: "¿Es buena opción si nunca me he hecho un fade?",
        a: "Sí, es de las formas más seguras de probar un degradado sin ir a un extremo — muchos clientes empiezan aquí antes de pasar a un mid o high fade.",
      },
    ],
    serviceId: "corte-adulto",
    relatedSlugs: ["low-fade", "mid-fade", "corte-adulto", "barba"],
  },
  {
    slug: "burst-fade",
    name: "Burst Fade",
    metaTitle: "Burst Fade en Conkal, Mérida — Corte Moderno con Curva | Silver Fox",
    metaDescription:
      "Burst fade en Silver Fox, Conkal: el degradado curvo alrededor de la oreja, ideal para estilos con volumen o textura. Agenda por WhatsApp.",
    h1: "Burst Fade en Conkal",
    intro:
      "El burst fade se diferencia de los demás por su forma: en vez de una línea recta, el degradado se curva alrededor de la oreja, como un estallido ('burst').",
    bodyParagraphs: [
      "Esa curva lo hace ideal para estilos donde el cabello arriba tiene volumen, rizo o textura — el fade recto compite visualmente con el volumen, mientras que el burst lo acompaña de forma más natural.",
      "Es una de las variantes más modernas y menos comunes, por lo que suele pedirse como un estilo de firma más que como corte de todos los días — perfecto si buscas algo distinto a lo que ya tienen tus amigos.",
      "Se ve especialmente bien con cabello rizado o con textura natural, donde el degradado curvo enmarca la forma del cabello en vez de cortarla en línea recta.",
    ],
    faqs: [
      {
        q: "¿El burst fade sirve para cabello rizado?",
        a: "Sí, es una de las variantes que mejor funciona con cabello rizado o con textura, precisamente porque la curva del degradado sigue la forma natural del cabello.",
      },
      {
        q: "¿Es más difícil de mantener que un fade normal?",
        a: "Requiere un barbero con buen manejo de curvas para que se vea limpio, pero el mantenimiento en casa es igual de sencillo que cualquier otro fade.",
      },
    ],
    serviceId: "corte-adulto",
    relatedSlugs: ["skin-fade", "high-fade", "corte-adulto", "barba"],
  },
  {
    slug: "barba",
    name: "Barba",
    metaTitle: "Perfilado de Barba y Ritual con Navaja en Conkal, Mérida | Silver Fox",
    metaDescription:
      "Perfilado de barba con navaja y toalla caliente en Silver Fox, Conkal. El ritual clásico de afeitado para un acabado impecable. Agenda por WhatsApp.",
    h1: "Perfilado de barba en Conkal",
    intro:
      "El servicio de barba en Silver Fox no es solo recortar: es el ritual completo con navaja y toalla caliente que deja el contorno perfilado y la piel lista.",
    bodyParagraphs: [
      "Empezamos definiendo la línea según la forma de tu rostro y el largo que ya tiene tu barba. Luego viene la toalla caliente, que abre el poro y suaviza el vello antes de pasar la navaja — el mismo proceso del afeitado clásico de barbería, hecho con calma.",
      "El resultado es un contorno nítido en cuello, mejillas y bigote, sin las irritaciones típicas de una máquina de afeitar en casa. Es el complemento natural de cualquier corte con fade: mid fade con barba perfilada es de las combinaciones más pedidas.",
      "Si buscas la experiencia completa, los paquetes de Silver Fox combinan corte, barba, cejas y mascarilla en una sola visita — puedes verlos en la sección de servicios de la página principal.",
    ],
    faqs: [
      {
        q: "¿Usan navaja de verdad o solo máquina?",
        a: "Navaja real, como parte del ritual clásico de barbería, junto con toalla caliente para preparar la piel antes de perfilar.",
      },
      {
        q: "¿Cada cuánto debo perfilar mi barba?",
        a: "Cada 2 a 3 semanas es lo habitual para mantener la línea definida, aunque depende de qué tan rápido te crezca.",
      },
    ],
    serviceId: "barba",
    relatedSlugs: ["corte-adulto", "mid-fade", "skin-fade"],
  },
];

export type LocationLanding = {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  bodyParagraphs: string[];
  faqs: { q: string; a: string }[];
};

export const locationLandings: LocationLanding[] = [
  {
    slug: "conkal",
    name: "Conkal",
    metaTitle: "Barbería en Conkal, Yucatán | Silver Fox",
    metaDescription:
      "Barbería Silver Fox está en Conkal, Yucatán. Cortes de precisión, fades y ritual de barba con trato VIP a precio justo. Agenda por WhatsApp.",
    h1: "Barbería en Conkal, Yucatán",
    intro:
      "Silver Fox está ubicada en Conkal, Yucatán — nuestra única sede. Aquí es donde recibimos a cada cliente, sin filas y con trato personalizado.",
    bodyParagraphs: [
      "Conkal es una comunidad al norte de Mérida, y en ella tenemos nuestra silla, nuestro equipo y todo lo necesario para un corte de precisión, un fade bien trabajado o el ritual completo de barba con navaja.",
      "Si eres de Conkal, ya nos conoces o probablemente hayas visto Silver Fox en tu recorrido diario. Si vienes de fuera, en la sección de ubicación de nuestra página principal tienes el mapa y el botón directo a Google Maps para llegar sin complicaciones.",
    ],
    faqs: [
      {
        q: "¿Silver Fox está solo en Conkal?",
        a: "Sí, tenemos una única ubicación en Conkal, Yucatán. No contamos con otras sucursales en Mérida ni en las zonas cercanas.",
      },
      {
        q: "¿Necesito cita para ir a la barbería en Conkal?",
        a: "Puedes llegar directo, pero con cita por WhatsApp garantizas tu lugar y evitas espera.",
      },
    ],
  },
  {
    slug: "cholul",
    name: "Cholul",
    metaTitle: "Barbería cerca de Cholul, Mérida | Silver Fox (Conkal)",
    metaDescription:
      "¿Buscas barbería cerca de Cholul? Silver Fox está en Conkal, a corta distancia. Cortes de precisión y ritual de barba. Agenda por WhatsApp.",
    h1: "Barbería cerca de Cholul",
    intro:
      "Si vives en Cholul y buscas una barbería de trato VIP sin tener que entrar al centro de Mérida, Silver Fox está en Conkal, a corta distancia hacia el norte.",
    bodyParagraphs: [
      "Somos una sola ubicación en Conkal — no tenemos sucursal en Cholul —, pero recibimos regularmente a clientes de la zona que prefieren evitar el tráfico del centro y encontrar una barbería premium cerca de casa.",
      "Antes de tu primera visita, revisa el mapa y el botón 'Cómo llegar' en la página principal para confirmar la ruta más directa desde Cholul.",
    ],
    faqs: [
      {
        q: "¿Silver Fox tiene sucursal en Cholul?",
        a: "No, nuestra única ubicación está en Conkal. Recibimos con gusto a clientes de Cholul y alrededores en esa sede.",
      },
      {
        q: "¿Vale la pena el viaje desde Cholul?",
        a: "Nuestros clientes de la zona lo confirman: trato VIP, sin filas y precios justos son la razón por la que vuelven.",
      },
    ],
  },
  {
    slug: "merida",
    name: "Mérida",
    metaTitle: "Barbería cerca de Mérida (Conkal) | Silver Fox",
    metaDescription:
      "Barbería premium a minutos de Mérida: Silver Fox está en Conkal. Cortes de precisión, fades y ritual de barba con navaja. Agenda por WhatsApp.",
    h1: "Barbería a minutos de Mérida",
    intro:
      "Silver Fox está en Conkal, justo al norte de Mérida — la opción de muchos clientes de la ciudad que buscan una barbería premium sin el tráfico ni las filas del centro.",
    bodyParagraphs: [
      "Recibimos clientes de distintas zonas de Mérida que prefieren un ambiente más tranquilo y personalizado que el de una barbería del centro, sin sacrificar la calidad del corte.",
      "Si vienes desde Mérida, usa el botón 'Cómo llegar' en la página principal para confirmar tu ruta exacta hacia Conkal antes de tu cita.",
    ],
    faqs: [
      {
        q: "¿Qué tan lejos está Conkal del centro de Mérida?",
        a: "Está al norte de la ciudad; te recomendamos confirmar la ruta exacta desde tu punto de partida usando el mapa de Google en nuestra página de ubicación.",
      },
      {
        q: "¿Por qué elegir una barbería en Conkal en vez de una en Mérida centro?",
        a: "Menos tráfico, cero filas y trato personalizado — muchos de nuestros clientes de Mérida lo prefieren justo por eso.",
      },
    ],
  },
  {
    slug: "altabrisa",
    name: "Altabrisa",
    metaTitle: "Barbería cerca de Altabrisa, Mérida | Silver Fox (Conkal)",
    metaDescription:
      "Barbería premium cerca de Altabrisa: Silver Fox está en Conkal. Cortes de precisión, fades y barba con trato VIP. Agenda por WhatsApp.",
    h1: "Barbería cerca de Altabrisa",
    intro:
      "Si vives en Altabrisa y buscas una alternativa a las barberías del norte de la ciudad, Silver Fox está en Conkal, con la misma calidad y trato VIP.",
    bodyParagraphs: [
      "Somos una sola ubicación en Conkal — no contamos con sucursal en Altabrisa —, pero varios clientes de la zona ya nos visitan regularmente por el trato personalizado y los precios justos.",
      "Revisa el mapa en nuestra página principal para confirmar la ruta desde Altabrisa antes de tu primera visita.",
    ],
    faqs: [
      {
        q: "¿Tienen sucursal en Altabrisa?",
        a: "No, nuestra única sede está en Conkal. Recibimos con gusto a clientes de Altabrisa y del norte de Mérida en esa ubicación.",
      },
    ],
  },
  {
    slug: "montebello",
    name: "Montebello",
    metaTitle: "Barbería cerca de Montebello, Mérida | Silver Fox (Conkal)",
    metaDescription:
      "Barbería premium cerca de Montebello: Silver Fox está en Conkal. Cortes de precisión, fades y ritual de barba. Agenda por WhatsApp.",
    h1: "Barbería cerca de Montebello",
    intro:
      "Desde Montebello, Conkal es una opción cercana para quienes buscan una barbería premium sin entrar al tráfico del centro de Mérida.",
    bodyParagraphs: [
      "No tenemos sucursal en Montebello, pero es una de las zonas de donde llegan regularmente clientes a nuestra sede en Conkal, atraídos por el trato VIP y la atención sin filas.",
      "Usa el mapa de nuestra página principal para confirmar la mejor ruta desde Montebello antes de agendar.",
    ],
    faqs: [
      {
        q: "¿Cuál es la barbería más cercana a Montebello con este nivel de servicio?",
        a: "Silver Fox, en Conkal, es la opción que recomendamos: trato personalizado, sin filas y precios justos.",
      },
    ],
  },
  {
    slug: "temozon-norte",
    name: "Temozón Norte",
    metaTitle: "Barbería cerca de Temozón Norte, Mérida | Silver Fox (Conkal)",
    metaDescription:
      "Barbería premium cerca de Temozón Norte: Silver Fox está en Conkal. Cortes de precisión, fades y barba con trato VIP. Agenda por WhatsApp.",
    h1: "Barbería cerca de Temozón Norte",
    intro:
      "Si estás en Temozón Norte y buscas una barbería con trato de casa y resultados consistentes, Silver Fox en Conkal es una opción cercana hacia el norte.",
    bodyParagraphs: [
      "No tenemos sucursal en Temozón Norte, pero recibimos a varios clientes de la zona en nuestra sede de Conkal, donde el enfoque está en la atención personalizada y el corte de precisión.",
      "Confirma tu ruta desde Temozón Norte usando el mapa en la página principal antes de tu cita.",
    ],
    faqs: [
      {
        q: "¿Vale la pena venir desde Temozón Norte?",
        a: "Nuestros clientes de la zona lo confirman con sus reseñas: trato VIP, sin filas y resultados consistentes cita tras cita.",
      },
    ],
  },
];
