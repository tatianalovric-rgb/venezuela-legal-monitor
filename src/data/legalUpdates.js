// Base de datos normativa y de análisis legislativo venezolano
export const CATEGORIES = [
  { id: 'tributaria', label: 'Tributaria y Fiscal', color: 'blue', icon: 'Receipt' },
  { id: 'laboral', label: 'Laboral y Seguridad Social', color: 'emerald', icon: 'Briefcase' },
  { id: 'mercantil', label: 'Mercantil, Financiera y Cambiaria', color: 'indigo', icon: 'Landmark' },
  { id: 'inmobiliaria', label: 'Inmobiliaria, Notarial e Inquilinato', color: 'amber', icon: 'Home' },
  { id: 'hidrocarburos', label: 'Hidrocarburos, Energía y Minería', color: 'orange', icon: 'Flame' },
  { id: 'penal', label: 'Penal, Cumplimiento y Prevención', color: 'rose', icon: 'ShieldAlert' },
  { id: 'aduanera', label: 'Comercio Exterior y Aduanas', color: 'cyan', icon: 'Ship' },
  { id: 'tecnologia', label: 'Tecnología y Telecomunicaciones', color: 'purple', icon: 'Cpu' },
];

export const IMPACT_LEVELS = {
  critico: { label: 'Crítico / Urgente', bg: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900', badge: 'bg-red-600 text-white' },
  alto: { label: 'Alto Impacto', bg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900', badge: 'bg-amber-500 text-white' },
  medio: { label: 'Impacto Medio', bg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900', badge: 'bg-blue-500 text-white' },
  bajo: { label: 'Informativo / Bajo', bg: 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-800/40 dark:text-slate-300 dark:border-slate-700', badge: 'bg-slate-500 text-white' },
};

export const INITIAL_LEGAL_UPDATES = [
  {
    id: 'ley-pensiones-2024',
    title: 'Ley de Protección de las Pensiones de Seguridad Social frente al Bloqueo Imperialista',
    shortTitle: 'Contribución Especial Patronal de Pensiones (9%)',
    gaceta: 'Gaceta Oficial N° 6.806 Extraordinario',
    date: '2024-05-08',
    category: 'laboral',
    entity: 'Asamblea Nacional / SENIAT',
    impact: 'critico',
    status: 'Vigente con declaración mensual',
    summary: 'Crea una contribución especial obligatoria pagada exclusivamente por empleadores y personas jurídicas del sector privado equivalente al 9% sobre el total de pagos realizados a los trabajadores por concepto de salario y bonificaciones de carácter no salarial.',
    deQueSeTrata: 'Nueva carga parafiscal de cumplimiento mensual forzoso dictada por la Asamblea Nacional para fondear el sistema público de pensiones. A diferencia de las cotizaciones tradicionales del IVSS, este tributo no tiene tope salarial y grava directamente el 100% de los ingresos ordinarios y extraordinarios pagados al trabajador en bolívares o divisas.',
    loMasImportante: [
      'Alícuota fija del 9% a cargo exclusivo de los patronos y empresas privadas.',
      'Grava salarios básicos más todo bono o ayuda en divisas calificada como no salarial.',
      'Declaración y pago mensual obligatorio ante el portal fiscal del SENIAT.',
      'Gasto operativo deducible del ISLR pero sin los topes históricos del IVSS.'
    ],
    analysis: {
      queCambio: 'Se instauró una nueva carga parafiscal del 9% que grava tanto el salario normal/básico como todas las bonificaciones o complementos no salariales (ej. Bono de Guerra Económica, ayudas en divisas o moneda nacional que antes estaban exentas de parafiscales).',
      aQuienAfecta: 'A todas las empresas privadas, personas jurídicas y sociedades de hecho en Venezuela que contraten personal en relación de dependencia.',
      impactoEconomico: 'Aumento inmediato de entre 6% y 11% en el costo laboral efectivo mensual de las organizaciones. Obliga a ajustar presupuestos de compensación en divisas y bolívares.',
      obligacionesInmediatas: [
        'Determinar la base gravable sumando salarios ordinarios y cualquier bonificación no salarial del mes.',
        'Declarar y pagar mensualmente ante el portal del SENIAT dentro del calendario de Sujetos Pasivos Especiales.',
        'Conservar soportes de nómina y comprobantes de pago de la contribución durante el lapso de prescripción fiscal (6 años).'
      ],
      sancionesRiesgos: 'Intereses moratorios automáticos y multas estipuladas en el Código Orgánico Tributario (COT) de hasta el 1.000% del tributo omitido, más riesgo de clausura temporal del establecimiento por omisión de declaraciones.',
    },
    beforeAfter: {
      before: 'Las empresas sólo pagaban aportes de seguridad social calculados sobre salario normal con topes legales (ej. IVSS tope 5 salarios mínimos, FAOV 2%, INCES 2%). Las bonificaciones no salariales no estaban gravadas con parafiscales directos.',
      after: 'Se aplica una alícuota del 9% sobre la totalidad de los ingresos percibidos por los trabajadores (salarios + bonos no salariales), sin topes tradicionales y pagaderos en moneda de curso legal al tipo de cambio oficial BCV.',
      keyDifference: 'Grava expresamente las bonificaciones que la LOTTT califica como no salariales.'
    },
    tags: ['Nómina', 'Pensiones', 'SENIAT', 'Parafiscal', 'Costos Laborales']
  },
  {
    id: 'locaptem-armonizacion-2023',
    title: 'Ley Orgánica de Coordinación y Armonización de las Potestades Tributarias de los Estados y Municipios (LOCAPTEM)',
    shortTitle: 'Armonización Tributaria Municipal y Techos de Alícuotas',
    gaceta: 'Gaceta Oficial N° 6.755 Extraordinario',
    date: '2023-08-10',
    category: 'tributaria',
    entity: 'Asamblea Nacional / Ministerio de Finanzas',
    impact: 'critico',
    status: 'Vigente - Ordenanzas Municipales Adecuadas',
    summary: 'Fija límites máximos y estandariza los impuestos estatales y municipales en toda Venezuela, especialmente el Impuesto sobre Actividades Económicas (ISAE), prohibiendo cobros en divisas e indexaciones ilegales, y adoptando la Moneda de Mayor Valor BCV como unidad de cuenta.',
    deQueSeTrata: 'Ley orgánica nacional que frena la discrecionalidad tributaria de los 335 municipios del país. Establece un Clasificador Armonizado único de actividades económicas, techos impositivos infranqueables para el ISAE, simplificación de licencias comerciales y uso obligatorio de la tasa oficial BCV.',
    loMasImportante: [
      'Tope general de alícuotas municipales entre 1% y 3% (máximo absoluto 5,5% para licores y tabaco).',
      'Licencia de actividades económicas con vigencia mínima garantizada de 3 años continuos.',
      'Prohibición de exigir pagos en divisas en efectivo o índices no avalados por el BCV.',
      'Mecanismos de defensa y amparo tributario para impugnar ordenanzas municipales que cobren en exceso.'
    ],
    analysis: {
      queCambio: 'Los municipios ya no pueden fijar alícuotas arbitrarias ni exigir pagos en dólares en efectivo. Se establecen topes máximos (generalmente entre 1% y 3% para la mayoría de actividades y un tope general de 5,5% para sectores muy específicos).',
      aQuienAfecta: 'Empresas industriales, comerciales, prestadores de servicios y profesionales independientes con sucursales o actividad en municipios venezolanos.',
      impactoEconomico: 'Frenó la anarquía tributaria municipal donde alcaldías aplicaban mínimos tributarios confiscatorios. Exige a las empresas revisar todas las ordenanzas de cada municipio donde operan.',
      obligacionesInmediatas: [
        'Auditar las alícuotas que cobra la alcaldía local contra el Clasificador Armonizado nacional para impugnar cobros por encima del tope.',
        'Pagar en bolívares calculados según el Tipo de Cambio de la Moneda de Mayor Valor (TCMMV) publicada por el BCV.',
        'Asegurar la vigencia de la licencia de actividades económicas por un período mínimo de 3 años continuos (antes era de renovación anual obligatoria).'
      ],
      sancionesRiesgos: 'Los municipios que incumplan no pueden aplicar cobros. Las empresas deben vigilar cobros indebidos de tasas de aseo urbano que pretendan eludir los topes de la ley.',
    },
    beforeAfter: {
      before: 'Cada municipio tenía ordenanzas dispares con alícuotas de hasta 8%-12%, multas discrecionales y obligaban a renovar licencias comerciales cada 12 meses con gestorías complejas.',
      after: 'Catálogo único nacional clasificado, tope general no superior al 3% para casi toda actividad, licencia comercial válida por 3 años mínimo y simplificación de trámites.',
      keyDifference: 'Límites constitucionales a la voracidad fiscal municipal y uso obligatorio de la tabla armonizada.'
    },
    tags: ['Alcaldías', 'Impuesto Municipal', 'ISAE', 'Aseo Urbano', 'Tributos']
  },
  {
    id: 'igtf-divisas-reforma',
    title: 'Reforma de la Ley de Impuesto a las Grandes Transacciones Financieras (IGTF en Divisas)',
    shortTitle: 'Impuesto del 3% a Pagos en Divisas y Criptoactivos',
    gaceta: 'Gaceta Oficial N° 6.687 Extraordinario',
    date: '2022-02-25',
    category: 'tributaria',
    entity: 'Asamblea Nacional / SENIAT',
    impact: 'alto',
    status: 'Vigente con percepción en puntos de venta',
    summary: 'Aplica una alícuota del 3% a cualquier pago o cancelación de obligaciones efectuado en moneda extranjera o criptomonedas distintas al Petro sin mediación del sistema bancario nacional, cuando el receptor es un Sujeto Pasivo Especial (SPE).',
    deQueSeTrata: 'Modificación del IGTF que trasladó el gravamen al consumidor final y a cualquier transacción comercial cotidiana realizada con dólares en efectivo, euros o transferencias internacionales (Zelle), convirtiendo a los comercios calificados como Sujetos Pasivos Especiales en agentes de percepción.',
    loMasImportante: [
      'Recargo del 3% sobre el total de la compra al pagar en moneda extranjera en efectivo o transferencias externas.',
      'Deber del comercio de discriminar la base y el 3% en tickets de máquinas fiscales homologadas.',
      'Enteramiento quincenal estricto ante el SENIAT de las percepciones cobradas.',
      'Exención automática para transacciones efectuadas en bolívares mediante Pago Móvil o tarjetas nacionales.'
    ],
    analysis: {
      queCambio: 'Cualquier consumidor o comercio que pague en dólares en efectivo, Zelle u otra divisa a un comercio calificado como contribuyente especial debe pagar un recargo del 3% que el comercio retiene y entera al SENIAT.',
      aQuienAfecta: 'Consumidores finales, personas naturales, empresas y comercios clasificados como Sujetos Pasivos Especiales.',
      impactoEconomico: 'Encareció el uso del efectivo en dólares en el comercio formal e impulsó la reactivación del pago en bolívares a través de Pago Móvil y tarjetas de débito nacionales.',
      obligacionesInmediatas: [
        'Configurar máquinas fiscales y sistemas de facturación para discriminar el medio de pago (efectivo USD, divisa electrónica, bolívares) y calcular el 3%.',
        'Enterar semanalmente o quincenalmente los montos percibidos ante el SENIAT mediante la declaración informativa del IGTF.',
        'Entregar factura con el desglose exacto de la base imponible y el 3% percibido.'
      ],
      sancionesRiesgos: 'Cierre de 5 a 10 días por no emisión de factura con máquina fiscal homologada o por no percibir el tributo, más multas cuantificadas en moneda de mayor valor.',
    },
    beforeAfter: {
      before: 'El IGTF era sólo un impuesto del 2% cobrado por la banca nacional sobre débitos en cuentas bancarias corporativas de empresas especiales.',
      after: 'Se extendió a pagos directos en divisas en efectivo, transferencias extranjeras y criptoactivos en compras del día a día, alcanzando al consumidor común.',
      keyDifference: 'Gravamen a la circulación de dólares en efectivo sin pasar por la banca venezolana.'
    },
    tags: ['IGTF', 'Dólares', 'SENIAT', 'Facturación', 'Sujetos Pasivos Especiales']
  },
  {
    id: 'ingreso-minimo-indexado',
    title: 'Decretos Presidenciales de Ingreso Mínimo Integral Indexado y Políticas Salariales',
    shortTitle: 'Indexación del Bono de Guerra y Cestaticket ($130+)',
    gaceta: 'Gaceta Oficial N° 6.805 Extraordinario',
    date: '2024-05-01',
    category: 'laboral',
    entity: 'Presidencia de la República / Ministerio del Trabajo',
    impact: 'critico',
    status: 'Vigente con indexación cambiaria oficial',
    summary: 'Establece la política de retribución basada en un salario mínimo base formal de Bs. 130 congelado, compensado por complementos de carácter no salarial indexados al tipo de cambio BCV: Bono de Guerra Económica y Cestaticket Socialista.',
    deQueSeTrata: 'Estrategia de compensación laboral del Estado que reemplazó los aumentos de salario mínimo de la LOTTT por bonificaciones indexadas en dólares y pagaderas en bolívares. Busca frenar la espiral inflacionaria de las prestaciones sociales retroactivas mientras traslada la liquidez a pagos mensuales directos.',
    loMasImportante: [
      'Salario base congelado en Bs. 130 para cálculo de pasivos laborales de antigüedad.',
      'Cestaticket indexado equivalente a $40 y Bono de Guerra indexado a la tasa oficial BCV.',
      'Más del 85% de la retribución percibida no genera incidencia en utilidades ni bono vacacional.',
      'Sujeto obligatorio al 9% de la Ley de Pensiones cuando es pagado por patronos privados.'
    ],
    analysis: {
      queCambio: 'Se consolidó un modelo donde más del 90% del ingreso total del trabajador no genera pasivos laborales tradicionales (antigüedad, cesantía, preaviso, alícuota de utilidades y bono vacacional), aliviando el pasivo de cierre empresarial pero trasladando el pago a bonificaciones mensuales corrientes.',
      aQuienAfecta: 'Todos los empleadores del sector público y privado, trabajadores activos y jubilados en Venezuela.',
      impactoEconomico: 'Reduce significativamente la acumulación de prestaciones sociales a largo plazo para las empresas, pero incrementa la necesidad de flujo de caja mensual líquido para cumplir con los montos indexados en divisas.',
      obligacionesInmediatas: [
        'Pagar el Cestaticket Socialista mensualmente indexado según la tasa oficial BCV del día de pago.',
        'Diferenciar claramente en recibos de pago qué porciones constituyen salario y cuáles son asignaciones no salariales fundamentadas en la ley.',
        'Cruzar con la nueva Ley de Pensiones, ya que estas bonificaciones sí pagan la contribución parafiscal del 9%.'
      ],
      sancionesRiesgos: 'Reclamos laborales ante Inspectorías del Trabajo por falta de pago de Cestaticket indexado o riesgo de que tribunales laborales reconozcan el carácter salarial si los acuerdos no están correctamente redactados.',
    },
    beforeAfter: {
      before: 'Históricamente los aumentos se hacían sobre el salario mínimo de la LOTTT, encareciendo exponencialmente las prestaciones sociales retroactivas y utilidades.',
      after: 'Se mantiene el salario base en Bs. 130 y todos los ajustes se realizan a través de bonos no salariales indexados al tipo de cambio oficial del BCV.',
      keyDifference: 'Desalarización del ingreso y sustitución por bonificaciones indexadas libres de pasivo laboral acumulable.'
    },
    tags: ['LOTTT', 'Cestaticket', 'Bono de Guerra', 'Salarios', 'Prestaciones Sociales']
  },
  {
    id: 'extincion-dominio-2023',
    title: 'Ley Orgánica de Extinción de Dominio',
    shortTitle: 'Incautación y Pérdida de Derechos sobre Bienes de Origen Ilícito',
    gaceta: 'Gaceta Oficial N° 6.745 Extraordinario',
    date: '2023-04-28',
    category: 'penal',
    entity: 'Asamblea Nacional / Tribunal Supremo de Justicia (TSJ)',
    impact: 'alto',
    status: 'Vigente - Tribunales Especializados Operativos',
    summary: 'Consagra la extinción de dominio como un mecanismo judicial de naturaleza patrimonial y autónoma de la responsabilidad penal, que permite al Estado despojar de la titularidad de cualquier bien adquirido directa o indirectamente con fondos de corrupción, narcotráfico o delincuencia organizada sin indemnización alguna.',
    deQueSeTrata: 'Procedimiento judicial especial autónomo de carácter civil y patrimonial que faculta al Ministerio Público y a tribunales especiales a despojar bienes de origen ilícito o patrimonios injustificados. La acción recae sobre la cosa y no sobre la persona, por lo que no requiere sentencia penal condenatoria previa.',
    loMasImportante: [
      'Juicio patrimonial autónomo e imprescriptible: no vence en el tiempo.',
      'No se requiere culpabilidad penal previa; la carga de probar el origen lícito recae en el poseedor.',
      'Pérdida irrevocable de la propiedad a favor del Estado sin indemnización.',
      'Obliga a implementar políticas estrictas de Debida Diligencia (KYC/AML) en compraventas corporativas.'
    ],
    analysis: {
      queCambio: 'No se requiere sentencia penal condenatoria previa para confiscar los bienes. Basta con que en el juicio de extinción de dominio el titular no pueda demostrar el origen lícito de los fondos con los que adquirió propiedades, vehículos, cuentas o acciones.',
      aQuienAfecta: 'Empresarios, contratistas del Estado, accionistas, administradores de sociedades y personas con bienes en Venezuela.',
      impactoEconomico: 'Eleva exponencialmente la exigencia de debida diligencia (KYC/AML) en transacciones inmobiliarias y societarias. Comprar un inmueble a precio de remate sin rastreo de fondos puede acarrear la pérdida total del activo.',
      obligacionesInmediatas: [
        'Implementar protocolos rigurosos de Debida Diligencia para la compraventa de inmuebles, vehículos o participación en empresas.',
        'Exigir y conservar la trazabilidad bancaria demostrable del origen de los fondos de contrapartes.',
        'Mantener actualizados libros contables, balances auditados y declaraciones de ISLR que justifiquen el crecimiento patrimonial.'
      ],
      sancionesRiesgos: 'Pérdida irreversible del derecho de propiedad sobre el bien a favor del Estado venezolano sin derecho a indemnización ni compensación.',
    },
    beforeAfter: {
      before: 'Para que el Estado confiscara un bien era indispensable una sentencia penal firme que demostrara la culpabilidad del imputado tras largos juicios.',
      after: 'Procedimiento civil-patrimonial independiente e imprescriptible donde la carga de la prueba sobre el origen de los recursos recae sobre el poseedor o propietario.',
      keyDifference: 'Autonomía respecto al juicio penal y presunción de ilicitud si no hay soporte bancario/fiscal demostrable.'
    },
    tags: ['Compliance', 'Confiscación', 'Corrupción', 'Debida Diligencia', 'TSJ']
  },
  {
    id: 'saren-tasas-notariales',
    title: 'Reforma de la Ley de Registro Público y del Notariado (Tasas y Aranceles SAREN)',
    shortTitle: 'Nuevos Aranceles Notariales Anclados a Divisas / Petro',
    gaceta: 'Gaceta Oficial N° 6.668 Extraordinario',
    date: '2022-01-15',
    category: 'inmobiliaria',
    entity: 'Asamblea Nacional / SAREN',
    impact: 'alto',
    status: 'Vigente en Notarías y Registros Mercantiles/Inmobiliarios',
    summary: 'Reestructuró el sistema de cobro de tasas de registros y notarías en todo el país, eliminando las tasas fijas en bolívares e indexando el valor de constitución de empresas, compraventa de inmuebles y poderes a unidades de valor referenciales en divisas/Petro.',
    deQueSeTrata: 'Reforma arancelaria del Servicio Autónomo de Registros y Notarías (SAREN) que sustituyó los montos nominales en bolívares por alícuotas porcentuales indexadas a unidades referenciales en moneda extranjera, encareciendo sustancialmente la protocolización de compraventas de inmuebles y registros societarios.',
    loMasImportante: [
      'Aranceles registrales indexados al tipo de cambio oficial publicado por el BCV.',
      'Cálculo de tasas sobre el avalúo catastral o valor de venta comercial del inmueble (entre 2% y 5%).',
      'Pago centralizado a través de planillas PUB electrónicas del sistema en línea SAREN.',
      'Inspección sobre minutas para evitar la subvaloración artificial del precio de venta.'
    ],
    analysis: {
      queCambio: 'Los trámites de compraventa inmobiliaria, aumentos de capital y registros mercantiles pasaron de costar montos simbólicos a alícuotas porcentuales (hasta 2% a 5% del valor real o avalúo) fijadas al cambio oficial del día.',
      aQuienAfecta: 'Personas que compren o vendan bienes inmuebles, emprendedores constituyendo compañías y empresas actualizando juntas directivas.',
      impactoEconomico: 'Aumentó sustancialmente los costos de cierre en transacciones inmobiliarias y corporativas. Evitó la desactualización inflacionaria de los ingresos del SAREN.',
      obligacionesInmediatas: [
        'Presupuestar los gastos de escrituración y aranceles registrales antes de cerrar contratos de compraventa (entre 2% y 5% del valor del inmueble).',
        'Realizar el pago de aranceles exclusivamente a través de los canales digitales oficiales del SAREN o bancos autorizados en bolívares al cambio BCV.',
        'Verificar cédula catastral y solvencias municipales antes de la presentación del documento.'
      ],
      sancionesRiesgos: 'Rechazo del documento por subvaloración si el monto declarado en la minuta difiere ostensiblemente de las tablas de avalúo referenciales del SAREN.',
    },
    beforeAfter: {
      before: 'Tasas fijas en bolívares que la hiperinflación pulverizaba, haciendo los trámites formalmente económicos pero propensos a trabas operativas.',
      after: 'Aranceles indexados en tiempo real al cambio oficial BCV calculados sobre el capital o valor catastral/comercial.',
      keyDifference: 'Indexación permanente de los costos de formalización societaria e inmobiliaria.'
    },
    tags: ['SAREN', 'Compraventa', 'Inmuebles', 'Registro Mercantil', 'Notarías']
  },
  {
    id: 'bcv-politica-cambiaria-mesas',
    title: 'Marco Cambiario del Banco Central de Venezuela: Resoluciones de Mesas de Cambio y Brecha',
    shortTitle: 'Intervención Cambiaria, Mesas de Dinero y Tasa Oficial BCV',
    gaceta: 'Gaceta Oficial N° 41.624 / Resoluciones Conjuntas BCV N° 19-05-01',
    date: '2024-08-15',
    category: 'mercantil',
    entity: 'Banco Central de Venezuela (BCV) / SUDEBAN',
    impact: 'critico',
    status: 'Vigente con fiscalizaciones del SUNDDE y SENIAT',
    summary: 'Régimen de libre convertibilidad a través de las mesas de cambio bancarias con inyecciones de divisas (intervención cambiaria) semanales del BCV, con prohibición taxativa de emplear marcadores o tipos de cambio paralelos en operaciones comerciales.',
    deQueSeTrata: 'Marco regulatorio monetario que legalizó la compraventa de divisas en la banca comercial nacional pero impuso la obligación punitiva a todo comercio de publicar y cobrar estrictamente al tipo de cambio promedio ponderado fijado por el BCV al cierre de cada jornada.',
    loMasImportante: [
      'Obligación legal imperativa de usar la tasa oficial del BCV en listas de precios y facturas.',
      'Prohibición tajante de cobros adicionales o recargos por pagar en moneda nacional.',
      'Fiscalizaciones conjuntas del SUNDDE y SENIAT con sanciones de clausura preventiva.',
      'Inyecciones periódicas de divisas en efectivo y cuentas por el BCV para amortiguar la brecha cambiaria.'
    ],
    analysis: {
      queCambio: 'Se legalizó el mercado cambiario bancario pero se impuso la obligación estricta a todo comercio y prestador de servicios de publicar y cobrar a la tasa del BCV del día, prohibiendo recargos o tasas paralelas.',
      aQuienAfecta: 'Todos los comercios, prestadores de servicios, importadores, banca nacional y empresas del país.',
      impactoEconomico: 'Genera tensiones de reposición de inventarios en períodos de ensanchamiento de la brecha entre la tasa oficial del BCV y las cotizaciones no oficiales. Afecta márgenes operativos si no se maneja una estructura de costos flexible.',
      obligacionesInmediatas: [
        'Exhibir de forma visible en el establecimiento y en plataformas web el tipo de cambio oficial publicado por el BCV.',
        'Facturar en bolívares o divisas utilizando estrictamente la tasa de cierre del BCV del día hábil respectivo.',
        'Gestionar la compra de divisas corporativas para importación a través de las mesas de cambio de la banca autorizada.'
      ],
      sancionesRiesgos: 'Procedimientos sancionatorios del SUNDDE y SENIAT que incluyen multas severas, decomiso preventivo y cierre preventivo de establecimientos por delito de usura o especulación cambiaria.',
    },
    beforeAfter: {
      before: 'Control de cambio estricto (CADIVI, CENCOEX) con tasas preferenciales irreales y prohibición penal del mercado paralelo.',
      after: 'Mesas de cambio interbancarias y circulación legal de divisas, pero con imposición punitiva de la tasa promedio ponderada del BCV en el comercio.',
      keyDifference: 'Uso obligatorio y vigilado de la tasa oficial en toda fijación de precios al consumidor.'
    },
    tags: ['BCV', 'Tipo de Cambio', 'Dólar Oficial', 'SUNDDE', 'Banca']
  },
  {
    id: 'hidrocarburos-licencias-ofac',
    title: 'Modelos Operativos de Empresas Mixtas y Régimen de Licencias Petroleras y de Gas',
    shortTitle: 'Alianzas Estratégicas PDVSA y Licencias Específicas OFAC',
    gaceta: 'Gaceta Oficial N° 42.850 / Resoluciones Ministerio de Petróleo',
    date: '2024-04-17',
    category: 'hidrocarburos',
    entity: 'Ministerio de Petróleo / PDVSA / OFAC',
    impact: 'alto',
    status: 'Vigente bajo esquema de Licencias Específicas',
    summary: 'Modificación de esquemas de gestión interna en Empresas Mixtas con socios internacionales (Chevron, Repsol, Eni, Maurel & Prom) otorgando control comercial y operacional de exportación de crudo y gas, coexistiendo con el régimen de sanciones y licencias de los EE.UU.',
    deQueSeTrata: 'Reestructuración contractual y operativa de las empresas mixtas petroleras en Venezuela. Ante las sanciones económicas, PDVSA suscribió acuerdos marco que confieren a las contrapartes internacionales facultades de procura y comercialización directa de crudo para amortizar deudas y financiar operaciones en campo.',
    loMasImportante: [
      'Delegación de facultades comerciales a socios internacionales autorizados.',
      'Esquemas de compensación en el extranjero para el pago a suplidores y servicios petroleros.',
      'Coexistencia con licencias específicas individuales de la OFAC (Departamento del Tesoro de EE.UU.).',
      'Exigencia estricta de cumplimiento de normativas de ecosocialismo y regalías venezolanas.'
    ],
    analysis: {
      queCambio: 'PDVSA delegó facultades operativas, de procura y comercialización directa a socios extranjeros en empresas mixtas para amortizar deudas acumuladas y mantener la producción en pozos maduros.',
      aQuienAfecta: 'Empresas de servicios petroleros, contratistas de ingeniería, navieras, proveedores de equipos y firmas inversoras en el sector energía.',
      impactoEconomico: 'Apertura de contratos de servicios con pago asegurado mediante esquemas de compensación en el exterior, reanimando la cadena de suministro en Zulia, Oriente y la Faja del Orinoco.',
      obligacionesInmediatas: [
        'Verificar el estatus de las Licencias Generales y Específicas de la OFAC (Licencia 44A y autorizaciones individuales) antes de celebrar contratos.',
        'Cumplir con las cláusulas anticorrupción y normativas ambientales venezolanas emitidas por el Ministerio de Ecosocialismo.',
        'Asegurar que las cuentas bancarias para cobro no estén sometidas a bloqueos secundarios.'
      ],
      sancionesRiesgos: 'Riesgo de sanciones secundarias de la OFAC si se opera fuera de las licencias permitidas, o rescisión de contratos locales por incumplimiento de planes de inversión.',
    },
    beforeAfter: {
      before: 'Monopolio operativo absoluto de PDVSA en la venta de cargamentos de petróleo y compras de insumos para las empresas mixtas.',
      after: 'Socios internacionales asumen el control de procura, venta del crudo y retención de flujos financieros bajo acuerdos autorizados.',
      keyDifference: 'Operatividad comercial descentralizada en los socios privados de empresas mixtas.'
    },
    tags: ['Petróleo', 'PDVSA', 'OFAC', 'Chevron', 'Gas', 'Inversión Extranjera']
  },
  {
    id: 'exoneraciones-aduaneras-2024',
    title: 'Decreto de Exoneraciones de Aranceles e IVA para Importaciones',
    shortTitle: 'Régimen de Exoneración Aduanera y Requisitos CPN',
    gaceta: 'Gaceta Oficial N° 6.818 Extraordinario / Decreto N° 4.967',
    date: '2024-06-28',
    category: 'aduanera',
    entity: 'Presidencia de la República / SENIAT Aduanas',
    impact: 'medio',
    status: 'Vigente con renovación periódica',
    summary: 'Regula las subpartidas arancelarias exoneradas de Impuesto de Importación y Tasa por Determinación del Régimen Aduanero, condicionando muchos ítems a la presentación del Certificado de No Producción Nacional (CNP) o Producción Insuficiente para proteger la industria local.',
    deQueSeTrata: 'Decreto presidencial que reformuló la política arancelaria venezolana, eliminando la exoneración general e indiscriminada a productos importados de consumo final (fin del "puerta a puerta" comercial sin aranceles) y concentrando los beneficios fiscales en materias primas y bienes de capital industrial.',
    loMasImportante: [
      'Exigencia obligatoria del Certificado de No Producción Nacional (CNP) para gozar de exoneración.',
      'Cobro pleno de IVA aduanero y aranceles a productos terminados producidos en el país.',
      'Transmisión electrónica y fiscalización de manifiestos a través del sistema SIDUNEAWorld.',
      'Renovación y revisión periódica de las subpartidas arancelarias autorizadas.'
    ],
    analysis: {
      queCambio: 'Se redujo la lista de productos terminados que entraban con exoneración automática de aranceles (finiquitando el esquema del régimen de "puerta a puerta" comercial indiscriminado) y se priorizó la exoneración para materias primas, insumos agrícolas y bienes de capital.',
      aQuienAfecta: 'Importadores, agentes de aduanas, empresas de manufactura, sector farmacéutico y comercio minorista.',
      impactoEconomico: 'Encareció la importación de productos terminados de consumo masivo fomentando la manufactura nacional, pero incrementó los tiempos y costos burocráticos de nacionalización.',
      obligacionesInmediatas: [
        'Revisar el Apéndice I y II del Decreto vigente antes de embarcar mercancía para confirmar si el código arancelario goza de exoneración.',
        'Tramitar con anticipación ante el Ministerio de Comercio o Industrias el Certificado de No Producción Nacional si aplica.',
        'Asegurar el registro correcto en el sistema SIDUNEAWorld para evitar ajustes arancelarios en aduana.'
      ],
      sancionesRiesgos: 'Retención de mercancía en puertos o aeropuertos, multas de hasta el 300% de los impuestos causados y cobro retroactivo de aranceles.',
    },
    beforeAfter: {
      before: 'Amplias exoneraciones de oficio para miles de códigos arancelarios sin exigencia de permisos previos ni aranceles para casi cualquier producto importado.',
      after: 'Filtro arancelario selectivo, exigencia de Certificados de No Producción (CNP) y cobro pleno de aranceles e IVA a productos terminados producidos en el país.',
      keyDifference: 'Proteccionismo arancelario selectivo para sustituir importaciones terminadas.'
    },
    tags: ['Aduanas', 'Aranceles', 'SIDUNEA', 'Importaciones', 'CNP', 'SENIAT']
  },
  {
    id: 'ley-ongs-regulacion',
    title: 'Ley de Fiscalización, Regularización, Actuación y Financiamiento de las ONGs',
    shortTitle: 'Fiscalización y Registro Obligatorio de Organizaciones No Gubernamentales',
    gaceta: 'Gaceta Oficial N° 6.833 Extraordinario',
    date: '2024-08-20',
    category: 'penal',
    entity: 'Asamblea Nacional / Ministerio de Interior y Justicia',
    impact: 'alto',
    status: 'Vigente con período de adecuación registral',
    summary: 'Obliga a todas las organizaciones no gubernamentales, fundaciones y asociaciones sin fines de lucro en Venezuela a inscribirse en un registro especial, declarar el origen y destino de sus fondos nacionales e internacionales, y someterse a inspecciones periódicas.',
    deQueSeTrata: 'Normativa integral de control sobre fundaciones, asociaciones civiles y entidades sin fines de lucro en Venezuela. Establece un régimen de supervisión similar al de sujetos regulados por leyes contra la delincuencia organizada y legitimación de capitales, fiscalizando donaciones y fondos de cooperación foránea.',
    loMasImportante: [
      'Inscripción obligatoria en el Registro Nacional de Organizaciones No Gubernamentales.',
      'Declaración jurada detallada sobre el origen de fondos nacionales e internacionales y donantes.',
      'Prohibición de recibir financiamiento destinado a fines políticos o que alteren el orden público.',
      'Sanciones de disolución forzosa y multas indexadas de hasta 1.000 veces la moneda de mayor valor.'
    ],
    analysis: {
      queCambio: 'Se prohíbe taxativamente a las organizaciones sociales recibir financiamiento de organismos extranjeros destinado a actividades políticas o que desestabilicen el orden público, estableciendo causales de disolución forzosa.',
      aQuienAfecta: 'Fundaciones empresariales, asociaciones civiles, gremios profesionales, ONGs de derechos humanos y ayuda humanitaria.',
      impactoEconomico: 'Incrementa los costos administrativos y de compliance de las organizaciones civiles. Las empresas con fundaciones de responsabilidad social deben blindar sus estatutos.',
      obligacionesInmediatas: [
        'Presentar declaración jurada de origen de fondos y balance contable ante el órgano rector.',
        'Adecuar estatutos sociales y actualizar actas de asamblea ante el Registro Principal (SAREN).',
        'Llevar un libro de control exhaustivo de donantes, aportantes y proyectos ejecutados.'
      ],
      sancionesRiesgos: 'Multas de hasta 1.000 veces la moneda de mayor valor del BCV, congelación de cuentas bancarias y revocatoria de la personalidad jurídica con liquidación de bienes.',
    },
    beforeAfter: {
      before: 'Las ONGs se constituían como simples asociaciones civiles ante el Registro Público regidas por el Código Civil tradicional sin supervisión financiera centralizada.',
      after: 'Régimen de control especial similar al de sujetos regulados por la ley contra la delincuencia organizada y financiamiento al terrorismo.',
      keyDifference: 'Fiscalización estricta del origen y uso de fondos de cooperación internacional.'
    },
    tags: ['ONGs', 'Asociaciones Civiles', 'Compliance', 'Fondos Internacionales']
  },
  {
    id: 'conatel-comercio-digital-delivery',
    title: 'Regulación de Servicios de Envíos Express, Delivery y Plataformas Digitales',
    shortTitle: 'Habilitación Postal para Delivery y Comercio Electrónico',
    gaceta: 'Gaceta Oficial N° 42.813 / Providencias IPOSTEL y CONATEL',
    date: '2024-02-05',
    category: 'tecnologia',
    entity: 'IPOSTEL / CONATEL / Ministerio de Transporte',
    impact: 'medio',
    status: 'Vigente con registro en línea',
    summary: 'Regula las empresas de mensajería, plataformas de comercio electrónico y aplicaciones de entrega a domicilio (delivery), exigiendo una Habilitación Postal de Entrega a Domicilio y el pago del aporte postal del 1% sobre los envíos.',
    deQueSeTrata: 'Normativa postal y de comercio electrónico que formaliza la actividad de mensajería rápida y aplicaciones móviles de reparto (última milla). Exige licenciamiento operativo previo ante IPOSTEL y garantiza coberturas de seguros para paquetes y mercancías trasladadas.',
    loMasImportante: [
      'Licencia habilitante obligatoria tramitada ante IPOSTEL a través del portal SITRAPACK.',
      'Contribución mensual del 1% sobre el valor del flete o costo de entrega cobrado.',
      'Pólizas de seguro de carga y responsabilidad civil vehicular vigentes.',
      'Contratos de prestación de servicios transparentes con repartidores y comercios afiliados.'
    ],
    analysis: {
      queCambio: 'Se creó una regulación para formalizar a los operadores de aplicaciones de delivery (PedidosYa, Yummy, Ridery, etc.) y empresas que presten servicios de logística de última milla para compras en línea.',
      aQuienAfecta: 'Plataformas digitales de transporte de paquetes, tiendas online con logística propia y empresas de logística courier local.',
      impactoEconomico: 'Añade una tasa regulatoria a los servicios de entrega rápida y exige garantías de seguro de carga y contratos de trabajo o prestación de servicios transparentes con los repartidores.',
      obligacionesInmediatas: [
        'Obtener el Certificado de Registro y Habilitación Postal ante IPOSTEL a través del portal SITRAPACK.',
        'Enterar mensualmente la tasa del 1% sobre el valor del flete cobrado.',
        'Implementar protocolos de trazabilidad y términos y condiciones conforme a la Ley sobre Mensajes de Datos y Firmas Electrónicas.'
      ],
      sancionesRiesgos: 'Prohibición de circulación y retención de vehículos de reparto por autoridades de tránsito, además de multas administrativas y bloqueo de plataformas web no habilitadas.',
    },
    beforeAfter: {
      before: 'El sector de delivery por aplicaciones operaba en un vacío legal sin registro específico ni tasas postales aplicadas a la entrega en moto o vehículo.',
      after: 'Marco regulatorio postal formal con licencia habilitante previa, pólizas de responsabilidad civil y control de operadores.',
      keyDifference: 'Licenciamiento obligatorio para apps de última milla y flete digital.'
    },
    tags: ['Delivery', 'IPOSTEL', 'Comercio Electrónico', 'Apps', 'CONATEL']
  },
  {
    id: 'sudeban-uvc-credito',
    title: 'Resoluciones de SUDEBAN sobre Créditos Indexados en UVC y Canales Electrónicos',
    shortTitle: 'Créditos Comerciales Indexados a la Unidad de Valor de Crédito',
    gaceta: 'Gaceta Oficial N° 41.742 / Circulares SUDEBAN y BCV',
    date: '2024-03-12',
    category: 'mercantil',
    entity: 'SUDEBAN / BCV',
    impact: 'medio',
    status: 'Vigente en el Sistema Bancario Nacional',
    summary: 'Mantiene y amplía el mecanismo de intermediación crediticia comercial obligatoria donde los préstamos en bolívares se expresan en Unidades de Valor de Crédito (UVC), indexando el capital al tipo de cambio oficial para evitar la evaporación del valor prestado.',
    deQueSeTrata: 'Esquema de intermediación crediticia de la banca venezolana mediante el cual todo préstamo desembolsado en bolívares se indexa inmediatamente a la Unidad de Valor de Crédito (UVC) fijada por el BCV. Esto traslada el riesgo devaluatorio al deudor e impide que la inflación licue el capital prestado.',
    loMasImportante: [
      'Conversión automática del capital prestado a Unidades de Valor de Crédito (UVC).',
      'Pago de cuotas en bolívares calculadas al valor de la UVC en la fecha de cada vencimiento.',
      'Tasas de interés activas reguladas por el BCV entre 4% y 16% anual sobre capital indexado.',
      'Requisito indispensable de flujos de caja proyectados en moneda dura para amortizar el crédito.'
    ],
    analysis: {
      queCambio: 'Todo crédito que una empresa solicita en un banco se convierte a UVC al momento del desembolso y se paga en bolívares según el valor de la UVC vigente a la fecha de cada cuota. Esto elimina el beneficio inflacionario para el deudor.',
      aQuienAfecta: 'Empresas industriales, agropecuarias y comerciales que recurren al crédito bancario para capital de trabajo o compra de activos.',
      impactoEconomico: 'Protege el patrimonio de la banca pero traslada el 100% del riesgo cambiario al solicitante del crédito, exigiendo que los ingresos de la empresa estén dolarizados para poder pagar el préstamo.',
      obligacionesInmediatas: [
        'Calcular los flujos de caja proyectados considerando que la deuda en bolívares crecerá al mismo ritmo de la devaluación oficial.',
        'Verificar los límites diarios de transferencias y Pago Móvil interbancario corporativo (C2P) habilitados por SUDEBAN.',
        'Cumplir estrictamente con la presentación de estados financieros auditados y garantías reales.'
      ],
      sancionesRiesgos: 'Vencimiento anticipado del crédito e indexación de intereses moratorios a tasas especiales si se incumple el calendario de amortización.',
    },
    beforeAfter: {
      before: 'Los créditos bancarios se pagaban en bolívares a tasas de interés fijas que con la inflación permitían licuar las deudas.',
      after: 'Indexación del capital a la UVC vinculada a la tasa oficial BCV, pagándose en bolívares equivalentes al valor en divisas prestado.',
      keyDifference: 'Desaparición del crédito a tasa fija y traslado del riesgo devaluatorio al deudor.'
    },
    tags: ['Crédito', 'SUDEBAN', 'Banca', 'UVC', 'Financiamiento']
  }
];

export const BEFORE_AFTER_COMPARISONS = [
  {
    id: 'comp-pensiones',
    title: 'Aportes a la Seguridad Social y Pensiones',
    subtitle: 'Régimen Tradicional vs. Ley de Protección de Pensiones (9%)',
    category: 'laboral',
    badge: 'Impacto en Nómina',
    before: {
      title: 'Esquema Anterior (Hasta Mayo 2024)',
      summary: 'Los aportes patronales se calculaban únicamente sobre el salario básico/normal legal.',
      points: [
        'IVSS: Entre 9% y 11% (según riesgo) pero topado estrictamente a 5 salarios mínimos de Bs. 130 (menos de $1 mensual).',
        'FAOV (Vivienda): 2% patronal sobre salario normal.',
        'INCES: 2% patronal sobre sueldos de personal en empresas de más de 5 trabajadores.',
        'Las bonificaciones no salariales (ej. bono en dólares, ayuda alimentaria extraordinaria) estaban exentas de cualquier tributo parafiscal.'
      ]
    },
    after: {
      title: 'Nuevo Régimen Vigente (2024 en adelante)',
      summary: 'Se añade una contribución especial del 9% que grava absolutamente todo pago al trabajador.',
      points: [
        'Alícuota del 9% pagadera mes a mes por la empresa privada.',
        'La base de cálculo incluye el salario normal y TODO pago o bono no salarial en divisas o bolívares.',
        'Se declara en el portal SENIAT dentro del calendario de contribuyentes especiales.',
        'Gasto deducible del Impuesto sobre la Renta (ISLR) pero exigente en liquidez mensual inmediata.'
      ]
    },
    impactChecklist: [
      'Recalcular el costo unitario por empleado incrementando un 9% el presupuesto de bonos en divisas.',
      'Sincronizar el sistema de nómina para generar el archivo XML de declaración del SENIAT.',
      'Asegurar conciliación bancaria en bolívares a la tasa oficial del día de pago.'
    ]
  },
  {
    id: 'comp-tributos-municipales',
    title: 'Tributación Municipal y Actividades Económicas (ISAE)',
    subtitle: 'Anarquía Tributaria Local vs. LOCAPTEM Armonizada',
    category: 'tributaria',
    badge: 'Impacto Impositivo Municipal',
    before: {
      title: 'Régimen Previo a la LOCAPTEM',
      summary: 'Cada una de las 335 alcaldías legislaba sin límites ni criterios uniformes.',
      points: [
        'Alícuotas discrecionales que alcanzaban entre 6% y 12% sobre ingresos brutos.',
        'Cobro forzoso en dólares en efectivo o anclajes arbitrarios a petros no oficiales.',
        'Licencias de actividades económicas que vencían cada 12 meses, obligando a renovaciones costosas.',
        'Mínimos tributarios fijos de cientos de dólares incluso para negocios sin ventas.'
      ]
    },
    after: {
      title: 'Nuevo Régimen LOCAPTEM Vigente',
      summary: 'Estandarización nacional, techos máximos obligatorios y estabilidad jurídica.',
      points: [
        'Tope máximo de alícuota general de hasta 3% para la mayoría de actividades (máximo absoluto 5,5% en casos excepcionales).',
        'Licencia de funcionamiento válida por un período mínimo de 3 años continuos.',
        'Unidad de cuenta obligatoria: Tipo de Cambio de la Moneda de Mayor Valor (TCMMV) del BCV (generalmente Euro o USD).',
        'Prohibición de cobros confiscatorios o impuestos duplicados entre estados y municipios.'
      ]
    },
    impactChecklist: [
      'Comparar la ordenanza de tu municipio con el catálogo del Ministerio de Finanzas.',
      'Exigir que la licencia comercial refleje la vigencia legal de 3 años.',
      'Denunciar o solicitar amparo tributario si la alcaldía cobra más allá de los topes de ley.'
    ]
  },
  {
    id: 'comp-igtf',
    title: 'Impuesto a las Grandes Transacciones Financieras (IGTF)',
    subtitle: 'Régimen Bancario vs. Gravamen Directo al Efectivo en Divisas',
    category: 'tributaria',
    badge: 'Impacto Comercial Diario',
    before: {
      title: 'Esquema Clásico del IGTF',
      summary: 'Aplicaba como débito bancario exclusivo para grandes empresas.',
      points: [
        'Afectaba sólo débitos y transferencias en cuentas bancarias comerciales de Sujetos Pasivos Especiales.',
        'El consumidor final en las tiendas no pagaba nada por transacciones en efectivo.',
        'Las operaciones en divisas dentro del territorio nacional no tenían una alícuota de retención específica en caja.'
      ]
    },
    after: {
      title: 'Reforma con Alícuota del 3% en Divisas',
      summary: 'Se convirtió en un recargo directo sobre cualquier compra en moneda extranjera.',
      points: [
        'Alícuota del 3% pagada por el comprador cuando paga en dólares, euros o Zelle a un Sujeto Pasivo Especial.',
        'El comercio debe actuar como agente de percepción y reportarlo quincenalmente al SENIAT.',
        'Obliga a tener máquinas fiscales homologadas con memorias de auditoría que discriminen el IGTF.',
        'Fomentó el retorno del uso de bolívares a través de Pago Móvil y tarjetas de débito.'
      ]
    },
    impactChecklist: [
      'Verificar que la máquina fiscal imprima el encabezado y pie de página con el 3% IGTF desglosado.',
      'Instruir a cajeros sobre la exención si el cliente paga con bolívares o tarjeta nacional.',
      'Declarar y pagar la percepción en las fechas del calendario de contribuyentes especiales.'
    ]
  },
  {
    id: 'comp-dominio',
    title: 'Régimen de Decomiso y Pérdida de Propiedad',
    subtitle: 'Procedimiento Penal Tradicional vs. Ley de Extinción de Dominio',
    category: 'penal',
    badge: 'Seguridad Jurídica & Compliance',
    before: {
      title: 'Régimen Tradicional de Incautación',
      summary: 'Los bienes sólo se confiscaban como accesorio de una condena penal definitiva.',
      points: [
        'Se requería juicio penal previo, sentencia condenatoria firme y agotamiento de recursos.',
        'La prescripción penal extinguía la posibilidad del Estado de tomar los activos trascurridos los lapsos.',
        'La persona investigada mantenía la presunción de inocencia sobre la propiedad de sus activos hasta la sentencia.'
      ]
    },
    after: {
      title: 'Ley Orgánica de Extinción de Dominio Vigente',
      summary: 'Juicio patrimonial directo, civil, imprescriptible y sin necesidad de condena penal.',
      points: [
        'El Estado puede iniciar el juicio contra el bien directamente, sin esperar el resultado penal del titular.',
        'La acción es totalmente imprescriptible: no vence en el tiempo.',
        'Carga dinámica de la prueba: el propietario debe demostrar fehacientemente cómo obtuvo el dinero para comprar el bien.',
        'Bienes transferidos a terceros de mala fe o sin trazabilidad bancaria son igualmente incautables.'
      ]
    },
    impactChecklist: [
      'Auditar contratos de compraventa de inmuebles y vehículos de los últimos 5 años.',
      'Exigir cheques de gerencia o transferencias bancarias de cuentas propias para toda transacción de activos.',
      'Mantener respaldos contables y declaraciones de ISLR que justifiquen el origen lícito de los fondos.'
    ]
  }
];
