# Estrategia SEO Enterprise — Barbería Silver Fox
### Conkal · Cholul · Mérida, Yucatán

Documento de trabajo. Todas las recomendaciones son White Hat, alineadas a Google Search Quality Guidelines, Helpful Content System y Core Web Vitals. Objetivo: construir **autoridad temática (Topical Authority)** sobre "barbería en Mérida" y dominar SEO local en Conkal, Cholul, Altabrisa, Montebello, Temozón Norte, Francisco de Montejo, Las Américas y Caucel.

---

## 0. Resumen ejecutivo

El sitio actual (`barberiasilverfox.com`, Next.js 16 App Router) es una **landing de una sola página** (`app/page.tsx`). Tiene buena base visual, WhatsApp bien integrado y precios reales, pero **cero profundidad temática indexable**: no hay páginas de servicio, no hay páginas por ubicación, no hay blog. Para Google esto es una sola URL compitiendo contra competidores que probablemente tienen decenas de páginas indexadas.

**Ya corregido en esta sesión** (ver commit `4efce4c`):
- `openingHoursSpecification` usaba `"Lunes a Viernes"` como texto libre — Google/rich results no lo parseaban. Corregido a array de días en inglés (`Monday`…`Friday`).
- No existía `robots.txt` ni `sitemap.xml` → creados (`app/robots.ts`, `app/sitemap.ts`).
- Se agregó `FAQPage` JSON-LD (las FAQs ya existían en `lib/config.ts` pero no estaban marcadas) y `OfferCatalog` con los servicios.

**Lo más importante que falta** (en orden de impacto): arquitectura SILO con páginas propias por servicio y por zona, Google Business Profile completamente optimizado, contenido editorial (blog) con intención de búsqueda real, y perfil de reseñas activo. Sin esto, ningún ajuste técnico adicional va a mover el ranking de forma relevante — el techo actual es de contenido, no técnico.

---

## 1. Auditoría SEO técnica

| Área | Estado actual | Problema | Prioridad |
|---|---|---|---|
| Arquitectura | Página única (`/`) | Sin URLs para "fade en Conkal", "barbería en Cholul", etc. — no hay dónde rankear esas queries | 🔴 Alta |
| Sitemap / robots | ✅ Corregido hoy | — | Hecho |
| Schema.org | `BarberShop` + `FAQPage` + `OfferCatalog` (hoy) | Falta `Review` individuales, `BreadcrumbList` (cuando haya SILO), `VideoObject` si se suben videos de cortes | 🟡 Media |
| Metadata | `title`/`description`/OG/Twitter en `layout.tsx` | Como es SPA, **todas las secciones comparten el mismo `<title>`** — no hay meta única por servicio/zona | 🔴 Alta |
| Core Web Vitals | No medido en producción aún | Definir baseline con PageSpeed Insights / CrUX apenas se publique el dominio real | 🟡 Media |
| Imágenes | `next/image` no confirmado en componentes de galería | Verificar que todas usen `next/image` (lazy + WebP/AVIF automático) en vez de `<img>` | 🟡 Media |
| Dominio | `metadataBase` apunta a `https://barberiasilverfox.com` (placeholder, TODO en código) | Sin dominio real y sin verificar en Search Console, nada de esto indexa | 🔴 Alta — bloqueante |
| Mobile-first | Tailwind responsive, parece correcto | Validar con Search Console "Usabilidad móvil" tras publicar | 🟢 Baja |
| HTTPS / Canonical | `alternates.canonical: "/"` presente | OK para una página; deberá replicarse por página al crecer el SILO | 🟢 Baja |
| Redirecciones/404 | N/A (no hay rutas aún) | Definir página 404 personalizada con CTA a WhatsApp cuando se agreguen rutas | 🟢 Baja |

**Bloqueante #1 real:** sin dominio propio comprado y verificado en Google Search Console + Google Business Profile, **nada de lo siguiente puede medirse ni indexarse**. Es el primer paso del roadmap.

---

## 2. Keyword Research (priorizado)

### Transaccionales / locales (máxima prioridad — listo para convertir)
| Keyword | Intención | Página destino sugerida |
|---|---|---|
| barbería en Conkal | Local | Home |
| barbería cerca de mí | Local/Maps | GBP + Home |
| barbería en Cholul | Local | `/ubicaciones/cholul` |
| barbería en Mérida | Local | Home + `/ubicaciones/merida` |
| barbería cerca de Altabrisa | Local | `/ubicaciones/altabrisa` |
| barbería cerca de Montebello | Local | `/ubicaciones/montebello` |
| barbería cerca de Temozón | Local | `/ubicaciones/temozon-norte` |
| barbería con cita Conkal | Transaccional | Home (WhatsApp) |
| barbería abierta domingo Conkal | Transaccional | Home (horarios) |
| fade en Conkal / Mérida | Transaccional | `/servicios/fade` |
| corte de cabello hombre Mérida | Transaccional | `/servicios/corte-adulto` |
| perfilado de barba Mérida | Transaccional | `/servicios/barba` |

### Comerciales (comparación, decisión)
mejor barbería de Mérida · mejor barbería de Yucatán · barbería premium Mérida · barber shop Mérida · men's grooming Mérida · barbería moderna Conkal · barbería para caballero Cholul

### Informacionales (contenido / blog — capturan tráfico y alimentan autoridad temática)
- ¿Cuánto dura un corte fade?
- Diferencia entre low fade, mid fade y high fade
- Cómo elegir el corte según la forma de tu rostro
- Skin fade vs taper fade: cuál te conviene
- Cómo cuidar tu barba entre visitas (rutina en casa)
- Qué es el ritual de barba con navaja y toalla caliente
- Pompadour vs French Crop: guía 2026
- Cada cuánto se debe cortar el cabello un hombre
- Undercut: guía completa
- Mohicano moderno: variantes 2026

### Long tail / People Also Ask
"barbería en Conkal Yucatán con WhatsApp", "cuánto cuesta un fade en Mérida", "barbería que atienda niños en Conkal", "barbería con navaja en Mérida", "mejor barbero para fade en Yucatán", "barbería sin cita cerca de Cholul"

### Entidades semánticas a construir (red temática)
Barbería · Barbero · Fade (low/mid/high/skin/taper/burst) · Barba · Perfilado de barba · Afeitado clásico · Navaja · Toalla caliente · Pomada · Cera para cabello · Máquina de corte · Tijera de barbero · Cuidado personal masculino · Estética masculina · Corte clásico · Buzz cut · Mullet · Undercut · Pompadour · French Crop · Mohicano — cada una debería tener al menos un párrafo dedicado en el sitio (página de servicio o artículo de blog) que la defina, la relacione con las demás y agregue **Information Gain** real (datos, fotos propias, opinión del barbero), no descripciones genéricas copiadas.

---

## 3. Arquitectura SILO propuesta

```
/ (Home — resumen + CTA)
├── /servicios
│   ├── /servicios/corte-adulto
│   ├── /servicios/fade              → enlaza a variantes:
│   │     ├── /servicios/low-fade
│   │     ├── /servicios/mid-fade
│   │     ├── /servicios/high-fade
│   │     ├── /servicios/skin-fade
│   │     ├── /servicios/taper-fade
│   │     └── /servicios/burst-fade
│   ├── /servicios/barba
│   ├── /servicios/afeitado-clasico
│   ├── /servicios/cejas
│   ├── /servicios/mascarilla
│   └── /servicios/paquetes          → paquete-1, 2, 3, silver-fox
├── /ubicaciones
│   ├── /ubicaciones/conkal          (página principal, más completa)
│   ├── /ubicaciones/cholul
│   ├── /ubicaciones/merida
│   ├── /ubicaciones/altabrisa
│   ├── /ubicaciones/montebello
│   └── /ubicaciones/temozon-norte
├── /equipo (E-E-A-T: barberos, bios, experiencia)
├── /galeria (ya existe como sección — separar en página propia indexable)
├── /blog
│   └── /blog/[slug]  (calendario editorial, sección 5)
├── /club-silver-fox (membresías — ya existe como sección)
├── /preguntas-frecuentes
└── /contacto
```

**Regla de enlazado interno del SILO:** cada página de `/servicios/*` enlaza a su página de `/ubicaciones/*` más relevante ("Fade en Conkal", "Fade en Cholul") y viceversa. Cada artículo de `/blog/*` enlaza mínimo a 2 páginas de servicio y 1 de ubicación. Esto concentra PageRank interno en las páginas transaccionales.

Nota técnica: hoy el sitio es 100% componentes cliente en una sola ruta. Migrar a este SILO implica crear rutas reales en `app/servicios/[slug]/page.tsx` y `app/ubicaciones/[slug]/page.tsx` con metadata única por página (Next.js `generateMetadata`) — es el cambio de mayor impacto de todo este plan.

---

## 4. SEO Local — Google Business Profile

| Elemento | Acción |
|---|---|
| NAP | Nombre, dirección y teléfono **idénticos** en el sitio, GBP, Facebook, Instagram y cualquier directorio (hoy: "Barbería Silver Fox", Conkal, Yucatán, +52 999 639 5874 — usar exactamente así en todos lados) |
| Categoría principal | Barber Shop |
| Categorías secundarias | Hair salon, Men's clothing store (si aplica), Beauty salon |
| Servicios en GBP | Cargar cada servicio de `lib/config.ts` con precio (Google lo permite en la ficha de servicios) |
| Descripción | 750 caracteres, con entidades: "barbería en Conkal, Yucatán", "fade", "barba", "afeitado clásico", sin keyword stuffing |
| Fotos | Mínimo 3/semana el primer mes: fachada, interior, equipo, resultados (antes/después), logo. Nombradas con keyword antes de subir (sección 8) |
| Videos | Cortes en proceso (15-30s), tour del local |
| Preguntas y respuestas | Auto-poblar las 6 FAQ ya existentes en `config.ts` (adaptadas), responder cualquier pregunta pública en <24h |
| Publicaciones (Posts) | 1-2 por semana: oferta, evento, nuevo corte destacado, siempre con CTA y enlace a WhatsApp o al sitio |
| Reseñas | Meta: 5 reseñas nuevas/mes. Pedir activamente al cerrar cada cita (mensaje de WhatsApp post-servicio con link directo de reseña). Responder el 100%, incluidas negativas, en <48h |
| Área de servicio | Definir radio que cubra Conkal, Cholul, Altabrisa, Montebello, Temozón Norte, Francisco de Montejo, Las Américas, Caucel y norte de Mérida |
| Citas locales (citations) | Alta consistente en: Google Maps, Facebook, Instagram, Waze, Apple Maps, directorios locales de Yucatán, páginas amarillas MX |
| Backlinks locales | Cámara de Comercio de Mérida, medios locales (Diario de Yucatán, Por Esto, Yucatán Ahora), asociaciones de barberos, colaboración con negocios vecinos en Conkal |

---

## 5. Calendario editorial — 12 meses

Cada artículo enlaza a ≥2 páginas de `/servicios` y 1 de `/ubicaciones` (regla del SILO, sección 3). Estructura por artículo: Meta Title (≤60c) · Meta Description (≤155c) · H1 · 2-4 H2 · FAQ propia con schema · CTA a WhatsApp.

| Mes | Título | Slug | Intención | Keyword principal |
|---|---|---|---|---|
| 1 | Guía completa de fades 2026: low, mid, high y skin fade | `/blog/guia-fades-2026` | Informacional → comercial | tipos de fade |
| 2 | ¿Cuánto cuesta un corte fade en Mérida? Precios reales | `/blog/precio-fade-merida` | Comercial | precio fade Mérida |
| 3 | Ritual de barba con navaja: qué incluye y por qué vale la pena | `/blog/ritual-barba-navaja` | Informacional | ritual de barba |
| 4 | Mejor barbería en Conkal: qué buscar antes de agendar | `/blog/mejor-barberia-conkal` | Comercial local | mejor barbería Conkal |
| 5 | Pompadour vs French Crop: cuál te queda mejor | `/blog/pompadour-vs-french-crop` | Informacional | pompadour french crop |
| 6 | Cómo cuidar tu barba en casa entre visitas | `/blog/cuidado-barba-en-casa` | Informacional | cuidado de barba |
| 7 | Undercut 2026: guía y variantes para hombre | `/blog/undercut-guia` | Informacional | undercut hombre |
| 8 | Barbería cerca de Cholul: cómo llegar desde Altabrisa y Montebello | `/blog/barberia-cerca-cholul` | Local | barbería cerca de Cholul |
| 9 | Cada cuánto debe cortarse el cabello un hombre | `/blog/frecuencia-corte-cabello` | Informacional | cada cuánto cortar cabello |
| 10 | Skin fade: el corte más pedido — todo lo que debes saber | `/blog/skin-fade-todo` | Comercial | skin fade |
| 11 | Regala una cita: guía de tarjetas de regalo Silver Fox (temporada) | `/blog/tarjeta-regalo-barberia` | Comercial estacional | regalo barbería hombre |
| 12 | Resumen del año: los 10 cortes más pedidos en Silver Fox | `/blog/cortes-mas-pedidos-2026` | Informacional/marca | cortes populares 2026 |

Cada entrada de blog debe incluir `Article` + `FAQPage` JSON-LD, imágenes propias (antes/después reales, no stock) y enlaces internos según la regla del SILO.

---

## 6. E-E-A-T

- **Página `/equipo`**: bio real de cada barbero (Alan, Ricardo, Tony, Eduardo — ya en `config.ts`), años de experiencia, especialidad, certificaciones si las tienen, foto profesional.
- **Experiencia**: sección "antes y después" con casos reales (ya existe `results` en config — separarla en página propia indexable con más volumen).
- **Autoridad**: menciones en medios locales, colaboraciones, patrocinios de eventos en Conkal/Mérida.
- **Confianza**: página de contacto con dirección exacta + mapa embebido (ya existe), política de cancelación/reprogramación visible, información legal básica (razón social si aplica).
- **Testimonios**: los 4 actuales en `config.ts` son buenos — expandir a 15-20 con foto/nombre real y marcarlos con schema `Review` individual (no solo `AggregateRating`).

---

## 7. CRO (Conversion Rate Optimization)

El sitio ya hace bien lo esencial: WhatsApp como CTA principal, formulario corto, modal de reserva en 4 pasos. Mejoras:

| Acción | Por qué | Prioridad |
|---|---|---|
| Botón WhatsApp flotante visible en scroll (verificar que ya esté siempre visible en móvil) | Reduce fricción, es el canal de conversión real del negocio | Alta |
| Agregar horario "abierto ahora / cerrado" dinámico junto al botón de reserva | Urgencia + reduce mensajes de "¿están abiertos?" | Media |
| Prueba social cerca del CTA (rating + reviewCount ya existen en `brand`) | Ancla de confianza en el momento de decisión | Media |
| Medir con GA4: eventos en clic de WhatsApp, envío de formulario, apertura de modal de reserva, scroll depth | Sin esto no se puede optimizar nada de lo anterior | Alta — bloqueante para medir CRO |
| Heatmaps (Microsoft Clarity, gratis) | Ver dónde se pierden usuarios en el flujo de reserva | Media |

---

## 8. SEO de imágenes

Aplicar a toda la galería (`silver1.jpg`…`silver8.jpg`, `corte1.jpg`…`corte13.jpg`) y fotos de equipo:

- **Nombre de archivo**: descriptivo antes de subir. Ej. `taper-fade-barberia-conkal-01.jpg` en vez de `corte1.jpg`.
- **ALT**: ya existen alts descriptivos en `config.ts` (bien hecho) — mantener ese estándar en todo contenido nuevo, incluir ciudad cuando sea natural ("Taper fade terminado en Silver Fox, Conkal").
- **Formato**: usar `next/image` (confirmar en `Gallery`/`Results` components) para servir WebP/AVIF automáticamente y lazy loading nativo.
- **Compresión**: verificar que los originales no superen ~200KB antes de build.
- **Geolocalización EXIF**: opcional, bajo impacto, pero ayuda marginalmente en fotos subidas directo a GBP.

---

## 9. SEO para IA (GEO — Generative Engine Optimization)

Para que ChatGPT, Gemini, Claude, Copilot y Perplexity citen o recomienden la barbería:

- Contenido con **respuestas directas y verificables** al inicio de cada sección (ej. "Silver Fox está en Conkal, Yucatán, abre Lunes a Viernes de 11:00 a 20:00, Sábado 10:00-18:00, Domingo 9:30-14:00" — dato ya correcto en el sitio tras los cambios recientes).
- Datos estructurados completos (JSON-LD ya mejorado hoy) — los LLMs con acceso a búsqueda leen schema.org igual que Google.
- Formato pregunta-respuesta explícito en FAQ (ya existe, ahora también marcado con `FAQPage`).
- Evitar contenido ambiguo o solo visual (texto dentro de imágenes sin alt): todo dato clave (precio, horario, dirección) debe existir como texto real en el HTML, no solo en imagen.
- Mantener consistencia absoluta de NAP y precios entre sitio, GBP y redes — los LLMs cruzan fuentes y penalizan (no citan) cuando hay contradicciones.

---

## 10. Link building — 12 meses (White Hat)

| Trimestre | Acciones |
|---|---|
| Q1 | Alta en directorios base (Google, Bing Places, Apple Maps, Waze, páginas amarillas MX, directorios de Yucatán) |
| Q1-Q2 | Colaboración con negocios vecinos en Conkal (intercambio de menciones, no de links pagados) |
| Q2 | Nota de prensa local ("nueva barbería premium en Conkal") a Diario de Yucatán, Por Esto, Yucatán Ahora |
| Q2-Q3 | Patrocinio de un evento local (deportivo, cultural) en Conkal/Mérida a cambio de mención en su web |
| Q3 | Guest post en blogs de estilo/moda masculina de México (aportando valor real, no solo enlace) |
| Q3-Q4 | Colaboración con micro-influencers locales de Mérida (grooming/lifestyle) — contenido genuino, no solo backlink |
| Q4 | Evaluar relación con cámara empresarial de Yucatán / asociación de barberos si existe |

Todo enfocado en **relevancia local real**, no en volumen — 10 enlaces locales de calidad valen más que 100 genéricos.

---

## 11. Roadmap de implementación (12 meses, priorizado)

| Fase | Qué | Impacto | Esfuerzo |
|---|---|---|---|
| **Mes 0 (bloqueante)** | Comprar dominio real, verificar en Search Console + GBP, instalar GA4 | 🔴 Alto | 🟢 Bajo |
| Mes 1 | Migrar servicios y ubicaciones a rutas propias (`/servicios/*`, `/ubicaciones/*`) con metadata única | 🔴 Alto | 🔴 Alto |
| Mes 1 | Optimización completa de Google Business Profile (sección 4) | 🔴 Alto | 🟡 Medio |
| Mes 2 | Página `/equipo` con bios reales (E-E-A-T) | 🟡 Medio | 🟢 Bajo |
| Mes 2 | Sistema de solicitud de reseñas post-cita por WhatsApp | 🔴 Alto | 🟢 Bajo |
| Mes 2-3 | Iniciar blog, 1 artículo/mes según calendario (sección 5) | 🟡 Medio (acumulativo) | 🟡 Medio |
| Mes 3 | Eventos GA4 en CTAs (WhatsApp, formulario, modal) | 🔴 Alto | 🟢 Bajo |
| Mes 4 | Separar galería/resultados en páginas propias indexables | 🟡 Medio | 🟢 Bajo |
| Mes 4-6 | Primeras citas locales y nota de prensa | 🟡 Medio | 🟡 Medio |
| Mes 6 | Auditoría de Core Web Vitals en producción y ajustes | 🟡 Medio | 🟡 Medio |
| Mes 6-12 | Continuar calendario editorial + link building trimestral | 🟡 Medio (acumulativo alto) | 🟡 Medio |
| Mes 12 | Auditoría anual completa, reevaluar keywords ganadas/perdidas | — | 🟡 Medio |

---

## 12. Checklist priorizado (Impacto × Esfuerzo)

**Alto impacto / bajo esfuerzo — hacer primero:**
- [x] Corregir schema de horarios (hecho hoy)
- [x] Crear `robots.txt` y `sitemap.xml` (hecho hoy)
- [ ] Comprar dominio + verificar Search Console/GBP/GA4
- [ ] Optimizar ficha de Google Business Profile completa
- [ ] Sistema de solicitud de reseñas post-cita

**Alto impacto / alto esfuerzo — planificar:**
- [ ] Arquitectura SILO (`/servicios/*`, `/ubicaciones/*`) con metadata única
- [ ] Blog con calendario editorial de 12 meses

**Medio impacto / bajo esfuerzo — quick wins continuos:**
- [ ] Página `/equipo` (E-E-A-T)
- [ ] Página de galería/resultados independiente
- [ ] Renombrar imágenes con keywords antes de cada subida

**Medio impacto / medio esfuerzo — construir en el tiempo:**
- [ ] Link building trimestral
- [ ] Reviews individuales con schema
- [ ] Core Web Vitals en producción

---

## 13. Medición (Search Console, GA4, GBP)

| Métrica | Herramienta | Qué indica |
|---|---|---|
| Impresiones/clics por keyword local | Search Console → Rendimiento, filtrar por consulta | Si las keywords de la sección 2 empiezan a aparecer |
| Posición promedio por página | Search Console → Rendimiento, filtrar por página | Efecto directo del SILO (sección 3) |
| Cobertura de indexación | Search Console → Páginas | Confirma que las nuevas rutas se indexan |
| Core Web Vitals (LCP, INP, CLS) | Search Console → Experiencia + PageSpeed Insights | Salud técnica real en campo (CrUX) |
| Eventos de conversión (WhatsApp, formulario, modal) | GA4 → Eventos/Conversiones | Mide si el tráfico SEO convierte, no solo si llega |
| Sesiones por canal orgánico vs. directo/social | GA4 → Adquisición | Peso real del SEO vs. otros canales |
| Vistas de ficha, acciones (llamadas, cómo llegar, sitio web), búsquedas que la muestran | Google Business Profile → Estadísticas | Efecto directo de la sección 4 |
| Cantidad y velocidad de respuesta a reseñas | GBP → Reseñas | Impacto directo en Local Pack de Maps |

**Regla de reporte:** revisar Search Console + GA4 + GBP mensualmente, cruzando siempre "qué se publicó" (roadmap sección 11) contra "qué cambió" en estas métricas — sin esa correlación explícita el reporte es solo un dashboard, no una estrategia.
