import React, { useState } from 'react';
import { GitCompare, ArrowRight, CheckCircle2, AlertOctagon, Printer } from 'lucide-react';
import { BEFORE_AFTER_COMPARISONS } from '../data/legalUpdates';

export default function BeforeAfterComparator({ initialSelectedId }) {
  const [selectedId, setSelectedId] = useState(initialSelectedId || BEFORE_AFTER_COMPARISONS[0].id);

  const currentComp = BEFORE_AFTER_COMPARISONS.find(c => c.id === selectedId) || BEFORE_AFTER_COMPARISONS[0];

  return (
    <div className="space-y-6">
      
      {/* Selector de Comparativas */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <GitCompare className="w-5 h-5 text-indigo-600" />
              <span>Comparador Normativo: Antes vs. Después</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Visualiza en detalle qué exigía la normativa tradicional y qué exige ahora la ley reformada en Venezuela.
            </p>
          </div>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl border border-slate-300 transition-colors shrink-0"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir Comparativa</span>
          </button>
        </div>

        {/* Píldoras de selección de casos */}
        <div className="flex flex-wrap gap-2">
          {BEFORE_AFTER_COMPARISONS.map(comp => {
            const isSelected = comp.id === selectedId;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedId(comp.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all text-left flex items-center gap-2 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-400'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{comp.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {comp.badge}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tarjeta de Comparación Detallada */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md">
        
        {/* Cabecera del caso */}
        <div className="border-b border-slate-200 pb-5 mb-6">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-2">
            Caso de Estudio: {currentComp.badge}
          </div>
          <h2 className="text-2xl font-black text-slate-900">
            {currentComp.title}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {currentComp.subtitle}
          </p>
        </div>

        {/* Lado a Lado: Antes vs Después */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* LADO IZQUIERDO: RÉGIMEN ANTERIOR */}
          <div className="bg-rose-50/40 rounded-2xl p-6 border-2 border-rose-200/80 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-rose-700 bg-rose-100 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                  Régimen Anterior
                </span>
                <span className="text-xs text-rose-600 font-semibold">Derogado / Modificado</span>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-2">
                {currentComp.before.title}
              </h4>
              <p className="text-sm text-slate-600 mb-5">
                {currentComp.before.summary}
              </p>

              <div className="space-y-3">
                {currentComp.before.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 bg-white/70 p-3 rounded-xl border border-rose-100">
                    <span className="text-rose-500 font-bold shrink-0">•</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-200/60 text-xs text-rose-800 font-medium">
              ⚠️ Este marco ya no es aplicable ante fiscalizaciones o tribunales.
            </div>
          </div>

          {/* LADO DERECHO: NUEVO RÉGIMEN VIGENTE */}
          <div className="bg-emerald-50/40 rounded-2xl p-6 border-2 border-emerald-300 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  Nuevo Régimen Vigente
                </span>
                <span className="text-xs text-emerald-700 font-bold">Exigible Hoy</span>
              </div>

              <h4 className="text-base font-bold text-slate-900 mb-2">
                {currentComp.after.title}
              </h4>
              <p className="text-sm text-slate-600 mb-5">
                {currentComp.after.summary}
              </p>

              <div className="space-y-3">
                {currentComp.after.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 bg-white p-3 rounded-xl border border-emerald-200 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-200 text-xs text-emerald-800 font-bold flex items-center gap-1.5">
              <span>✅ De obligatorio cumplimiento en todo el territorio nacional.</span>
            </div>
          </div>

        </div>

        {/* Bloque Inferior: Resumen de Impacto Práctico */}
        <div className="bg-slate-900 text-white rounded-2xl p-6">
          <h4 className="text-sm font-bold text-emerald-400 uppercase tracking-wider mb-2">
            ⚡ Consecuencia Práctica Inmediata:
          </h4>
          <div className="space-y-2">
            {currentComp.impactChecklist.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200">
                <span className="text-indigo-400 font-bold">👉</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
