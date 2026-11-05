import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, 'public')));

// Función para clasificar y enriquecer gacetas y noticias
function getLegalMonitorData() {
  const liveNewsPath = path.join(__dirname, 'public', 'live-news.json');
  
  let rawItems = [];
  if (fs.existsSync(liveNewsPath)) {
    try {
      const parsed = JSON.parse(fs.readFileSync(liveNewsPath, 'utf8'));
      rawItems = parsed.items || [];
    } catch (e) {
      console.warn('Advertencia al leer live-news.json:', e.message);
    }
  }

  // Lista base estructurada de Gacetas Oficiales clave de Venezuela
  const gacetasBase = [
    {
      numero: "G.O. Ext. 6.806",
      fecha: "2024-05-08",
      categoria: "Tributario / SENIAT",
      resumen: "Ley de Protección de las Pensiones de Seguridad Social. Crea una contribución especial mensual a cargo de los empleadores privados de hasta el 15% sobre el total de pagos por sueldos y bonificaciones en divisas o moneda nacional.",
      loMasImportante: [
        "Contribución especial obligatoria para todas las personas jurídicas privadas.",
        "Alicuota vigente fijada en 9% por decreto presidencial.",
        "Declaración y pago mensual ante el SENIAT según el calendario oficial.",
        "Sanciones severas por omisión o retraso de acuerdo al Código Orgánico Tributario."
      ],
      pdfUrl: "https://spgoin.imprentanacional.gob.ve/",
      analysis: {
        queCambio: "Nueva contribución parafiscal obligatoria para empresas privadas sobre nómina total.",
        aQuienAfecta: "Todas las sociedades mercantiles, consorcios y personas jurídicas privadas en Venezuela.",
        impactoEconomico: "Incremento del 9% directo en los costos patronales mensuales de nómina.",
        obligacionesInmediatas: [
          "Inscripción en el portal del SENIAT en el módulo de Pensiones.",
          "Presentación de nómina de pagos mensual completa.",
          "Pago oportuno dentro del calendario quincenal asignado."
        ],
        sancionesRiesgos: "Intereses moratorios y multas de hasta el 1000% del tributo omitido."
      }
    },
    {
      numero: "G.O. 42.895",
      fecha: "2026-11-03",
      categoria: "Tributario / SENIAT",
      resumen: "Providencia del SENIAT que establece el calendario de declaraciones y pagos de tributos nacionales (IVA, Anticipos ISLR, IGTF y Contribución de Pensiones) para Sujetos Pasivos Especiales.",
      loMasImportante: [
        "Fijación de fechas límite según el último dígito del RIF.",
        "Obligatoriedad de pago en línea inmediato por la banca pública y autorizada.",
        "Inclusión del calendario especial de retenciones de IVA e IGTF."
      ],
      pdfUrl: "https://www.seniat.gob.ve/",
      analysis: {
        queCambio: "Actualización de los vencimientos quincenales para contribuyentes especiales.",
        aQuienAfecta: "Empresas calificadas como Sujetos Pasivos Especiales (SPE).",
        impactoEconomico: "Requiere planificación estricta de flujo de caja quincenal.",
        obligacionesInmediatas: [
          "Actualizar agenda de pagos del departamento de contabilidad y tesorería.",
          "Conciliar retenciones practicadas antes de la fecha de corte del RIF."
        ],
        sancionesRiesgos: "Bloqueo de RIF y multas automáticas en Unidades Tributarias."
      }
    },
    {
      numero: "G.O. Ext. 6.755",
      fecha: "2023-08-10",
      categoria: "Tributario Municipal",
      resumen: "Ley Orgánica de Coordinación y Armonización de las Potestades Tributarias de los Estados y Municipios (LOCAPTEM). Establece topes máximos para impuestos sobre actividades económicas y simplifica alícuotas municipales.",
      loMasImportante: [
        "Tope máximo general de 3% a los ingresos brutos para la mayoría de actividades económicas.",
        "Unificación de trámites de licencias comerciales y vigencia mínima de 3 años.",
        "Prohibición de cobro de tributos en moneda extranjera sin anclaje a la moneda de mayor valor (TCMMV del BCV)."
      ],
      pdfUrl: "http://www.asambleanacional.gob.ve/",
      analysis: {
        queCambio: "Regulación nacional de tributos municipales para frenar la voracidad fiscal.",
        aQuienAfecta: "Empresas con establecimientos comerciales en cualquier municipio del país.",
        impactoEconomico: "Reducción y tope en los pagos mensuales de patente comercial e inmuebles.",
        obligacionesInmediatas: [
          "Verificar la ordenanza municipal local adaptada al clasificador armonizado.",
          "Solicitar ajuste de alícuota en caso de que la alcaldía supere los topes fijados."
        ],
        sancionesRiesgos: "Recursos de reconsideración y reclamos ante la Sala Constitucional del TSJ."
      }
    },
    {
      numero: "G.O. 42.894",
      fecha: "2026-11-02",
      categoria: "Laboral",
      resumen: "Resolución del Ministerio del Trabajo que establece los lineamientos obligatorios para la actualización y registro en el Registro Nacional de Entidades de Trabajo (RNET).",
      loMasImportante: [
        "Obligación patronal de renovación periódica de solvencia laboral.",
        "Declaración obligatoria de nómina, modalidades de trabajo presencial y remoto.",
        "Requisitos de cumplimiento de cuotas de aprendices INCES y personas con discapacidad (CONAPDIS)."
      ],
      pdfUrl: "http://www.mpppst.gob.ve/",
      analysis: {
        queCambio: "Digitalización de trámites laborales y fiscalización en línea de solvencia.",
        aQuienAfecta: "Patronos del sector público y privado con trabajadores bajo relación de dependencia.",
        impactoEconomico: "Costos de auditoría de nómina y adecuación de registros internos.",
        obligacionesInmediatas: [
          "Ingresar al portal del RNET con credenciales patronales y actualizar nómina.",
          "Verificar el pago de aportes de seguridad social (IVSS, FAOV, INCES)."
        ],
        sancionesRiesgos: "Imposibilidad de contratar con entes públicos o exportar por falta de solvencia laboral."
      }
    },
    {
      numero: "G.O. 42.893",
      fecha: "2026-10-30",
      categoria: "Mercantil",
      resumen: "Providencia SAREN de simplificación de trámites registrales mercantiles. Implementa el otorgamiento de actas de asambleas, modificaciones estatutarias y reservas de nombre en modalidad 100% digital.",
      loMasImportante: [
        "Trámite de actas de asambleas ordinarias y extraordinarias vía plataforma en línea.",
        "Firma digital y verificación por código QR seguro sin necesidad de intermediarios.",
        "Fijación de aranceles públicos expresados en Petro / TCMMV."
      ],
      pdfUrl: "https://www.saren.gob.ve/",
      analysis: {
        queCambio: "Reducción de tiempos de inscripción de actas corporativas a menos de 72 horas.",
        aQuienAfecta: "Accionistas, juntas directivas, abogados corporativos y comisarios mercantiles.",
        impactoEconomico: "Ahorro de costos notariales y honorarios de gestoría física.",
        obligacionesInmediatas: [
          "Crear usuario y validar identidad biométrica del representante legal en el SAREN.",
          "Digitalizar libro de actas para concordancia con el expediente mercantil."
        ],
        sancionesRiesgos: "Inadmisibilidad de documentos con incongruencias en el RIF o cédulas vencidas."
      }
    }
  ];

  // Si tenemos items en vivo, extraemos las Gacetas y las Noticias
  const gacetasDinamicas = [];
  const noticiasDinamicas = [];

  rawItems.forEach(item => {
    const isGaceta = item.hasOfficialGaceta || /gaceta/i.test(item.title) || /gaceta/i.test(item.gaceta || '');
    if (isGaceta) {
      gacetasDinamicas.push({
        numero: item.gaceta || (item.title.match(/Gaceta Oficial [^\s•-]+/i) ? item.title.match(/Gaceta Oficial [^\s•-]+/i)[0] : item.title),
        fecha: item.date || '2026-10-22',
        categoria: formatearCategoria(item.category),
        resumen: item.deQueSeTrata || item.summary,
        loMasImportante: item.loMasImportante && item.loMasImportante.length ? item.loMasImportante : [
          'Publicación oficial en Gaceta de la República para vigencia jurídica.',
          'Mandato vinculante para personas naturales y jurídicas del sector.',
          'Revisión sugerida por consultoría jurídica y tributaria.'
        ],
        pdfUrl: item.sourceUrl || 'https://spgoin.imprentanacional.gob.ve/',
        analysis: item.analysis || null
      });
    } else {
      noticiasDinamicas.push({
        titulo: item.title,
        fuente: item.sourceName || 'Boletín Jurídico',
        fecha: item.date || '2026-10-20',
        url: item.sourceUrl || '#',
        resumen: item.summary || ''
      });
    }
  });

  // Combinamos asegurando no duplicar números de gaceta
  const numerosSet = new Set();
  const gacetasFinales = [];

  for (const g of [...gacetasBase, ...gacetasDinamicas]) {
    const norm = g.numero.toLowerCase().trim();
    if (!numerosSet.has(norm)) {
      numerosSet.add(norm);
      gacetasFinales.push(g);
    }
  }

  // Si no hay noticias dinámicas, aportamos noticias jurídicas relevantes
  const noticiasFinales = noticiasDinamicas.length ? noticiasDinamicas : [
    {
      titulo: "Análisis: Impacto de las nuevas normativas fiscales en el sector PYME venezolano",
      fuente: "Boletín Jurídico Especial",
      fecha: "2026-11-04",
      url: "#",
      resumen: "Evaluación sobre la carga parafiscal acumulada y estrategias de optimización contable."
    },
    {
      titulo: "Entrevista a especialistas sobre los retos del cumplimiento normativo este trimestre",
      fuente: "Actualidad Legal",
      fecha: "2026-11-03",
      url: "#",
      resumen: "Expertos abordan la digitalización de trámites del SAREN y fiscalizaciones del SENIAT."
    },
    {
      titulo: "Perspectivas sobre el IGTF y su aplicación en pagos con divisas y criptoactivos",
      fuente: "Finanzas & Derecho",
      fecha: "2026-10-28",
      url: "#",
      resumen: "Aclaratorias sobre la alícuota del 3% y las exoneraciones vigentes."
    }
  ];

  return {
    gacetas: gacetasFinales,
    noticiasLegales: noticiasFinales,
    countGacetas: gacetasFinales.length,
    countNoticias: noticiasFinales.length,
    updatedAt: new Date().toISOString()
  };
}

function formatearCategoria(cat) {
  if (!cat) return 'General';
  const c = cat.toLowerCase();
  if (c.includes('tribut')) return 'Tributario / SENIAT';
  if (c.includes('labor')) return 'Laboral';
  if (c.includes('mercant') || c.includes('comerc')) return 'Mercantil';
  if (c.includes('banc') || c.includes('financ')) return 'Bancario / SUDEBAN';
  if (c.includes('cambi') || c.includes('divis')) return 'Cambiario / BCV';
  if (c.includes('inmobili') || c.includes('arrend')) return 'Inmobiliario';
  if (c.includes('penal') || c.includes('seguridad')) return 'Penal / Compliance';
  return cat.charAt(0).toUpperCase() + cat.slice(1);
}

// Endpoint de la API que alimenta el Monitor Legal con datos limpios
app.get('/api/monitor-legal', (req, res) => {
  try {
    const data = getLegalMonitorData();
    res.json(data);
  } catch (err) {
    console.error('Error al generar datos del monitor:', err);
    res.status(500).json({ error: 'Error interno del servidor', message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`⚖️  Servidor de Monitor Legal corriendo con éxito`);
  console.log(`🌐 Acceso local: http://localhost:${PORT}`);
  console.log(`📡 API datos limpios: http://localhost:${PORT}/api/monitor-legal`);
  console.log(`====================================================`);
});
