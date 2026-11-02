import React from 'react';
import { AlertTriangle, TrendingUp, Landmark, ShieldCheck, Scale, FileText } from 'lucide-react';

export default function DashboardStats({ items }) {
  const total = items.length;
  const criticos = items.filter(i => i.impact === 'critico').length;
  const altos = items.filter(i => i.impact === 'alto').length;
  
  // Conteo por materias
  const categoriesCount = items.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Tarjeta 1: Total Leyes */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Reformas Monitoreadas</p>
            <h3 className="text-3xl font-black text-slate-900 mt-1">{total}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Scale className="w-6 h-6" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500"></span>
          <span>8 materias del ordenamiento venezolano</span>
        </div>
      </div>

      {/* Tarjeta 2: Alertas Críticas */}
      <div className="bg-white rounded-2xl p-5 border border-red-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-gradient-to-br from-white via-red-50/20 to-red-100/30">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-red-700 uppercase tracking-wider">Impacto Crítico Inmediato</p>
            <h3 className="text-3xl font-black text-red-600 mt-1">{criticos}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-red-700 font-medium">
          <span>Pensiones 9%, LOCAPTEM y Decretos Salariales</span>
        </div>
      </div>

      {/* Tarjeta 3: Alto Impacto & Compliance */}
      <div className="bg-white rounded-2xl p-5 border border-amber-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">Alto Impacto Empresarial</p>
            <h3 className="text-3xl font-black text-amber-600 mt-1">{altos}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
          <span>IGTF, Extinción de Dominio, Tasas SAREN</span>
        </div>
      </div>

      {/* Tarjeta 4: Enfoque de Cumplimiento */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Nivel de Riesgo Operativo</p>
            <h3 className="text-xl font-bold text-slate-800 mt-1">Monitoreo Activo</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
          <span>Fichas actualizadas con checklist práctico</span>
        </div>
      </div>
    </div>
  );
}
