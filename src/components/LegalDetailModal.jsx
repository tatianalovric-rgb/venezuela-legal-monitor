import React, { useState, useEffect } from 'react';
import { X, Calendar, FileText, AlertTriangle, CheckSquare, ShieldAlert, GitCompare, Printer, Star, BookOpen } from 'lucide-react';
import { CATEGORIES, IMPACT_LEVELS } from '../data/legalUpdates';

export default function LegalDetailModal({ item, onClose, onPrintSingle }) {
  const [activeTab, setActiveTab] = useState('analysis');
  const [completedTasks, setCompletedTasks] = useState({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  const categoryInfo = CATEGORIES.find(c => c.id === item.category) || { label: item.category };
  const impactInfo = IMPACT_LEVELS[item.impact] || IMPACT_LEVELS.medio;
  const loMasImportante = item.loMasImportante || item.analysis?.obligacionesInmediatas || [];
  const deQueSeTrata = item.deQueSeTrata || item.summary || item.analysis?.queCambio;

  const toggleTask = (index) => {
    setCompletedTasks(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Cabecera del Modal */}
        <div className="p-6 sm:p-7 border-b border-slate-200 bg-gradient-to-r from-slate-50 via-white to-blue-50/30 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badges y Fecha */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-200">
              {categoryInfo.label}
            </span>
            <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${impactInfo.badge}`}>
              {impactInfo.label}
            </span>
            <span className="text-xs text-slate-500 font-medium flex items-center gap-1 ml-auto mr-8">
              <Calendar className="w-3.5 h-3.5" />
              Publicación: {item.date}
            </span>
          </div>

          {/* Gaceta Oficial Prominente */}
          <div className="mb-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 text-amber-300 text-xs font-mono font-bold shadow-xs">
              <FileText className="w-4 h-4 text-amber-400" />
              <span>{item.gaceta || 'Gaceta Oficial de la República Bolivariana de Venezuela'}</span>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
            {item.title}
          </h2>

          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-600 font-medium">
            <span>🏛️ Ente Emisor: <strong className="text-slate-900">{item.entity}</strong></span>
            <span>Estatus: <strong className="text-emerald-700">{item.status || 'Vigente'}</strong></span>
          </div>
        </div>

        {/* Pestañas de Navegación del Modal */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-6 gap-2">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'analysis'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Análisis & Resumen</span>
          </button>

          <button
            onClick={() => setActiveTab('checklist')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'checklist'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-emerald-600" />
            <span>Obligaciones Inmediatas</span>
          </button>

          <button
            onClick={() => setActiveTab('risks')}
            className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'risks'
                ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span>Riesgos y Sanciones</span>
          </button>

          {item.beforeAfter && (
            <button
              onClick={() => setActiveTab('comparator')}
              className={`py-3 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
                activeTab === 'comparator'
                  ? 'border-blue-600 text-blue-700 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <GitCompare className="w-4 h-4 text-indigo-500" />
              <span>Antes vs Después</span>
            </button>
          )}
        </div>

        {/* Contenido con scroll */}
        <div className="p-6 sm:p-7 overflow-y-auto space-y-6 text-sm text-slate-700 leading-relaxed">
          
          {/* TAB 1: ANÁLISIS DE IMPACTO Y RESUMEN DE LO MÁS IMPORTANTE */}
          {activeTab === 'analysis' && (
            <div className="space-y-5">
              
              {/* ¿De qué se trata? */}
              <div className="bg-blue-50/70 p-5 rounded-2xl border border-blue-200 space-y-2">
                <h4 className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-700" />
                  <span>¿De qué se trata esta norma o reforma?</span>
                </h4>
                <p className="text-slate-900 text-sm leading-relaxed">
                  {deQueSeTrata}
                </p>
              </div>

              {/* Resumen de lo más importante */}
              {loMasImportante && loMasImportante.length > 0 && (
                <div className="bg-amber-50/70 p-5 rounded-2xl border border-amber-200/90 space-y-2.5">
                  <h4 className="text-xs font-extrabold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="w-4 h-4 text-amber-600 fill-amber-500" />
                    <span>Resumen de lo más importante a tener en cuenta:</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800">
                    {loMasImportante.map((punto, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-amber-600 font-bold shrink-0 mt-0.5">•</span>
                        <span>{punto}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Qué cambió en la práctica */}
              <div>
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  ¿Qué cambió en el ordenamiento jurídico?
                </h4>
                <p className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 text-slate-800 text-xs sm:text-sm">
                  {item.analysis?.queCambio || item.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    🎯 ¿A quién afecta directamente?
                  </h4>
                  <p className="text-slate-800 text-xs sm:text-sm">
                    {item.analysis?.aQuienAfecta || 'Empresas y particulares'}
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    💰 Impacto Financiero y Operativo:
                  </h4>
                  <p className="text-slate-800 text-xs sm:text-sm">
                    {item.analysis?.impactoEconomico || 'Revisión de costos y procedimientos contables.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CHECKLIST DE OBLIGACIONES INMEDIATAS */}
          {activeTab === 'checklist' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 text-emerald-900 text-xs">
                <span>Marca cada acción a medida que tu departamento contable o legal la implemente:</span>
                <span className="font-bold">
                  {Object.values(completedTasks).filter(Boolean).length} / {item.analysis?.obligacionesInmediatas?.length || 0} completadas
                </span>
              </div>

              <div className="space-y-2.5">
                {item.analysis?.obligacionesInmediatas?.map((task, idx) => {
                  const isDone = !!completedTasks[idx];
                  return (
                    <div
                      key={idx}
                      onClick={() => toggleTask(idx)}
                      className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                        isDone
                          ? 'bg-emerald-50/50 border-emerald-300 line-through text-slate-400'
                          : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isDone}
                        onChange={() => {}}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                      />
                      <div className="text-sm font-medium">
                        {task}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: RIESGOS Y SANCIONES */}
          {activeTab === 'risks' && (
            <div className="space-y-4">
              <div className="bg-red-50 p-5 rounded-2xl border border-red-200 space-y-3">
                <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span>Consecuencias Legales, Penales o Pecuniarias por Incumplimiento</span>
                </div>
                <p className="text-slate-800 leading-relaxed font-medium">
                  {item.analysis?.sancionesRiesgos || 'Sanciones según el marco normativo aplicable en Venezuela.'}
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <p className="font-bold text-slate-800">💡 Recomendación de Compliance:</p>
                <p>
                  En Venezuela, las infracciones tributarias y de registros suelen indexarse a la Unidad de Moneda de Mayor Valor publicada por el BCV o al Código Orgánico Tributario, lo que impide que las sanciones se devalúen con el tiempo.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: COMPARATIVA ANTES VS DESPUÉS */}
          {activeTab === 'comparator' && item.beforeAfter && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-200">
                  <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                    <span>Régimen Anterior</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {item.beforeAfter.before}
                  </p>
                </div>

                <div className="bg-emerald-50/60 p-4 rounded-2xl border border-emerald-200">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Nuevo Régimen Vigente</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {item.beforeAfter.after}
                  </p>
                </div>
              </div>

              <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700">
                <strong className="text-slate-900">Diferencia Clave:</strong> {item.beforeAfter.keyDifference}
              </div>
            </div>
          )}

        </div>

        {/* Pie del modal */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => onPrintSingle(item)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 shadow-sm transition-colors"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Imprimir Ficha Resumen (PDF)</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white transition-colors"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  );
}
