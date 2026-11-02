// Servicio avanzado de extracción, clasificación y enriquecimiento semántico de noticias jurídicas de Venezuela

// Limpiador de títulos para remover ruido de redes sociales y portales
function cleanTitle(raw) {
  if (!raw) return '';
  return raw
    .replace(/^#\w+\|?\s*/i, '') // Remover hashtags tipo #EnVideo|, #ÚltimaHora|
    .replace(/^\[.*?\]\s*/, '')
    .replace(/\s*-\s*(Facebook|Instagram|Twitter|X|YouTube|TikTok|Threads)\b.*$/i, '')
    .replace(/\s*\|\s*(Facebook|Instagram|Twitter|X)\b.*$/i, '')
    .replace(/\s*-\s*(Finanzas Digital|Acceso a la Justicia|Banca y Negocios|El Universal|Últimas Noticias|El Nacional|Tal Cual|Efecto Cocuyo|Asamblea Nacional|Gaceta Oficial de Venezuela \d+|DiarioVea|El Diario Venezuela).*$/i, '')
    .replace(/\s*\|\s*(Acceso a la Justicia|Finanzas Digital|Banca y Negocios|DiarioVea).*$/i, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Extractor preciso de Número de Gaceta Oficial
function extractGacetaNumber(text) {
  if (!text) return null;
  
  // Casos comunes: "Gaceta Oficial N° 43.477", "Gaceta Oficial #43485", "G.O. 6.806 Ext."
  const patterns = [
    /gaceta\s*(?:oficial|extraordinaria)?\s*(?:n[°º.]*|#)\s*([0-9\.\,]+)\s*(extraordinario|ext|ordinaria)?/i,
    /g\.?o\.?\s*(?:n[°º.]*|#)?\s*([0-9\.\,]+)\s*(extraordinario|ext|ordinaria)?/i,
    /gaceta\s*(?:oficial)?\s*#?\s*([0-9]{5,})/i
  ];

  for (const pat of patterns) {
    const match = text.match(pat);
    if (match) {
      const num = match[1].replace(',', '.');
      const isExt = match[2] || /extraordinari/i.test(text);
      return `Gaceta Oficial N° ${num}${isExt ? ' Extraordinario' : ''}`;
    }
  }

  if (/gaceta\s*oficial/i.test(text)) {
    return 'Gaceta Oficial (Sumario en Verificación)';
  }

  return 'Trámite Legislativo / En Prensa Oficial';
}

// Generador de análisis y resumen sustancial "¿De qué se trata?" y "Resumen de lo más importante"
function generateSubstantiveAnalysis(title, lower, gaceta, source) {
  let category = 'mercantil';
  let entity = 'Poder Público Nacional';
  let impact = 'medio';
  let deQueSeTrata = '';
  let loMasImportante = [];
  let aQuienAfecta = 'Empresas, personas jurídicas y ciudadanos en Venezuela';

  // 1. Detección temática detallada

  // TEMA: Gaceta Oficial y Sumarios
  if (/gaceta oficial/i.test(lower) && (/sumario/i.test(lower) || /#\d+|\b43\d{3}\b/i.test(lower))) {
    category = 'tributaria';
    entity = 'Imprenta Nacional / Ejecutivo Nacional';
    impact = 'alto';
    aQuienAfecta = 'Sectores empresariales, personas reguladas y entes de la administración pública';
    deQueSeTrata = `Publicación y sumario formal del órgano oficial de la República Bolivariana de Venezuela (${gaceta}). Contiene los decretos presidenciales, resoluciones de ministerios, providencias de entes autónomos (como SENIAT o SUDEBAN) y designaciones de Estado que entran formalmente en vigor a partir de su divulgación pública.`;
    loMasImportante = [
      `Publicación formal en ${gaceta} para surtir plenos efectos jurídicos.`,
      'Contiene resoluciones administrativas vinculantes y regulaciones sectoriales de ministerios.',
      'Marca el inicio de los plazos legales para la adecuación o cumplimiento de los mandatos oficiales.',
      'Revisión recomendada para departamentos de auditoría interna, contabilidad y asesoría jurídica.'
    ];
  }
  // TEMA: SENIAT - Facturación y Máquinas Fiscales
  else if (/seniat/i.test(lower) && (/m[aá]quinas? fiscales?|factura/i.test(lower))) {
    category = 'tributaria';
    entity = 'SENIAT';
    impact = 'critico';
    aQuienAfecta = 'Comercios, prestadores de servicios, restaurantes y contribuyentes obligados a facturar';
    deQueSeTrata = 'Providencia administrativa del SENIAT que establece nuevas directrices para la emisión de facturas y documentos equivalentes en Venezuela. Se evalúan y formalizan mecanismos alternativos de facturación digital y electrónica autorizada, flexibilizando la exigencia exclusiva de adquisición de costosas máquinas fiscales físicas para determinados sectores comerciales.';
    loMasImportante = [
      'Apertura y autorización de medios digitales y sistemas de facturación electrónica homologados.',
      'Obligación de mantener la transmisión digital de reportes de ventas y libros al portal del SENIAT.',
      'Exigencia estricta de cumplimiento de requisitos de seguridad fiscal para impedir la alteración de datos.',
      'Alivio operativo y financiero en la adquisición de equipos fiscales físicos para pymes.'
    ];
  }
  // TEMA: SENIAT - Sujetos Pasivos Especiales (SPE)
  else if (/seniat/i.test(lower) && (/sujetos? pasivos? especiales?|calificaci[oó]n|contribuyentes? especiales?/i.test(lower))) {
    category = 'tributaria';
    entity = 'SENIAT';
    impact = 'critico';
    aQuienAfecta = 'Empresas, personas jurídicas y comercios notificados o en umbral de facturación';
    deQueSeTrata = 'Providencia del SENIAT que actualiza los criterios, parámetros y baremos de ingresos brutos anuales para la designación de Contribuyentes Especiales (Sujetos Pasivos Especiales - SPE). Ser calificado como SPE impone inmediatamente la obligación de actuar como agente de retención de IVA, agente de percepción del 3% del IGTF en divisas y ajustarse a calendarios de declaración quincenales.';
    loMasImportante = [
      'Actualización de los umbrales de ingresos mínimos medidos en moneda de mayor valor para calificar como SPE.',
      'Deber inexcusable de percibir el 3% de IGTF cuando los clientes cancelen en divisas en efectivo o Zelle.',
      'Sometimiento al calendario especial de pagos anticipados y declaraciones quincenales del SENIAT.',
      'Sanciones severas de cierre del establecimiento y multas del COT por falta de retención o enteramiento.'
    ];
  }
  // TEMA: Ley contra el Odio y Libertad de Expresión en Medios/Redes
  else if (/ley contra el odio|odio/i.test(lower)) {
    category = 'penal';
    entity = 'Asamblea Nacional / Presidencia de la República';
    impact = 'critico';
    aQuienAfecta = 'Ciudadanos, medios de comunicación, periodistas, generadores de contenido y plataformas digitales';
    deQueSeTrata = 'Proyecto de reforma remitido por el Ejecutivo Nacional a la Asamblea Nacional para revisar la Ley Constitucional contra el Odio. La propuesta busca despenalizar ciertas conductas tipificadas, adecuar la proporcionalidad de las sanciones y reformular los supuestos de responsabilidad vinculados al uso de redes sociales y medios digitales.';
    loMasImportante = [
      'Iniciativa parlamentaria para despenalizar tipos penales ambiguos y graduar sanciones pecuniarias.',
      'Revisión de estándares de responsabilidad para titulares de cuentas en redes sociales y canales digitales.',
      'Ajuste en los criterios de medidas cautelares y bloqueos de plataformas web.',
      'Debate de primera y segunda discusión en el seno de la Asamblea Nacional.'
    ];
  }
  // TEMA: Emergencia Económica (TSJ / Decretos)
  else if (/emergencia econ[oó]mica/i.test(lower)) {
    category = 'mercantil';
    entity = 'Tribunal Supremo de Justicia (TSJ) / Presidencia';
    impact = 'critico';
    aQuienAfecta = 'Empresas privadas, banca nacional, importadores y contratistas del Estado';
    deQueSeTrata = 'Sentencia de la Sala Constitucional del TSJ que declara la constitucionalidad de la prórroga del Decreto de Estado de Excepción y Emergencia Económica. Este régimen faculta a la Presidencia de la República a dictar medidas financieras, fiscales y arancelarias extraordinarias sin requerir aprobación legislativa previa.';
    loMasImportante = [
      'Mantiene habilitadas las facultades especiales del Ejecutivo en política cambiaria, aranceles y presupuesto.',
      'Permite la ejecución de contrataciones públicas directas y exoneraciones fiscales estratégicas.',
      'Sustenta la legalidad de los mecanismos de intervención en el mercado cambiario bancario.',
      'Prórroga válida por 60 días continuos con efectos inmediatos en todo el país.'
    ];
  }
  // TEMA: Ley de Amnistía / Medidas Judiciales / Liberaciones
  else if (/ley de amnist[ií]a|amnist[ií]a|liberaci/i.test(lower)) {
    category = 'penal';
    entity = 'Asamblea Nacional / Poder Judicial';
    impact = 'critico';
    aQuienAfecta = 'Personas procesadas judicialmente, defensores de DDHH y empresas evaluando riesgos de compliance';
    deQueSeTrata = 'Instrumento legal promovido en el parlamento nacional para la concesión de amnistías y sobreseimientos en causas penales abiertas por eventos de confrontación política. Conlleva la extinción definitiva de la acción penal y la libertad de procesados.';
    loMasImportante = [
      'Extinción de la acción penal y anulación de medidas cautelares privativas de libertad.',
      'Levantamiento de medidas de aseguramiento sobre bienes, congelamiento bancario y prohibiciones de salida.',
      'Aprobación unánime orientada a distender el clima político y restablecer garantías jurídicas.',
      'Relevante para análisis de riesgo país y debida diligencia de contrapartes.'
    ];
  }
  // TEMA: Tribunal Supremo de Justicia (Reforma de la Ley Orgánica del TSJ)
  else if (/reforma.*ley.*tsj|ley org[aá]nica del tribunal supremo/i.test(lower)) {
    category = 'penal';
    entity = 'Asamblea Nacional / TSJ';
    impact = 'alto';
    aQuienAfecta = 'Abogados litigantes, empresas con litigios mercantiles o tributarios y operadores de justicia';
    deQueSeTrata = 'Reforma legal orientada al funcionamiento y estructura del Tribunal Supremo de Justicia y el sistema judicial nacional. Modifica normas sobre composición de Salas, facultades de la Inspectoría de Tribunales y causales de recusación o admisibilidad procesal.';
    loMasImportante = [
      'Redefinición de competencias en Salas Constitucional, Político-Administrativa y Casación.',
      'Nuevos estándares sobre celeridad procesal y reducción del retardo judicial.',
      'Formalización de criterios vinculantes sobre digitalización de expedientes y expedición de copias.',
      'Impacto en la predictibilidad de fallos para controversias corporativas y laborales.'
    ];
  }
  // TEMA: Inquilinato, SUNAVI y Notificaciones por WhatsApp
  else if (/sunavi|arrendamiento|alquiler|whatsapp|inmueble/i.test(lower)) {
    category = 'inmobiliaria';
    entity = 'SUNAVI / Tribunal Supremo de Justicia';
    impact = 'alto';
    aQuienAfecta = 'Propietarios, arrendadores, inquilinos residenciales/comerciales e inmobiliarias';
    deQueSeTrata = 'Doctrina y resoluciones vinculantes de la SUNAVI y del TSJ sobre juicios de inquilinato y contratos de arrendamiento. Se valida el uso de herramientas electrónicas como WhatsApp para citaciones y notificaciones procesales legítimas, ratificando además los requisitos administrativos previos obligatorios antes de intentar desalojos judiciales.';
    loMasImportante = [
      'Plena validez jurídica y probatoria de notificaciones enviadas por WhatsApp si cumplen los recaudos de fehaciencia.',
      'Obligación estricta de agotar la audiencia conciliatoria previa ante la SUNAVI antes de demandar.',
      'Prohibición de desalojos arbitrarios o corte de servicios básicos por parte del arrendador.',
      'Orientación para fijación de cánones con cláusulas contractuales seguras.'
    ];
  }
  // TEMA: Vivienda y Construcción
  else if (/construcci[oó]n de viviendas|ley de vivienda/i.test(lower)) {
    category = 'inmobiliaria';
    entity = 'Asamblea Nacional / Ministerio de Hábitat y Vivienda';
    impact = 'alto';
    aQuienAfecta = 'Promotores inmobiliarios, constructoras, banca hipotecaria y adquirentes';
    deQueSeTrata = 'Nueva legislación para incentivar y regular la construcción de desarrollos habitacionales. Plantea un esquema mixto de flexibilización de permisos para constructoras privadas y esquemas de preventa protegida, coexistiendo con las facultades de regulación estatal sobre la tierra urbanizable.';
    loMasImportante = [
      'Mecanismos de flexibilización y ventanilla única para permisos de construcción y habitabilidad.',
      'Reglas para contratos de preventa e indexación de cuotas de financiamiento inmobiliario.',
      'Incentivos para la participación privada en urbanismos y desarrollos mixtos.',
      'Regulación de garantías fiduciarias y entrega oportuna de títulos de propiedad.'
    ];
  }
  // TEMA: SENIAT, Impuestos, Fiscalización y Tributos (General)
  else if (/seniat|tribut|fiscal|islr|iva|igtf|locaptem|impuesto/i.test(lower)) {
    category = 'tributaria';
    entity = 'SENIAT / Ministerio de Economía y Finanzas';
    impact = 'critico';
    aQuienAfecta = 'Sujetos Pasivos Especiales, comerciantes, profesionales independientes y empresas';
    deQueSeTrata = 'Disposiciones del SENIAT referentes a la administración tributaria, modernización de intendencias regionales, cumplimiento del calendario de contribuyentes especiales y fiscalización de la emisión de comprobantes fiscales con máquinas homologadas.';
    loMasImportante = [
      'Inspección activa sobre el cobro y percepción del 3% del IGTF en pagos en divisas.',
      'Control de la declaración mensual de la Contribución de Pensiones del 9% (G.O. 6.806).',
      'Obligatoriedad de mantener máquinas fiscales con dispositivo de transmisión conectado.',
      'Aplicación de multas del Código Orgánico Tributario indexadas a la moneda de mayor valor.'
    ];
  }
  // TEMA: Laboral, Salarios, Pensiones y Bonos
  else if (/salario|sueldo|pensi[oó]n|cestaticket|lottt|laboral|bono|n[oó]mina|ivss/i.test(lower)) {
    category = 'laboral';
    entity = 'Ministerio del Trabajo / Presidencia de la República';
    impact = 'critico';
    aQuienAfecta = 'Patronos, departamentos de recursos humanos, trabajadores y jubilados';
    deQueSeTrata = 'Actualización en materia de política salarial, remuneraciones indexadas al tipo de cambio oficial del BCV y aportes parafiscales obligatorios. Regula la coexistencia del salario mínimo legal congelado con las asignaciones complementarias no salariales.';
    loMasImportante = [
      'Indexación del Cestaticket y Bono de Guerra a la tasa de cambio oficial publicada por el BCV.',
      'Exigencia patronal del 9% sobre salarios y bonos no salariales por Ley de Pensiones.',
      'Diferenciación estricta en recibos de pago entre salario computable y conceptos no salariales.',
      'Riesgos de reclamos por recálculo de prestaciones sociales si no hay soporte documental adecuado.'
    ];
  }
  // TEMA: BCV, SUDEBAN, Divisas, Mesas de Cambio
  else if (/bcv|sudeban|banca|cambio|divisa|d[oó]lar|cr[eé]dito|uvc|bol[ií]var|banco/i.test(lower)) {
    category = 'mercantil';
    entity = 'Banco Central de Venezuela (BCV) / SUDEBAN';
    impact = 'critico';
    aQuienAfecta = 'Instituciones bancarias, empresas importadoras, comercios y cuentahabientes';
    deQueSeTrata = 'Normativa de política monetaria y financiera emitida por el BCV y la SUDEBAN. Regula la fijación y uso obligatorio del tipo de cambio oficial en las transacciones comerciales, las intervenciones cambiarias del BCV y las pautas para créditos en Unidades de Valor de Crédito (UVC).';
    loMasImportante = [
      'Obligación legal de fijar precios y facturar a la tasa de cambio de referencia del BCV.',
      'Prohibición tajante de cobros adicionales o uso de tasas paralelas no autorizadas.',
      'Ajustes en los límites operativos diarios para transferencias y Pago Móvil interbancario.',
      'Créditos bancarios otorgados en bolívares bajo esquema de capital indexado a UVC.'
    ];
  }
  // TEMA: Hidrocarburos, Petróleo, PDVSA y Licencias OFAC
  else if (/petr[oó]leo|pdvsa|gas|ofac|hidrocarburo|miner[ií]a|chevron|repsol|crudo/i.test(lower)) {
    category = 'hidrocarburos';
    entity = 'Ministerio de Petróleo / PDVSA';
    impact = 'alto';
    aQuienAfecta = 'Contratistas petroleras, firmas de ingeniería, suplidores industriales e inversionistas';
    deQueSeTrata = 'Evolución del marco regulatorio para la explotación y comercialización de hidrocarburos en empresas mixtas de PDVSA, en combinación con el régimen de licencias específicas emitidas por la OFAC de Estados Unidos.';
    loMasImportante = [
      'Facultades de comercialización directa de crudo otorgadas a socios extranjeros autorizados.',
      'Canales de pago protegidos para contratistas y proveedores de servicios en yacimientos maduros.',
      'Supervisión de cumplimiento normativo ambiental y fiscal en materia de regalías petroleras.',
      'Dependencia directa del estatus de licencias específicas de la administración estadounidense.'
    ];
  }
  // TEMA: Aduanas, Puerta a Puerta y Comercio Exterior
  else if (/aduana|arancel|puerta a puerta|importaci[oó]n|exportaci[oó]n|sidunea|flete/i.test(lower)) {
    category = 'aduanera';
    entity = 'SENIAT Aduanas / Ministerio de Comercio';
    impact = 'medio';
    aQuienAfecta = 'Importadores comerciales, agencias de aduana, curriers y almacenes fiscales';
    deQueSeTrata = 'Regulación sobre el ingreso de mercancías al territorio aduanero nacional, decretos de exoneración de gravámenes arancelarios e IVA, y control de los envíos de carga consolidada bajo modalidad marítima o aérea.';
    loMasImportante = [
      'Exigencia del Certificado de No Producción (CNP) para optar a la exoneración de aranceles.',
      'Fiscalización estricta de envíos comerciales para evitar la elusión tributaria.',
      'Transmisión electrónica anticipada de manifiestos de carga vía SIDUNEAWorld.',
      'Riesgo de comiso y multas de hasta 300% del tributo omitido por inconsistencias en aduana.'
    ];
  }
  // TEMA: Tecnología, Delivery, IPOSTEL y Comercio Digital
  else if (/conatel|ipostel|delivery|digital|telecomunicaci[oó]n|internet|firma electr[oó]nica/i.test(lower)) {
    category = 'tecnologia';
    entity = 'IPOSTEL / CONATEL / Ministerio de Transporte';
    impact = 'medio';
    aQuienAfecta = 'Empresas de delivery, plataformas de e-commerce, operadores postales y servicios digitales';
    deQueSeTrata = 'Marco regulatorio para la formalización de plataformas digitales de entrega a domicilio (delivery), logística de última milla y servicios de telecomunicaciones por fibra óptica o inalámbricas.';
    loMasImportante = [
      'Obligatoriedad de tramitar la Habilitación Postal de Entrega a Domicilio ante IPOSTEL (SITRAPACK).',
      'Pago mensual del aporte postal del 1% sobre los fletes y servicios de reparto.',
      'Validez jurídica de contratos electrónicos y mensajes de datos según la Ley de Firmas Digitales.',
      'Sanciones de retención de flotas vehiculares y clausura digital para operadores no certificados.'
    ];
  }
  // Caso general por defecto: Análisis institucional fundamentado
  else {
    category = 'mercantil';
    entity = 'Poder Público Nacional';
    impact = 'medio';
    aQuienAfecta = 'Empresas, personas jurídicas y ciudadanos en Venezuela';
    deQueSeTrata = `Actualización jurídica y regulatoria emitida en el ámbito de ${entity}. Se refiere a: "${title}". El acto incide en las directrices de funcionamiento institucional, cumplimiento legal y relaciones contractuales aplicables en el país.`;
    loMasImportante = [
      `Emitido bajo la potestad del ${entity}.`,
      'Requiere revisión de términos y condiciones para verificar alcance y fecha de vigencia.',
      'Afecta procedimientos formales ante las autoridades correspondientes.',
      'Se recomienda consultar el texto oficial en Gaceta Oficial o portal del ente emisor.'
    ];
  }

  return {
    category,
    entity,
    impact,
    deQueSeTrata,
    loMasImportante,
    aQuienAfecta
  };
}

// Función principal de extracción y enriquecimiento
export async function fetchVenezuelanLegalNews() {
  const queries = [
    'gaceta oficial venezuela OR sumario gaceta oficial',
    'ley asamblea nacional venezuela OR reforma ley venezuela',
    'seniat providencia OR sudeban circular OR bcv resolucion',
    'saren tasas OR sunavi arrendamiento OR tsj sentencia venezuela'
  ];

  const allItems = new Map();

  for (const q of queries) {
    try {
      const url = `https://news.google.com/rss/search?q=${encodeURIComponent(q)}&hl=es-419&gl=VE&ceid=VE:es-419`;
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
      if (!res.ok) continue;
      const text = await res.text();
      
      const regex = /<item>([\s\S]*?)<\/item>/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        const raw = match[1];
        const titleMatch = raw.match(/<title>([\s\S]*?)<\/title>/);
        const linkMatch = raw.match(/<link>([\s\S]*?)<\/link>/);
        const dateMatch = raw.match(/<pubDate>([\s\S]*?)<\/pubDate>/);
        const sourceMatch = raw.match(/<source[^>]*>([\s\S]*?)<\/source>/);

        const rawTitle = titleMatch ? titleMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : '';
        const link = linkMatch ? linkMatch[1].trim() : '';
        const pubDate = dateMatch ? dateMatch[1].trim() : new Date().toISOString();
        const source = sourceMatch ? sourceMatch[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1').trim() : 'Prensa Nacional';

        if (rawTitle && !allItems.has(rawTitle)) {
          allItems.set(rawTitle, { rawTitle, link, pubDate, source });
        }
      }
    } catch (err) {
      console.warn('Error fetching query', q, err?.message);
    }
  }

  const fetchedList = Array.from(allItems.values());

  const processedList = fetchedList.map((item, index) => {
    const cleanT = cleanTitle(item.rawTitle);
    const lower = cleanT.toLowerCase();
    const gaceta = extractGacetaNumber(item.rawTitle) || extractGacetaNumber(cleanT) || 'Trámite Legislativo / En Prensa Oficial';
    const analysis = generateSubstantiveAnalysis(cleanT, lower, gaceta, item.source);

    let dateStr = new Date().toISOString().split('T')[0];
    try {
      const parsedDate = new Date(item.pubDate);
      if (!isNaN(parsedDate.getTime())) {
        dateStr = parsedDate.toISOString().split('T')[0];
      }
    } catch (_) {}

    return {
      id: `live-${index}-${Date.now()}`,
      title: cleanT,
      shortTitle: cleanT.length > 70 ? cleanT.substring(0, 67) + '...' : cleanT,
      gaceta: gaceta,
      date: dateStr,
      category: analysis.category,
      entity: analysis.entity,
      impact: analysis.impact,
      status: 'Recién Notificado • En Vivo',
      summary: analysis.deQueSeTrata,
      deQueSeTrata: analysis.deQueSeTrata,
      loMasImportante: analysis.loMasImportante,
      analysis: {
        queCambio: analysis.deQueSeTrata,
        aQuienAfecta: analysis.aQuienAfecta,
        impactoEconomico: 'Ajuste en procedimientos operativos, costos de cumplimiento y revisión legal.',
        obligacionesInmediatas: analysis.loMasImportante,
        sancionesRiesgos: 'Sujeto a las penalidades previstas por la ley rectora en caso de inobservancia o retardo.'
      },
      sourceUrl: item.link,
      sourceName: item.source,
      isLive: true,
      hasOfficialGaceta: /gaceta oficial n/i.test(gaceta),
      tags: ['Actualización Automática', analysis.entity, analysis.category]
    };
  });

  return processedList;
}
