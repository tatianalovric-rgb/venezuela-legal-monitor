import React from 'react';
import { Calendar, FileText, ChevronRight, CheckCircle2, Building2, Star, Sparkles } from 'lucide-react';
import { CATEGORIES, IMPACT_LEVELS } from '../data/legalUpdates';

export default function LegalCard({ item, onSelect, onCompare }) {
  const categoryInfo = CATEGORIES.find(c => c.id === item.category) || { label: item.category, color: 'blue' };
  const impactInfo = IMPACT_LEVELS[item.impact] || IMPACT_LEVELS.medio;

  // Resumen de lo más importante (3 a 4 puntos clave)
  const loMasImportante = item.loMasImportante || item.analysis?.obligacionesInmediatas?.slice(0, 3) || [];
  const deQueSeTrata = item.deQueSeTrata || item.summary || item.analysis?.queCambio;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden group hover:border-blue-400">
      
      {/* Contenido Superior */}
      <div className="p-6">
        
        {/* Fila 1: Badges de Categoría, Impacto y Fecha */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              {categoryInfo.label}
            </span>
            <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-extrabold ${impactInfo.badge}`}>
              {impactInfo.label}
            </span>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>{item.date}</span>
          </div>
        </div>

        {/* Fila 2: Gaceta Oficial Destacada */}
        <div className="mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-mono font-bold shadow-xs">
            <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{item.gaceta || 'Gaceta Oficial de Venezuela'}</span>
          </div>
        </div>

        {/* Título Principal */}
        <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-snug mb-2.5">
          {item.shortTitle || item.title}
        </h3>

        {/* SECCIÓN 1: ¿De qué se trata? */}
        <div className="mb-4">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1">
            <span>📖 ¿De qué se trata?</span>
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed line-clamp-3">
            {deQueSeTrata}
          </p>
        </div>

        {/* SECCIÓN 2: Resumen de lo más importante */}
        {loMasImportante && loMasImportante.length > 0 && (
          <div className="bg-gradient-to-br from-amber-50/60 via-blue-50/30 to-slate-50 rounded-2xl p-3.5 border border-amber-200/80 mb-4 space-y-1.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900">
              <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>Resumen de lo más importante:</span>
            </div>
            <ul className="space-y-1 text-xs text-slate-800">
              {loMasImportante.slice(0, 3).map((punto, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-blue-600 font-bold shrink-0 mt-0.5">•</span>
                  <span className="leading-snug">{punto}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ficha institucional: Ente & Afectados */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1 text-xs">
          <div className="flex items-start gap-1.5">
            <span className="font-bold text-slate-700 shrink-0">🏛️ Emisor:</span>
            <span className="text-slate-600 truncate">{item.entity}</span>
          </div>
          <div className="flex items-start gap-1.5">
            <span className="font-bold text-slate-700 shrink-0">🎯 Afecta a:</span>
            <span className="text-slate-600 line-clamp-1">{item.analysis?.aQuienAfecta || 'Empresas y particulares'}</span>
          </div>
        </div>

      </div>

      {/* Pie de tarjeta con acciones */}
      <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <button
          onClick={() => onSelect(item)}
          className="text-xs font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 transition-colors"
        >
          <span>Ver Análisis Completo & Checklist</span>
          <ChevronRight className="w-4 h-4" />
        </button>

        {item.beforeAfter && (
          <button
            onClick={() => onCompare(item)}
            className="text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-white hover:bg-indigo-50 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors shadow-2xs"
          >
            Antes vs. Después
          </button>
        )}
      </div>

    </div>
  );
}
