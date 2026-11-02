import React from 'react';
import { Search, Filter, X, Check, Tag } from 'lucide-react';
import { CATEGORIES } from '../data/legalUpdates';

export default function FiltersBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedImpact,
  setSelectedImpact,
  selectedEntity,
  setSelectedEntity,
  entitiesList,
  onResetFilters
}) {
  const hasActiveFilters = searchQuery || selectedCategory !== 'all' || selectedImpact !== 'all' || selectedEntity !== 'all';

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm mb-6 space-y-4">
      
      {/* Fila Superior: Buscador y Filtros Select */}
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Input Buscador */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por gaceta, título, artículo, palabra clave (ej. SENIAT, 9%, IGTF, salario, divisa, desalojo)..."
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Selector de Nivel de Impacto */}
        <div className="flex items-center gap-2">
          <select
            value={selectedImpact}
            onChange={(e) => setSelectedImpact(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="all">⚡ Todos los impactos</option>
            <option value="critico">🔴 Crítico / Urgente</option>
            <option value="alto">🟠 Alto Impacto</option>
            <option value="medio">🔵 Impacto Medio</option>
            <option value="bajo">⚪ Informativo / Bajo</option>
          </select>

          {/* Selector de Ente Emisor */}
          <select
            value={selectedEntity}
            onChange={(e) => setSelectedEntity(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer max-w-[200px]"
          >
            <option value="all">🏛️ Todos los entes</option>
            {entitiesList.map(entity => (
              <option key={entity} value={entity}>{entity}</option>
            ))}
          </select>

          {hasActiveFilters && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors border border-rose-200"
              title="Restablecer filtros"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpiar</span>
            </button>
          )}
        </div>
      </div>

      {/* Fila Inferior: Píldoras de las 8 Materias Legales */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Materias Legales:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
            }`}
          >
            Todas las Materias
          </button>

          {CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-600/30'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}
