# ⚖️ LexVen Monitor • Monitor de Reformas Legislativas, Gacetas Oficiales y Análisis Regulatorio de Venezuela

Plataforma web integral para el seguimiento y análisis en tiempo real de los cambios jurídicos, gacetas oficiales, resoluciones y providencias en la República Bolivariana de Venezuela.

---

## 🌟 Características Principales

1. **🏛️ Detección y Enlace de Gaceta Oficial:**
   - Identificación del número exacto de Gaceta Oficial ordinaria o extraordinaria donde se publica cada instrumento normativo.
   - Filtro dedicado para aislar publicaciones oficiales con Gaceta confirmada.

2. **📖 Resumen de lo que se trata:**
   - Análisis contextual y sustantivo de cada reforma, explicando el organismo emisor, los antecedentes y el alcance de la medida.

3. **⭐ Resumen de lo más importante:**
   - Puntos críticos sintetizados en viñetas: alícuotas (ej. 9% Pensiones, 3% IGTF), plazos de cumplimiento, requisitos y sanciones.

4. **📡 Radar de Noticias y Gacetas en Vivo:**
   - Extracción continua de publicaciones de entes oficiales (SENIAT, BCV, SUDEBAN, SAREN, SUNAVI, Asamblea Nacional, TSJ) y medios especializados (*Finanzas Digital, Acceso a la Justicia, etc.*).
   - Auto-sincronización periódica en segundo plano.

5. **⚖️ Comparador Normativo "Antes vs. Después":**
   - Análisis lado a lado de la normativa tradicional derogada frente a la reforma vigente.

6. **🧮 Simuladores de Impacto Financiero:**
   - Calculadora de la Contribución Especial de Pensiones (9% patronal).
   - Simulador de percepción del IGTF (3% en divisas).
   - Semáforo de techos de alícuotas municipales (LOCAPTEM).

7. **📄 Generador de Informes Ejecutivos PDF:**
   - Vista formateada lista para imprimir o guardar en PDF para directivas y asesorías legales.

---

## 📚 8 Materias Legales Monitoreadas

- **Tributaria y Fiscal:** SENIAT, IGTF, IVA, ISLR, LOCAPTEM y tasas municipales.
- **Laboral y Seguridad Social:** Contribución de Pensiones 9%, ingreso mínimo indexado, bono de guerra, cestaticket y LOTTT.
- **Mercantil, Financiera y Cambiaria:** Mesas de cambio del BCV, SUDEBAN, créditos en UVC y banca.
- **Inmobiliaria, Notarial e Inquilinato:** Tasas SAREN indexadas, SUNAVI, contratos de arrendamiento y notificaciones.
- **Hidrocarburos, Energía y Minería:** Empresas mixtas de PDVSA, contratos de servicios y licencias OFAC.
- **Penal, Cumplimiento y Prevención:** Ley Orgánica de Extinción de Dominio, Ley de ONGs y compliance.
- **Comercio Exterior y Aduanas:** Decretos de exoneración arancelaria, certificados CNP y SIDUNEA.
- **Tecnología y Telecomunicaciones:** Delivery e IPOSTEL, CONATEL y contratos electrónicos.

---

## 🚀 Instalación y Puesta en Marcha Local

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd venezuela-legal-monitor

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo en vivo
npm run dev
```

La aplicación se abrirá en `http://127.0.0.1:5173/`.

---

## 🛡️ Licencia
Distribuido bajo la Licencia MIT.
