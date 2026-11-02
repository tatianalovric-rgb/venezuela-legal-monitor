import React from 'react';
import { Printer, ArrowLeft, Scale, ShieldAlert, CheckCircle2, Calendar, FileText, Star, BookOpen } from 'lucide-react';
import { CATEGORIES, IMPACT_LEVELS } from '../data/legalUpdates';

export default function ExecutiveReportView({ items, onClose }) {
  return (
    <div className="bg-white min-h-screen p-4 sm:p-10 text-slate-900">
      
      {/* Barra de control superior (sólo en pantalla, oculta al imprimir) */}
      <div className="max-w-5xl mx-auto flex items-center justify-between pb-6 mb-8 border-b border-slate-200 no-print">
        <button
          onClick={onClose}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Monitor</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            💡 Puedes guardarlo como PDF seleccionando "Guardar como PDF" en el diálogo de impresión.
          </span>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 transition-all active:scale-95"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Exportar a PDF</span>
          </button>
        </div>
      </div>

      {/* DOCUMENTO FORMAL IMPRIMIBLE */}
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Membrete del Reporte */}
        <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <Scale className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">
                LexVen Monitor • Informe Regulatorio Ejecutivo
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                Matriz de Reformas Legislativas, Gacetas Oficiales y Evaluación de Riesgos • República Bolivariana de Venezuela
              </p>
            </div>
          </div>

          <div className="text-right text-xs text-slate-600 font-mono">
            <div>Fecha de Emisión: <strong>{new Date().toLocaleDateString('es-VE')}</strong></div>
            <div>Total Normas Analizadas: <strong>{items.length}</strong></div>
            <div>Clasificación: <strong>Confidencial / Corporativo</strong></div>
          </div>
        </div>

        {/* Resumen Ejecutivo */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 break-inside-avoid">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
            1. Resumen Ejecutivo de la Coyuntura Legal
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed text-justify">
            El marco legal venezolano ha transitado por una profunda reconfiguración orientada a la armonización tributaria municipal (LOCAPTEM), la desalarización del ingreso con complementos indexados al tipo de cambio oficial del BCV, y la creación de cargas parafiscales directas como la <strong>Ley de Protección de Pensiones (alícuota del 9%)</strong>. Paralelamente, se han endurecido los controles de compliance patrimonial (Ley de Extinción de Dominio y regulación de ONGs), obligando a las entidades a implementar sistemas estrictos de debida diligencia, conciliación en divisas y revisión periódica de ordenanzas locales.
          </p>
        </div>

        {/* Matriz Resumen de Impacto Crítico */}
        <div className="break-inside-avoid">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>2. Matriz de Reformas Críticas y de Alto Impacto</span>
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-800 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Norma / Instrumento</th>
                  <th className="p-3">Gaceta Oficial</th>
                  <th className="p-3">Materia</th>
                  <th className="p-3">Nivel de Impacto</th>
                  <th className="p-3">Consecuencia Clave</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.filter(i => i.impact === 'critico' || i.impact === 'alto').map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{item.shortTitle || item.title}</td>
                    <td className="p-3 font-mono font-bold text-blue-900 bg-blue-50/50">{item.gaceta}</td>
                    <td className="p-3 capitalize text-slate-700">{item.category}</td>
                    <td className="p-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.impact === 'critico' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.impact === 'critico' ? 'Crítico (Inmediato)' : 'Alto'}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600">{item.analysis?.impactoEconomico || item.summary}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Fichas Detalladas de Cumplimiento (Con Gaceta Oficial, De qué se trata y Lo más importante) */}
        <div className="space-y-6 pt-4">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-2">
            3. Fichas de Análisis, Gacetas Oficiales y Puntos Clave
          </h2>

          {items.map((item, index) => {
            const loMasImportante = item.loMasImportante || item.analysis?.obligacionesInmediatas || [];
            const deQueSeTrata = item.deQueSeTrata || item.summary || item.analysis?.queCambio;

            return (
              <div key={item.id} className="border border-slate-200 rounded-2xl p-6 bg-white break-inside-avoid space-y-4">
                
                {/* Cabecera de la ficha */}
                <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        Materia: {item.category}
                      </span>
                      <span className="text-[11px] font-bold font-mono bg-slate-900 text-amber-300 px-2.5 py-0.5 rounded">
                        🏛️ {item.gaceta || 'Gaceta Oficial'}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mt-1">
                      {index + 1}. {item.title}
                    </h3>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      Emisor: <strong>{item.entity}</strong> • Fecha: {item.date} • Estatus: {item.status || 'Vigente'}
                    </div>
                  </div>
                </div>

                {/* ¿De qué se trata? */}
                <div className="text-xs text-slate-800 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                    📖 ¿De qué se trata?:
                  </div>
                  <p className="leading-relaxed">
                    {deQueSeTrata}
                  </p>
                </div>

                {/* Resumen de lo más importante */}
                {loMasImportante && loMasImportante.length > 0 && (
                  <div className="bg-amber-50/60 p-3.5 rounded-xl border border-amber-200 text-xs">
                    <div className="font-extrabold text-amber-950 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1">
                      <span>⭐ Resumen de lo más importante:</span>
                    </div>
                    <ul className="space-y-1 text-slate-800">
                      {loMasImportante.map((punto, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-amber-700 font-bold shrink-0">•</span>
                          <span>{punto}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="text-xs text-slate-700 space-y-1.5">
                  <div>
                    <strong className="text-slate-900">A quién afecta: </strong>
                    <span>{item.analysis?.aQuienAfecta || 'Empresas y particulares'}</span>
                  </div>
                  <div>
                    <strong className="text-slate-900">Riesgos y Sanciones: </strong>
                    <span className="text-red-700 font-medium">{item.analysis?.sancionesRiesgos || 'Penalidades de ley'}</span>
                  </div>
                </div>

                {/* Checklist para la empresa */}
                {item.analysis?.obligacionesInmediatas && item.analysis.obligacionesInmediatas.length > 0 && (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Acciones de Mitigación y Cumplimiento Requeridas:
                    </div>
                    <div className="space-y-1 text-xs text-slate-700">
                      {item.analysis.obligacionesInmediatas.map((task, tidx) => (
                        <div key={tidx} className="flex items-start gap-2">
                          <span className="text-emerald-600 font-bold">☑</span>
                          <span>{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Pie de página del reporte */}
        <div className="pt-8 border-t border-slate-300 text-center text-xs text-slate-500 font-mono break-inside-avoid">
          <p>LexVen Monitor — Sistema de Monitoreo Regulatorio de Venezuela.</p>
          <p className="mt-1">
            Este informe consolida leyes, decretos y providencias dictadas en la República Bolivariana de Venezuela. Consulte a su asesor legal o tributario antes de tomar decisiones operativas.
          </p>
        </div>

      </div>

    </div>
  );
}
